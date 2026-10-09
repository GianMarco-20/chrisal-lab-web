'use client';

import { useState } from 'react';

import {
  CITA_EJEMPLO,
  TRIAJE_VACIO,
  type CitaModal,
  type TriajeModal,
  AlertIcon,
  ModalShell,
  TriajeFormulario,
  btnPrimary,
  btnSecondary,
} from './ModalBase';

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  onGuardar?: (triaje: TriajeModal) => void | Promise<void>;
}

export default function ModalCitaAusente({
  cita = CITA_EJEMPLO,
  onClose,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<TriajeModal>(TRIAJE_VACIO);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onGuardar) return;
    setErrorGuardar('');
    setGuardando(true);
    try {
      await onGuardar(form);
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo guardar el triaje.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ModalShell
      titulo="Registrar triaje"
      subtitulo="Registro de triaje para paciente con cita ausente"
      tono="red"
      icono={<AlertIcon size={22} />}
      onClose={onClose}
      footer={
        <>
          {errorGuardar && <p className="mr-auto text-xs font-semibold text-red-600">{errorGuardar}</p>}
          <button
            type="button"
            onClick={onClose}
            disabled={guardando}
            className={btnSecondary}
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="form-triaje-ausente"
            disabled={guardando}
            className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {guardando ? 'Guardando...' : 'Guardar triaje'}
          </button>
        </>
      }
    >
      <form
        id="form-triaje-ausente"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="rounded-2xl border border-red-100 bg-red-50/70 p-4 text-red-700">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              <AlertIcon size={20} />
            </div>

            <div className="text-xs font-medium leading-relaxed">
              <p className="font-bold">
                Atención extemporánea
              </p>

              <p className="mt-1">
                El paciente tiene una cita registrada como ausente,
                pero se procederá con el registro del triaje.
              </p>
            </div>
          </div>
        </div>

        <TriajeFormulario
          cita={cita}
          form={form}
          onChange={handleChange}
        />
      </form>
    </ModalShell>
  );
}