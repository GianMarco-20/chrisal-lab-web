'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosUrocultivo {
  tipoResultado: 'NEGATIVO' | 'POSITIVO';
  gramPositivo: string;
  gramNegativo: string;
  bacteriaAislada: string;
  recuentoColonias: string;
  sensible: string;
  intermedio: string;
  resistente: string;
}

function leer(valor: string): DatosUrocultivo {
  try {
    const d = JSON.parse(valor);
    return {
      tipoResultado: d?.tipoResultado === 'POSITIVO' ? 'POSITIVO' : 'NEGATIVO',
      gramPositivo: d?.gramPositivo ?? 'NEGATIVO',
      gramNegativo: d?.gramNegativo ?? 'NEGATIVO',
      bacteriaAislada: d?.bacteriaAislada ?? '',
      recuentoColonias: d?.recuentoColonias ?? '> 100,000 UFC/ml',
      sensible: d?.sensible ?? '',
      intermedio: d?.intermedio ?? '',
      resistente: d?.resistente ?? '',
    };
  } catch {
    return {
      tipoResultado: 'NEGATIVO',
      gramPositivo: 'NEGATIVO',
      gramNegativo: 'NEGATIVO',
      bacteriaAislada: '',
      recuentoColonias: '> 100,000 UFC/ml',
      sensible: '',
      intermedio: '',
      resistente: '',
    };
  }
}

export default function Urocultivo({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosUrocultivo>(() => leer(valor));

  const actualizar = (campo: keyof DatosUrocultivo, texto: any) => {
    const nuevos = { ...datos, [campo]: texto };
    setDatos(nuevos);

    if (nuevos.tipoResultado === 'NEGATIVO') {
      onChange(JSON.stringify(nuevos));
    } else if (nuevos.bacteriaAislada.trim() !== '') {
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
          🧫 Agar: MacConkey
        </span>
      </div>

      {/* SELECTOR TIPO RESULTADO */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Resultado del Cultivo
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => actualizar('tipoResultado', 'NEGATIVO')}
            className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
              datos.tipoResultado === 'NEGATIVO'
                ? 'bg-[#0d7a71] text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            NEGATIVO (Sin Crecimiento)
          </button>
          <button
            type="button"
            onClick={() => actualizar('tipoResultado', 'POSITIVO')}
            className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
              datos.tipoResultado === 'POSITIVO'
                ? 'bg-[#0d7a71] text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            POSITIVO (Bacteria Aislada)
          </button>
        </div>
      </div>

      {/* RESULTADO NEGATIVO */}
      {datos.tipoResultado === 'NEGATIVO' && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
          <div className="grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:grid-cols-[1.5fr_2.5fr]">
            <span className="text-sm font-semibold text-slate-800">Cultivo Gram +</span>
            <input
              type="text"
              value={datos.gramPositivo}
              onChange={(e) => actualizar('gramPositivo', e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:grid-cols-[1.5fr_2.5fr]">
            <span className="text-sm font-semibold text-slate-800">Cultivo Gram -</span>
            <input
              type="text"
              value={datos.gramNegativo}
              onChange={(e) => actualizar('gramNegativo', e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
            />
          </div>
        </div>
      )}

      {/* RESULTADO POSITIVO & ANTIBIOGRAMA */}
      {datos.tipoResultado === 'POSITIVO' && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Bacteria Aislada
              </label>
              <input
                type="text"
                value={datos.bacteriaAislada}
                onChange={(e) => actualizar('bacteriaAislada', e.target.value)}
                placeholder="Ej. ESCHERICHIA COLI / STAPHYLOCOCCUS SPP."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Recuento de Colonias
              </label>
              <input
                type="text"
                value={datos.recuentoColonias}
                onChange={(e) => actualizar('recuentoColonias', e.target.value)}
                placeholder="> 100,000 UFC/ml"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Antibiograma</h4>
            <div>
              <label className="block text-xs font-bold text-emerald-600 mb-1">Sensible</label>
              <textarea
                rows={2}
                value={datos.sensible}
                onChange={(e) => actualizar('sensible', e.target.value)}
                placeholder="Imipinem, Amikacina, Ceftriaxona..."
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#0d7a71]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-600 mb-1">Intermedio</label>
              <input
                type="text"
                value={datos.intermedio}
                onChange={(e) => actualizar('intermedio', e.target.value)}
                placeholder="Nitrofurantoina, ..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-900 outline-none transition focus:border-[#0d7a71]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-rose-600 mb-1">Resistente</label>
              <textarea
                rows={2}
                value={datos.resistente}
                onChange={(e) => actualizar('resistente', e.target.value)}
                placeholder="Ciprofloxacina, Amoxicilina Ac. Clavulanico..."
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#0d7a71]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}