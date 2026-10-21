'use client';

import type { ComponentType } from 'react';
import BiopsiaQuirurgica from './BiopsiaQuirurgica';
import Higado from './Higado';

/* =========================================================
   FORMATO DE RESULTADO POR EXAMEN

   Cada examen puede tener su propio formato (componente) para registrar
   el resultado. Los que no tienen uno propio usan el formato genérico.
   Para agregar un formato nuevo: crear el componente en esta carpeta y
   registrarlo en FORMATOS con el nombre del examen tal como está en el
   catálogo (sin importar mayúsculas ni tildes).
========================================================= */

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
}

function normalizar(nombre: string) {
  return nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

const FORMATOS: Record<string, ComponentType<FormatoProps>> = {
  [normalizar('Biopsia Quirúrgica (con pieza operatoria)')]: BiopsiaQuirurgica,
  [normalizar('Hígado')]: Higado,
};

export function FormatoResultado({
  nombreExamen,
  valor,
  onChange,
}: FormatoProps & { nombreExamen: string }) {
  const Formato = FORMATOS[normalizar(nombreExamen)];
  if (Formato) {
    return <Formato valor={valor} onChange={onChange} />;
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-bold text-gray-800">{nombreExamen}</p>
        <p className="text-[11px] text-gray-400 mt-1">Registro del resultado del examen</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Resultado</label>
        <textarea
          rows={6}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ingrese el resultado del examen..."
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0d7a71] resize-none"
        />
      </div>
    </div>
  );
}
