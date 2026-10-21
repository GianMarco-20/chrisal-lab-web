'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosCoprocultivo {
  gramPositivas: string;
  gramNegativas: string;
}

function leer(valor: string): DatosCoprocultivo {
  try {
    const dato = JSON.parse(valor);
    return {
      gramPositivas:
        typeof dato?.gramPositivas === 'string' && dato.gramPositivas.trim() !== ''
          ? dato.gramPositivas
          : 'NO HAY CRECIMIENTO DE BACTERIAS PATÓGENAS GRAM +.',
      gramNegativas:
        typeof dato?.gramNegativas === 'string' && dato.gramNegativas.trim() !== ''
          ? dato.gramNegativas
          : 'NO HAY CRECIMIENTO DE BACTERIAS PATÓNEGAS GRAM -.',
    };
  } catch {
    return {
      gramPositivas: 'NO HAY CRECIMIENTO DE BACTERIAS PATÓGENAS GRAM +.',
      gramNegativas: 'NO HAY CRECIMIENTO DE BACTERIAS PATÓNEGAS GRAM -.',
    };
  }
}

export default function Coprocultivo({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosCoprocultivo>(() => leer(valor));

  const actualizar = (campo: keyof DatosCoprocultivo, texto: string) => {
    const nuevosDatos = { ...datos, [campo]: texto };
    setDatos(nuevosDatos);
    onChange(JSON.stringify(nuevosDatos));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          💩 Muestra: Heces
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧫 Agar: MacConkey / Salmonella - Shigella
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Bacterias Gram Positivas (+)
          </label>
          <input
            type="text"
            value={datos.gramPositivas}
            onChange={(e) => actualizar('gramPositivas', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Bacterias Gram Negativas (-)
          </label>
          <input
            type="text"
            value={datos.gramNegativas}
            onChange={(e) => actualizar('gramNegativas', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
          />
        </div>
      </div>
    </div>
  );
}