'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosHepatico {
  tgo: string;
  tgp: string;
  bilirrubinaTotal: string;
  bilirrubinaDirecta: string;
  bilirrubinaIndirecta: string;
  fosfatasaAlcalina: string;
  proteinasTotales: string;
  albumina: string;
  globulina: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosHepatico {
  try {
    const d = JSON.parse(valor);
    return {
      tgo: d?.tgo ?? '',
      tgp: d?.tgp ?? '',
      bilirrubinaTotal: d?.bilirrubinaTotal ?? '',
      bilirrubinaDirecta: d?.bilirrubinaDirecta ?? '',
      bilirrubinaIndirecta: d?.bilirrubinaIndirecta ?? '',
      fosfatasaAlcalina: d?.fosfatasaAlcalina ?? '',
      proteinasTotales: d?.proteinasTotales ?? '',
      albumina: d?.albumina ?? '',
      globulina: d?.globulina ?? '',
    };
  } catch {
    return {
      tgo: '', tgp: '', bilirrubinaTotal: '', bilirrubinaDirecta: '',
      bilirrubinaIndirecta: '', fosfatasaAlcalina: '', proteinasTotales: '',
      albumina: '', globulina: ''
    };
  }
}

function aNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'));
  return texto.trim() === '' || Number.isNaN(n) ? null : n;
}

export default function PerfilHepatico({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosHepatico>(() => leer(valor));

  const actualizar = (campo: keyof DatosHepatico, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    if (Object.values(nuevos).some((v) => aNumero(v) !== null)) {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  const renderFila = (label: string, campo: keyof DatosHepatico, unidad: string, rango: string) => (
    <div className={`grid grid-cols-1 items-center gap-3 px-4 py-3.5 sm:gap-4 ${COLUMNAS}`}>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <input
        type="text"
        inputMode="decimal"
        value={datos[campo]}
        onChange={(e) => actualizar(campo, e.target.value)}
        placeholder="0.00"
        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
      />
      <span className="text-sm font-medium text-slate-500">{unidad}</span>
      <div className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700">
        <span>RANGO NORMAL:</span> <span>{rango}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre (Suero)
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          ⚡ Método: Cinético
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: BIOELAB ES-102
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {renderFila('TGO', 'tgo', 'U/L', '0.0 – 50.0 U/L')}
        {renderFila('TGP', 'tgp', 'U/L', '0.0 – 45.0 U/L')}
        {renderFila('Bilirrubina Total', 'bilirrubinaTotal', 'mg/dL', 'Hasta 1.20 mg/dL')}
        {renderFila('Bilirrubina Directa', 'bilirrubinaDirecta', 'mg/dL', 'Hasta 0.50 mg/dL')}
        {renderFila('Bilirrubina Indirecta', 'bilirrubinaIndirecta', 'mg/dL', 'Hasta 0.70 mg/dL')}
        {renderFila('Fosfatasa Alcalina', 'fosfatasaAlcalina', 'U/L', '53.0 – 128.0 U/L')}
        {renderFila('Proteínas Totales', 'proteinasTotales', 'g/dL', '6.40 – 8.30 g/dL')}
        {renderFila('Albúmina', 'albumina', 'g/dL', '3.50 – 5.20 g/dL')}
        {renderFila('Globulina', 'globulina', 'g/dL', '2.20 – 3.50 g/dL')}
      </div>
    </div>
  );
}