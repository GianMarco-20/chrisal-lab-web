'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosAsoLatex {
  cualitativo: string;
  semicuantitativo: string;
  observaciones: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

const OPCIONES_CUALITATIVO = ['', 'Negativo', 'Positivo'];

function leer(valor: string): DatosAsoLatex {
  try {
    const dato = JSON.parse(valor);
    return {
      cualitativo: typeof dato?.cualitativo === 'string' ? dato.cualitativo : '',
      semicuantitativo: typeof dato?.semicuantitativo === 'string' ? dato.semicuantitativo : '',
      observaciones: typeof dato?.observaciones === 'string' ? dato.observaciones : '',
    };
  } catch {
    return { cualitativo: '', semicuantitativo: '', observaciones: '' };
  }
}

export default function AsoLatex({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosAsoLatex>(() => leer(valor));

  const actualizar = (campo: keyof DatosAsoLatex, texto: string) => {
    const nuevos = { ...datos, [campo]: texto };
    setDatos(nuevos);

    if (
      nuevos.cualitativo.trim() !== '' ||
      nuevos.semicuantitativo.trim() !== '' ||
      nuevos.observaciones.trim() !== ''
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
          🩸 Muestra: Suero
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧬 Área: Inmunología
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* ASO (LÁTEX) CUALITATIVO */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">
            ASO (látex) cualitativo
          </span>
          <select
            value={datos.cualitativo}
            onChange={(e) => actualizar('cualitativo', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          >
            <option value="">Seleccionar...</option>
            {OPCIONES_CUALITATIVO.filter(Boolean).map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-slate-400">—</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>REFERENCIA:</span>
            <span>Negativo</span>
          </div>
        </div>

        {/* ASO SEMICUANTITATIVO */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">
            ASO semicuantitativo
          </span>
          <input
            type="text"
            value={datos.semicuantitativo}
            onChange={(e) => actualizar('semicuantitativo', e.target.value)}
            placeholder="Ej. < 200 / 400"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">UI/mL</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span>
            <span>&lt; 200 UI/mL</span>
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