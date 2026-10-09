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
  onGuardarTriaje?: (triaje: TriajeModal) => void | Promise<void>;
}

export default function ModalCitaPendienteTriaje({ cita = CITA_EJEMPLO, onClose, onVolver, onGuardarTriaje }: Props) {
  const [form, setForm] = useState<TriajeModal>(TRIAJE_VACIO);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onGuardarTriaje) return;
    setErrorGuardar('');
    setGuardando(true);
    try {
      await onGuardarTriaje(form);
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo guardar el triaje.');
    } finally {
      setGuardando(false);
    }
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
          {errorGuardar && <p className="mr-auto text-xs font-semibold text-red-600">{errorGuardar}</p>}
          <button type="button" onClick={onVolver} disabled={guardando} className={btnSecondary}>
            Volver
          </button>
          <button
            type="submit"
            form="form-triaje"
            disabled={guardando}
            className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {guardando ? 'Guardando...' : 'Guardar triaje'}
          </button>
        </>
      }
    >
      <form id="form-triaje" className="space-y-5" onSubmit={handleSubmit}>
        <EstadoBadge tono="amber">Pendiente de triaje</EstadoBadge>
        <TriajeFormulario cita={cita} form={form} onChange={handleChange} />
      </form>
    </ModalShell>
  );
}
