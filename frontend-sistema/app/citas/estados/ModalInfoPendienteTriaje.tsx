'use client';

import {
  CITA_EJEMPLO,
  type CitaModal,
  Campo,
  CalendarIcon,
  EstadoBadge,
  ModalShell,
  Tarjeta,
  TarjetaPaciente,
  btnDanger,
  btnPrimary,
  btnSecondary,
  formatFecha,
  formatHora,
} from './ModalBase';

/* =========================================================
   MODAL INTERMEDIO: CITA "PENDIENTE DE TRIAJE"

   Acciones:
   - Cancelar cita
   - Reprogramar cita
   - Registrar triaje

   La información de la cita se muestra únicamente en
   "Información de la cita".

   La tarjeta del paciente queda únicamente para datos
   propios del paciente, evitando repetir fecha, hora
   y servicio.
========================================================= */

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  onRegistrarTriaje?: () => void;
  onReprogramar?: () => void;
  onCancelarCita?: () => void;
}

export default function ModalInfoPendienteTriaje({
  cita = CITA_EJEMPLO,
  onClose,
  onRegistrarTriaje,
  onReprogramar,
  onCancelarCita,
}: Props) {
  return (
    <ModalShell
      titulo="Detalle de la cita"
      subtitulo="Revise la información del paciente y la cita"
      tono="amber"
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onCancelarCita}
            className={btnDanger}
          >
            Cancelar cita
          </button>

          <button
            type="button"
            onClick={onReprogramar}
            className={btnSecondary}
          >
            Reprogramar cita
          </button>

          <button
            type="button"
            onClick={onRegistrarTriaje}
            className={btnPrimary}
          >
            Registrar triaje
          </button>
        </>
      }
    >
      {/* =====================================================
          ESTADO
      ===================================================== */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <EstadoBadge tono="amber">
          Pendiente de triaje
        </EstadoBadge>
      </div>

      {/* =====================================================
          INFORMACIÓN PRINCIPAL
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* ===================================================
            INFORMACIÓN DE LA CITA
        =================================================== */}

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

              <Campo label="Hora">
                {formatHora(cita.hora)}
              </Campo>
            </div>

          </div>
        </Tarjeta>

        {/* ===================================================
            INFORMACIÓN DEL PACIENTE

            Aquí usamos TarjetaPaciente, pero la idea es que
            esta tarjeta muestre únicamente datos del paciente
            y no vuelva a mostrar fecha, hora ni servicio.
        =================================================== */}

        <TarjetaPaciente cita={cita} />

      </div>
    </ModalShell>
  );
}