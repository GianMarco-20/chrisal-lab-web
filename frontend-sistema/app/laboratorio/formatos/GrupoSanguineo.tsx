'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosGrupoSanguineo {
  grupo: string;
  factorRh: string;
}

const COLUMNAS = 'sm:grid-cols-[1.5fr_2fr]';

function leer(valor: string): DatosGrupoSanguineo {
  try {
    const dato = JSON.parse(valor);
    return {
      grupo: typeof dato?.grupo === 'string' ? dato.grupo : '',
      factorRh: typeof dato?.factorRh === 'string' ? dato.factorRh : '',
    };
  } catch {
    return { grupo: '', factorRh: '' };
  }
}

export default function GrupoSanguineo({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosGrupoSanguineo>(() => leer(valor));

  const actualizar = (campo: keyof DatosGrupoSanguineo, texto: string) => {
    const nuevos = { ...datos, [campo]: texto };
    setDatos(nuevos);

    if (nuevos.grupo.trim() !== '' || nuevos.factorRh.trim() !== '') {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre Total
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          ⚡ Método: Aglutinación Directa
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
        </div>

        {/* GRUPO SANGUINEO */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Grupo Sanguíneo</span>
          <select
            value={datos.grupo}
            onChange={(e) => actualizar('grupo', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          >
            <option value="">-- Seleccionar --</option>
            <option value="“ O ”">“ O ”</option>
            <option value="“ A ”">“ A ”</option>
            <option value="“ B ”">“ B ”</option>
            <option value="“ AB ”">“ AB ”</option>
          </select>
        </div>

        {/* FACTOR RH */}
        <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
          <span className="text-sm font-semibold text-slate-800">Factor Rh</span>
          <select
            value={datos.factorRh}
            onChange={(e) => actualizar('factorRh', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
          >
            <option value="">-- Seleccionar --</option>
            <option value="POSITIVO">POSITIVO</option>
            <option value="NEGATIVO">NEGATIVO</option>
          </select>
        </div>
      </div>
    </div>
  );
}