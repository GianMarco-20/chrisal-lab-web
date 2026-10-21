'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosCoprologico {
  consistencia: string;
  color: string;
  sangre: string;
  moco: string;
  restosAlimentos: string;
  ph: string;
  almidon: string;
  sudamIII: string;
  thevenon: string;
  sustanciasReductoras: string;
  reaccionInflamatoria: string;
  parasitologico: string;
}

function leer(valor: string): DatosCoprologico {
  try {
    const dato = JSON.parse(valor);
    return {
      consistencia: dato?.consistencia ?? 'PASTOSA',
      color: dato?.color ?? 'MARRON',
      sangre: dato?.sangre ?? 'AUSENTE',
      moco: dato?.moco ?? 'AUSENTE',
      restosAlimentos: dato?.restosAlimentos ?? 'AUSENTE',
      ph: dato?.ph ?? '5.0',
      almidon: dato?.almidon ?? 'NEGATIVO',
      sudamIII: dato?.sudamIII ?? 'NEGATIVO',
      thevenon: dato?.thevenon ?? 'NEGATIVO',
      sustanciasReductoras: dato?.sustanciasReductoras ?? 'NEGATIVO',
      reaccionInflamatoria: dato?.reaccionInflamatoria ?? 'NEGATIVO',
      parasitologico: dato?.parasitologico ?? 'NEGATIVO',
    };
  } catch {
    return {
      consistencia: 'PASTOSA',
      color: 'MARRON',
      sangre: 'AUSENTE',
      moco: 'AUSENTE',
      restosAlimentos: 'AUSENTE',
      ph: '5.0',
      almidon: 'NEGATIVO',
      sudamIII: 'NEGATIVO',
      thevenon: 'NEGATIVO',
      sustanciasReductoras: 'NEGATIVO',
      reaccionInflamatoria: 'NEGATIVO',
      parasitologico: 'NEGATIVO',
    };
  }
}

export default function CoprologicoMasc({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosCoprologico>(() => leer(valor));
  const [pestana, setPestana] = useState<'macro' | 'quimico' | 'micro'>('macro');

  const actualizar = (campo: keyof DatosCoprologico, texto: string) => {
    const nuevosDatos = { ...datos, [campo]: texto };
    setDatos(nuevosDatos);
    onChange(JSON.stringify(nuevosDatos));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            💩 Muestra: Heces
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
            <span>♂</span>
            <span>Masculino</span>
          </span>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPestana('macro')}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              pestana === 'macro'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Macroscópico
          </button>
          <button
            type="button"
            onClick={() => setPestana('quimico')}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              pestana === 'quimico'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Químico
          </button>
          <button
            type="button"
            onClick={() => setPestana('micro')}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              pestana === 'micro'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Microscópico
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-xs space-y-4">
        {pestana === 'macro' && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-wide">
              Examen Macroscópico
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Consistencia</label>
                <input
                  type="text"
                  value={datos.consistencia}
                  onChange={(e) => actualizar('consistencia', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Color</label>
                <input
                  type="text"
                  value={datos.color}
                  onChange={(e) => actualizar('color', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Sangre</label>
                <input
                  type="text"
                  value={datos.sangre}
                  onChange={(e) => actualizar('sangre', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Moco</label>
                <input
                  type="text"
                  value={datos.moco}
                  onChange={(e) => actualizar('moco', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-500 font-semibold mb-1">Restos de Alimentos</label>
                <input
                  type="text"
                  value={datos.restosAlimentos}
                  onChange={(e) => actualizar('restosAlimentos', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {pestana === 'quimico' && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-wide">
              Examen Químico
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">pH</label>
                <input
                  type="text"
                  value={datos.ph}
                  onChange={(e) => actualizar('ph', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Almidón</label>
                <input
                  type="text"
                  value={datos.almidon}
                  onChange={(e) => actualizar('almidon', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Sudam III</label>
                <input
                  type="text"
                  value={datos.sudamIII}
                  onChange={(e) => actualizar('sudamIII', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Thevenon</label>
                <input
                  type="text"
                  value={datos.thevenon}
                  onChange={(e) => actualizar('thevenon', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-500 font-semibold mb-1">Sustancias Reductoras</label>
                <input
                  type="text"
                  value={datos.sustanciasReductoras}
                  onChange={(e) => actualizar('sustanciasReductoras', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {pestana === 'micro' && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm tracking-wide">
              Examen Microscópico
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Reacción Inflamatoria</label>
                <input
                  type="text"
                  value={datos.reaccionInflamatoria}
                  onChange={(e) => actualizar('reaccionInflamatoria', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Parasitológico</label>
                <input
                  type="text"
                  value={datos.parasitologico}
                  onChange={(e) => actualizar('parasitologico', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}