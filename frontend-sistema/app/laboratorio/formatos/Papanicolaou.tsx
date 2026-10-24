'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosPap {
  macroscopica: string;
  microscopica: string;
  floraBacteriana: string;
  metaplasia: string;
  eritrocitos: string;
}

function leer(valor: string): DatosPap {
  try {
    const d = JSON.parse(valor);
    return {
      macroscopica: d?.macroscopica ?? 'Se recibe una laminilla con extendido celular y fijada. Se lava en alcohol de 96° y se tiñe con técnica de Papanicolaou.',
      microscopica: d?.microscopica ?? 'Sin anormalidades en el epitelio escamoso. Cambios celulares reactivos asociados a inflamación. (++)',
      floraBacteriana: d?.floraBacteriana ?? 'Flora bacteriana mixta ++',
      metaplasia: d?.metaplasia ?? 'No',
      eritrocitos: d?.eritrocitos ?? '+',
    };
  } catch {
    return {
      macroscopica: 'Se recibe una laminilla con extendido celular y fijada. Se lava en alcohol de 96° y se tiñe con técnica de Papanicolaou.',
      microscopica: 'Sin anormalidades en el epitelio escamoso. Cambios celulares reactivos asociados a inflamación. (++)',
      floraBacteriana: 'Flora bacteriana mixta ++',
      metaplasia: 'No',
      eritrocitos: '+',
    };
  }
}

export default function Papanicolaou({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosPap>(() => leer(valor));

  const actualizar = (campo: keyof DatosPap, texto: string) => {
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
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        {/* DESCRIPCIÓN MACROSCÓPICA */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Descripción Macroscópica
          </label>
          <textarea
            rows={2}
            value={datos.macroscopica}
            onChange={(e) => actualizar('macroscopica', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
        </div>

        {/* EXAMEN MICROSCÓPICO */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Examen Microscópico
          </label>
          <textarea
            rows={2}
            value={datos.microscopica}
            onChange={(e) => actualizar('microscopica', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#0d7a71]"
          />
        </div>

        {/* INFORME DETALLADO */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Informe
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1">Flora bacteriana:</span>
              <input
                type="text"
                value={datos.floraBacteriana}
                onChange={(e) => actualizar('floraBacteriana', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
              />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1">Metaplasia escamosa:</span>
              <input
                type="text"
                value={datos.metaplasia}
                onChange={(e) => actualizar('metaplasia', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
              />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1">Eritrocitos:</span>
              <input
                type="text"
                value={datos.eritrocitos}
                onChange={(e) => actualizar('eritrocitos', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}