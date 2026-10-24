'use client';

import { useState } from 'react';

export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

interface DatosHemograma {
  hematies: string;
  hemoglobina: string;
  hematocrito: string;
  mcv: string;
  mch: string;
  mchc: string;
  rdwCv: string;
  rdwSd: string;
  plaquetas: string;
  mpv: string;
  pdw: string;
  pct: string;
  leucocitos: string;
  neutrofilosAbs: string;
  linfocitosAbs: string;
  monocitosAbs: string;
  eosinofilosAbs: string;
  basofilosAbs: string;
  segmentados: string;
  abastonados: string;
  neutrofilosPct: string;
  linfocitosPct: string;
  monocitosPct: string;
  eosinofilosPct: string;
  basofilosPct: string;
}

const COLUMNAS = 'sm:grid-cols-[1.2fr_1fr_0.6fr_1.4fr]';

function leer(valor: string): DatosHemograma {
  try {
    const d = JSON.parse(valor);
    return {
      hematies: d?.hematies ?? '',
      hemoglobina: d?.hemoglobina ?? '',
      hematocrito: d?.hematocrito ?? '',
      mcv: d?.mcv ?? '',
      mch: d?.mch ?? '',
      mchc: d?.mchc ?? '',
      rdwCv: d?.rdwCv ?? '',
      rdwSd: d?.rdwSd ?? '',
      plaquetas: d?.plaquetas ?? '',
      mpv: d?.mpv ?? '',
      pdw: d?.pdw ?? '',
      pct: d?.pct ?? '',
      leucocitos: d?.leucocitos ?? '',
      neutrofilosAbs: d?.neutrofilosAbs ?? '',
      linfocitosAbs: d?.linfocitosAbs ?? '',
      monocitosAbs: d?.monocitosAbs ?? '',
      eosinofilosAbs: d?.eosinofilosAbs ?? '',
      basofilosAbs: d?.basofilosAbs ?? '',
      segmentados: d?.segmentados ?? '',
      abastonados: d?.abastonados ?? '',
      neutrofilosPct: d?.neutrofilosPct ?? '',
      linfocitosPct: d?.linfocitosPct ?? '',
      monocitosPct: d?.monocitosPct ?? '',
      eosinofilosPct: d?.eosinofilosPct ?? '',
      basofilosPct: d?.basofilosPct ?? '',
    };
  } catch {
    return {
      hematies: '', hemoglobina: '', hematocrito: '', mcv: '', mch: '', mchc: '', rdwCv: '', rdwSd: '',
      plaquetas: '', mpv: '', pdw: '', pct: '',
      leucocitos: '', neutrofilosAbs: '', linfocitosAbs: '', monocitosAbs: '', eosinofilosAbs: '', basofilosAbs: '',
      segmentados: '', abastonados: '', neutrofilosPct: '', linfocitosPct: '', monocitosPct: '', eosinofilosPct: '', basofilosPct: ''
    };
  }
}

export default function HemogramaAutomatizado({ valor, onChange }: FormatoProps) {
  const [datos, setDatos] = useState<DatosHemograma>(() => leer(valor));

  const actualizar = (campo: keyof DatosHemograma, texto: string) => {
    const limpio = texto.replace(/[^0-9.,]/g, '');
    const nuevos = { ...datos, [campo]: limpio };
    setDatos(nuevos);

    const tieneAlgúnValor = Object.values(nuevos).some((v) => v.trim() !== '');
    if (tieneAlgúnValor) {
      onChange(JSON.stringify(nuevos));
    } else {
      onChange('');
    }
  };

  const renderFila = (label: string, campo: keyof DatosHemograma, unidad: string, rango: string) => (
    <div className={`grid grid-cols-1 items-center gap-3 px-4 py-2 sm:gap-4 ${COLUMNAS}`}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <input
        type="text"
        inputMode="decimal"
        value={datos[campo]}
        onChange={(e) => actualizar(campo, e.target.value)}
        placeholder="0"
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0d7a71]"
      />
      <span className="text-xs font-medium text-slate-500">{unidad}</span>
      <span className="text-xs font-semibold text-slate-600">{rango}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🩸 Muestra: Sangre Total
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          🔬 Analizador: Automatizado URIT BH 40P
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
        <div className={`hidden gap-4 bg-slate-50/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid ${COLUMNAS}`}>
          <span>Examen / Parámetro</span>
          <span>Resultado</span>
          <span>Unidad</span>
          <span>Valores de Referencia</span>
        </div>

        {/* SERIE ROJA */}
        <div className="bg-slate-100/70 px-4 py-1.5 text-xs font-bold uppercase text-slate-700">Serie Roja</div>
        {renderFila('Hematíes', 'hematies', 'uL', '3,500,000 – 5,500,000')}
        {renderFila('Hemoglobina (Hb)', 'hemoglobina', 'g/dL', '11.0 – 16.0')}
        {renderFila('Hematocrito (Hto)', 'hematocrito', '%', '37.0 – 54.0')}
        {renderFila('MCV', 'mcv', 'fL', '80.0 – 100.0')}
        {renderFila('MCH', 'mch', 'pg', '27.0 – 34.0')}
        {renderFila('MCHC', 'mchc', 'g/dL', '32.0 – 36.0')}
        {renderFila('RDW-CV', 'rdwCv', '%', '11.0 – 16.0')}
        {renderFila('RDW-SD', 'rdwSd', 'fL', '35.0 – 56.0')}

        {/* SERIE PLAQUETARIA */}
        <div className="bg-slate-100/70 px-4 py-1.5 text-xs font-bold uppercase text-slate-700">Serie Plaquetaria</div>
        {renderFila('Plaquetas', 'plaquetas', 'uL', '150,000 – 450,000')}
        {renderFila('MPV', 'mpv', 'fL', '6.5 – 12.0')}
        {renderFila('PDW', 'pdw', 'fL', '9.0 – 17.0')}
        {renderFila('PCT', 'pct', '%', '0.108 – 0.282')}

        {/* SERIE BLANCA */}
        <div className="bg-slate-100/70 px-4 py-1.5 text-xs font-bold uppercase text-slate-700">Serie Blanca</div>
        {renderFila('Leucocitos', 'leucocitos', 'uL', '4,000 – 10,000')}
        {renderFila('Neutrófilos', 'neutrofilosAbs', 'uL', '2,000 – 7,000')}
        {renderFila('Linfocitos', 'linfocitosAbs', 'uL', '800 – 4,000')}
        {renderFila('Monocitos', 'monocitosAbs', 'uL', '0 – 800')}
        {renderFila('Eosinófilos', 'eosinofilosAbs', 'uL', '0 – 450')}
        {renderFila('Basófilos', 'basofilosAbs', 'uL', '0 – 200')}

        {/* FÓRMULA DIFERENCIAL */}
        <div className="bg-slate-100/70 px-4 py-1.5 text-xs font-bold uppercase text-slate-700">Fórmula Diferencial</div>
        {renderFila('Segmentados', 'segmentados', '%', '40.0 – 70.0')}
        {renderFila('Abastonados', 'abastonados', '%', '0.0')}
        {renderFila('Neutrófilos', 'neutrofilosPct', '%', '40.0 – 75.0')}
        {renderFila('Linfocitos', 'linfocitosPct', '%', '20.0 – 40.0')}
        {renderFila('Monocitos', 'monocitosPct', '%', '2.0 – 11.0')}
        {renderFila('Eosinófilos', 'eosinofilosPct', '%', '1.0 – 4.0')}
        {renderFila('Basófilos', 'basofilosPct', '%', '0.0 – 2.0')}
      </div>
    </div>
  );
}