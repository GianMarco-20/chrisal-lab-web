'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosCultivoOtidico {
  esPositivo: boolean;
  resultadoNegativo: string;
  bacteriaAislada: string;
  recuentoColonias: string;
  sensible: string;
  intermedio: string;
  resistente: string;
}

function leer(valor: string): DatosCultivoOtidico {
  try {
    const dato = JSON.parse(valor);
    return {
      esPositivo: typeof dato?.esPositivo === 'boolean' ? dato.esPositivo : true,
      resultadoNegativo:
        dato?.resultadoNegativo ?? 'NO SE OBSERVA DESARROLLO DE GERMENES PATOGENOS.',
      bacteriaAislada: dato?.bacteriaAislada ?? 'Staphylococcus sp.',
      recuentoColonias: dato?.recuentoColonias ?? '> 100,000 UFC/ml',
      sensible:
        dato?.sensible ??
        'Amikacina, Dicloxacilina, Rifampicina, Cloranfenicol, Ceftriaxona, Trimetropin/sulfametoxazol, Penicilina, Kanamicina, Lincomicina, Cefaclor, Amoxicilina, Ampicilina, Clavumox, Clindamicina, Levofloxacino, Cefalexina.',
      intermedio: dato?.intermedio ?? '',
      resistente: dato?.resistente ?? 'Ciprofloxacino, Gentamicina.',
    };
  } catch {
    return {
      esPositivo: true,
      resultadoNegativo: 'NO SE OBSERVA DESARROLLO DE GERMENES PATOGENOS.',
      bacteriaAislada: 'Staphylococcus sp.',
      recuentoColonias: '> 100,000 UFC/ml',
      sensible:
        'Amikacina, Dicloxacilina, Rifampicina, Cloranfenicol, Ceftriaxona, Trimetropin/sulfametoxazol, Penicilina, Kanamicina, Lincomicina, Cefaclor, Amoxicilina, Ampicilina, Clavumox, Clindamicina, Levofloxacino, Cefalexina.',
      intermedio: '',
      resistente: 'Ciprofloxacino, Gentamicina.',
    };
  }
}

export default function CultivoSecrecionOtidica({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosCultivoOtidico>(() => leer(valor));

  const actualizar = (nuevos: Partial<DatosCultivoOtidico>) => {
    const actualizado = { ...datos, ...nuevos };
    setDatos(actualizado);
    onChange(JSON.stringify(actualizado));
  };

  return (
    <div className="space-y-4">
      {/* Detalle de Muestra y Agar */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          👂 Muestra: Secreción Otídica
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
          <div>
            <label className="font-semibold text-slate-600 block mb-1">
              Resultado Microbiológico
            </label>
            <input
              type="text"
              value={datos.resultadoNegativo}
              onChange={(e) => actualizar({ resultadoNegativo: e.target.value })}
              className="w-full rounded-xl border border-slate-300 p-2 font-bold text-slate-800 outline-none focus:border-[#0d7a71]"
            />
          </div>
        ) : (
          /* VISTA SI ES POSITIVO */
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-rose-700 block mb-1">
                  Bacteria Aislada
                </label>
                <input
                  type="text"
                  value={datos.bacteriaAislada}
                  onChange={(e) => actualizar({ bacteriaAislada: e.target.value })}
                  placeholder="Ej. Staphylococcus sp."
                  className="w-full rounded-xl border border-rose-300 p-2 font-bold text-slate-900 bg-rose-50/30 outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Recuento de Colonias
                </label>
                <input
                  type="text"
                  value={datos.recuentoColonias}
                  onChange={(e) => actualizar({ recuentoColonias: e.target.value })}
                  placeholder="Ej. > 100,000 UFC/ml"
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
                placeholder="Antibióticos sensibles..."
                className="w-full rounded-xl border border-slate-300 p-2 font-medium text-slate-800 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-semibold text-amber-700 block mb-1">Intermedio</label>
              <input
                type="text"
                value={datos.intermedio}
                onChange={(e) => actualizar({ intermedio: e.target.value })}
                placeholder="Antibióticos intermedios (opcional)..."
                className="w-full rounded-xl border border-slate-300 p-2 font-medium text-slate-800 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-rose-700 block mb-1">Resistente</label>
              <input
                type="text"
                value={datos.resistente}
                onChange={(e) => actualizar({ resistente: e.target.value })}
                placeholder="Antibióticos resistentes..."
                className="w-full rounded-xl border border-slate-300 p-2 font-medium text-slate-800 outline-none focus:border-rose-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}