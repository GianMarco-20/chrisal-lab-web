'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosPerfil {
  colesterol: string;
  trigliceridos: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosPerfil {
  try {
    const dato = JSON.parse(valor);
    return {
      colesterol: typeof dato?.colesterol === 'string' ? dato.colesterol : '',
      trigliceridos: typeof dato?.trigliceridos === 'string' ? dato.trigliceridos : '',
    };
  } catch {
    return { colesterol: '', trigliceridos: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function ColesterolYTrigliceridosFem({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosPerfil>(() => leer(valor));

  const actualizar = (campo: keyof DatosPerfil, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    if (aNumero(nuevos.colesterol) !== null || aNumero(nuevos.trigliceridos) !== null) {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            🩸 Muestra: Sangre (Suero)
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            ⚡ Método: Punto Final
          </span>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
          <span>♀</span>
          <span>Valores Femeninos</span>
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* COLESTEROL */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Colesterol</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.colesterol}
            onChange={(e) => actualizar('colesterol', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/dL</span>
          <div className="flex justify-between rounded-lg border border-pink-200 bg-pink-50 px-2.5 py-1.5 text-xs font-bold text-pink-700">
            <span>♀ MUJERES:</span>
            <span>Menor a 200 mg/dL</span>
          </div>
        </div>

        {/* TRIGLICÉRIDOS */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Triglicéridos</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.trigliceridos}
            onChange={(e) => actualizar('trigliceridos', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/dL</span>
          <div className="flex justify-between rounded-lg border border-pink-200 bg-pink-50 px-2.5 py-1.5 text-xs font-bold text-pink-700">
            <span>♀ MUJERES:</span>
            <span>70 – 150 mg/dL</span>
          </div>
        </div>
      </div>
    </div>
  );
}