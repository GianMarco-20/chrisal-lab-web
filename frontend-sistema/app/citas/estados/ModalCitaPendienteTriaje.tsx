'use client';

import { useState, type ChangeEvent } from 'react';
import {
  CITA_EJEMPLO,
  TRIAJE_VACIO,
  type CitaModal,
  type TriajeModal,
  EstadoBadge,
  ModalShell,
  PulseIcon,
  TriajeFormulario,
  btnPrimary,
  btnSecondary,
} from './ModalBase';

/* =========================================================
   MODAL: CITA "PENDIENTE DE TRIAJE" (formulario)
   "Volver" regresa a ModalInfoPendienteTriaje.
========================================================= */

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  onVolver: () => void; // regresa a ModalInfoPendienteTriaje
  onGuardarTriaje?: (triaje: TriajeModal) => void;
}

export default function ModalCitaPendienteTriaje({ cita = CITA_EJEMPLO, onClose, onVolver, onGuardarTriaje }: Props) {
  const [form, setForm] = useState<TriajeModal>(TRIAJE_VACIO);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalShell
      titulo="Registrar triaje"
      subtitulo="Ingrese los signos vitales del paciente"
      tono="amber"
      icono={<PulseIcon size={22} />}
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onVolver} className={btnSecondary}>
            Volver
          </button>
          <button type="submit" form="form-triaje" className={btnPrimary}>
            Guardar triaje
          </button>
        </>
      }
    >
      <form
        id="form-triaje"
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onGuardarTriaje?.(form);
        }}
      >
        <EstadoBadge tono="amber">Pendiente de triaje</EstadoBadge>
        <TriajeFormulario cita={cita} form={form} onChange={handleChange} />
      </form>
    </ModalShell>
  );
}
