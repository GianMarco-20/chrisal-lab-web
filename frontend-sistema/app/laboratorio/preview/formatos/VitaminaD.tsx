'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosVitaminaD {
  vitaminaD: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosVitaminaD {
  try {
    const dato = JSON.parse(valor);
    return {
      vitaminaD: typeof dato?.vitaminaD === 'string' ? dato.vitaminaD : '',
    };
  } catch {
    return { vitaminaD: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function VitaminaD({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosVitaminaD>(() => leer(valor));

  const actualizar = (texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { vitaminaD: limpio };
    setDatos(nuevos);

    if (aNumero(nuevos.vitaminaD) !== null) {
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

        {/* VITAMINA D */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Vitamina D</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.vitaminaD}
            onChange={(e) => actualizar(e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">ng/mL</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2 text-[11px] font-semibold text-slate-700">
            <div className="flex justify-between"><span>Deficiencia:</span> <span>&lt; 20 ng/mL</span></div>
            <div className="flex justify-between"><span>Insuficiencia:</span> <span>20 – 29 ng/mL</span></div>
            <div className="flex justify-between"><span>Suficiencia:</span> <span>30 – 100 ng/mL</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}