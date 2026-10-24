'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosOrina {
  color: string;
  aspecto: string;
  densidad: string;
  ph: string;
  glucosa: string;
  cetonas: string;
  urobilinas: string;
  proteinas: string;
  bilirrubinas: string;
  sangre: string;
  nitritos: string;
  celulasEpiteliales: string;
  leucocitos: string;
  leucocitosAglutinados: string;
  piocitos: string;
  cristales: string;
  hematies: string;
  germenes: string;
  levaduras: string;
  filamentosMucoides: string;
}

function leer(valor: string): DatosOrina {
  try {
    const dato = JSON.parse(valor);
    return {
      color: dato?.color ?? 'AMARILLO',
      aspecto: dato?.aspecto ?? 'LIGERAMENTE TURBIO',
      densidad: dato?.densidad ?? '1.005',
      ph: dato?.ph ?? '6.5',
      glucosa: dato?.glucosa ?? 'NEGATIVO',
      cetonas: dato?.cetonas ?? 'NEGATIVO',
      urobilinas: dato?.urobilinas ?? 'NEGATIVO',
      proteinas: dato?.proteinas ?? 'NEGATIVO',
      bilirrubinas: dato?.bilirrubinas ?? 'NEGATIVO',
      sangre: dato?.sangre ?? '+',
      nitritos: dato?.nitritos ?? 'NEGATIVO',
      celulasEpiteliales: dato?.celulasEpiteliales ?? 'ESCASOS',
      leucocitos: dato?.leucocitos ?? '12 – 14',
      leucocitosAglutinados: dato?.leucocitosAglutinados ?? 'No se observan',
      piocitos: dato?.piocitos ?? 'No se observan',
      cristales: dato?.cristales ?? 'No se observan',
      hematies: dato?.hematies ?? '1 – 3',
      germenes: dato?.germenes ?? 'ESCASOS',
      levaduras: dato?.levaduras ?? 'No se observan',
      filamentosMucoides: dato?.filamentosMucoides ?? 'No se observan',
    };
  } catch {
    return {
      color: 'AMARILLO',
      aspecto: 'LIGERAMENTE TURBIO',
      densidad: '1.005',
      ph: '6.5',
      glucosa: 'NEGATIVO',
      cetonas: 'NEGATIVO',
      urobilinas: 'NEGATIVO',
      proteinas: 'NEGATIVO',
      bilirrubinas: 'NEGATIVO',
      sangre: '+',
      nitritos: 'NEGATIVO',
      celulasEpiteliales: 'ESCASOS',
      leucocitos: '12 – 14',
      leucocitosAglutinados: 'No se observan',
      piocitos: 'No se observan',
      cristales: 'No se observan',
      hematies: '1 – 3',
      germenes: 'ESCASOS',
      levaduras: 'No se observan',
      filamentosMucoides: 'No se observan',
    };
  }
}

export default function ExamenCompletoOrinaMasc({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosOrina>(() => leer(valor));
  const [pestana, setPestana] = useState<'fq' | 'sedimento'>('fq');

  const actualizar = (campo: keyof DatosOrina, texto: string) => {
    const nuevos = { ...datos, [campo]: texto };
    setDatos(nuevos);
    onChange(JSON.stringify(nuevos));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            🟡 Muestra: Orina
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
            <span>♂</span>
            <span>Masculino</span>
          </span>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPestana('fq')}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              pestana === 'fq' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Examen Físico - Químico
          </button>
          <button
            type="button"
            onClick={() => setPestana('sedimento')}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              pestana === 'sedimento' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Sedimento Urinario
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-xs space-y-4">
        {pestana === 'fq' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div><label className="text-slate-500 font-semibold block mb-1">Color</label><input type="text" value={datos.color} onChange={(e) => actualizar('color', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Aspecto</label><input type="text" value={datos.aspecto} onChange={(e) => actualizar('aspecto', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Densidad</label><input type="text" value={datos.densidad} onChange={(e) => actualizar('densidad', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">pH</label><input type="text" value={datos.ph} onChange={(e) => actualizar('ph', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Glucosa</label><input type="text" value={datos.glucosa} onChange={(e) => actualizar('glucosa', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Cetonas</label><input type="text" value={datos.cetonas} onChange={(e) => actualizar('cetonas', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Urobilinas</label><input type="text" value={datos.urobilinas} onChange={(e) => actualizar('urobilinas', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Proteínas</label><input type="text" value={datos.proteinas} onChange={(e) => actualizar('proteinas', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Bilirrubinas</label><input type="text" value={datos.bilirrubinas} onChange={(e) => actualizar('bilirrubinas', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Sangre</label><input type="text" value={datos.sangre} onChange={(e) => actualizar('sangre', e.target.value)} className="w-full rounded-xl border p-2 font-bold text-rose-700" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Nitritos</label><input type="text" value={datos.nitritos} onChange={(e) => actualizar('nitritos', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
          </div>
        )}

        {pestana === 'sedimento' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div><label className="text-slate-500 font-semibold block mb-1">Células Epiteliales</label><input type="text" value={datos.celulasEpiteliales} onChange={(e) => actualizar('celulasEpiteliales', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Leucocitos</label><input type="text" value={datos.leucocitos} onChange={(e) => actualizar('leucocitos', e.target.value)} className="w-full rounded-xl border p-2 font-bold text-sky-700" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Leucocitos Aglutinados</label><input type="text" value={datos.leucocitosAglutinados} onChange={(e) => actualizar('leucocitosAglutinados', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Piocitos</label><input type="text" value={datos.piocitos} onChange={(e) => actualizar('piocitos', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Cristales</label><input type="text" value={datos.cristales} onChange={(e) => actualizar('cristales', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Hematíes</label><input type="text" value={datos.hematies} onChange={(e) => actualizar('hematies', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Gérmenes</label><input type="text" value={datos.germenes} onChange={(e) => actualizar('germenes', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Levaduras</label><input type="text" value={datos.levaduras} onChange={(e) => actualizar('levaduras', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
            <div><label className="text-slate-500 font-semibold block mb-1">Filamentos Mucoides</label><input type="text" value={datos.filamentosMucoides} onChange={(e) => actualizar('filamentosMucoides', e.target.value)} className="w-full rounded-xl border p-2 font-bold" /></div>
          </div>
        )}
      </div>
    </div>
  );
}