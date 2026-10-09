'use client';

import {
  CITA_EJEMPLO,
  type CitaModal,
  AlertIcon,
  Campo,
  CalendarIcon,
  ModalShell,
  Tarjeta,
  TarjetaPaciente,
  btnPrimary,
  formatFecha,
  formatHora,
} from './ModalBase';

/* =========================================================
   MODAL: CITA "CANCELADA" (solo lectura)
========================================================= */

interface Props {
  cita?: CitaModal;
  onClose: () => void;
}

export default function ModalCitaCancelada({
  cita = CITA_EJEMPLO,
  onClose,
}: Props) {
  return (
    <ModalShell
      titulo="Cancelada"
      subtitulo="La cita ha sido cancelada y no continuará con el proceso de atención"
      tono="gray"
      icono={<AlertIcon size={22} />}
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onClose}
          className={btnPrimary}
        >
          Cerrar
        </button>
      }
    >
      {/* =====================================================
          AVISO DE CANCELACIÓN
      ===================================================== */}

      <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-100/70 p-4 text-gray-600">
        <div className="mt-0.5 shrink-0 text-gray-500">
          <AlertIcon size={20} />
        </div>

        <div className="text-xs font-medium leading-relaxed">
          <span className="font-bold">
            Cita cancelada:
          </span>{' '}
          Esta cita ha sido cancelada y no continuará con el proceso
          de atención. La información mostrada es únicamente de
          consulta.
        </div>
      </div>

      {/* =====================================================
          INFORMACIÓN DE LA CITA + PACIENTE
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* -------------------------------------------------
            INFORMACIÓN DE LA CITA
        ------------------------------------------------- */}

        <Tarjeta
          titulo="Información de la cita"
          icono={<CalendarIcon />}
        >
          <div className="space-y-4">
            <Campo label="N° de cita">
              {cita.id}
            </Campo>

            <Campo label="Servicio / especialidad">
              {cita.especialidad}
            </Campo>

            <Campo label="Médico asignado">
              {cita.medico}
            </Campo>

            <div className="grid grid-cols-2 gap-4">
              <Campo label="Fecha">
                {formatFecha(cita.fecha)}
              </Campo>

              <Campo label="Hora programada">
                {formatHora(cita.hora)}
              </Campo>
            </div>
          </div>
        </Tarjeta>

        {/* -------------------------------------------------
            INFORMACIÓN DEL PACIENTE
        ------------------------------------------------- */}

        <TarjetaPaciente cita={cita} />
      </div>
    </ModalShell>
  );
}