'use client';

import { createElement, type ComponentType } from 'react';
import AcidoUrico from './AcidoUrico';
import AcidosBiliares from './AcidosBiliares';
import Aglutinaciones from './Aglutinaciones';
import AmilasaLipasaFem from './AmilasaLipasaFem';
import AmilasaLipasaMasc from './AmilasaLipasaMasc';
import AntiCcp from './AntiCcp';
import BilirrubinasTotales from './BilirrubinasTotales';
import BiopsiaQuirurgica from './BiopsiaQuirurgica';
import Bk from './Bk';
import CalcioSerico from './CalcioSerico';
import Colesterol from './Colesterol';
import ColesterolLdl from './ColesterolLdl';
import ColesterolYTrigliceridosFem from './ColesterolYTrigliceridosFem';
import ColesterolYTrigliceridosMasc from './ColesterolYTrigliceridosMasc';
import Coprocultivo from './Coprocultivo';
import Coprologico from './Coprologico';
import CoprologicoMasc from './CoprologicoMasc';
import Cortisol from './Cortisol';
import Creatinina from './Creatinina';
import CultivoSecrecionFaringea from './CultivoSecrecionFaringea';

/* =========================================================
   FORMATO DE RESULTADO POR EXAMEN

   Cada examen tiene su propio formato (un componente de esta carpeta) para
   registrar el resultado. Solo los exámenes que ya tienen formato permiten
   registrar resultado; los demás muestran "Formato en preparación".

   Para conectar un formato nuevo: crear el componente en esta carpeta y
   registrarlo en FORMATOS con el nombre del examen tal como está en el
   catálogo (no importan mayúsculas ni tildes). Si el formato cambia según el
   sexo del paciente, registrarlo en FORMATOS_POR_SEXO.

   Los formatos guardan lo digitado como texto: la mayoría en JSON (ver
   resultadoLegible para mostrarlo) y Biopsia Quirúrgica como texto libre.
========================================================= */

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

type Sexo = 'M' | 'F' | null | undefined;
type Formato = ComponentType<FormatoProps>;

function normalizar(nombre: string) {
  return nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// Un formato único para el examen.
const FORMATOS: Record<string, Formato> = {
  [normalizar('Biopsia Quirúrgica (con pieza operatoria)')]: BiopsiaQuirurgica,
  [normalizar('Ácido Úrico')]: AcidoUrico,
  [normalizar('Ácidos Biliares')]: AcidosBiliares,
  [normalizar('Anti-CCP')]: AntiCcp,
  [normalizar('Calcio Sérico')]: CalcioSerico,
  [normalizar('Bilirrubinas')]: BilirrubinasTotales,
  [normalizar('Colesterol Total')]: Colesterol,
  [normalizar('Colesterol LDL')]: ColesterolLdl,
  [normalizar('Creatinina')]: Creatinina,
  [normalizar('Cortisol A.M.')]: Cortisol,
  [normalizar('Cortisol P.M.')]: Cortisol,
  [normalizar('Aglutinaciones')]: Aglutinaciones,
  [normalizar('Coprocultivo')]: Coprocultivo,
  [normalizar('BK Directo')]: Bk,
  [normalizar('Secreción Faríngea')]: CultivoSecrecionFaringea,
};

// Exámenes con un formato distinto para cada sexo. Si el sexo del paciente
// no se conoce, se usa el femenino.
const FORMATOS_POR_SEXO: Record<string, { M: Formato; F: Formato }> = {
  [normalizar('Coprológico Funcional')]: { M: CoprologicoMasc, F: Coprologico },
  [normalizar('Amilasa y Lipasa')]: { M: AmilasaLipasaMasc, F: AmilasaLipasaFem },
  [normalizar('Colesterol y Triglicéridos')]: {
    M: ColesterolYTrigliceridosMasc,
    F: ColesterolYTrigliceridosFem,
  },
};

function buscarFormato(nombreExamen: string, sexo?: Sexo): Formato | null {
  const clave = normalizar(nombreExamen);
  const porSexo = FORMATOS_POR_SEXO[clave];
  if (porSexo) return sexo === 'M' ? porSexo.M : porSexo.F;
  return FORMATOS[clave] ?? null;
}

/** ¿Este examen ya tiene un formato para registrar su resultado? */
export function tieneFormato(nombreExamen: string): boolean {
  const clave = normalizar(nombreExamen);
  return clave in FORMATOS || clave in FORMATOS_POR_SEXO;
}

export function FormatoResultado({
  nombreExamen,
  valor,
  onChange,
  paciente,
}: FormatoProps & { nombreExamen: string }) {
  const Formato = buscarFormato(nombreExamen, paciente?.sexo);
  if (!Formato) return null;
  // createElement (y no <Formato />): el formato se elige según el examen y el
  // sexo, no se define dentro de este componente.
  return createElement(Formato, { valor, onChange, paciente });
}

/* =========================================================
   MOSTRAR UN RESULTADO GUARDADO
   Los formatos guardan JSON; en la lista de exámenes se muestra como líneas
   "Campo: valor". El texto libre se muestra tal cual.
========================================================= */

function etiqueta(clave: string) {
  const texto = clave.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/_/g, ' ').toLowerCase();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function aLineas(dato: unknown, prefijo = ''): string[] {
  if (dato === null || dato === undefined || dato === '') return [];
  if (typeof dato !== 'object') return [prefijo ? `${prefijo}: ${String(dato)}` : String(dato)];
  if (Array.isArray(dato)) return dato.flatMap((item) => aLineas(item, prefijo));
  return Object.entries(dato as Record<string, unknown>).flatMap(([clave, valor]) =>
    typeof valor === 'object' && valor !== null
      ? aLineas(valor, prefijo ? `${prefijo} · ${etiqueta(clave)}` : etiqueta(clave))
      : aLineas(valor, prefijo ? `${prefijo} · ${etiqueta(clave)}` : etiqueta(clave)),
  );
}

export function resultadoLegible(texto: string): string {
  const limpio = texto.trim();
  if (!limpio.startsWith('{') && !limpio.startsWith('[')) return texto;
  try {
    const dato: unknown = JSON.parse(limpio);
    // Un solo valor suelto (p. ej. {"acidoUrico":"3.6"}) se muestra sin etiqueta.
    if (dato && typeof dato === 'object' && !Array.isArray(dato)) {
      const valores = Object.values(dato as Record<string, unknown>);
      if (valores.length === 1 && typeof valores[0] !== 'object') return String(valores[0]);
    }
    const lineas = aLineas(dato);
    return lineas.length ? lineas.join('\n') : texto;
  } catch {
    return texto;
  }
}
