'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosHpSangre {
  igm: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosHpSangre {
  try {
    const dato = JSON.parse(valor);
    return {
      igm: typeof dato?.igm === 'string' ? dato.igm : '',
    };
  } catch {
    return { igm: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function HelicobacterPyloriSangre({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosHpSangre>(() => leer(valor));

  const actualizar = (texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { igm: limpio };
    setDatos(nuevos);

    if (aNumero(nuevos.igm) !== null) {
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
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* ANTI-HELICOBACTER PYLORI IGM */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800 pt-2">Anti – Helicobacter Pylori IgM</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.igm}
            onChange={(e) => actualizar(e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500 pt-2">U/mL</span>
          <div className="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-700">
            <div className="flex justify-between"><span>Negativo:</span> <span>&lt; 8.0</span></div>
            <div className="flex justify-between"><span>Indeterminado:</span> <span>8.0 – 12.0</span></div>
            <div className="flex justify-between"><span>Positivo:</span> <span>&gt; 12.0</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}