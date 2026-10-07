'use client';

import {
  CITA_EJEMPLO,
  TRIAJE_VACIO,
  type CitaModal,
  type DiagnosticoModal,
  type TriajeModal,
  Campo,
  CalendarIcon,
  DocIcon,
  EstadoBadge,
  ModalShell,
  Tarjeta,
  TarjetaPaciente,
  TarjetaTriaje,
  btnPrimary,
  btnSecondary,
} from './ModalBase';

/* =========================================================
   MODAL: CITA "ATENDIDA" (solo lectura)
   No tiene botón Confirmar. "Volver" solo aparece si se pasa
   onVolver (por ejemplo, al abrirlo desde otro modal).
========================================================= */

interface Props {
  cita?: CitaModal;
  triaje?: TriajeModal;
  diagnostico?: DiagnosticoModal;
  onClose: () => void;
  onVolver?: () => void;
}

const DIAGNOSTICO_VACIO: DiagnosticoModal = {
  sintomas: '',
  diagnostico: '',
  indicaciones: '',
  requiereLaboratorio: false,
  examenesLaboratorio: '',
};

export default function ModalCitaAtendida({
  cita = CITA_EJEMPLO,
  triaje = TRIAJE_VACIO,
  diagnostico = DIAGNOSTICO_VACIO,
  onClose,
  onVolver,
}: Props) {
  return (
    <ModalShell
      titulo="Detalle de la cita"
      subtitulo="Triaje, diagnóstico y atención registrados"
      tono="blue"
      onClose={onClose}
      footer={
        <>
          {onVolver && (
            <button type="button" onClick={onVolver} className={btnSecondary}>
              Volver
            </button>
          )}
          <button type="button" onClick={onClose} className={onVolver ? btnPrimary : btnSecondary}>
            Cerrar
          </button>
        </>
      }
    >
      <EstadoBadge tono="blue">Atendida</EstadoBadge>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <TarjetaPaciente cita={cita} completo />
          <TarjetaTriaje triaje={triaje} />
        </div>

        <div className="space-y-5">
          <Tarjeta titulo="Síntomas" icono={<CalendarIcon />}>
            <p className="text-sm leading-6 text-gray-700">{diagnostico.sintomas || '---'}</p>
          </Tarjeta>

          <Tarjeta titulo="Diagnóstico médico" icono={<DocIcon />}>
            <div className="space-y-4">
              <Campo label="Diagnóstico">{diagnostico.diagnostico || '---'}</Campo>
              {diagnostico.indicaciones && (
                <Campo label="Indicaciones y tratamiento">
                  <span className="font-medium text-gray-700">{diagnostico.indicaciones}</span>
                </Campo>
              )}
            </div>
          </Tarjeta>

          <Tarjeta titulo="Orden de laboratorio" icono={<DocIcon />}>
            {diagnostico.requiereLaboratorio ? (
              <Campo label="Exámenes solicitados">{diagnostico.examenesLaboratorio}</Campo>
            ) : (
              <p className="text-sm text-gray-400">No se solicitaron exámenes de laboratorio.</p>
            )}
          </Tarjeta>
        </div>
      </div>
    </ModalShell>
  );
}
