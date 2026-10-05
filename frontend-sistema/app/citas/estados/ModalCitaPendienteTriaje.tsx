'use client';

import { useEffect, useState } from 'react';

/* =========================================================
   MODAL: CITA "PENDIENTE DE TRIAJE" (formulario)
   Solo muestra los campos a llenar. Los datos de la cita y las acciones
   (reprogramar / cancelar) están en la ventana anterior
   (ModalInfoPendienteTriaje), a la que regresa el botón "Volver".
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

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  onVolver?: () => void;        // regresa a ModalInfoPendienteTriaje
  ausente?: boolean;            // solo cambia la insignia de estado ("Ausente")
  onGuardarTriaje?: () => void; // sin lógica por ahora
}

const inputClass =
  'h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15';
const labelClass = 'mb-2 block text-sm font-semibold text-gray-700';

export default function ModalCitaPendienteTriaje({
  cita = CITA_EJEMPLO,
  onClose,
  onVolver,
  ausente = false,
  onGuardarTriaje,
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
            {/* Botón de retroceso */}
            <button
              type="button"
              onClick={onVolver}
              className="mb-3 -ml-1 inline-flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-[#0d7a71]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
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
          <button
            type="submit"
            form="form-triaje"
            className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#0d7a71] text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 transition hover:bg-[#0a625b] active:scale-[0.98]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h4l2-7 4 14 2-7h6" />
            </svg>
            Guardar triaje
          </button>
        </div>
      </div>
    </div>
  );
}
