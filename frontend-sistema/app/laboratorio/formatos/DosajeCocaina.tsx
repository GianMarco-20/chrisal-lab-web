'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosDosajeCocaina {
  cocaina: string;
  observaciones: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

const OPCIONES_RESULTADO = ['', 'Negativo', 'Positivo'];

const OBSERVACION_DEFECTO =
  'Prueba de tamizaje por inmunocromatografía. Todo resultado positivo requiere confirmación por GC/MS o LC-MS/MS.';

function leer(valor: string): DatosDosajeCocaina {
  try {
    const dato = JSON.parse(valor);
    return {
      cocaina: typeof dato?.cocaina === 'string' ? dato.cocaina : '',
      observaciones:
        typeof dato?.observaciones === 'string' ? dato.observaciones : OBSERVACION_DEFECTO,
    };
  } catch {
    return {
      cocaina: '',
      observaciones: OBSERVACION_DEFECTO,
    };
  }
}

export default function DosajeCocaina({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosDosajeCocaina>(() => leer(valor));

  const actualizar = (campo: keyof DatosDosajeCocaina, texto: string) => {
    const nuevos = { ...datos, [campo]: texto };
    setDatos(nuevos);

    if (
      nuevos.cocaina.trim() !== '' ||
      (nuevos.observaciones.trim() !== '' && nuevos.observaciones.trim() !== OBSERVACION_DEFECTO)
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
          🧪 Muestra: Orina
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          ⚗️ Área: Toxicología
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* COCAÍNA (COC) */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">
            Cocaína (COC)
          </span>
          <select
            value={datos.cocaina}
            onChange={(e) => actualizar('cocaina', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          >
            <option value="">Seleccionar...</option>
            {OPCIONES_RESULTADO.filter(Boolean).map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-slate-400">—</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-bold text-slate-700">
            <div className="flex justify-between">
              <span>REFERENCIA:</span>
              <span>Negativo</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              (punto de corte: 300 ng/mL)
            </p>
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