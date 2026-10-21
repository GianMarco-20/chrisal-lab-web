'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

/** Valores de referencia del laboratorio (mg/dL) */
const REFERENCIA = {
  F: { etiqueta: 'MUJERES', min: 2.4, max: 5.7 },
  M: { etiqueta: 'VARONES', min: 3.4, max: 7.0 },
} as const;

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): string {
  try {
    const dato = JSON.parse(valor);
    return typeof dato?.acidoUrico === 'string' ? dato.acidoUrico : '';
  } catch {
    return '';
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function AcidoUrico({ valor, onChange }: FormatoProps) {
  const [resultado, setResultado] = useState(() => leer(valor));

  const cambiar = (texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    setResultado(limpio);
    // Guarda el valor ingresado en formato JSON
    onChange(aNumero(limpio) !== null ? JSON.stringify({ acidoUrico: limpio }) : '');
  };

  return (
    <div className="space-y-4">
      {/* Detalle de Muestra y Equipo */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: Mindray BS-120
        </span>
      </div>

      {/* Tabla de resultados */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Encabezado */}
        <div
          className={`hidden gap-4 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}
        >
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* Fila principal */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-4 sm:gap-4 ${COLUMNAS}`}>
          <div>
            <span className="block text-sm font-semibold text-slate-800">
              Ácido Úrico
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
              aria-label="Resultado de ácido úrico"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
            />
          </div>

          <div className="text-sm font-medium text-slate-500">
            mg/dL
          </div>

          {/* Muestra SIEMPRE Mujeres en Rosado y Varones en Celeste */}
          <div className="space-y-1.5 text-xs">
            {/* Referencia Femenina */}
            <div className="flex items-center justify-between rounded-lg border border-pink-200 bg-pink-50/80 px-2.5 py-1.5 font-bold text-pink-700">
              <span className="flex items-center gap-1">
                <span>♀</span>
                <span>{REFERENCIA.F.etiqueta}:</span>
              </span>
              <span>
                {REFERENCIA.F.min.toFixed(1)} – {REFERENCIA.F.max.toFixed(1)} mg/dL
              </span>
            </div>

            {/* Referencia Masculina */}
            <div className="flex items-center justify-between rounded-lg border border-sky-200 bg-sky-50/80 px-2.5 py-1.5 font-bold text-sky-700">
              <span className="flex items-center gap-1">
                <span>♂</span>
                <span>{REFERENCIA.M.etiqueta}:</span>
              </span>
              <span>
                {REFERENCIA.M.min.toFixed(1)} – {REFERENCIA.M.max.toFixed(1)} mg/dL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}