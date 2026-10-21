'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosCultivoFaringeo {
  esPositivo: boolean;
  // Campos cuando es Negativo
  cultivoGramPositivo: string;
  cultivoGramNegativo: string;
  observacionGram: string;
  // Campos cuando es Positivo
  bacteriaAislada: string;
  sensible: string;
  intermedio: string;
  resistente: string;
}

function leer(valor: string): DatosCultivoFaringeo {
  try {
    const dato = JSON.parse(valor);
    return {
      esPositivo: typeof dato?.esPositivo === 'boolean' ? dato.esPositivo : false,
      cultivoGramPositivo: dato?.cultivoGramPositivo ?? 'NEGATIVO',
      cultivoGramNegativo: dato?.cultivoGramNegativo ?? 'NEGATIVO',
      observacionGram: dato?.observacionGram ?? 'COCOS GRAM + REGULAR CANTIDAD',
      bacteriaAislada: dato?.bacteriaAislada ?? 'Streptococcus sp',
      sensible: dato?.sensible ?? 'CEFTRIAXONA, LEVOFLOXACINO, AMPICILINA, AZITROMICINA.',
      intermedio: dato?.intermedio ?? 'CLINDAMICINA, TETRACICLINA.',
      resistente: dato?.resistente ?? 'BACTRIM, ERITROMICINA.',
    };
  } catch {
    return {
      esPositivo: false,
      cultivoGramPositivo: 'NEGATIVO',
      cultivoGramNegativo: 'NEGATIVO',
      observacionGram: 'COCOS GRAM + REGULAR CANTIDAD',
      bacteriaAislada: 'Streptococcus sp',
      sensible: 'CEFTRIAXONA, LEVOFLOXACINO, AMPICILINA, AZITROMICINA.',
      intermedio: 'CLINDAMICINA, TETRACICLINA.',
      resistente: 'BACTRIM, ERITROMICINA.',
    };
  }
}

export default function CultivoSecrecionFaringea({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosCultivoFaringeo>(() => leer(valor));

  const actualizar = (nuevos: Partial<DatosCultivoFaringeo>) => {
    const actualizado = { ...datos, ...nuevos };
    setDatos(actualizado);
    onChange(JSON.stringify(actualizado));
  };

  return (
    <div className="space-y-4">
      {/* Detalle de Muestra y Agar */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧪 Muestra: Secreción Faríngea
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧫 Agar: Sangre
        </span>
      </div>

      {/* Switch / Toggle para cambiar de estado */}
      <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => actualizar({ esPositivo: false })}
          className={`flex-1 rounded-lg py-2 transition-all ${
            !datos.esPositivo ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          NEGATIVO (SIN DESARROLLO)
        </button>
        <button
          type="button"
          onClick={() => actualizar({ esPositivo: true })}
          className={`flex-1 rounded-lg py-2 transition-all ${
            datos.esPositivo ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          POSITIVO (BACTERIA AISLADA)
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 text-xs">
        {/* VISTA SI ES NEGATIVO */}
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
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-600 block mb-1">°Gram / Observación</label>
              <input
                type="text"
                value={datos.observacionGram}
                onChange={(e) => actualizar({ observacionGram: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-[#0d7a71]"
              />
            </div>
          </div>
        ) : (
          /* VISTA SI ES POSITIVO */
          <div className="space-y-3">
            <div>
              <label className="font-bold text-rose-700 block mb-1">Bacteria Aislada</label>
              <input
                type="text"
                value={datos.bacteriaAislada}
                onChange={(e) => actualizar({ bacteriaAislada: e.target.value })}
                placeholder="Ej. Streptococcus sp"
                className="w-full rounded-xl border border-rose-300 p-2 font-bold text-slate-900 bg-rose-50/30 outline-none focus:border-rose-500"
              />
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
                placeholder="Ej. CEFTRIAXONA, LEVOFLOXACINO..."
                className="w-full rounded-xl border border-slate-300 p-2 font-medium text-slate-800 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-semibold text-amber-700 block mb-1">Intermedio</label>
              <input
                type="text"
                value={datos.intermedio}
                onChange={(e) => actualizar({ intermedio: e.target.value })}
                placeholder="Ej. CLINDAMICINA, TETRACICLINA..."
                className="w-full rounded-xl border border-slate-300 p-2 font-medium text-slate-800 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-rose-700 block mb-1">Resistente</label>
              <input
                type="text"
                value={datos.resistente}
                onChange={(e) => actualizar({ resistente: e.target.value })}
                placeholder="Ej. BACTRIM, ERITROMICINA..."
                className="w-full rounded-xl border border-slate-300 p-2 font-medium text-slate-800 outline-none focus:border-rose-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}