'use client';

import { useState, type ChangeEvent } from 'react';
import {
  CITA_EJEMPLO,
  type CitaModal,
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

export default function ModalCitaDiagnostico({
  cita = CITA_EJEMPLO,
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        examenIds: form.requiereLaboratorio ? examenesSeleccionados : [],
      });
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo guardar el diagnóstico.');
    } finally {
      setGuardando(false);
    }
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
      <form id="form-diagnostico" className="space-y-5" onSubmit={handleSubmit}>
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
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    value={busquedaExamen}
                    onChange={(e) => setBusquedaExamen(e.target.value)}
                    placeholder="Buscar examen..."
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
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
                  <p className="text-[11px] text-gray-400">La orden quedará disponible para la sede de Laboratorio.</p>
                </div>
              )}
            </Tarjeta>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}
