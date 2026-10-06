'use client';

import {
  CITA_EJEMPLO,
  type CitaModal,
  AlertIcon,
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

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  onRegistrarTriaje?: () => void;
  onReprogramar?: () => void;
  onCancelarCita?: () => void;
}

export default function ModalInfoAusente({
  cita = CITA_EJEMPLO,
  onClose,
  onRegistrarTriaje,
  onReprogramar,
  onCancelarCita,
}: Props) {
  return (
    <ModalShell
      titulo="Detalle de la cita"
      subtitulo="El paciente ha superado el tiempo de tolerancia establecido"
      tono="red"
      icono={<AlertIcon size={22} />}
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
      {/* ESTADO */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <EstadoBadge tono="red">
          Ausente
        </EstadoBadge>
      </div>

      {/* AVISO */}
      <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/70 p-4 text-red-700">
        <div className="mt-0.5 shrink-0 text-red-600">
          <AlertIcon size={20} />
        </div>

        <div className="text-xs font-medium leading-relaxed">
          <span className="font-bold">
            Paciente con tardanza:
          </span>{' '}
          El paciente llegó con más de 10 minutos de retraso sobre la
          hora programada ({formatHora(cita.hora)}). Puede proceder a
          registrar el triaje si se le otorgará la atención
          extemporánea o de lo contrario reprogramar/cancelar la cita.
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