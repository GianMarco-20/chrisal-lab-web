'use client';

import { useState, type ChangeEvent } from 'react';
import {
  CITA_EJEMPLO,
  type CitaModal,
  type DiagnosticoModal,
  CalendarIcon,
  DocIcon,
  EstadoBadge,
  ModalShell,
  Tarjeta,
  TarjetaPaciente,
  btnPrimary,
  btnSecondary,
  labelClass,
  textareaClass,
} from './ModalBase';

/* =========================================================
   MODAL: CITA "PENDIENTE DE DIAGNÓSTICO" (formulario)
   "Volver" regresa a ModalInfoPendienteDiagnostico.
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

export default function ModalCitaDiagnostico({ cita = CITA_EJEMPLO, onClose, onVolver, onFinalizar }: Props) {
  const [form, setForm] = useState<DiagnosticoModal>(FORM_VACIO);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalShell
      titulo="Registrar atención"
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
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onFinalizar?.(form);
        }}
      >
        <EstadoBadge tono="violet">Pendiente de diagnóstico</EstadoBadge>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-5">
            <Tarjeta titulo="Síntomas" icono={<CalendarIcon />}>
              <label htmlFor="sintomas" className="sr-only">
                Síntomas
              </label>
              <textarea
                id="sintomas"
                name="sintomas"
                required
                rows={4}
                value={form.sintomas}
                onChange={handleChange}
                placeholder="Describa los síntomas que refiere el paciente (inicio, duración, intensidad)"
                className={textareaClass}
              />
            </Tarjeta>

            <Tarjeta titulo="Diagnóstico médico" icono={<DocIcon />}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="diagnostico" className={labelClass}>
                    Diagnóstico *
                  </label>
                  <textarea
                    id="diagnostico"
                    name="diagnostico"
                    required
                    rows={3}
                    value={form.diagnostico}
                    onChange={handleChange}
                    placeholder="Describa el diagnóstico"
                    className={textareaClass}
                  />
                </div>
                <div>
                  <label htmlFor="indicaciones" className={labelClass}>
                    Indicaciones y tratamiento
                  </label>
                  <textarea
                    id="indicaciones"
                    name="indicaciones"
                    rows={3}
                    value={form.indicaciones}
                    onChange={handleChange}
                    placeholder="Medicamentos, dosis y recomendaciones"
                    className={textareaClass}
                  />
                </div>
              </div>
            </Tarjeta>
          </div>

          <div className="space-y-5">
            <TarjetaPaciente cita={cita} />

            <Tarjeta titulo="Orden de laboratorio" icono={<DocIcon />}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={form.requiereLaboratorio}
                  onChange={(e) => setForm((prev) => ({ ...prev, requiereLaboratorio: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 accent-[#0d7a71]"
                />
                Requiere exámenes de laboratorio
              </label>

              {form.requiereLaboratorio && (
                <div className="mt-4">
                  <label htmlFor="examenesLaboratorio" className="sr-only">
                    Exámenes solicitados
                  </label>
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
                  <p className="mt-1.5 text-[11px] text-gray-400">La orden quedará disponible para la sede de Laboratorio.</p>
                </div>
              )}
            </Tarjeta>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}