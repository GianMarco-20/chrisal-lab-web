'use client';

import {
  CITA_EJEMPLO,
  TRIAJE_VACIO,
  type CitaModal,
  type TriajeModal,
  EstadoBadge,
  ModalShell,
  TarjetaPaciente,
  TarjetaTriaje,
  btnPrimary,
  btnSecondary,
} from './ModalBase';

/* =========================================================
   MODAL INTERMEDIO: CITA "PENDIENTE DE DIAGNÓSTICO"
   Información del paciente + triaje registrado.
   Acciones: Cerrar, Registrar diagnóstico.
========================================================= */

interface Props {
  cita?: CitaModal;
  triaje?: TriajeModal;
  onClose: () => void;
  onRegistrarDiagnostico?: () => void; // abre ModalCitaDiagnostico
}

export default function ModalInfoPendienteDiagnostico({
  cita = CITA_EJEMPLO,
  triaje = TRIAJE_VACIO,
  onClose,
  onRegistrarDiagnostico,
}: Props) {
  return (
    <ModalShell
      titulo="Detalle de la cita"
      subtitulo="Revise la información del paciente y el triaje registrado"
      tono="violet"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={btnSecondary}>
            Cerrar
          </button>
          <button type="button" onClick={onRegistrarDiagnostico} className={btnPrimary}>
            Registrar diagnóstico
          </button>
        </>
      }
    >
      <EstadoBadge tono="violet">Pendiente de diagnóstico</EstadoBadge>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <TarjetaPaciente cita={cita} completo />
        <TarjetaTriaje triaje={triaje} titulo="Triaje registrado" />
      </div>
    </ModalShell>
  );
}
