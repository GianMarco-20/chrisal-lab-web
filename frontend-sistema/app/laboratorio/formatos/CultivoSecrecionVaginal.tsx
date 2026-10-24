'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosCultivoVaginal {
  esPositivo: boolean;
  cultivoGramPositivo: string;
  cultivoGramNegativo: string;
  agar: string;
  bacteriaAislada: string;
  recuentoColonias: string;
  sensible: string;
  resistente: string;
}

function leer(valor: string): DatosCultivoVaginal {
  try {
    const dato = JSON.parse(valor);
    return {
      esPositivo: typeof dato?.esPositivo === 'boolean' ? dato.esPositivo : false,
      cultivoGramPositivo: dato?.cultivoGramPositivo ?? 'NEGATIVO',
      cultivoGramNegativo: dato?.cultivoGramNegativo ?? 'NEGATIVO',
      agar: dato?.agar ?? 'MACCONKEY',
      bacteriaAislada: dato?.bacteriaAislada ?? 'Escherichia coli.',
      recuentoColonias: dato?.recuentoColonias ?? '> 100,000 UFC/ml',
      sensible: dato?.sensible ?? 'Amikacina, Gentamicina, Cloranfenicol, Ceftriaxona, Ciprofloxacino, Trimetropin/ Sulfametoxazol, Nitrofurantoina, Claritromicina.',
      resistente: dato?.resistente ?? 'Kanamicina, Cefaclor, Amoxicilina, Ampicilina, Clavumox.',
    };
  } catch {
    return {
      esPositivo: false,
      cultivoGramPositivo: 'NEGATIVO',
      cultivoGramNegativo: 'NEGATIVO',
      agar: 'MACCONKEY',
      bacteriaAislada: 'Escherichia coli.',
      recuentoColonias: '> 100,000 UFC/ml',
      sensible: 'Amikacina, Gentamicina, Cloranfenicol, Ceftriaxona, Ciprofloxacino, Trimetropin/ Sulfametoxazol, Nitrofurantoina, Claritromicina.',
      resistente: 'Kanamicina, Cefaclor, Amoxicilina, Ampicilina, Clavumox.',
    };
  }
}

export default function CultivoSecrecionVaginal({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosCultivoVaginal>(() => leer(valor));

  const actualizar = (nuevos: Partial<DatosCultivoVaginal>) => {
    const actualizado = { ...datos, ...nuevos };
    setDatos(actualizado);
    onChange(JSON.stringify(actualizado));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            🧪 Muestra: Secreción Vaginal
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            🧫 Agar: {datos.esPositivo ? datos.agar : 'Sangre'}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
          <span>♀</span>
          <span>Femenino</span>
        </span>
      </div>

      <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => actualizar({ esPositivo: false })}
          className={`flex-1 rounded-lg py-2 transition-all ${
            !datos.esPositivo ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          CULTIVO NEGATIVO
        </button>
        <button
          type="button"
          onClick={() => actualizar({ esPositivo: true })}
          className={`flex-1 rounded-lg py-2 transition-all ${
            datos.esPositivo ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          CULTIVO POSITIVO (AISLAMIENTO)
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 text-xs">
        {!datos.esPositivo ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Cultivo Gram +</label>
              <input
                type="text"
                value={datos.cultivoGramPositivo}
                onChange={(e) => actualizar({ cultivoGramPositivo: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-[#0d7a71]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Cultivo Gram -</label>
              <input
                type="text"
                value={datos.cultivoGramNegativo}
                onChange={(e) => actualizar({ cultivoGramNegativo: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-[#0d7a71]"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Tipo de Agar</label>
                <input
                  type="text"
                  value={datos.agar}
                  onChange={(e) => actualizar({ agar: e.target.value })}
                  placeholder="Ej. MACCONKEY"
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-[#0d7a71]"
                />
              </div>
              <div>
                <label className="font-bold text-rose-700 block mb-1">Bacteria Aislada</label>
                <input
                  type="text"
                  value={datos.bacteriaAislada}
                  onChange={(e) => actualizar({ bacteriaAislada: e.target.value })}
                  placeholder="Ej. Escherichia coli."
                  className="w-full rounded-xl border border-rose-300 p-2 font-bold text-slate-900 bg-rose-50/30 outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Recuento de Colonias</label>
                <input
                  type="text"
                  value={datos.recuentoColonias}
                  onChange={(e) => actualizar({ recuentoColonias: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-[#0d7a71]"
                />
              </div>
            </div>

            <h5 className="font-bold text-slate-700 uppercase tracking-wider pt-2 border-b">
              Antibiograma
            </h5>

            <div>
              <label className="font-semibold text-emerald-700 block mb-1">Sensible</label>
              <input
                type="text"
                value={datos.sensible}
                onChange={(e) => actualizar({ sensible: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2 font-medium text-slate-800 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-semibold text-rose-700 block mb-1">Resistente</label>
              <input
                type="text"
                value={datos.resistente}
                onChange={(e) => actualizar({ resistente: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2 font-medium text-slate-800 outline-none focus:border-rose-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}