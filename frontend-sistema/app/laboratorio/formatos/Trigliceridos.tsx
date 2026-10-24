'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosTrigliceridos {
  trigliceridos: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosTrigliceridos {
  try {
    const dato = JSON.parse(valor);
    return {
      trigliceridos: typeof dato?.trigliceridos === 'string' ? dato.trigliceridos : '',
    };
  } catch {
    return { trigliceridos: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function Trigliceridos({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosTrigliceridos>(() => leer(valor));

  const actualizar = (texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { trigliceridos: limpio };
    setDatos(nuevos);

    if (aNumero(nuevos.trigliceridos) !== null) {
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
          ⚡ Método: Punto Final
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: Semi automatizado BIOELAB ES-102
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* TRIGLICÉRIDOS */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Triglicéridos</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.trigliceridos}
            onChange={(e) => actualizar(e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/dL</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span>
            <span>70 – 150 mg/dL</span>
          </div>
        </div>
      </div>
    </div>
  );
}