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
  btnSecondary,
  formatFecha,
  formatHora,
} from './ModalBase';

/* =========================================================
   MODAL INTERMEDIO: CITA "AUSENTE"

   Una cita pasa a Ausente cuando el paciente no llegó
   durante el día de su cita y se cambió de día.

   Acciones:
   - Cerrar
   - Reprogramar cita
========================================================= */

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  onReprogramar?: () => void;
}

export default function ModalInfoAusente({
  cita = CITA_EJEMPLO,
  onClose,
  onReprogramar,
}: Props) {
  return (
    <ModalShell
      titulo="Ausente"
      subtitulo="El paciente no asistió a su cita programada"
      tono="red"
      icono={<AlertIcon size={22} />}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className={btnSecondary}
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={onReprogramar}
            className={btnPrimary}
          >
            Reprogramar cita
          </button>
        </>
      }
    >
      {/* AVISO */}
      <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/70 p-4 text-red-700">
        <div className="mt-0.5 shrink-0 text-red-600">
          <AlertIcon size={20} />
        </div>

        <div className="text-xs font-medium leading-relaxed">
          <span className="font-bold">
            Paciente ausente:
          </span>{' '}
          El paciente no se presentó durante el día de su cita (
          {formatFecha(cita.fecha)}, {formatHora(cita.hora)}) y la cita
          quedó como ausente al pasar al día siguiente. Puede
          reprogramarla para otra fecha y hora.
        </div>
      </div>

      {/* INFORMACIÓN */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

        <TarjetaPaciente cita={cita} />
      </div>
    </ModalShell>
  );
}