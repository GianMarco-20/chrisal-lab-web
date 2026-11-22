'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosAcidoUricoOrina24h {
  volumen24h: string;
  acidoUricoMgDl: string;
  acidoUrico24h: string;
  observaciones: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosAcidoUricoOrina24h {
  try {
    const dato = JSON.parse(valor);
    return {
      volumen24h: typeof dato?.volumen24h === 'string' ? dato.volumen24h : '',
      acidoUricoMgDl: typeof dato?.acidoUricoMgDl === 'string' ? dato.acidoUricoMgDl : '',
      acidoUrico24h: typeof dato?.acidoUrico24h === 'string' ? dato.acidoUrico24h : '',
      observaciones: typeof dato?.observaciones === 'string' ? dato.observaciones : '',
    };
  } catch {
    return {
      volumen24h: '',
      acidoUricoMgDl: '',
      acidoUrico24h: '',
      observaciones: '',
    };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function AcidoUricoOrina24h({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosAcidoUricoOrina24h>(() => leer(valor));

  const actualizar = (campo: keyof DatosAcidoUricoOrina24h, texto: string) => {
    const limpio = campo === 'observaciones' ? texto : texto.replace(/[^0-9.,]/g, '');
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    if (
      aNumero(nuevos.volumen24h) !== null ||
      aNumero(nuevos.acidoUricoMgDl) !== null ||
      aNumero(nuevos.acidoUrico24h) !== null ||
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
          🧪 Muestra: Orina de 24 horas
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          📋 Área: Orina de 24 horas
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* VOLUMEN URINARIO 24 H */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">
            Volumen urinario 24 h
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.volumen24h}
            onChange={(e) => actualizar('volumen24h', e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mL/24 h</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span>
            <span>800 – 2000 mL/24 h</span>
          </div>
        </div>

        {/* ÁCIDO ÚRICO (mg/dL) */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">
            Ácido úrico
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.acidoUricoMgDl}
            onChange={(e) => actualizar('acidoUricoMgDl', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/dL</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-500">
            <span>REFERENCIA:</span>
            <span>—</span>
          </div>
        </div>

        {/* ÁCIDO ÚRICO EN 24 H */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">
            Ácido úrico en 24 h
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.acidoUrico24h}
            onChange={(e) => actualizar('acidoUrico24h', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/24 h</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span>
            <span>250 – 750 mg/24 h</span>
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