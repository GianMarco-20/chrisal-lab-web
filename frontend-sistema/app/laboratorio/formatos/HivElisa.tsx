'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosHiv {
  hiv: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosHiv {
  try {
    const dato = JSON.parse(valor);
    return {
      hiv: typeof dato?.hiv === 'string' ? dato.hiv : '',
    };
  } catch {
    return { hiv: '' };
  }
}

export default function HivElisa({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosHiv>(() => leer(valor));

  const actualizar = (texto: string) => {
    const nuevos = { hiv: texto };
    setDatos(nuevos);

    if (nuevos.hiv.trim() !== '') {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre (Suero)
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          ⚡ Método: ELISA
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: DIATEK DR-200Bc
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* ANTI-HIV 1-2 */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800 pt-2">Anti-HIV 1-2</span>
          <input
            type="text"
            value={datos.hiv}
            onChange={(e) => actualizar(e.target.value)}
            placeholder="< 4"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500 pt-2">DU</span>
          <div className="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-700">
            <div className="flex justify-between"><span>No reactivo:</span> <span>&lt; 9</span></div>
            <div className="flex justify-between"><span>Indeterminado:</span> <span>9 – 11</span></div>
            <div className="flex justify-between"><span>Reactivo:</span> <span>&gt; 11</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}