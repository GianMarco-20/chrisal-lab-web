'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosOhProgesterona17 {
  ohProgesterona17: string;
  observaciones: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosOhProgesterona17 {
  try {
    const dato = JSON.parse(valor);
    return {
      ohProgesterona17: typeof dato?.ohProgesterona17 === 'string' ? dato.ohProgesterona17 : '',
      observaciones: typeof dato?.observaciones === 'string' ? dato.observaciones : '',
    };
  } catch {
    return { ohProgesterona17: '', observaciones: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function OhProgesterona17({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosOhProgesterona17>(() => leer(valor));

  const actualizar = (campo: keyof DatosOhProgesterona17, texto: string) => {
    const limpio = campo === 'ohProgesterona17' ? texto.replace(/[^0-9.,]/g, '') : texto;
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    if (aNumero(nuevos.ohProgesterona17) !== null || nuevos.observaciones.trim() !== '') {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Suero
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          ⚗️ Área: Endocrinología
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* 17-OH PROGESTERONA */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">
            17-OH Progesterona
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.ohProgesterona17}
            onChange={(e) => actualizar('ohProgesterona17', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">ng/mL</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2 text-[11px] font-semibold text-slate-700">
            <div className="flex justify-between">
              <span>Hombres adultos:</span>
              <span>0.5 – 2.1 ng/mL</span>
            </div>
            <div className="flex justify-between">
              <span>Mujeres, fase folicular:</span>
              <span>0.2 – 1.0 ng/mL</span>
            </div>
            <div className="flex justify-between">
              <span>Mujeres, fase lútea:</span>
              <span>0.5 – 2.8 ng/mL</span>
            </div>
            <div className="flex justify-between">
              <span>Posmenopausia:</span>
              <span>&lt; 0.5 ng/mL</span>
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