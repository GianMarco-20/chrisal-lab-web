/* =========================================================
   VALIDACIÓN Y ALERTAS DE TRIAJE (según la edad del paciente)

   Dos niveles distintos:
   - ERRORES (validarTriaje): valores imposibles (cero, negativos, fuera de lo
     que una persona de esa edad puede tener). Bloquean el guardado: casi
     seguro es un error de digitación.
   - ALERTAS (alertasTriaje): valores posibles pero fuera de lo normal para su
     edad. No bloquean; avisan a recepción para que el paciente espere / se
     avise al médico.

   Los rangos por edad son de REFERENCIA GENERAL (valores habituales de
   pediatría y adultos) y deben ser revisados por un médico de la clínica.
   Sin edad registrada (pacientes antiguos) se usan los rangos de adulto.
   Los límites duros del backend (triajes/limites-triaje.ts) deben coincidir
   con GRUPOS_EDAD de aquí.
========================================================= */

export interface ValoresTriaje {
  presionArterial: string;
  frecuenciaCardiaca: string;
  frecuenciaRespiratoria: string;
  temperatura: string;
  saturacion: string;
  peso: string;
  talla: string;
}

export type CampoTriaje = keyof ValoresTriaje;
export type ErroresTriaje = Partial<Record<CampoTriaje, string>>;

export type NivelAlerta = 'aviso' | 'critico';
export interface AlertaClinica {
  nivel: NivelAlerta;
  texto: string;
}

type Rango = readonly [number, number];

interface GrupoEdad {
  /** Edad máxima (años cumplidos, inclusive) del grupo. */
  hasta: number;
  nombre: string;
  /** Normales en reposo: [mínimo, máximo]. */
  fc: Rango; // lpm
  fr: Rango; // rpm
  sistolica: Rango; // mmHg
  diastolicaMax: number; // mmHg
  /** Límites duros (valor imposible fuera de esto). */
  peso: Rango; // kg
  talla: Rango; // cm
}

const GRUPOS_EDAD: readonly GrupoEdad[] = [
  { hasta: 0, nombre: 'lactante (menor de 1 año)', fc: [100, 160], fr: [30, 60], sistolica: [70, 100], diastolicaMax: 65, peso: [1, 15], talla: [30, 90] },
  { hasta: 2, nombre: 'niño de 1 a 2 años', fc: [90, 150], fr: [24, 40], sistolica: [80, 110], diastolicaMax: 70, peso: [5, 20], talla: [60, 110] },
  { hasta: 5, nombre: 'niño de 3 a 5 años', fc: [80, 140], fr: [22, 34], sistolica: [80, 110], diastolicaMax: 75, peso: [8, 40], talla: [75, 140] },
  { hasta: 11, nombre: 'niño de 6 a 11 años', fc: [70, 120], fr: [18, 30], sistolica: [90, 120], diastolicaMax: 80, peso: [14, 100], talla: [100, 190] },
  { hasta: 17, nombre: 'adolescente (12 a 17 años)', fc: [60, 100], fr: [12, 20], sistolica: [90, 130], diastolicaMax: 85, peso: [25, 180], talla: [120, 215] },
  { hasta: 120, nombre: 'adulto', fc: [60, 100], fr: [12, 20], sistolica: [90, 140], diastolicaMax: 90, peso: [30, 300], talla: [120, 230] },
];

const GRUPO_ADULTO = GRUPOS_EDAD[GRUPOS_EDAD.length - 1];

export function grupoPorEdad(edad?: number | null): GrupoEdad {
  if (edad === null || edad === undefined || Number.isNaN(edad)) return GRUPO_ADULTO;
  return GRUPOS_EDAD.find((g) => edad <= g.hasta) ?? GRUPO_ADULTO;
}

/** Texto para mostrar al lado del formulario: con qué rangos se evalúa. */
export function descripcionRangos(edad?: number | null): string {
  if (edad === null || edad === undefined) {
    return 'Sin edad registrada: se usan los rangos de adulto.';
  }
  const g = grupoPorEdad(edad);
  return `Paciente de ${edad} ${edad === 1 ? 'año' : 'años'} (${g.nombre}): FC normal ${g.fc[0]}–${g.fc[1]} lpm, FR ${g.fr[0]}–${g.fr[1]} rpm.`;
}

interface Limite {
  min: number;
  max: number;
  unidad: string;
  etiqueta: string;
}

/** Límites duros: fuera de esto el valor es imposible. Peso y talla dependen de la edad. */
export function limitesDuros(
  edad?: number | null,
): Record<Exclude<CampoTriaje, 'presionArterial'>, Limite> {
  const g = grupoPorEdad(edad);
  // Sin edad registrada no se puede saber qué peso/talla es imposible: se usan
  // límites amplios que valen para cualquier edad (el backend hace lo mismo).
  const sinEdad = edad === null || edad === undefined || Number.isNaN(edad);
  const peso: Rango = sinEdad ? [0.5, 400] : g.peso;
  const talla: Rango = sinEdad ? [30, 250] : g.talla;
  return {
    temperatura: { min: 30, max: 45, unidad: '°C', etiqueta: 'La temperatura' },
    frecuenciaCardiaca: { min: 30, max: 250, unidad: 'lpm', etiqueta: 'La frecuencia cardiaca' },
    frecuenciaRespiratoria: { min: 5, max: 80, unidad: 'rpm', etiqueta: 'La frecuencia respiratoria' },
    saturacion: { min: 50, max: 100, unidad: '%', etiqueta: 'La saturación de O₂' },
    peso: { min: peso[0], max: peso[1], unidad: 'kg', etiqueta: 'El peso' },
    talla: { min: talla[0], max: talla[1], unidad: 'cm', etiqueta: 'La talla' },
  };
}

export const LIMITES_PRESION = {
  sistolica: { min: 50, max: 300 },
  diastolica: { min: 20, max: 200 },
};

const PATRON_PRESION = /^\s*(\d{2,3})\s*\/\s*(\d{2,3})\s*$/;

function aNumero(texto: string): number {
  return Number(texto.trim().replace(',', '.'));
}

export function leerPresion(texto: string): { sistolica: number; diastolica: number } | null {
  const m = texto.match(PATRON_PRESION);
  return m ? { sistolica: Number(m[1]), diastolica: Number(m[2]) } : null;
}

/** Errores por campo. Un campo vacío no es error aquí (lo exige el formulario). */
export function validarTriaje(v: ValoresTriaje, edad?: number | null): ErroresTriaje {
  const errores: ErroresTriaje = {};
  const limites = limitesDuros(edad);
  const conEdad = edad !== null && edad !== undefined;

  (Object.keys(limites) as (keyof typeof limites)[]).forEach((campo) => {
    const texto = v[campo];
    if (texto.trim() === '') return;
    const { min, max, unidad, etiqueta } = limites[campo];
    const n = aNumero(texto);
    if (Number.isNaN(n)) {
      errores[campo] = 'Ingrese solo números.';
    } else if (n <= 0) {
      errores[campo] = `${etiqueta} debe ser mayor que 0.`;
    } else if (n < min || n > max) {
      const paraEdad = conEdad && (campo === 'peso' || campo === 'talla') ? ` para ${edad} ${edad === 1 ? 'año' : 'años'}` : '';
      errores[campo] = `Valor imposible${paraEdad}: debe estar entre ${min} y ${max} ${unidad}.`;
    }
  });

  if (v.presionArterial.trim() !== '') {
    const p = leerPresion(v.presionArterial);
    if (!p) {
      errores.presionArterial = 'Use el formato 120/80.';
    } else if (p.sistolica <= p.diastolica) {
      errores.presionArterial = 'La sistólica (primer número) debe ser mayor que la diastólica.';
    } else if (
      p.sistolica < LIMITES_PRESION.sistolica.min ||
      p.sistolica > LIMITES_PRESION.sistolica.max ||
      p.diastolica < LIMITES_PRESION.diastolica.min ||
      p.diastolica > LIMITES_PRESION.diastolica.max
    ) {
      errores.presionArterial = 'Valor imposible: revise la presión arterial.';
    }
  }

  return errores;
}

/**
 * Alertas por valores fuera de lo normal para la edad. Solo evalúa los campos
 * sin error (un valor imposible no tiene sentido clínico).
 * Aviso = fuera del rango normal; crítico = muy fuera (±25 % del límite).
 */
export function alertasTriaje(v: ValoresTriaje, edad?: number | null): AlertaClinica[] {
  const errores = validarTriaje(v, edad);
  const g = grupoPorEdad(edad);
  const alertas: AlertaClinica[] = [];
  const agregar = (nivel: NivelAlerta, texto: string) => alertas.push({ nivel, texto });
  const num = (campo: Exclude<CampoTriaje, 'presionArterial'>) =>
    v[campo].trim() === '' || errores[campo] ? null : aNumero(v[campo]);

  /** Alta/baja respecto de [min, max]; crítico si se pasa un 25 % del límite. */
  const evaluar = (valor: number, [min, max]: Rango, nombre: string, unidad: string, femenino = false) => {
    const alto = femenino ? 'alta' : 'alto';
    const bajo = femenino ? 'baja' : 'bajo';
    if (valor > max * 1.25) agregar('critico', `${nombre} muy ${alto}: ${valor} ${unidad}`);
    else if (valor > max) agregar('aviso', `${nombre} ${alto}: ${valor} ${unidad}`);
    else if (valor < min * 0.75) agregar('critico', `${nombre} muy ${bajo}: ${valor} ${unidad}`);
    else if (valor < min) agregar('aviso', `${nombre} ${bajo}: ${valor} ${unidad}`);
  };

  const temp = num('temperatura');
  if (temp !== null) {
    const lactante = edad !== null && edad !== undefined && edad < 1;
    if (temp >= 39.5) agregar('critico', `Fiebre muy alta: ${temp} °C`);
    else if (temp >= 38) {
      // En lactantes la fiebre siempre debe ver al médico sin demora.
      agregar(lactante ? 'critico' : 'aviso', lactante ? `Fiebre en lactante: ${temp} °C` : `Fiebre: ${temp} °C`);
    } else if (temp < 35) agregar('critico', `Temperatura muy baja (hipotermia): ${temp} °C`);
  }

  const fc = num('frecuenciaCardiaca');
  if (fc !== null) evaluar(fc, g.fc, 'Frecuencia cardiaca', 'lpm', true);

  const fr = num('frecuenciaRespiratoria');
  if (fr !== null) evaluar(fr, g.fr, 'Frecuencia respiratoria', 'rpm', true);

  const spo2 = num('saturacion');
  if (spo2 !== null) {
    if (spo2 < 90) agregar('critico', `Saturación de O₂ crítica: ${spo2} %`);
    else if (spo2 < 95) agregar('aviso', `Saturación de O₂ baja: ${spo2} %`);
  }

  if (!errores.presionArterial) {
    const p = leerPresion(v.presionArterial);
    if (p) {
      const texto = `${p.sistolica}/${p.diastolica} mmHg`;
      const [sMin, sMax] = g.sistolica;
      if (p.sistolica >= sMax * 1.3 || p.diastolica >= g.diastolicaMax * 1.35) {
        agregar('critico', `Presión arterial muy alta: ${texto}`);
      } else if (p.sistolica >= sMax || p.diastolica >= g.diastolicaMax) {
        agregar('aviso', `Presión arterial alta: ${texto}`);
      } else if (p.sistolica < sMin * 0.75) {
        agregar('critico', `Presión arterial muy baja: ${texto}`);
      } else if (p.sistolica < sMin || (g === GRUPO_ADULTO && p.diastolica < 60)) {
        agregar('aviso', `Presión arterial baja: ${texto}`);
      }
    }
  }

  return alertas;
}
