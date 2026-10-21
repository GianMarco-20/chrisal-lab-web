'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosBilirrubinas {
  bilirrubinaTotal: string;
  bilirrubinaDirecta: string;
  bilirrubinaIndirecta: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosBilirrubinas {
  try {
    const dato = JSON.parse(valor);
    return {
      bilirrubinaTotal: typeof dato?.bilirrubinaTotal === 'string' ? dato.bilirrubinaTotal : '',
      bilirrubinaDirecta: typeof dato?.bilirrubinaDirecta === 'string' ? dato.bilirrubinaDirecta : '',
      bilirrubinaIndirecta: typeof dato?.bilirrubinaIndirecta === 'string' ? dato.bilirrubinaIndirecta : '',
    };
  } catch {
    return { bilirrubinaTotal: '', bilirrubinaDirecta: '', bilirrubinaIndirecta: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function BilirrubinasTotales({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosBilirrubinas>(() => leer(valor));

  const actualizarCampo = (campo: keyof DatosBilirrubinas, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevosDatos = { ...datos, [campo]: limpio };

    // Cálculo automático opcional de la indirecta si se ingresa total y directa
    if (campo === 'bilirrubinaTotal' || campo === 'bilirrubinaDirecta') {
      const totalNum = aNumero(campo === 'bilirrubinaTotal' ? limpio : nuevosDatos.bilirrubinaTotal);
      const directaNum = aNumero(campo === 'bilirrubinaDirecta' ? limpio : nuevosDatos.bilirrubinaDirecta);

      if (totalNum !== null && directaNum !== null && totalNum >= directaNum) {
        nuevosDatos.bilirrubinaIndirecta = (totalNum - directaNum).toFixed(2);
      }
    }

    setDatos(nuevosDatos);

    const hayTotal = aNumero(nuevosDatos.bilirrubinaTotal) !== null;
    const hayDirecta = aNumero(nuevosDatos.bilirrubinaDirecta) !== null;
    const hayIndirecta = aNumero(nuevosDatos.bilirrubinaIndirecta) !== null;

    if (hayTotal || hayDirecta || hayIndirecta) {
      onChange(JSON.stringify(nuevosDatos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Detalle de Muestra, Método y Analizador */}
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

        <div className="divide-y divide-slate-100">
          {/* Fila: Bilirrubina Total */}
          <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
            <div>
              <span className="block text-sm font-semibold text-slate-800">
                Bilirrubina Total
              </span>
              <span className="text-xs text-slate-400 sm:hidden">Parámetro</span>
            </div>

            <div>
              <input
                type="text"
                inputMode="decimal"
                value={datos.bilirrubinaTotal}
                onChange={(e) => actualizarCampo('bilirrubinaTotal', e.target.value)}
                placeholder="0.00"
                aria-label="Resultado de Bilirrubina Total"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
              />
            </div>

            <div className="text-sm font-medium text-slate-500">
              mg/dL
            </div>

            <div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                <span>RANGO NORMAL:</span>
                <span>Hasta 1.20 mg/dL</span>
              </div>
            </div>
          </div>

          {/* Fila: Bilirrubina Directa */}
          <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
            <div>
              <span className="block text-sm font-semibold text-slate-800">
                Bilirrubina Directa
              </span>
              <span className="text-xs text-slate-400 sm:hidden">Parámetro</span>
            </div>

            <div>
              <input
                type="text"
                inputMode="decimal"
                value={datos.bilirrubinaDirecta}
                onChange={(e) => actualizarCampo('bilirrubinaDirecta', e.target.value)}
                placeholder="0.00"
                aria-label="Resultado de Bilirrubina Directa"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
              />
            </div>

            <div className="text-sm font-medium text-slate-500">
              mg/dL
            </div>

            <div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                <span>RANGO NORMAL:</span>
                <span>Hasta 0.50 mg/dL</span>
              </div>
            </div>
          </div>

          {/* Fila: Bilirrubina Indirecta */}
          <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
            <div>
              <span className="block text-sm font-semibold text-slate-800">
                Bilirrubina Indirecta
              </span>
              <span className="text-xs text-slate-400 sm:hidden">Parámetro</span>
            </div>

            <div>
              <input
                type="text"
                inputMode="decimal"
                value={datos.bilirrubinaIndirecta}
                onChange={(e) => actualizarCampo('bilirrubinaIndirecta', e.target.value)}
                placeholder="0.00"
                aria-label="Resultado de Bilirrubina Indirecta"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
              />
            </div>

            <div className="text-sm font-medium text-slate-500">
              mg/dL
            </div>

            <div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
                <span>RANGO NORMAL:</span>
                <span>Hasta 0.70 mg/dL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}