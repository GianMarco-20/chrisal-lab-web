'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerToken, obtenerUsuario, cerrarSesion, UsuarioSesion } from './api';

interface EstadoSesion {
  usuario: UsuarioSesion | null;
  cargando: boolean;
  cerrar: () => void;
}

/**
 * Exige sesión iniciada en una página protegida (/citas, /programacion-medica, ...).
 * Sin token, redirige a /login. localStorage solo existe en el navegador, así
 * que la lectura va en un efecto (sincroniza con algo externo al montar, no
 * deriva estado de un render).
 */
export function useRequireSesion(): EstadoSesion {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!obtenerToken()) {
      router.replace('/login');
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura única de localStorage al montar, no deriva de render
    setUsuario(obtenerUsuario());
    setCargando(false);
  }, [router]);

  const cerrar = () => {
    cerrarSesion();
    router.push('/login');
  };

  return { usuario, cargando, cerrar };
}
