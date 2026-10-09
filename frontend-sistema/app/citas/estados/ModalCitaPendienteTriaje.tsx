'use client';

import { useState, type ChangeEvent } from 'react';
import {
  CITA_EJEMPLO,
  TRIAJE_VACIO,
  type CitaModal,
  type TriajeModal,
  DocIcon,
  ModalShell,
  PulseIcon,
  Tarjeta,
  btnPrimary,
  btnSecondary,
  inputClass,
  labelClass,
  textareaClass,
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

export default function ModalCitaPendienteTriaje({
  cita = CITA_EJEMPLO,
  onClose,
  onVolver,
  onGuardarTriaje,
}: Props) {
  const [form, setForm] = useState<TriajeModal>(TRIAJE_VACIO);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* IMC calculado */
  const peso = parseFloat(form.peso);
  const tallaM = parseFloat(form.talla) / 100;
  const imc =
    peso > 0 && tallaM > 0 ? (peso / (tallaM * tallaM)).toFixed(1) : null;

  /* Campo con unidad dentro del input */
  const campo = (
    name: keyof TriajeModal,
    label: string,
    placeholder: string,
    unidad: string,
    extra: {
      type?: string;
      step?: string;
      required?: boolean;
      inputMode?: 'numeric' | 'decimal';
    } = {}
  ) => (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {extra.required && <span className="text-red-500"> *</span>}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${inputClass} pr-14`}
          {...extra}
        />

        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] font-semibold text-gray-400">
          {unidad}
        </span>
      </div>
    </div>
  );

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
        {/* =====================================================
            SIGNOS VITALES
        ===================================================== */}

        <Tarjeta titulo="Signos vitales" icono={<PulseIcon />}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4">
            {campo('presionArterial', 'Presión arterial', '120/80', 'mmHg', {
              required: true,
            })}

            {campo('frecuenciaCardiaca', 'Frec. cardiaca', '80', 'lpm', {
              type: 'number',
              inputMode: 'numeric',
              required: true,
            })}

            {campo('frecuenciaRespiratoria', 'Frec. respiratoria', '18', 'rpm', {
              type: 'number',
              inputMode: 'numeric',
            })}

            {campo('temperatura', 'Temperatura', '36.5', '°C', {
              type: 'number',
              step: '0.1',
              inputMode: 'decimal',
              required: true,
            })}

            {campo('saturacion', 'Saturación O₂', '98', '%', {
              type: 'number',
              inputMode: 'numeric',
            })}

            {campo('peso', 'Peso', '70', 'kg', {
              type: 'number',
              step: '0.1',
              inputMode: 'decimal',
            })}

            {campo('talla', 'Talla', '170', 'cm', {
              type: 'number',
              inputMode: 'numeric',
            })}

            <div>
              <p className={labelClass}>IMC calculado</p>

              <div className="flex h-10 items-center justify-between rounded-xl border border-[#0d7a71]/15 bg-[#0d7a71]/5 px-3 text-sm font-bold text-[#0d7a71]">
                <span>{imc ?? '---'}</span>
                <span className="text-[11px] font-semibold text-[#0d7a71]/60">
                  kg/m²
                </span>
              </div>
            </div>
          </div>
        </Tarjeta>

        {/* =====================================================
            MOTIVO DE CONSULTA
        ===================================================== */}

        <Tarjeta titulo="Motivo de consulta" icono={<DocIcon />}>
          <label htmlFor="motivoConsulta" className="sr-only">
            Motivo de consulta
          </label>

          <textarea
            id="motivoConsulta"
            name="motivoConsulta"
            required
            rows={4}
            value={form.motivoConsulta}
            onChange={handleChange}
            placeholder="Describa por qué acude el paciente"
            className={textareaClass}
          />
        </Tarjeta>
      </form>
    </ModalShell>
  );
}