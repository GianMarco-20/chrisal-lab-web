'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerToken, obtenerUsuario, cerrarSesion, UsuarioSesion } from './api';

interface EstadoSesion {
  usuario: UsuarioSesion | null;
  cargando: boolean;
  cerrar: () => void;
}

/** Pantallas por rol (columna roles.nombre). El administrador entra a todas. */
export const RUTAS_POR_ROL: Record<string, string[]> = {
  '/citas': ['recepcion', 'medico'],
  '/laboratorio': ['recepcion', 'laboratorio'],
  '/programacion-medica': ['recepcion'],
};

/** Primera pantalla a la que puede entrar el usuario (destino tras login o redirección). */
export function rutaInicial(usuario: UsuarioSesion | null): string {
  if (!usuario) return '/login';
  if (usuario.esAdmin) return '/citas';
  return Object.keys(RUTAS_POR_ROL).find((ruta) => puedeVerRuta(usuario, ruta)) ?? '/login';
}

export function puedeVerRuta(usuario: UsuarioSesion | null, href: string): boolean {
  if (!usuario) return false;
  if (usuario.esAdmin) return true;
  return RUTAS_POR_ROL[href]?.includes(usuario.rol) ?? false;
}

/**
 * Exige sesión iniciada en una página protegida (/citas, /programacion-medica, ...).
 * Sin token, redirige a /login; con sesión pero sin permiso para la ruta
 * (según RUTAS_POR_ROL), vuelve a su pantalla inicial. localStorage solo existe en el navegador, así
 * que la lectura va en un efecto (sincroniza con algo externo al montar, no
 * deriva estado de un render).
 */
export function useRequireSesion(ruta?: string): EstadoSesion {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!obtenerToken()) {
      router.replace('/login');
      return;
    }
    const sesion = obtenerUsuario();
    if (ruta && !puedeVerRuta(sesion, ruta)) {
      router.replace(rutaInicial(sesion));
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura única de localStorage al montar, no deriva de render
    setUsuario(sesion);
    setCargando(false);
  }, [router, ruta]);

  const cerrar = () => {
    cerrarSesion();
    router.push('/login');
  };

  return { usuario, cargando, cerrar };
}
