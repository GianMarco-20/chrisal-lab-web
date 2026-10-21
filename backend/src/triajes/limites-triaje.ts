import { BadRequestException } from '@nestjs/common';

// Límites duros: fuera de esto el valor es imposible (error de digitación).
// Son los mismos de frontend-sistema/lib/triaje.ts; los umbrales de "alerta"
// (fiebre, presión alta...) solo viven en el frontend, no bloquean el guardado.
export const LIMITES_TRIAJE = {
  temperatura: { min: 30, max: 45 },
  frecuenciaCardiaca: { min: 30, max: 250 },
  frecuenciaRespiratoria: { min: 5, max: 80 },
  saturacionO2: { min: 50, max: 100 },
  peso: { min: 0.5, max: 400 },
  talla: { min: 30, max: 250 },
  sistolica: { min: 50, max: 300 },
  diastolica: { min: 20, max: 200 },
} as const;

export const PATRON_PRESION = /^(\d{2,3})\/(\d{2,3})$/;

/** "120/80": sistólica mayor que la diastólica y ambas en rango. */
export function validarPresionArterial(presion: string | undefined): void {
  if (presion === undefined || presion === '') return;
  const m = presion.match(PATRON_PRESION);
  if (!m) {
    throw new BadRequestException('La presión arterial debe tener el formato 120/80.');
  }
  const sistolica = Number(m[1]);
  const diastolica = Number(m[2]);
  const { sistolica: s, diastolica: d } = LIMITES_TRIAJE;
  if (sistolica <= diastolica) {
    throw new BadRequestException('En la presión arterial, la sistólica debe ser mayor que la diastólica.');
  }
  if (sistolica < s.min || sistolica > s.max || diastolica < d.min || diastolica > d.max) {
    throw new BadRequestException('La presión arterial tiene valores imposibles.');
  }
}

// Peso y talla posibles según la edad (años cumplidos). Misma tabla que
// GRUPOS_EDAD en frontend-sistema/lib/triaje.ts: mantenerlas iguales.
const PESO_TALLA_POR_EDAD = [
  { hasta: 0, peso: [1, 15], talla: [30, 90] },
  { hasta: 2, peso: [5, 20], talla: [60, 110] },
  { hasta: 5, peso: [8, 40], talla: [75, 140] },
  { hasta: 11, peso: [14, 100], talla: [100, 190] },
  { hasta: 17, peso: [25, 180], talla: [120, 215] },
  { hasta: 120, peso: [30, 300], talla: [120, 230] },
] as const;

/**
 * Peso y talla imposibles para la edad del paciente (p. ej. 20 kg en un
 * adulto o 190 cm en un lactante). Sin edad registrada no se valida esto.
 */
export function validarPesoTallaPorEdad(
  datos: { peso?: number | null; talla?: number | null },
  edad: number | null | undefined,
): void {
  if (edad === null || edad === undefined) return;
  const grupo = PESO_TALLA_POR_EDAD.find((g) => edad <= g.hasta) ?? PESO_TALLA_POR_EDAD[PESO_TALLA_POR_EDAD.length - 1];
  const paraEdad = `${edad} ${edad === 1 ? 'año' : 'años'}`;

  if (datos.peso != null && (datos.peso < grupo.peso[0] || datos.peso > grupo.peso[1])) {
    throw new BadRequestException(
      `Peso imposible para ${paraEdad}: debe estar entre ${grupo.peso[0]} y ${grupo.peso[1]} kg.`,
    );
  }
  if (datos.talla != null && (datos.talla < grupo.talla[0] || datos.talla > grupo.talla[1])) {
    throw new BadRequestException(
      `Talla imposible para ${paraEdad}: debe estar entre ${grupo.talla[0]} y ${grupo.talla[1]} cm.`,
    );
  }
}
