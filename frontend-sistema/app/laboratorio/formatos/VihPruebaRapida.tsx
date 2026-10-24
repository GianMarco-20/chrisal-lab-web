'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosVih {
  hiv: string;
}

const COLUMNAS = 'sm:grid-cols-[1.5fr_2.5fr]';

function leer(valor: string): DatosVih {
  try {
    const dato = JSON.parse(valor);
    return {
      hiv: typeof dato?.hiv === 'string' ? dato.hiv : '',
    };
  } catch {
    return { hiv: '' };
  }
}

export default function VihPruebaRapida({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosVih>(() => leer(valor));

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
          ⚡ Método: Inmunocromatográfico (Flujo Lateral)
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
        </div>

        {/* HIV */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">HIV (Prueba Rápida)</span>
          <select
            value={datos.hiv}
            onChange={(e) => actualizar(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          >
            <option value="">-- Seleccionar --</option>
            <option value="NO REACTIVO">NO REACTIVO</option>
            <option value="REACTIVO">REACTIVO</option>
          </select>
        </div>
      </div>
    </div>
  );
}