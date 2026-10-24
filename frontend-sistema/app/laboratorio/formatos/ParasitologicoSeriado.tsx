'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosParasitologicoSeriado {
  muestra1: string;
  muestra2: string;
  muestra3: string;
}

const COLUMNAS = 'sm:grid-cols-[1.5fr_2.5fr]';

function leer(valor: string): DatosParasitologicoSeriado {
  try {
    const dato = JSON.parse(valor);
    return {
      muestra1: typeof dato?.muestra1 === 'string' ? dato.muestra1 : '',
      muestra2: typeof dato?.muestra2 === 'string' ? dato.muestra2 : '',
      muestra3: typeof dato?.muestra3 === 'string' ? dato.muestra3 : '',
    };
  } catch {
    return { muestra1: '', muestra2: '', muestra3: '' };
  }
}

export default function ParasitologicoSeriado({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosParasitologicoSeriado>(() => leer(valor));

  const actualizar = (campo: keyof DatosParasitologicoSeriado, texto: string) => {
    const nuevos = { ...datos, [campo]: texto };
    setDatos(nuevos);

    if (Object.values(nuevos).some((v) => v.trim() !== '')) {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          💩 Muestra: Heces
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧪 Coloración: Lugol
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
        </div>

        {/* 1° MUESTRA */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">1° Muestra</span>
          <input
            type="text"
            value={datos.muestra1}
            onChange={(e) => actualizar('muestra1', e.target.value)}
            placeholder="NEGATIVO"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
        </div>

        {/* 2° MUESTRA */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">2° Muestra</span>
          <input
            type="text"
            value={datos.muestra2}
            onChange={(e) => actualizar('muestra2', e.target.value)}
            placeholder="NEGATIVO"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
        </div>

        {/* 3° MUESTRA */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">3° Muestra</span>
          <input
            type="text"
            value={datos.muestra3}
            onChange={(e) => actualizar('muestra3', e.target.value)}
            placeholder="NEGATIVO"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
        </div>
      </div>
    </div>
  );
}