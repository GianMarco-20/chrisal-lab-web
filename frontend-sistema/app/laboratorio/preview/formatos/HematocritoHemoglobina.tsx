'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosHtoHb {
  hematocrito: string;
  hemoglobina: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosHtoHb {
  try {
    const dato = JSON.parse(valor);
    return {
      hematocrito: typeof dato?.hematocrito === 'string' ? dato.hematocrito : '',
      hemoglobina: typeof dato?.hemoglobina === 'string' ? dato.hemoglobina : '',
    };
  } catch {
    return { hematocrito: '', hemoglobina: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function HematocritoHemoglobina({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosHtoHb>(() => leer(valor));

  const actualizar = (campo: keyof DatosHtoHb, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    if (
      aNumero(nuevos.hematocrito) !== null ||
      aNumero(nuevos.hemoglobina) !== null
    ) {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre Total
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* HEMATOCRITO */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Hematocrito (Hto)</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.hematocrito}
            onChange={(e) => actualizar('hematocrito', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">%</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
            <div className="flex justify-between"><span>Hombres:</span> <span>36.0 – 48.0 %</span></div>
            <div className="flex justify-between"><span>Mujeres:</span> <span>36.0 – 45.0 %</span></div>
          </div>
        </div>

        {/* HEMOGLOBINA */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Hemoglobina (Hb)</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.hemoglobina}
            onChange={(e) => actualizar('hemoglobina', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">g/dL</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
            <div className="flex justify-between"><span>Hombres:</span> <span>12.0 – 16.0 g/dL</span></div>
            <div className="flex justify-between"><span>Mujeres:</span> <span>12.0 – 15.0 g/dL</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}