'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosVsg {
  vsg: string;
  observaciones: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosVsg {
  try {
    const dato = JSON.parse(valor);
    return {
      vsg: typeof dato?.vsg === 'string' ? dato.vsg : '',
      observaciones: typeof dato?.observaciones === 'string' ? dato.observaciones : '',
    };
  } catch {
    return { vsg: '', observaciones: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function Vsg({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosVsg>(() => leer(valor));

  const actualizar = (campo: keyof DatosVsg, texto: string) => {
    const limpio = campo === 'vsg' ? texto.replace(/[^0-9.,]/g, '') : texto;
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    if (aNumero(nuevos.vsg) !== null || nuevos.observaciones.trim() !== '') {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre total
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Área: Hematología
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* VSG */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">
            VSG – 1.ª hora (Westergren)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.vsg}
            onChange={(e) => actualizar('vsg', e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mm/h</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2 text-[11px] font-semibold text-slate-700">
            <div className="flex justify-between">
              <span>Hombres:</span>
              <span>0 – 15 mm/h</span>
            </div>
            <div className="flex justify-between">
              <span>Mujeres:</span>
              <span>0 – 20 mm/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* OBSERVACIONES */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Observaciones
        </label>
        <textarea
          rows={2}
          value={datos.observaciones}
          onChange={(e) => actualizar('observaciones', e.target.value)}
          placeholder="Sin observaciones..."
          className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-[#0d7a71]"
        />
      </div>
    </div>
  );
}