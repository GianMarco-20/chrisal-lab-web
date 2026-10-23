import type { ExamenCatalogo, ExamenParametro, ResultadoOrden } from '../../../lib/api';
import { resultadoLegible } from './index';

/* =========================================================
   DATOS PARA IMPRIMIR EL INFORME DE RESULTADOS

   Por cada examen se imprime una tabla
   EXAMEN | RESULTADOS | UNIDAD | VALORES DE REFERENCIA.

   Los campos de cada examen, su unidad y sus rangos vienen de la base de datos
   (tabla examen_parametros, ver database/NewDatabase) dentro del detalle de la
   orden, y los valores registrados de resultado_valores. Para agregar o cambiar
   un campo o un rango se edita esa tabla; aquí no hay nada que tocar.

   Un examen sin campos definidos se imprime con su resultado tal cual, sin
   unidad ni referencia.
========================================================= */

export interface FilaImpresion {
  nombre: string;
  resultado: string;
  unidad: string;
  referencia: string[];
}

export interface ExamenImpresion {
  titulo: string;
  muestra: string;
  /** Un solo valor con el mismo nombre del examen: se imprime sin título aparte. */
  simple: boolean;
  filas: FilaImpresion[];
}

function normalizar(nombre: string) {
  return nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

const ETIQUETA_SEXO = { F: 'Mujeres', M: 'Hombres' } as const;

/** Una línea de referencia: "Mujeres: 2.4 – 5.7", "Hasta 1.20", "Niños (0–12 años): …". */
function lineaReferencia(p: ExamenParametro): string | null {
  const texto =
    p.refTexto ??
    (p.refMin !== null && p.refMax !== null
      ? `${p.refMin} – ${p.refMax}`
      : p.refMax !== null
        ? `Hasta ${p.refMax}`
        : p.refMin !== null
          ? `Desde ${p.refMin}`
          : null);
  if (!texto) return null;

  const edad =
    p.edadMin !== null || p.edadMax !== null ? ` (${p.edadMin ?? 0}–${p.edadMax ?? '+'} años)` : '';
  const prefijo = p.sexo ? `${ETIQUETA_SEXO[p.sexo]}${edad}: ` : edad ? `${edad.trim()} ` : '';
  return `${prefijo}${texto}`;
}

/** Valor registrado de un campo: de resultado_valores o, si no está, del JSON guardado. */
function valorDe(clave: string, resultado?: ResultadoOrden): string {
  const guardado = resultado?.valores?.find((v) => v.clave === clave)?.valorTexto;
  if (guardado) return guardado;

  try {
    const dato: unknown = JSON.parse(resultado?.resultadoTexto ?? '');
    const valor = dato && typeof dato === 'object' ? (dato as Record<string, unknown>)[clave] : undefined;
    if (typeof valor === 'string' && valor.trim() !== '') return valor;
  } catch {
    // texto libre: no hay campos que leer
  }
  return '—';
}

/** Arma lo que se imprime para un examen con resultado. */
export function prepararExamen(
  examen: Pick<ExamenCatalogo, 'nombre' | 'parametros'>,
  resultado: ResultadoOrden | undefined,
  muestra?: string | null,
): ExamenImpresion {
  const parametros = [...(examen.parametros ?? [])].sort((a, b) => a.orden - b.orden);

  // Un campo con rango distinto por sexo o edad aparece en varias filas.
  const porClave = new Map<string, ExamenParametro[]>();
  for (const p of parametros) {
    porClave.set(p.clave, [...(porClave.get(p.clave) ?? []), p]);
  }

  const filas: FilaImpresion[] =
    porClave.size > 0
      ? [...porClave.entries()].map(([clave, variantes]) => ({
          nombre: variantes[0].nombre,
          resultado: valorDe(clave, resultado),
          unidad: variantes[0].unidad ?? '',
          referencia: variantes.map(lineaReferencia).filter((l): l is string => l !== null),
        }))
      : [
          {
            nombre: examen.nombre,
            resultado: resultado ? resultadoLegible(resultado.resultadoTexto) : '—',
            unidad: '',
            referencia: [],
          },
        ];

  const simple = filas.length === 1 && normalizar(filas[0].nombre) === normalizar(examen.nombre);
  return { titulo: examen.nombre, muestra: muestra?.trim() ?? '', simple, filas };
}
