'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosMicro24h {
  volumen: string;
  microalbuminuria: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosMicro24h {
  try {
    const dato = JSON.parse(valor);
    return {
      volumen: typeof dato?.volumen === 'string' ? dato.volumen : '',
      microalbuminuria: typeof dato?.microalbuminuria === 'string' ? dato.microalbuminuria : '',
    };
  } catch {
    return { volumen: '', microalbuminuria: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function Microalbuminuria24Horas({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosMicro24h>(() => leer(valor));

  const actualizar = (campo: keyof DatosMicro24h, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    if (aNumero(nuevos.microalbuminuria) !== null || aNumero(nuevos.volumen) !== null) {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧪 Muestra: Orina de 24 horas
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          ⚡ Método: Cinético
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: Automatizado MINDRAY BS-120
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* VOLUMEN DE ORINA */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Volumen de Orina</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.volumen}
            onChange={(e) => actualizar('volumen', e.target.value)}
            placeholder="2000"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mL</span>
          <span className="text-xs font-semibold text-slate-400">-</span>
        </div>

        {/* MICROALBUMINURIA DE 24 HRS */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Microalbuminuria de 24 Hrs.</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.microalbuminuria}
            onChange={(e) => actualizar('microalbuminuria', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/24hrs.</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span>
            <span>30.0 – 300.0 mg/24hrs.</span>
          </div>
        </div>
      </div>
    </div>
  );
}