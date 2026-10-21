'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

const RANGOS_REFERENCIA = [
  { etiqueta: 'MENOS DE 20', valor: 'NEGATIVO', estilo: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
  { etiqueta: '20 – 40', valor: 'POSITIVO DÉBIL', estilo: 'bg-amber-50 border-amber-200 text-amber-800' },
  { etiqueta: '40 – 60', valor: 'POSITIVO MODERADO', estilo: 'bg-orange-50 border-orange-200 text-orange-800' },
  { etiqueta: 'MAYOR DE 60', valor: 'POSITIVO FUERTE', estilo: 'bg-rose-50 border-rose-200 text-rose-800' },
];

function leer(valor: string): string {
  try {
    const dato = JSON.parse(valor);
    return typeof dato?.antiCcp === 'string' ? dato.antiCcp : '';
  } catch {
    return '';
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function AntiCcp({ valor, onChange }: FormatoProps) {
  const [resultado, setResultado] = useState(() => leer(valor));

  const cambiar = (texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    setResultado(limpio);
    onChange(aNumero(limpio) !== null ? JSON.stringify({ antiCcp: limpio }) : '');
  };

  return (
    <div className="space-y-4">
      {/* Detalle de Muestra y Método */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre (Suero)
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧪 Método: ELISA
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
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-4 sm:gap-4 ${COLUMNAS}`}>
          <div>
            <span className="block text-sm font-semibold text-slate-800">
              ANTI-CCP
            </span>
            <span className="text-xs text-slate-400 sm:hidden">Péptido Cíclico Citrulinado</span>
          </div>

          <div>
            <input
              type="text"
              inputMode="decimal"
              value={resultado}
              onChange={(e) => cambiar(e.target.value)}
              placeholder="0.0"
              aria-label="Resultado de Anti-CCP"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
            />
          </div>

          <div className="pt-2 text-sm font-medium text-slate-500">
            UI/mL
          </div>

          {/* Escala de Referencia */}
          <div className="space-y-1.5 text-xs">
            {RANGOS_REFERENCIA.map((rango) => (
              <div
                key={rango.etiqueta}
                className={`flex items-center justify-between rounded-lg border px-2.5 py-1 font-semibold ${rango.estilo}`}
              >
                <span>{rango.etiqueta}:</span>
                <span>{rango.valor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}