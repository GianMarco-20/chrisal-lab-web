'use client';

import { useState, type ChangeEvent } from 'react';
import {
  type CitaModal,
  type DiagnosticoModal,
  DocIcon,
  ModalShell,
  PulseIcon,
  Tarjeta,
  btnPrimary,
  btnSecondary,
  textareaClass,
} from './ModalBase';

/* =========================================================
   MODAL: CITA "PENDIENTE DE DIAGNÓSTICO" (formulario)
   "Volver" regresa a ModalInfoPendienteDiagnostico.

   Distribución:
   - Izquierda: Síntomas + Diagnóstico
   - Derecha:   Indicaciones y tratamiento + Laboratorio
========================================================= */

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  onVolver: () => void; // regresa a ModalInfoPendienteDiagnostico
  onFinalizar?: (diagnostico: DiagnosticoModal) => void;
}

const FORM_VACIO: DiagnosticoModal = {
  sintomas: '',
  diagnostico: '',
  indicaciones: '',
  requiereLaboratorio: false,
  examenesLaboratorio: '',
};

/* =========================================================
   ÍCONOS PROPIOS DE ESTE MODAL
========================================================= */

const iconProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const PillIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="M10.5 20.5a4.95 4.95 0 0 1-7-7l10-10a4.95 4.95 0 0 1 7 7z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
);

const FlaskIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" />
    <path d="M7.5 15h9" />
  </svg>
);

/* =========================================================
   PIEZAS LOCALES
========================================================= */

/** Etiqueta + ayuda corta sobre cada campo grande */
function Encabezado({
  htmlFor,
  label,
  ayuda,
  requerido = false,
}: {
  htmlFor: string;
  label: string;
  ayuda?: string;
  requerido?: boolean;
}) {
  return (
    <div className="mb-2">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold text-gray-700"
      >
        {label}
        {requerido && <span className="text-red-500"> *</span>}
      </label>

      {ayuda && (
        <p className="mt-0.5 text-[11px] text-gray-400">{ayuda}</p>
      )}
    </div>
  );
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function ModalCitaDiagnostico({
  onClose,
  onVolver,
  onFinalizar,
}: Props) {
  const [form, setForm] = useState<DiagnosticoModal>(FORM_VACIO);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const lab = form.requiereLaboratorio;

  return (
    <ModalShell
      titulo="Registrar diagnóstico"
      subtitulo="Registre el diagnóstico y la atención del paciente"
      tono="violet"
      icono={<DocIcon size={22} />}
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onVolver} className={btnSecondary}>
            Volver
          </button>
          <button type="submit" form="form-diagnostico" className={btnPrimary}>
            Finalizar atención
          </button>
        </>
      }
    >
      <form
        id="form-diagnostico"
        onSubmit={(e) => {
          e.preventDefault();
          onFinalizar?.(form);
        }}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* =================================================
              COLUMNA IZQUIERDA
          ================================================= */}

          <div className="space-y-5">
            {/* SÍNTOMAS */}
            <Tarjeta titulo="Síntomas" icono={<PulseIcon />}>
              <Encabezado
                htmlFor="sintomas"
                label="Síntomas que refiere el paciente"
                ayuda="Inicio, duración e intensidad"
                requerido
              />

              <textarea
                id="sintomas"
                name="sintomas"
                required
                rows={6}
                value={form.sintomas}
                onChange={handleChange}
                placeholder="Ej: Dolor de cabeza desde hace dos días, de intensidad moderada"
                className={textareaClass}
              />
            </Tarjeta>

            {/* DIAGNÓSTICO */}
            <Tarjeta titulo="Diagnóstico médico" icono={<DocIcon />}>
              <Encabezado
                htmlFor="diagnostico"
                label="Diagnóstico"
                ayuda="Conclusión de la evaluación médica"
                requerido
              />

              <textarea
                id="diagnostico"
                name="diagnostico"
                required
                rows={6}
                value={form.diagnostico}
                onChange={handleChange}
                placeholder="Describa el diagnóstico"
                className={textareaClass}
              />
            </Tarjeta>
          </div>

          {/* =================================================
              COLUMNA DERECHA
          ================================================= */}

          <div className="space-y-5">
            {/* INDICACIONES */}
            <Tarjeta titulo="Indicaciones y tratamiento" icono={<PillIcon />}>
              <Encabezado
                htmlFor="indicaciones"
                label="Tratamiento indicado"
                ayuda="Medicamentos, dosis y recomendaciones"
              />

              <textarea
                id="indicaciones"
                name="indicaciones"
                rows={6}
                value={form.indicaciones}
                onChange={handleChange}
                placeholder="Ej: Paracetamol 500 mg cada 8 horas por 3 días, reposo e hidratación"
                className={textareaClass}
              />
            </Tarjeta>

            {/* LABORATORIO */}
            <Tarjeta titulo="Orden de laboratorio" icono={<FlaskIcon />}>
              <label
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${
                  lab
                    ? 'border-[#0d7a71]/30 bg-[#0d7a71]/5'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-gray-800">
                    Requiere exámenes de laboratorio
                  </span>
                  <span className="mt-0.5 block text-[11px] text-gray-400">
                    La orden quedará disponible para la sede de Laboratorio
                  </span>
                </span>

                <input
                  type="checkbox"
                  checked={lab}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      requiereLaboratorio: e.target.checked,
                    }))
                  }
                  className="h-5 w-5 shrink-0 rounded border-gray-300 accent-[#0d7a71]"
                />
              </label>

              {lab && (
                <div className="mt-4">
                  <Encabezado
                    htmlFor="examenesLaboratorio"
                    label="Exámenes solicitados"
                    requerido
                  />

                  <textarea
                    id="examenesLaboratorio"
                    name="examenesLaboratorio"
                    required
                    rows={3}
                    value={form.examenesLaboratorio}
                    onChange={handleChange}
                    placeholder="Ej: Hemograma completo, examen de orina"
                    className={textareaClass}
                  />
                </div>
              )}
            </Tarjeta>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}