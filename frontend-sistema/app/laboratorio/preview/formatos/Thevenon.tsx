'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosThevenon {
  muestra1: string;
}

const COLUMNAS = 'sm:grid-cols-[1.5fr_2.5fr]';

function leer(valor: string): DatosThevenon {
  try {
    const dato = JSON.parse(valor);
    return {
      muestra1: typeof dato?.muestra1 === 'string' ? dato.muestra1 : '',
    };
  } catch {
    return { muestra1: '' };
  }
}

export default function Thevenon({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosThevenon>(() => leer(valor));

  const actualizar = (texto: string) => {
    const nuevos = { muestra1: texto };
    setDatos(nuevos);

    if (nuevos.muestra1.trim() !== '') {
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
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
        </div>

        {/* 1° MUESTRA */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">1° Muestra</span>
          <select
            value={datos.muestra1}
            onChange={(e) => actualizar(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          >
            <option value="">-- Seleccionar --</option>
            <option value="NEGATIVO">NEGATIVO</option>
            <option value="POSITIVO">POSITIVO</option>
          </select>
        </div>
      </div>
    </div>
  );
}