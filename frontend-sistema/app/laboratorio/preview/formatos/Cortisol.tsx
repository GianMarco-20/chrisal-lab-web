'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): string {
  try {
    const dato = JSON.parse(valor);
    return typeof dato?.cortisol === 'string' ? dato.cortisol : '';
  } catch {
    return '';
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function Cortisol({ valor, onChange }: FormatoProps) {
  const [resultado, setResultado] = useState(() => leer(valor));

  const cambiar = (texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    setResultado(limpio);
    onChange(aNumero(limpio) !== null ? JSON.stringify({ cortisol: limpio }) : '');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre (Suero)
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          ⚡ Método: Cinético
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: BIOELAB ES-102
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div
          className={`hidden gap-4 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}
        >
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-4 sm:gap-4 ${COLUMNAS}`}>
          <div>
            <span className="block text-sm font-semibold text-slate-800">
              Cortisol
            </span>
            <span className="text-xs text-slate-400 sm:hidden">Parámetro</span>
          </div>

          <div>
            <input
              type="text"
              inputMode="decimal"
              value={resultado}
              onChange={(e) => cambiar(e.target.value)}
              placeholder="0.0"
              aria-label="Resultado de Cortisol"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
            />
          </div>

          <div className="text-sm font-medium text-slate-500">
            μg/dL
          </div>

          <div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
              <span>RANGO NORMAL:</span>
              <span>5.0 – 25.0 μg/dL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}