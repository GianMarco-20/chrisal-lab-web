'use client';

import { useEffect, useState } from 'react';

/* =========================================================
   MODAL: CITA "PENDIENTE DE DIAGNÓSTICO"
   El médico revisa el triaje y registra síntomas y diagnóstico.
   onFinalizar recibe los datos del formulario (incluida la orden de
   laboratorio); quien use este componente decide cómo guardarlos.
========================================================= */

export interface CitaModal {
  id: string;
  hc: string;
  dni: string;
  paciente: string;
  sexo: 'Masculino' | 'Femenino';
  especialidad: string;
  medico: string;
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:mm
}

export interface TriajeModal {
  presionArterial: string;
  frecuenciaCardiaca: string;
  frecuenciaRespiratoria: string;
  temperatura: string;
  saturacion: string;
  peso: string;
  talla: string;
  motivoConsulta: string;
}

// Datos de ejemplo para ver el diseño sin backend.
const CITA_EJEMPLO: CitaModal = {
  id: 'CIT-001',
  hc: 'HC-000002',
  dni: '71977410',
  paciente: 'JHOSSEP DILSON FERNANDEZ ASTO',
  sexo: 'Masculino',
  especialidad: 'Medicina General',
  medico: 'Por asignar',
  fecha: '2026-10-01',
  hora: '07:30',
};

const TRIAJE_EJEMPLO: TriajeModal = {
  presionArterial: '120/80',
  frecuenciaCardiaca: '78',
  frecuenciaRespiratoria: '18',
  temperatura: '37.8',
  saturacion: '97',
  peso: '70',
  talla: '170',
  motivoConsulta: 'Dolor de garganta y malestar general desde hace 3 días.',
};

export interface ExamenCatalogoModal {
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
  triaje?: TriajeModal;
  examenesCatalogo?: ExamenCatalogoModal[];
  onClose: () => void;
  onFinalizar?: (datos: DatosFormDiagnostico) => void | Promise<void>;
  onCancelarCita?: () => void;  // sin lógica por ahora
}

function formatFecha(fecha: string) {
  const [y, m, d] = fecha.split('-');
  return `${d}/${m}/${y}`;
}

function formatHora(hora: string) {
  const [h, min] = hora.split(':');
  let horas = Number(h);
  const sufijo = horas >= 12 ? 'PM' : 'AM';
  horas = horas % 12 || 12;
  return `${horas}:${min} ${sufijo}`;
}

const textareaClass =
  'w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15';
const labelClass = 'mb-2 block text-sm font-semibold text-gray-700';

function Campo({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <div className="mt-1 text-xs text-gray-700">{children}</div>
    </div>
  );
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h4 className="border-b border-gray-100 pb-2 text-xs font-bold text-gray-900">{titulo}</h4>
      {children}
    </section>
  );
}

/* Casilla pequeña de solo lectura para un signo vital */
function Signo({ label, valor, unidad }: { label: string; valor: string; unidad: string }) {
  return (
    <div className="rounded-xl bg-gray-50 px-3 py-2.5">
      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-1 text-xs font-bold text-gray-800">
        {valor || '—'} <span className="font-medium text-gray-400">{unidad}</span>
      </p>
    </div>
  );
}

export default function ModalCitaDiagnostico({
  cita = CITA_EJEMPLO,
  triaje = TRIAJE_EJEMPLO,
  examenesCatalogo = [],
  onClose,
  onFinalizar,
  onCancelarCita,
}: Props) {
  const [form, setForm] = useState({
    sintomas: '',
    diagnostico: '',
    indicaciones: '',
    requiereLaboratorio: false,
  });
  const [examenesSeleccionados, setExamenesSeleccionados] = useState<number[]>([]);
  const [busquedaExamen, setBusquedaExamen] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleExamen = (id: number) => {
    setExamenesSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const examenesFiltrados = busquedaExamen.trim()
    ? examenesCatalogo.filter((ex) =>
        ex.nombre.toLowerCase().includes(busquedaExamen.trim().toLowerCase()),
      )
    : examenesCatalogo;

  const examenesPorCategoria = examenesFiltrados.reduce<Record<string, ExamenCatalogoModal[]>>(
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

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[94vh] w-full max-w-md flex-col overflow-hidden rounded-[26px] border border-gray-100 bg-white shadow-2xl">

        {/* CABECERA */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 sm:p-7">
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#0d7a71]">{cita.id}</p>
            <h3 className="mt-1 break-words text-lg font-bold text-gray-900 sm:text-xl">{cita.paciente}</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-700">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              Pendiente de Diagnóstico
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* CUERPO */}
        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">

          {/* Datos de la cita */}
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Historia Clínica"><span className="font-semibold text-gray-800">{cita.hc}</span></Campo>
            <Campo label="DNI">{cita.dni}</Campo>
            <Campo label="Sexo">{cita.sexo}</Campo>
            <Campo label="Servicio">{cita.especialidad}</Campo>
            <Campo label="Médico" className="col-span-2">{cita.medico}</Campo>
            <Campo label="Fecha">{formatFecha(cita.fecha)}</Campo>
            <Campo label="Hora">
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {formatHora(cita.hora)}
              </span>
            </Campo>
          </div>

          {/* Triaje registrado (solo lectura) */}
          <Seccion titulo="Triaje registrado">
            <div className="grid grid-cols-3 gap-2">
              <Signo label="P. arterial" valor={triaje.presionArterial} unidad="mmHg" />
              <Signo label="F. cardiaca" valor={triaje.frecuenciaCardiaca} unidad="lpm" />
              <Signo label="F. resp." valor={triaje.frecuenciaRespiratoria} unidad="rpm" />
              <Signo label="Temp." valor={triaje.temperatura} unidad="°C" />
              <Signo label="SpO₂" valor={triaje.saturacion} unidad="%" />
              <Signo label="Peso / Talla" valor={`${triaje.peso}/${triaje.talla}`} unidad="" />
            </div>
            <Campo label="Motivo de consulta">{triaje.motivoConsulta}</Campo>
          </Seccion>

          <form id="form-diagnostico" onSubmit={handleSubmit} className="space-y-6">
            {/* Síntomas */}
            <Seccion titulo="Síntomas">
              <label htmlFor="sintomas" className="sr-only">Síntomas</label>
              <textarea
                id="sintomas"
                name="sintomas"
                required
                rows={3}
                value={form.sintomas}
                onChange={handleChange}
                placeholder="Describa los síntomas que refiere el paciente (inicio, duración, intensidad)"
                className={textareaClass}
              />
            </Seccion>

            {/* Diagnóstico */}
            <Seccion titulo="Diagnóstico médico">
              <div>
                <label htmlFor="diagnostico" className={labelClass}>Diagnóstico *</label>
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
                <label htmlFor="indicaciones" className={labelClass}>Indicaciones y tratamiento</label>
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
            </Seccion>

            {/* Orden de laboratorio */}
            <Seccion titulo="Orden de laboratorio">
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
                <div className="space-y-2">
                  <input
                    type="text"
                    value={busquedaExamen}
                    onChange={(e) => setBusquedaExamen(e.target.value)}
                    placeholder="Buscar examen..."
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  />

                  <div className="max-h-48 space-y-3 overflow-y-auto rounded-xl border border-gray-200 p-3">
                    {Object.keys(examenesPorCategoria).length === 0 ? (
                      <p className="text-center text-[11px] text-gray-400">
                        {examenesCatalogo.length === 0 ? 'Cargando catálogo...' : 'Sin resultados.'}
                      </p>
                    ) : (
                      Object.entries(examenesPorCategoria).map(([categoria, examenes]) => (
                        <div key={categoria}>
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
                            {categoria}
                          </p>
                          <div className="space-y-1">
                            {examenes.map((ex) => (
                              <label
                                key={ex.id}
                                className="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-xs text-gray-700 hover:bg-gray-50"
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
                    <p className="text-[11px] font-medium text-gray-500">
                      {examenesSeleccionados.length} examen(es) seleccionado(s)
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400">La orden quedará disponible para la sede de Laboratorio.</p>
                </div>
              )}
            </Seccion>
          </form>
        </div>

        {/* PIE DE ACCIONES */}
        <div className="flex flex-col gap-2.5 border-t border-gray-100 p-5 sm:p-7">
          {errorGuardar && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-semibold text-red-600">
              {errorGuardar}
            </div>
          )}
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={onCancelarCita}
              className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-50 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
              Cancelar cita
            </button>
            <button
              type="submit"
              form="form-diagnostico"
              disabled={guardando}
              className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0d7a71] text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 transition hover:bg-[#0a625b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {guardando ? 'Guardando...' : 'Finalizar atención'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
