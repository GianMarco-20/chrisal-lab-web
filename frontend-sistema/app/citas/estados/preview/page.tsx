'use client';

import { useState } from 'react';

import ModalInfoPendienteTriaje from '../ModalInfoPendienteTriaje';
import ModalInfoPendienteDiagnostico from '../ModalInfoPendienteDiagnostico';

import ModalCitaPendienteTriaje from '../ModalCitaPendienteTriaje';
import ModalCitaDiagnostico from '../ModalCitaDiagnostico';
import ModalCitaAtendida from '../ModalCitaAtendida';

import ModalInfoAusente from '../ModalInfoAusente';

import ModalCitaCancelada from '../ModalCitaCancelada';
import ModalCitaReprogramar from '../ModalCitaReprogramar';

import type { TriajeModal } from '../ModalBase';

// =========================================================
// ESTADOS DE LOS MODALES
// =========================================================

type ModalAbierto =
  | 'infoTriaje'
  | 'triaje'
  | 'infoDiagnostico'
  | 'diagnostico'
  | 'atendida'
  | 'infoAusente'
  | 'reprogramar'
  | 'cancelada'
  | null;

// =========================================================
// TRIAJE DE EJEMPLO (solo para la vista previa)
// Así, al abrir "Confirmada" ya se ven datos y puedes
// probar el lápiz de editar. Bórralo cuando conectes
// el backend.
// =========================================================

const TRIAJE_PREVIEW: TriajeModal = {
  presionArterial: '120/80',
  frecuenciaCardiaca: '80',
  frecuenciaRespiratoria: '18',
  temperatura: '36.5',
  saturacion: '98',
  peso: '70',
  talla: '170',
  motivoConsulta: 'Dolor de cabeza desde hace dos días',
};

// =========================================================
// ESTADOS QUE APARECEN EN LA VISTA PREVIA
//
// Flujo:
// Pendiente → Confirmada → Atendida → Ausente → Cancelada
// =========================================================

type OpcionClave =
  | 'infoTriaje'
  | 'infoDiagnostico'
  | 'atendida'
  | 'ausente'
  | 'cancelada';

const OPCIONES: {
  clave: OpcionClave;
  estado: string;
  descripcion: string;
  badge: string;
  dot: string;
  listo: boolean;
}[] = [
  {
    clave: 'infoTriaje',
    estado: 'Pendiente',
    descripcion: 'Recepción registra los signos vitales',
    badge: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
    listo: true,
  },

  {
    clave: 'infoDiagnostico',
    estado: 'Confirmada',
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
    descripcion: 'El paciente no asistió durante el día de su cita',
    badge: 'bg-red-50 text-red-600',
    dot: 'bg-red-500',
    listo: true,
  },

  {
    clave: 'cancelada',
    estado: 'Cancelada',
    descripcion: 'Cita cancelada (solo lectura)',
    badge: 'bg-gray-100 text-gray-600',
    dot: 'bg-gray-500',
    listo: true,
  },
];

// =========================================================
// COMPONENTE
// =========================================================

export default function PreviewPage() {
  const [abierto, setAbierto] = useState<ModalAbierto>(null);

  /* Triaje registrado de la cita (vive aquí para poder editarlo) */
  const [triaje, setTriaje] = useState<TriajeModal>(TRIAJE_PREVIEW);

  const cerrar = () => {
    setAbierto(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">

      <div className="w-full max-w-md rounded-[26px] border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

        {/* =====================================================
            ENCABEZADO
        ===================================================== */}

        <h1 className="text-lg font-bold text-gray-900">
          Vista previa de modales
        </h1>

        <p className="mt-1 text-xs text-gray-400">
          Elige un estado para ver su ventana. Solo diseño, sin backend.
        </p>

        {/* =====================================================
            LISTA DE ESTADOS
        ===================================================== */}

        <div className="mt-5 space-y-2.5">
          {OPCIONES.map((op) => (
            <button
              key={op.clave}
              type="button"
              disabled={!op.listo}
              onClick={() => {
                /*
                 * Ausente se abre con su modal de información.
                 */
                if (op.clave === 'ausente') {
                  setAbierto('infoAusente');
                  return;
                }

                /*
                 * Los demás estados se abren directamente.
                 */
                setAbierto(op.clave);
              }}
              className="flex w-full flex-col items-start gap-1.5 rounded-2xl border border-gray-100 bg-white p-4 text-left transition hover:border-[#0d7a71]/30 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-100 disabled:hover:bg-white"
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${op.badge}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${op.dot}`}
                />

                {op.estado}
              </span>

              <span className="text-xs text-gray-500">
                {op.descripcion}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================
          PENDIENTE

          Flujo:

          Pendiente
              ↓
          ModalInfoPendienteTriaje
             ┌────┼────────────┐
             ↓    ↓            ↓
          Triaje Reprogramar Cancelar
             ↓    ↓            ↓
          Modal   Modal       Modal
          Triaje  Reprogramar Cancelada
      ===================================================== */}

      {abierto === 'infoTriaje' && (
        <ModalInfoPendienteTriaje
          onClose={cerrar}

          onRegistrarTriaje={() => {
            setAbierto('triaje');
          }}

          onReprogramar={() => {
            setAbierto('reprogramar');
          }}

          onCancelarCita={() => {
            setAbierto('cancelada');
          }}
        />
      )}

      {/* =====================================================
          FORMULARIO DE TRIAJE

          "Volver" regresa a ModalInfoPendienteTriaje.
          "Guardar" registra el triaje y pasa a Confirmada.
      ===================================================== */}

      {abierto === 'triaje' && (
        <ModalCitaPendienteTriaje
          onClose={cerrar}

          onVolver={() => {
            setAbierto('infoTriaje');
          }}

          onGuardarTriaje={(nuevo) => {
            setTriaje(nuevo);
            setAbierto('infoDiagnostico');
          }}
        />
      )}

      {/* =====================================================
          CONFIRMADA

          Flujo:

          Confirmada
              ↓
          ModalInfoPendienteDiagnostico
              ┌───────┴────────┐
              ↓                ↓
          Registrar        Lápiz (editar triaje
          diagnóstico      en la misma tarjeta)
              ↓
          ModalCitaDiagnostico
      ===================================================== */}

      {abierto === 'infoDiagnostico' && (
        <ModalInfoPendienteDiagnostico
          triaje={triaje}

          onClose={cerrar}

          onGuardarTriaje={(nuevo) => {
            setTriaje(nuevo);
          }}

          onRegistrarDiagnostico={() => {
            setAbierto('diagnostico');
          }}
        />
      )}

      {/* =====================================================
          FORMULARIO DE DIAGNÓSTICO

          "Volver" regresa a ModalInfoPendienteDiagnostico.
      ===================================================== */}

      {abierto === 'diagnostico' && (
        <ModalCitaDiagnostico
          onClose={cerrar}

          onVolver={() => {
            setAbierto('infoDiagnostico');
          }}
        />
      )}

      {/* =====================================================
          ATENDIDA

          Resumen de la atención. El triaje y el diagnóstico
          se pueden editar en la misma ventana.
      ===================================================== */}

      {abierto === 'atendida' && (
        <ModalCitaAtendida
          triaje={triaje}

          onClose={cerrar}

          onGuardarTriaje={(nuevo) => {
            setTriaje(nuevo);
          }}
        />
      )}

      {/* =====================================================
          AUSENTE

          Una cita pasa a Ausente cuando el paciente no llegó
          durante el día y se cambia de día.

          Flujo:

          Ausente
              ↓
          ModalInfoAusente
              ↓
          Reprogramar cita
              ↓
          ModalCitaReprogramar
      ===================================================== */}

      {abierto === 'infoAusente' && (
        <ModalInfoAusente
          onClose={cerrar}

          onReprogramar={() => {
            setAbierto('reprogramar');
          }}
        />
      )}

      {/* =====================================================
          REPROGRAMAR CITA

          Puede llegarse aquí desde:

          1. Pendiente → Reprogramar cita
          2. Ausente → Reprogramar cita
      ===================================================== */}

      {abierto === 'reprogramar' && (
        <ModalCitaReprogramar
          onClose={cerrar}
        />
      )}

      {/* =====================================================
          CANCELADA

          Se llega aquí desde:

          1. Pendiente → Cancelar cita
      ===================================================== */}

      {abierto === 'cancelada' && (
        <ModalCitaCancelada
          onClose={cerrar}
        />
      )}
    </div>
  );
}