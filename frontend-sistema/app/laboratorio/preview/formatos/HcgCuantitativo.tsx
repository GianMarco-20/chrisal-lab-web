'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosHcgCuantitativo {
  hcg: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosHcgCuantitativo {
  try {
    const dato = JSON.parse(valor);
    return {
      hcg: typeof dato?.hcg === 'string' ? dato.hcg : '',
    };
  } catch {
    return { hcg: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function HcgCuantitativo({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosHcgCuantitativo>(() => leer(valor));

  const actualizar = (texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { hcg: limpio };
    setDatos(nuevos);

    if (aNumero(nuevos.hcg) !== null) {
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
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* HCG CUANTITATIVO */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800 pt-2">HCG – Sub Unidad Beta</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.hcg}
            onChange={(e) => actualizar(e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500 pt-2">mIU/ml</span>
          <div className="space-y-1.5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-700">
            <div className="font-bold border-b border-slate-200 pb-1 text-slate-800">Valores por Condición:</div>
            <div className="flex justify-between"><span>Hombres:</span> <span className="font-semibold">2.0</span></div>
            <div className="flex justify-between"><span>Mujeres no gestantes:</span> <span className="font-semibold">≤ 5.0</span></div>
            <div className="flex justify-between"><span>Mujeres post menopausia:</span> <span className="font-semibold">≤ 7.0</span></div>
            
            <div className="font-bold border-b border-slate-200 pt-2 pb-1 text-slate-800">Semanas de Gestación:</div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
              <div>Semana 3: 7.8 – 71.2</div>
              <div>Semana 4: 9.5 – 750.0</div>
              <div>Semana 5: 217.0 – 7138.0</div>
              <div>Semana 6: 1157.0 – 31795.0</div>
              <div>Semana 7: 3697.0 – 163563.0</div>
              <div>Semana 8: 32065.0 – 149571.0</div>
              <div>Semana 9: 63803.0 – 151410.0</div>
              <div>Semana 10: 46509.0 – 186977.0</div>
              <div>Semana 12: 27832.0 – 210612.0</div>
              <div>Semana 14: 13950.0 – 62530.0</div>
              <div>Semana 15: 12039.0 – 70971.0</div>
              <div>Semana 16: 9040.0 – 56451.0</div>
              <div>Semana 17: 8175.0 – 55868.0</div>
              <div>Semana 18: 8099.0 – 58176.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}