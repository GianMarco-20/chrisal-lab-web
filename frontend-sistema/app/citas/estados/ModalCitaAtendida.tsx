'use client';

import { useEffect } from 'react';

/* =========================================================
   MODAL: CITA "ATENDIDA"
   Solo lectura: muestra triaje, síntomas y diagnóstico registrados.
   Solo diseño (UI). Archivo autónomo: no depende de otros archivos.
   Para verlo: <ModalCitaAtendida onClose={() => {}} />
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

export interface DiagnosticoModal {
  sintomas: string;
  diagnostico: string;
  indicaciones: string;
  requiereLaboratorio: boolean;
  examenesLaboratorio: string;
}

// Datos de ejemplo para ver el diseño sin backend.
const CITA_EJEMPLO: CitaModal = {
  id: 'CIT-001',
  hc: 'HC-000002',
  dni: '71977410',
  paciente: 'JHOSSEP DILSON FERNANDEZ ASTO',
  sexo: 'Masculino',
  especialidad: 'Medicina General',
  medico: 'Dra. Por asignar',
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

const DIAGNOSTICO_EJEMPLO: DiagnosticoModal = {
  sintomas: 'Dolor al tragar, malestar general y fiebre leve. Inicio hace 3 días, con aumento progresivo.',
  diagnostico: 'Faringitis aguda.',
  indicaciones: 'Paracetamol 500 mg cada 8 horas por 3 días. Abundante líquido y reposo.',
  requiereLaboratorio: true,
  examenesLaboratorio: 'Hemograma completo',
};

interface Props {
  cita?: CitaModal;
  triaje?: TriajeModal;
  diagnostico?: DiagnosticoModal;
  onClose: () => void;
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

function Campo({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <div className="mt-1 text-xs leading-5 text-gray-700">{children}</div>
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

export default function ModalCitaAtendida({
  cita = CITA_EJEMPLO,
  triaje = TRIAJE_EJEMPLO,
  diagnostico = DIAGNOSTICO_EJEMPLO,
  onClose,
}: Props) {
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
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Atendida
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

        {/* CUERPO (solo lectura) */}
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

          {/* Triaje */}
          <Seccion titulo="Triaje">
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

          {/* Síntomas */}
          <Seccion titulo="Síntomas">
            <p className="text-xs leading-5 text-gray-700">{diagnostico.sintomas}</p>
          </Seccion>

          {/* Diagnóstico */}
          <Seccion titulo="Diagnóstico médico">
            <Campo label="Diagnóstico">{diagnostico.diagnostico}</Campo>
            {diagnostico.indicaciones && (
              <Campo label="Indicaciones y tratamiento">{diagnostico.indicaciones}</Campo>
            )}
          </Seccion>

          {/* Orden de laboratorio */}
          <Seccion titulo="Orden de laboratorio">
            {diagnostico.requiereLaboratorio ? (
              <Campo label="Exámenes solicitados">{diagnostico.examenesLaboratorio}</Campo>
            ) : (
              <p className="text-xs text-gray-400">No se solicitaron exámenes de laboratorio.</p>
            )}
          </Seccion>
        </div>

        {/* PIE */}
        <div className="border-t border-gray-100 p-5 sm:p-7">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-full items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
