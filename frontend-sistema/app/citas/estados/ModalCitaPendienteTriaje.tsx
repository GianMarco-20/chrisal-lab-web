'use client';

import { useEffect, useState } from 'react';

/* =========================================================
   MODAL: CITA "PENDIENTE DE TRIAJE"
   Solo diseño (UI). Archivo autónomo: no depende de otros archivos.
   Para verlo: <ModalCitaPendienteTriaje onClose={() => {}} />
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

// Datos de ejemplo (los de tu captura) para ver el diseño sin backend.
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

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  ausente?: boolean;            // true: el paciente no llegó a tiempo (estado "Ausente")
  toleranciaMinutos?: number;   // minutos de tolerancia mostrados en el aviso
  onGuardarTriaje?: () => void; // sin lógica por ahora
  onCancelarCita?: () => void;  // sin lógica por ahora
  onReprogramar?: () => void;   // sin lógica por ahora (solo se ve si ausente)
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

const inputClass =
  'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15';
const labelClass = 'mb-2 block text-sm font-semibold text-gray-700';

function Campo({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <div className="mt-1 text-xs text-gray-700">{children}</div>
    </div>
  );
}

export default function ModalCitaPendienteTriaje({
  cita = CITA_EJEMPLO,
  onClose,
  ausente = false,
  toleranciaMinutos = 10,
  onGuardarTriaje,
  onCancelarCita,
  onReprogramar,
}: Props) {
  const [form, setForm] = useState({
    presionArterial: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    temperatura: '',
    saturacion: '',
    peso: '',
    talla: '',
    motivoConsulta: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  // IMC calculado en pantalla (solo ayuda visual)
  const peso = parseFloat(form.peso);
  const tallaM = parseFloat(form.talla) / 100;
  const imc = peso > 0 && tallaM > 0 ? (peso / (tallaM * tallaM)).toFixed(1) : null;

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
            <span
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                ausente ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${ausente ? 'bg-red-500' : 'bg-amber-500'}`} />
              {ausente ? 'Ausente' : 'Pendiente de Triaje'}
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

          {ausente && (
            <div className="flex gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3 text-[11px] leading-4 text-red-700">
              <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86l-7.82 13.5A2 2 0 004.2 20.5h15.6a2 2 0 001.73-3.14l-7.82-13.5a2 2 0 00-3.42 0z" />
              </svg>
              <span>
                Pasaron más de {toleranciaMinutos} minutos desde la hora programada ({formatHora(cita.hora)}).
                Si el paciente llegó, puede registrar su triaje; si no, reprograme o cancele la cita.
              </span>
            </div>
          )}

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

          <form
            id="form-triaje"
            onSubmit={(e) => {
              e.preventDefault();
              onGuardarTriaje?.();
            }}
            className="space-y-6"
          >
            {/* Signos vitales */}
            <section className="space-y-3">
              <h4 className="border-b border-gray-100 pb-2 text-xs font-bold text-gray-900">Signos vitales</h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="presionArterial" className={labelClass}>Presión arterial *</label>
                  <input id="presionArterial" name="presionArterial" required value={form.presionArterial} onChange={handleChange} placeholder="120/80 mmHg" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="frecuenciaCardiaca" className={labelClass}>Frec. cardiaca *</label>
                  <input id="frecuenciaCardiaca" name="frecuenciaCardiaca" type="number" inputMode="numeric" required value={form.frecuenciaCardiaca} onChange={handleChange} placeholder="80 lpm" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="frecuenciaRespiratoria" className={labelClass}>Frec. respiratoria</label>
                  <input id="frecuenciaRespiratoria" name="frecuenciaRespiratoria" type="number" inputMode="numeric" value={form.frecuenciaRespiratoria} onChange={handleChange} placeholder="18 rpm" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="temperatura" className={labelClass}>Temperatura *</label>
                  <input id="temperatura" name="temperatura" type="number" step="0.1" inputMode="decimal" required value={form.temperatura} onChange={handleChange} placeholder="36.5 °C" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="saturacion" className={labelClass}>Saturación O₂</label>
                  <input id="saturacion" name="saturacion" type="number" inputMode="numeric" value={form.saturacion} onChange={handleChange} placeholder="98 %" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="peso" className={labelClass}>Peso (kg)</label>
                    <input id="peso" name="peso" type="number" step="0.1" inputMode="decimal" value={form.peso} onChange={handleChange} placeholder="70" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="talla" className={labelClass}>Talla (cm)</label>
                    <input id="talla" name="talla" type="number" inputMode="numeric" value={form.talla} onChange={handleChange} placeholder="170" className={inputClass} />
                  </div>
                </div>
              </div>

              {imc && (
                <p className="text-[11px] font-medium text-gray-400">
                  IMC calculado: <span className="font-bold text-gray-600">{imc}</span>
                </p>
              )}
            </section>

            {/* Motivo de consulta */}
            <section className="space-y-3">
              <h4 className="border-b border-gray-100 pb-2 text-xs font-bold text-gray-900">Motivo de consulta</h4>
              <label htmlFor="motivoConsulta" className="sr-only">Motivo de consulta</label>
              <textarea
                id="motivoConsulta"
                name="motivoConsulta"
                required
                rows={3}
                value={form.motivoConsulta}
                onChange={handleChange}
                placeholder="Describa por qué acude el paciente"
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
              />
            </section>
          </form>
        </div>

        {/* PIE DE ACCIONES */}
        <div className="flex flex-col gap-2.5 border-t border-gray-100 p-5 sm:p-7">
          {ausente && (
            <button
              type="button"
              onClick={onReprogramar}
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Reprogramar cita
            </button>
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
              form="form-triaje"
              className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0d7a71] text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 transition hover:bg-[#0a625b] active:scale-[0.98]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h4l2-7 4 14 2-7h6" />
              </svg>
              Guardar triaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
