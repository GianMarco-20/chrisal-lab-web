'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosHormonasFem {
  estradiol: string;
  fsh: string;
  lh: string;
  progesterona: string;
  prolactina: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosHormonasFem {
  try {
    const d = JSON.parse(valor);
    return {
      estradiol: d?.estradiol ?? '',
      fsh: d?.fsh ?? '',
      lh: d?.lh ?? '',
      progesterona: d?.progesterona ?? '',
      prolactina: d?.prolactina ?? '',
    };
  } catch {
    return { estradiol: '', fsh: '', lh: '', progesterona: '', prolactina: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function HormonasFemeninas({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosHormonasFem>(() => leer(valor));

  const actualizar = (campo: keyof DatosHormonasFem, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    const tieneDatos = Object.values(nuevos).some((val) => aNumero(val) !== null);
    if (tieneDatos) {
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
          ⚡ Método: ELISA
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

        {/* ESTRADIOL */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800 pt-2">Estradiol</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.estradiol}
            onChange={(e) => actualizar('estradiol', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500 pt-2">pg/mL</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[11px] font-semibold text-slate-700">
            <div className="flex justify-between"><span>Fase folicular:</span> <span>12.5 – 166.0</span></div>
            <div className="flex justify-between"><span>Fase ovulatoria:</span> <span>85.0 – 498.0</span></div>
            <div className="flex justify-between"><span>Fase luteal:</span> <span>43.8 – 211.0</span></div>
            <div className="flex justify-between"><span>Menopausia:</span> <span>5.0 – 54.7</span></div>
          </div>
        </div>

        {/* FSH */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800 pt-2">FSH</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.fsh}
            onChange={(e) => actualizar('fsh', e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500 pt-2">mIU/mL</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[11px] font-semibold text-slate-700">
            <div className="flex justify-between"><span>Fase folicular:</span> <span>3.0 – 12.0</span></div>
            <div className="flex justify-between"><span>Mitad de ciclo:</span> <span>8.0 – 22.0</span></div>
            <div className="flex justify-between"><span>Fase luteal:</span> <span>2.0 – 12.0</span></div>
            <div className="flex justify-between"><span>Post menopaúsico:</span> <span>35.0 – 150</span></div>
          </div>
        </div>

        {/* LH */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800 pt-2">LH</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.lh}
            onChange={(e) => actualizar('lh', e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500 pt-2">mIU/mL</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[11px] font-semibold text-slate-700">
            <div className="flex justify-between"><span>Fase folicular:</span> <span>2.4 – 12.6</span></div>
            <div className="flex justify-between"><span>Fase ovulatoria:</span> <span>14.0 – 96.0</span></div>
            <div className="flex justify-between"><span>Fase luteal:</span> <span>1.0 – 11.4</span></div>
            <div className="flex justify-between"><span>Menopausia:</span> <span>7.7 – 58.9</span></div>
          </div>
        </div>

        {/* PROGESTERONA */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800 pt-2">Progesterona</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.progesterona}
            onChange={(e) => actualizar('progesterona', e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500 pt-2">ng/mL</span>
          <div className="space-y-0.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[11px] font-semibold text-slate-700">
            <div className="flex justify-between"><span>Fase folicular:</span> <span>0.2 – 1.5</span></div>
            <div className="flex justify-between"><span>Fase ovulatoria:</span> <span>0.8 – 3.0</span></div>
            <div className="flex justify-between"><span>Fase luteal:</span> <span>1.7 – 27.0</span></div>
            <div className="flex justify-between"><span>Menopausia:</span> <span>0.1 – 0.8</span></div>
          </div>
        </div>

        {/* PROLACTINA */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Prolactina</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.prolactina}
            onChange={(e) => actualizar('prolactina', e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">ng/mL</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span>
            <span>1.2 – 22.0 ng/mL</span>
          </div>
        </div>
      </div>
    </div>
  );
}