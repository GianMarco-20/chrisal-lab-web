'use client';

import { useEffect, useState } from 'react';
import { listarServicios } from './api';

/**
 * Especialidades que se pueden asignar a un médico: los servicios de tipo
 * "consultorio" de la tabla servicios. Mientras carga, la lista está vacía.
 */
export function useEspecialidades(): string[] {
  const [especialidades, setEspecialidades] = useState<string[]>([]);

  useEffect(() => {
    let cancelado = false;
    listarServicios('consultorio')
      .then((servicios) => {
        if (!cancelado) setEspecialidades(servicios.map((s) => s.nombre));
      })
      .catch(() => {
        // sin lista, el desplegable queda vacío; el formulario no deja guardar sin elegir
      });
    return () => {
      cancelado = true;
    };
  }, []);

  return especialidades;
}
