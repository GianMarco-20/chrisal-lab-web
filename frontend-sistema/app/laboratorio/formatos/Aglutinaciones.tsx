'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosAglutinaciones {
  tificoH: string;
  tificoO: string;
  paratificoA: string;
  paratificoB: string;
  brucellosis: string;
}

const PARAMETROS: { clave: keyof DatosAglutinaciones; etiqueta: string }[] = [
  { clave: 'tificoH', etiqueta: 'TÍFICO "H"' },
  { clave: 'tificoO', etiqueta: 'TÍFICO "O"' },
  { clave: 'paratificoA', etiqueta: 'PARATÍFICO "A"' },
  { clave: 'paratificoB', etiqueta: 'PARATÍFICO "B"' },
  { clave: 'brucellosis', etiqueta: 'BRUCELLOSIS' },
];

const COLUMNAS = 'sm:grid-cols-[1.5fr_2fr]';

function leer(valor: string): DatosAglutinaciones {
  try {
    const dato = JSON.parse(valor);
    return {
      tificoH: typeof dato?.tificoH === 'string' ? dato.tificoH : 'NEGATIVO',
      tificoO: typeof dato?.tificoO === 'string' ? dato.tificoO : 'NEGATIVO',
      paratificoA: typeof dato?.paratificoA === 'string' ? dato.paratificoA : 'NEGATIVO',
      paratificoB: typeof dato?.paratificoB === 'string' ? dato.paratificoB : 'NEGATIVO',
      brucellosis: typeof dato?.brucellosis === 'string' ? dato.brucellosis : 'NEGATIVO',
    };
  } catch {
    return {
      tificoH: 'NEGATIVO',
      tificoO: 'NEGATIVO',
      paratificoA: 'NEGATIVO',
      paratificoB: 'NEGATIVO',
      brucellosis: 'NEGATIVO',
    };
  }
}

export default function Aglutinaciones({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosAglutinaciones>(() => leer(valor));

  const actualizarCampo = (campo: keyof DatosAglutinaciones, nuevoValor: string) => {
    const nuevosDatos = { ...datos, [campo]: nuevoValor };
    setDatos(nuevosDatos);
    onChange(JSON.stringify(nuevosDatos));
  };

  return (
    <div className="space-y-4">
      {/* Detalle de Muestra y Método */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre (Suero)
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🧬 Método: Aglutinación Indirecta
        </span>
      </div>

      {/* Tabla de resultados */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Encabezado */}
        <div
          className={`hidden gap-4 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}
        >
          <span>Examen / Antígeno</span>
          <span>Resultado</span>
        </div>

        <div className="divide-y divide-slate-100">
          {PARAMETROS.map(({ clave, etiqueta }) => (
            <div
              key={clave}
              className={`grid grid-cols-1 items-center gap-3 px-4 py-3 sm:gap-4 ${COLUMNAS}`}
            >
              <div>
                <span className="block text-sm font-semibold text-slate-800">
                  {etiqueta}
                </span>
                <span className="text-xs text-slate-400 sm:hidden">Antígeno</span>
              </div>

              {/* Selector de tipo Botón (Toggle) sin elementos duplicados */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => actualizarCampo(clave, 'NEGATIVO')}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                    datos[clave] === 'NEGATIVO'
                      ? 'bg-emerald-100 text-emerald-800 shadow-sm border border-emerald-300'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  NEGATIVO
                </button>

                <button
                  type="button"
                  onClick={() => actualizarCampo(clave, 'POSITIVO')}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                    datos[clave] === 'POSITIVO'
                      ? 'bg-rose-100 text-rose-800 shadow-sm border border-rose-300'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  POSITIVO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}