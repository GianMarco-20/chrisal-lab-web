'use client';

import { useState, type ChangeEvent } from 'react';
import {
  type CitaModal,
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

   La orden de laboratorio usa el catálogo real (examenesCatalogo,
   198 exámenes agrupados por categoría) en vez de texto libre: así
   queda guardada en cita_examenes, no solo como nota.
========================================================= */

export interface ExamenCatalogoOpcion {
  id: number;
  nombre: string;
  categoria: string;
}

export interface DatosFormDiagnostico {
  sintomas: string;
  diagnostico: string;
  indicaciones: string;
  examenIds: number[];
}

interface Props {
  cita?: CitaModal;
  examenesCatalogo?: ExamenCatalogoOpcion[];
  onClose: () => void;
  onVolver: () => void; // regresa a ModalInfoPendienteDiagnostico
  onFinalizar?: (datos: DatosFormDiagnostico) => void | Promise<void>;
}

const FORM_VACIO = {
  sintomas: '',
  diagnostico: '',
  indicaciones: '',
  requiereLaboratorio: false,
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
  examenesCatalogo = [],
  onClose,
  onVolver,
  onFinalizar,
}: Props) {
  const [form, setForm] = useState(FORM_VACIO);
  const [examenesSeleccionados, setExamenesSeleccionados] = useState<number[]>([]);
  const [busquedaExamen, setBusquedaExamen] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleExamen = (id: number) => {
    setExamenesSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const examenesFiltrados = busquedaExamen.trim()
    ? examenesCatalogo.filter((ex) => ex.nombre.toLowerCase().includes(busquedaExamen.trim().toLowerCase()))
    : examenesCatalogo;

  const examenesPorCategoria = examenesFiltrados.reduce<Record<string, ExamenCatalogoOpcion[]>>(
    (grupos, ex) => {
      (grupos[ex.categoria] ??= []).push(ex);
      return grupos;
    },
    {},
  );

  const lab = form.requiereLaboratorio;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onFinalizar) return;
    setErrorGuardar('');
    setGuardando(true);
    try {
      await onFinalizar({
        sintomas: form.sintomas,
        diagnostico: form.diagnostico,
        indicaciones: form.indicaciones,
        examenIds: lab ? examenesSeleccionados : [],
      });
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo guardar el diagnóstico.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ModalShell
      titulo="Registrar diagnóstico"
      subtitulo="Registre el diagnóstico y la atención del paciente"
      tono="violet"
      icono={<DocIcon size={22} />}
      onClose={onClose}
      footer={
        <>
          {errorGuardar && <p className="mr-auto text-xs font-semibold text-red-600">{errorGuardar}</p>}
          <button type="button" onClick={onVolver} disabled={guardando} className={btnSecondary}>
            Volver
          </button>
          <button
            type="submit"
            form="form-diagnostico"
            disabled={guardando}
            className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {guardando ? 'Guardando...' : 'Finalizar atención'}
          </button>
        </>
      }
    >
      <form id="form-diagnostico" onSubmit={handleSubmit}>
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
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    value={busquedaExamen}
                    onChange={(e) => setBusquedaExamen(e.target.value)}
                    placeholder="Buscar examen..."
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  />

                  <div className="max-h-56 space-y-3 overflow-y-auto rounded-xl border border-gray-200 p-3">
                    {Object.keys(examenesPorCategoria).length === 0 ? (
                      <p className="text-center text-xs text-gray-400">
                        {examenesCatalogo.length === 0 ? 'Cargando catálogo...' : 'Sin resultados.'}
                      </p>
                    ) : (
                      Object.entries(examenesPorCategoria).map(([categoria, examenes]) => (
                        <div key={categoria}>
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            {categoria}
                          </p>
                          <div className="space-y-1">
                            {examenes.map((ex) => (
                              <label
                                key={ex.id}
                                className="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <input
                                  type="checkbox"
                                  checked={examenesSeleccionados.includes(ex.id)}
                                  onChange={() => toggleExamen(ex.id)}
                                  className="h-3.5 w-3.5 rounded border-gray-300 accent-[#0d7a71]"
                                />
                                {ex.nombre}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {examenesSeleccionados.length > 0 && (
                    <p className="text-xs font-medium text-gray-500">
                      {examenesSeleccionados.length} examen(es) seleccionado(s)
                    </p>
                  )}
                </div>
              )}
            </Tarjeta>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}
