'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosBk {
  muestra1: string;
}

const OPCIONES_RAPIDAS = [
  'NO SE OBSERVAN B.A.A.R.',
  'SE OBSERVA 1 A 9 B.A.A.R.',
  'POSITIVO (+)',
  'POSITIVO (++)',
  'POSITIVO (+++)',
];

const COLUMNAS = 'sm:grid-cols-[1.2fr_2.8fr]';

function leer(valor: string): DatosBk {
  try {
    const dato = JSON.parse(valor);
    return {
      muestra1:
        typeof dato?.muestra1 === 'string' && dato.muestra1.trim() !== ''
          ? dato.muestra1
          : 'NO SE OBSERVAN B.A.A.R.',
    };
  } catch {
    return { muestra1: 'NO SE OBSERVAN B.A.A.R.' };
  }
}

export default function Bk({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosBk>(() => leer(valor));

  const actualizarCampo = (texto: string) => {
    const nuevosDatos = { muestra1: texto };
    setDatos(nuevosDatos);
    onChange(texto.trim() !== '' ? JSON.stringify(nuevosDatos) : '');
  };

  return (
    <div className="space-y-4">
      {/* Detalle de Muestra y Coloración */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧪 Muestra: Esputo
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🎨 Coloración: Ziehl Neelsen
        </span>
      </div>

      {/* Tabla de resultados */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Encabezado */}
        <div
          className={`hidden gap-4 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}
        >
          <span>Muestra</span>
          <span>Resultado Baciloscopía</span>
        </div>

        {/* Fila única: 1° Muestra */}
        <div className={`grid grid-cols-1 items-start gap-3 px-4 py-4 sm:gap-4 ${COLUMNAS}`}>
          <div>
            <span className="block text-sm font-semibold text-slate-800">
              1° Muestra
            </span>
            <span className="text-xs text-slate-400 sm:hidden">Examen B.K.</span>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={datos.muestra1}
              onChange={(e) => actualizarCampo(e.target.value)}
              placeholder="Ingrese el resultado..."
              aria-label="Resultado de la 1° Muestra de B.K."
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
            />

            {/* Opciones predefinidas rápidas */}
            <div className="flex flex-wrap gap-1.5">
              {OPCIONES_RAPIDAS.map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => actualizarCampo(opcion)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    datos.muestra1 === opcion
                      ? 'bg-[#0d7a71] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opcion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}