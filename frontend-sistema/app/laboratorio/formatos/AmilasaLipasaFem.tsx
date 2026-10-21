'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosAmilasaLipasaFem {
  lipasa: string;
  amilasa: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosAmilasaLipasaFem {
  try {
    const dato = JSON.parse(valor);
    return {
      lipasa: typeof dato?.lipasa === 'string' ? dato.lipasa : '',
      amilasa: typeof dato?.amilasa === 'string' ? dato.amilasa : '',
    };
  } catch {
    return { lipasa: '', amilasa: '' };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function AmilasaLipasaFem({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosAmilasaLipasaFem>(() => leer(valor));

  const actualizarCampo = (campo: keyof DatosAmilasaLipasaFem, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevosDatos = { ...datos, [campo]: limpio };
    setDatos(nuevosDatos);

    const hayLipasa = aNumero(nuevosDatos.lipasa) !== null;
    const hayAmilasa = aNumero(nuevosDatos.amilasa) !== null;

    // Se guarda el objeto JSON si al menos uno de los campos contiene valor
    if (hayLipasa || hayAmilasa) {
      onChange(JSON.stringify(nuevosDatos));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Detalle de Muestra, Método y Equipo */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            🩸 Muestra: Sangre (Suero)
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            ⚡ Método: Cinético
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            🔬 Analizador: Mindray BS-120
          </span>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
          <span>♀</span>
          <span>Valores de Referencia Femeninos</span>
        </span>
      </div>

      {/* Tabla de resultados */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Encabezado */}
        <div
          className={`hidden gap-4 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}
        >
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Fila: LIPASA */}
          <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
            <div>
              <span className="block text-sm font-semibold text-slate-800">
                Lipasa
              </span>
              <span className="text-xs text-slate-400 sm:hidden">Parámetro</span>
            </div>

            <div>
              <input
                type="text"
                inputMode="decimal"
                value={datos.lipasa}
                onChange={(e) => actualizarCampo('lipasa', e.target.value)}
                placeholder="0.0"
                aria-label="Resultado de Lipasa"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
              />
            </div>

            <div className="text-sm font-medium text-slate-500">
              UI/L
            </div>

            <div>
              <div className="flex items-center justify-between rounded-lg border border-pink-200 bg-pink-50/80 px-2.5 py-1.5 text-xs font-bold text-pink-700">
                <span>♀ MUJERES:</span>
                <span>Menor 58.0 UI/L</span>
              </div>
            </div>
          </div>

          {/* Fila: AMILASA */}
          <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
            <div>
              <span className="block text-sm font-semibold text-slate-800">
                Amilasa
              </span>
              <span className="text-xs text-slate-400 sm:hidden">Parámetro</span>
            </div>

            <div>
              <input
                type="text"
                inputMode="decimal"
                value={datos.amilasa}
                onChange={(e) => actualizarCampo('amilasa', e.target.value)}
                placeholder="0.0"
                aria-label="Resultado de Amilasa"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
              />
            </div>

            <div className="text-sm font-medium text-slate-500">
              UI/L
            </div>

            <div>
              <div className="flex items-center justify-between rounded-lg border border-pink-200 bg-pink-50/80 px-2.5 py-1.5 text-xs font-bold text-pink-700">
                <span>♀ MUJERES:</span>
                <span>21.0 – 100.0 UI/L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}