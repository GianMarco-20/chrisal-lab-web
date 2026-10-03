'use client';

import { useState } from 'react';
import ModalCitaPendienteTriaje from '../ModalCitaPendienteTriaje';
import ModalCitaDiagnostico from '../ModalCitaDiagnostico';
import ModalCitaAtendida from '../ModalCitaAtendida';

type ModalAbierto = 'triaje' | 'diagnostico' | 'atendida' | 'ausente' | null;

const OPCIONES: {
  clave: Exclude<ModalAbierto, null>;
  estado: string;
  descripcion: string;
  badge: string;
  dot: string;
  listo: boolean;
}[] = [
  {
    clave: 'triaje',
    estado: 'Pendiente de Triaje',
    descripcion: 'Recepción registra los signos vitales',
    badge: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
    listo: true,
  },
  {
    clave: 'diagnostico',
    estado: 'Pendiente de Diagnóstico',
    descripcion: 'El médico registra síntomas y diagnóstico',
    badge: 'bg-violet-50 text-violet-700',
    dot: 'bg-violet-500',
    listo: true,
  },
  {
    clave: 'atendida',
    estado: 'Atendida',
    descripcion: 'Ver los datos de una cita ya atendida',
    badge: 'bg-blue-50 text-blue-700',
    dot: 'bg-blue-500',
    listo: true,
  },
  {
    clave: 'ausente',
    estado: 'Ausente',
    descripcion: 'El paciente no llegó (pasaron 10 minutos)',
    badge: 'bg-red-50 text-red-600',
    dot: 'bg-red-500',
    listo: true,
  },
];

export default function PreviewPage() {
  const [abierto, setAbierto] = useState<ModalAbierto>(null);
  const cerrar = () => setAbierto(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md rounded-[26px] border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <h1 className="text-lg font-bold text-gray-900">Vista previa de modales</h1>
        <p className="mt-1 text-xs text-gray-400">Elige un estado para ver su ventana. Solo diseño, sin backend.</p>

        <div className="mt-5 space-y-2.5">
          {OPCIONES.map((op) => (
            <button
              key={op.clave}
              type="button"
              disabled={!op.listo}
              onClick={() => setAbierto(op.clave)}
              className="flex w-full flex-col items-start gap-1.5 rounded-2xl border border-gray-100 bg-white p-4 text-left transition hover:border-[#0d7a71]/30 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-100 disabled:hover:bg-white"
            >
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${op.badge}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${op.dot}`} />
                {op.estado}
              </span>
              <span className="text-xs text-gray-500">
                {op.descripcion}
              </span>
            </button>
          ))}
        </div>
      </div>

      {abierto === 'triaje' && <ModalCitaPendienteTriaje onClose={cerrar} />}
      {abierto === 'diagnostico' && <ModalCitaDiagnostico onClose={cerrar} />}
      {abierto === 'atendida' && <ModalCitaAtendida onClose={cerrar} />}
      {/* Ausente reutiliza el modal de Triaje con la propiedad "ausente" */}
      {abierto === 'ausente' && <ModalCitaPendienteTriaje ausente onClose={cerrar} />}
    </div>
  );
}
