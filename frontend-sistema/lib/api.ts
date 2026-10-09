const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
export const API_URL = RAW_API_URL.replace(/\/$/, '');

export interface UsuarioSesion {
  id: number;
  nombreUsuario: string;
  nombres: string;
  apellidos: string;
  rol: string;
  esAdmin: boolean;
}

export interface LoginResponse {
  accessToken: string;
  usuario: UsuarioSesion;
}

/** Credenciales incorrectas o usuario inactivo (401 del backend). */
export class CredencialesInvalidasError extends Error {}

export async function login(
  nombreUsuario: string,
  password: string,
): Promise<LoginResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombreUsuario, password }),
    });
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor. Verifica tu conexión.',
    );
  }

  if (response.status === 401) {
    throw new CredencialesInvalidasError('Usuario o contraseña incorrectos.');
  }
  if (!response.ok) {
    throw new Error('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
  }

  return response.json() as Promise<LoginResponse>;
}

/**
 * fetch con el token de sesión ya agregado, para llamar rutas protegidas del backend.
 * Si el token venció o es inválido, cierra la sesión local para forzar un nuevo login.
 */
export async function authFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const token = obtenerToken();
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...init.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.',
    );
  }

  if (response.status === 401) {
    cerrarSesion();
  }
  return response;
}

// =========================================================
// PACIENTES / HISTORIA CLÍNICA
// =========================================================

/** Paciente ya guardado en nuestra base (siempre tiene historia clínica). */
export interface Paciente {
  historiaClinica: string;
  dni: string;
  nombres: string;
  apellidos: string;
  sexo: 'M' | 'F' | null;
  celular: string | null;
  fechaRegistro: string;
}

/**
 * Lo que devuelve GET /pacientes/:dni: o un Paciente real de nuestra base,
 * o (si no estaba y el backend lo encontró en RENIEC) un adelanto de sus
 * datos sin historia clínica todavía, para completar el registro.
 */
export interface PacienteConsulta {
  historiaClinica: string | null;
  dni: string;
  nombres: string;
  apellidos: string;
  sexo: 'M' | 'F' | null;
  celular: string | null;
}

/** Lee el mensaje de error del backend (class-validator puede mandar un arreglo). */
async function mensajeDeError(response: Response, porDefecto: string): Promise<string> {
  try {
    const cuerpo = (await response.json()) as { message?: string | string[] };
    if (Array.isArray(cuerpo.message)) return cuerpo.message.join(' ');
    if (typeof cuerpo.message === 'string') return cuerpo.message;
  } catch {
    // el cuerpo no era JSON; se usa el mensaje por defecto
  }
  return porDefecto;
}

/**
 * Busca un paciente por DNI, para autocompletar el formulario de citas.
 * Devuelve null si no existe (paciente nuevo), no lo trata como error.
 */
export async function buscarPacientePorDni(dni: string): Promise<PacienteConsulta | null> {
  const response = await authFetch(`/pacientes/${dni}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo buscar el paciente.'));
  }
  return response.json() as Promise<PacienteConsulta>;
}

// =========================================================
// CITAS
// =========================================================

export interface Cuenta {
  id: number;
  paciente: Paciente;
  fechaApertura: string;
}

export interface Servicio {
  id: number;
  nombre: string;
  tipo: 'consultorio' | 'laboratorio';
}

/**
 * Flujo real: pendiente_triaje -> pendiente_diagnostico -> atendida, o
 * ausente. Desde pendiente_triaje/ausente también se puede cancelar o
 * reprogramar (ver cancelarCita/reprogramarCita).
 */
export interface EstadoCitaBackend {
  id: number;
  codigo: 'pendiente_triaje' | 'pendiente_diagnostico' | 'atendida' | 'ausente' | 'cancelada';
  nombre: string;
  descripcion: string | null;
  color: string;
  orden: number;
}

export interface CitaBackend {
  id: number;
  cuenta: Cuenta;
  servicio: Servicio;
  fechaCita: string;
  horaInicio: string;
  horaFin: string;
  programacionId: number | null;
  // El médico asignado sale de aquí (programacionMedica.medico); null si la
  // cita se agendó sin elegir un horario ya programado ("Por asignar").
  programacionMedica: ProgramacionMedicaBackend | null;
  estado: EstadoCitaBackend;
  fechaRegistro: string;
}

export interface DatosPacienteCita {
  dni: string;
  nombres: string;
  apellidos: string;
  sexo?: 'M' | 'F';
  celular?: string;
}

export interface DatosNuevaCita {
  paciente: DatosPacienteCita;
  especialidad: string;
  fecha: string;
  hora: string;
  // Horario ya programado (de /programacion-medica) al que se asigna la
  // cita; opcional, sin esto queda "Por asignar".
  programacionId?: number;
}

export async function listarCitas(fecha?: string): Promise<CitaBackend[]> {
  const query = fecha ? `?fecha=${encodeURIComponent(fecha)}` : '';
  const response = await authFetch(`/citas${query}`);
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudieron cargar las citas.'));
  }
  return response.json() as Promise<CitaBackend[]>;
}

export async function crearCita(datos: DatosNuevaCita): Promise<CitaBackend> {
  const response = await authFetch('/citas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo registrar la cita.'));
  }
  return response.json() as Promise<CitaBackend>;
}

// Solo válido si la cita todavía está en "Pendiente de Triaje" o "Ausente".
export async function cancelarCita(citaId: number): Promise<CitaBackend> {
  const response = await authFetch(`/citas/${citaId}/cancelar`, { method: 'PATCH' });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo cancelar la cita.'));
  }
  return response.json() as Promise<CitaBackend>;
}

export interface DatosReprogramarCita {
  fecha: string;
  hora: string;
}

// Misma restricción que cancelarCita; además deja la cita en "Pendiente de
// Triaje" en la nueva fecha/hora.
export async function reprogramarCita(
  citaId: number,
  datos: DatosReprogramarCita,
): Promise<CitaBackend> {
  const response = await authFetch(`/citas/${citaId}/reprogramar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo reprogramar la cita.'));
  }
  return response.json() as Promise<CitaBackend>;
}

// =========================================================
// TRIAJES
// =========================================================

export interface TriajeBackend {
  id: number;
  peso: number | null;
  talla: number | null;
  presionArterial: string | null;
  temperatura: number | null;
  frecuenciaCardiaca: number | null;
  frecuenciaRespiratoria: number | null;
  saturacionO2: number | null;
  motivoConsulta: string | null;
  fechaRegistro: string;
}

export interface DatosNuevoTriaje {
  citaId: number;
  peso?: number;
  talla?: number;
  presionArterial?: string;
  temperatura?: number;
  frecuenciaCardiaca?: number;
  frecuenciaRespiratoria?: number;
  saturacionO2?: number;
  motivoConsulta?: string;
}

export async function listarTriajes(citaId: number): Promise<TriajeBackend[]> {
  const response = await authFetch(`/triajes?citaId=${citaId}`);
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo cargar el triaje.'));
  }
  return response.json() as Promise<TriajeBackend[]>;
}

export async function crearTriaje(datos: DatosNuevoTriaje): Promise<TriajeBackend> {
  const response = await authFetch('/triajes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo guardar el triaje.'));
  }
  return response.json() as Promise<TriajeBackend>;
}

// =========================================================
// DIAGNÓSTICOS
// =========================================================

export interface DiagnosticoBackend {
  id: number;
  sintomas: string | null;
  diagnostico: string;
  indicaciones: string | null;
  fechaRegistro: string;
}

export interface DatosNuevoDiagnostico {
  citaId: number;
  sintomas?: string;
  diagnostico: string;
  indicaciones?: string;
  examenIds?: number[];
}

export async function listarDiagnosticos(citaId: number): Promise<DiagnosticoBackend[]> {
  const response = await authFetch(`/diagnosticos?citaId=${citaId}`);
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo cargar el diagnóstico.'));
  }
  return response.json() as Promise<DiagnosticoBackend[]>;
}

export async function crearDiagnostico(datos: DatosNuevoDiagnostico): Promise<DiagnosticoBackend> {
  const response = await authFetch('/diagnosticos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo guardar el diagnóstico.'));
  }
  return response.json() as Promise<DiagnosticoBackend>;
}

// =========================================================
// CATÁLOGO DE EXÁMENES Y ÓRDENES DE LABORATORIO
// =========================================================

export interface ExamenCatalogoBackend {
  id: number;
  nombre: string;
  categoria: { id: number; nombre: string };
}

export async function listarExamenesCatalogo(): Promise<ExamenCatalogoBackend[]> {
  const response = await authFetch('/examenes-catalogo');
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo cargar el catálogo de exámenes.'));
  }
  return response.json() as Promise<ExamenCatalogoBackend[]>;
}

export interface CitaExamenBackend {
  id: number;
  examen: ExamenCatalogoBackend;
  estado: 'pendiente' | 'con_resultado';
}

export async function listarCitaExamenes(citaId: number): Promise<CitaExamenBackend[]> {
  const response = await authFetch(`/cita-examenes?citaId=${citaId}`);
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo cargar la orden de laboratorio.'));
  }
  return response.json() as Promise<CitaExamenBackend[]>;
}

// =========================================================
// GESTIÓN DE USUARIOS (solo admin; el backend devuelve 403 para los demás)
// =========================================================

export interface MedicoBackend {
  id: number;
  nombres: string;
  apellidos: string;
  especialidad: string | null;
  dni: string | null;
}

export interface UsuarioBackend {
  id: number;
  nombreUsuario: string;
  nombres: string;
  apellidos: string;
  rol: { id: number; nombre: string; esAdmin: boolean };
  medicoId: number | null;
  medico: MedicoBackend | null;
  activo: boolean;
  fechaCreacion: string;
  ultimoLogin: string | null;
}

export interface DatosNuevoUsuario {
  nombreUsuario: string;
  password: string;
  nombres: string;
  apellidos: string;
  rol: string;
  especialidad?: string;
  dni?: string;
}

export interface DatosActualizarUsuario {
  nombreUsuario?: string;
  nombres?: string;
  apellidos?: string;
  rol?: string;
  activo?: boolean;
  password?: string;
  especialidad?: string;
}

export async function listarUsuarios(): Promise<UsuarioBackend[]> {
  const response = await authFetch('/usuarios');
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudieron cargar los usuarios.'));
  }
  return response.json() as Promise<UsuarioBackend[]>;
}

export async function crearUsuario(datos: DatosNuevoUsuario): Promise<UsuarioBackend> {
  const response = await authFetch('/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo crear el usuario.'));
  }
  return response.json() as Promise<UsuarioBackend>;
}

export async function actualizarUsuario(
  id: number,
  datos: DatosActualizarUsuario,
): Promise<UsuarioBackend> {
  const response = await authFetch(`/usuarios/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo actualizar el usuario.'));
  }
  return response.json() as Promise<UsuarioBackend>;
}

// =========================================================
// MÉDICOS (solo lectura; se crean desde Gestión de Usuarios)
// =========================================================

export async function listarMedicos(): Promise<MedicoBackend[]> {
  const response = await authFetch('/medicos');
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudieron cargar los médicos.'));
  }
  return response.json() as Promise<MedicoBackend[]>;
}

// =========================================================
// CONSULTORIOS (solo lectura; son las sedes del policlínico)
// =========================================================

export interface ConsultorioBackend {
  id: number;
  nombre: string;
  ubicacion: string | null;
}

export async function listarConsultorios(): Promise<ConsultorioBackend[]> {
  const response = await authFetch('/consultorios');
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudieron cargar las sedes.'));
  }
  return response.json() as Promise<ConsultorioBackend[]>;
}

// =========================================================
// PROGRAMACIÓN MÉDICA
// =========================================================

export interface ProgramacionMedicaBackend {
  id: number;
  medico: MedicoBackend;
  consultorio: ConsultorioBackend;
  fecha: string;
  turno: 'mañana' | 'tarde';
  horaInicio: string;
  horaFin: string;
}

export interface DatosProgramacionMedica {
  medicoId: number;
  consultorioId: number;
  fecha: string;
  turno: 'mañana' | 'tarde';
  horaInicio: string;
  horaFin: string;
}

export async function listarProgramacionMedica(fecha?: string): Promise<ProgramacionMedicaBackend[]> {
  const query = fecha ? `?fecha=${encodeURIComponent(fecha)}` : '';
  const response = await authFetch(`/programacion-medica${query}`);
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo cargar la programación médica.'));
  }
  return response.json() as Promise<ProgramacionMedicaBackend[]>;
}

export async function crearProgramacionMedica(
  datos: DatosProgramacionMedica,
): Promise<ProgramacionMedicaBackend> {
  const response = await authFetch('/programacion-medica', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo guardar la programación.'));
  }
  return response.json() as Promise<ProgramacionMedicaBackend>;
}

export async function eliminarProgramacionMedica(id: number): Promise<void> {
  const response = await authFetch(`/programacion-medica/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(await mensajeDeError(response, 'No se pudo eliminar la programación.'));
  }
}

const TOKEN_KEY = 'chrisal_token';
const USUARIO_KEY = 'chrisal_usuario';

/**
 * Guarda la sesión. Con "recordar" en localStorage (persiste al cerrar el navegador);
 * si no, en sessionStorage (se borra al cerrar la pestaña).
 */
export function guardarSesion(
  token: string,
  usuario: UsuarioSesion,
  recordar: boolean,
): void {
  try {
    const storage = recordar ? window.localStorage : window.sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(USUARIO_KEY, JSON.stringify(usuario));
  } catch {
    // Almacenamiento no disponible (modo privado, cookies bloqueadas, etc.)
  }
}

export function obtenerToken(): string | null {
  try {
    return (
      window.localStorage.getItem(TOKEN_KEY) ??
      window.sessionStorage.getItem(TOKEN_KEY)
    );
  } catch {
    return null;
  }
}

export function obtenerUsuario(): UsuarioSesion | null {
  try {
    const crudo =
      window.localStorage.getItem(USUARIO_KEY) ??
      window.sessionStorage.getItem(USUARIO_KEY);
    return crudo ? (JSON.parse(crudo) as UsuarioSesion) : null;
  } catch {
    return null;
  }
}

export function cerrarSesion(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USUARIO_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USUARIO_KEY);
  } catch {
    // Almacenamiento no disponible; no hay sesión que limpiar.
  }
}
