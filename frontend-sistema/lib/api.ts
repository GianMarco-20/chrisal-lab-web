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

export type EstadoCitaBackend = 'programada' | 'atendida' | 'no_asistio';

export interface CitaBackend {
  id: number;
  cuenta: Cuenta;
  servicio: Servicio;
  fechaCita: string;
  horaInicio: string;
  horaFin: string;
  programacionId: number | null;
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
