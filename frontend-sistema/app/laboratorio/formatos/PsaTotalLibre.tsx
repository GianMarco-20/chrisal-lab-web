'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosPsa {
  psaTotal: string;
  psaLibre: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosPsa {
  try {
    const d = JSON.parse(valor);
    return {
      psaTotal: d?.psaTotal ?? '',
      psaLibre: d?.psaLibre ?? '',
    };
  } catch {
    return { psaTotal: '', psaLibre: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function PsaTotalLibre({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosPsa>(() => leer(valor));

  const actualizar = (campo: keyof DatosPsa, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    if (Object.values(nuevos).some((v) => aNumero(v) !== null)) {
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
          ⚡ Método: ELISA (Cuantitativo)
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: DIATEK DR-200Bc
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* PSA TOTAL */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800 pt-2">PSA Total</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.psaTotal}
            onChange={(e) => actualizar('psaTotal', e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500 pt-2">ng/mL</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[11px] font-semibold text-slate-700">
            <div className="flex justify-between"><span>&lt; 40 Años:</span> <span>0.00 – 1.40 ng/mL</span></div>
            <div className="flex justify-between"><span>40 – 49 Años:</span> <span>0.00 – 2.00 ng/mL</span></div>
            <div className="flex justify-between"><span>50 – 59 Años:</span> <span>0.00 – 3.10 ng/mL</span></div>
            <div className="flex justify-between"><span>60 – 69 Años:</span> <span>0.00 – 4.10 ng/mL</span></div>
            <div className="flex justify-between"><span>&gt; 70 Años:</span> <span>0.00 – 4.40 ng/mL</span></div>
          </div>
        </div>

        {/* PSA LIBRE */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">PSA Libre</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.psaLibre}
            onChange={(e) => actualizar('psaLibre', e.target.value)}
            placeholder="0.00 (Opcional)"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">ng/mL</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span>
            <span>0.0 – 1.3 ng/mL</span>
          </div>
        </div>
      </div>
    </div>
  );
}