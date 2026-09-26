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
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (response.status === 401) {
    cerrarSesion();
  }
  return response;
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
