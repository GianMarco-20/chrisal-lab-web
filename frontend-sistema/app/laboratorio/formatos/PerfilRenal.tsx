'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosPerfilRenal {
  urea: string;
  creatinina: string;
  orinaColor: string;
  orinaAspecto: string;
  orinaDensidad: string;
  orinaPh: string;
  orinaGlucosa: string;
  orinaCetonas: string;
  orinaUrobilinas: string;
  orinaProteinas: string;
  orinaBilirrubinas: string;
  orinaSangre: string;
  orinaNitritos: string;
  sedEpiteliales: string;
  sedLeucocitos: string;
  sedHematies: string;
  sedCristales: string;
  sedBacterias: string;
  volumen24h: string;
  proteinuria24h: string;
  depuracionCreatinina: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosPerfilRenal {
  try {
    const d = JSON.parse(valor);
    return {
      urea: d?.urea ?? '',
      creatinina: d?.creatinina ?? '',
      orinaColor: d?.orinaColor ?? 'AMARILLO CLARO',
      orinaAspecto: d?.orinaAspecto ?? 'LIGERAMENTE TURBIO',
      orinaDensidad: d?.orinaDensidad ?? '1.010',
      orinaPh: d?.orinaPh ?? '6',
      orinaGlucosa: d?.orinaGlucosa ?? 'NEGATIVO',
      orinaCetonas: d?.orinaCetonas ?? 'NEGATIVO',
      orinaUrobilinas: d?.orinaUrobilinas ?? 'NEGATIVO',
      orinaProteinas: d?.orinaProteinas ?? 'NEGATIVO',
      orinaBilirrubinas: d?.orinaBilirrubinas ?? 'NEGATIVO',
      orinaSangre: d?.orinaSangre ?? 'NEGATIVO',
      orinaNitritos: d?.orinaNitritos ?? 'NEGATIVO',
      sedEpiteliales: d?.sedEpiteliales ?? '',
      sedLeucocitos: d?.sedLeucocitos ?? '',
      sedHematies: d?.sedHematies ?? 'No se observan',
      sedCristales: d?.sedCristales ?? 'No se observan',
      sedBacterias: d?.sedBacterias ?? 'No se observan',
      volumen24h: d?.volumen24h ?? '',
      proteinuria24h: d?.proteinuria24h ?? '',
      depuracionCreatinina: d?.depuracionCreatinina ?? '',
    };
  } catch {
    return {
      urea: '', creatinina: '', orinaColor: 'AMARILLO CLARO', orinaAspecto: 'LIGERAMENTE TURBIO',
      orinaDensidad: '1.010', orinaPh: '6', orinaGlucosa: 'NEGATIVO', orinaCetonas: 'NEGATIVO',
      orinaUrobilinas: 'NEGATIVO', orinaProteinas: 'NEGATIVO', orinaBilirrubinas: 'NEGATIVO',
      orinaSangre: 'NEGATIVO', orinaNitritos: 'NEGATIVO', sedEpiteliales: '', sedLeucocitos: '',
      sedHematies: 'No se observan', sedCristales: 'No se observan', sedBacterias: 'No se observan',
      volumen24h: '', proteinuria24h: '', depuracionCreatinina: ''
    };
  }
}

export default function PerfilRenal({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosPerfilRenal>(() => leer(valor));

  const actualizar = (campo: keyof DatosPerfilRenal, texto: string) => {
    const nuevos = { ...datos, [campo]: texto };
    setDatos(nuevos);

    if (Object.values(nuevos).some((v) => v.trim() !== '')) {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre / Orina de 24 Horas
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: BIOELAB ES-102
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* BIOQUÍMICA RENAL */}
        <div className="bg-slate-100/70 px-4 py-1.5 text-xs font-bold uppercase text-slate-700">Bioquímica Sérica</div>
        
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Urea</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.urea}
            onChange={(e) => actualizar('urea', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/dL</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span> <span>10.0 – 50.0 mg/dL</span>
          </div>
        </div>

        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Creatinina</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.creatinina}
            onChange={(e) => actualizar('creatinina', e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/dL</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span> <span>0.40 – 1.50 mg/dL</span>
          </div>
        </div>

        {/* PRUEBAS DE 24 HORAS */}
        <div className="bg-slate-100/70 px-4 py-1.5 text-xs font-bold uppercase text-slate-700">Pruebas en Orina de 24 Horas</div>
        
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Volumen de Orina (24h)</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.volumen24h}
            onChange={(e) => actualizar('volumen24h', e.target.value)}
            placeholder="2500"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mL</span>
          <span className="text-xs font-semibold text-slate-400">-</span>
        </div>

        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Proteinuria de 24 Hrs.</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.proteinuria24h}
            onChange={(e) => actualizar('proteinuria24h', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mg/24hrs.</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span> <span>0.0 – 150.0 mg/24hrs.</span>
          </div>
        </div>

        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Depuración de Creatinina</span>
          <input
            type="text"
            inputMode="decimal"
            value={datos.depuracionCreatinina}
            onChange={(e) => actualizar('depuracionCreatinina', e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
          <span className="text-sm font-medium text-slate-500">mL/min.</span>
          <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
            <span>RANGO NORMAL:</span> <span>71.0 – 151.0 mL/min.</span>
          </div>
        </div>
      </div>
    </div>
  );
}