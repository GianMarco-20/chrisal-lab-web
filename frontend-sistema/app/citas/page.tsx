'use client';

import { useEffect, useState } from 'react';
import Sidebar, { useSidebar } from '../../components/Sidebar';
import CitasTable, { Cita } from '../../components/CitasTable';

/* =========================================================
   DATOS INICIALES (mock — luego vendrán del backend)
========================================================= */

const citasIniciales: Cita[] = [
  { id: 'CIT-001', hc: 'HC-1001', dni: '74852136', paciente: 'Juan Pérez García', sexo: 'Masculino', especialidad: 'Medicina General', medico: 'Dr. Carlos Mendoza', fecha: '2026-09-27', hora: '08:30', estado: 'Confirmadas' },
  { id: 'CIT-002', hc: 'HC-1002', dni: '71245896', paciente: 'Diego Armando Ruiz', sexo: 'Masculino', especialidad: 'Urología', medico: 'Dr. Carlos Mendoza', fecha: '2026-09-27', hora: '09:15', estado: 'Pendientes' },
  { id: 'CIT-003', hc: 'HC-1003', dni: '70852147', paciente: 'María Elena Torres', sexo: 'Femenino', especialidad: 'Laboratorio Clínico', medico: 'Dra. Ana Rivera', fecha: '2026-09-27', hora: '10:00', estado: 'Confirmadas' },
  { id: 'CIT-004', hc: 'HC-1004', dni: '75412369', paciente: 'Lucía Fernández', sexo: 'Femenino', especialidad: 'Medicina General', medico: 'Dr. Carlos Mendoza', fecha: '2026-09-27', hora: '10:45', estado: 'Confirmadas' },
  { id: 'CIT-005', hc: 'HC-1005', dni: '70125896', paciente: 'Pedro Ramírez', sexo: 'Masculino', especialidad: 'Pediatría', medico: 'Dra. Rosa Salazar', fecha: '2026-09-27', hora: '11:30', estado: 'Atendidas' },
  { id: 'CIT-006', hc: 'HC-1006', dni: '76321458', paciente: 'María González', sexo: 'Femenino', especialidad: 'Ginecología', medico: 'Dra. Ana Castillo', fecha: '2026-09-27', hora: '12:15', estado: 'Atendidas' },
];

interface NuevaCitaForm {
  dni: string;
  nombres: string;
  apellidos: string;
  sexo: 'Masculino' | 'Femenino';
  celular: string;
  especialidad: string;
  fecha: string;
  hora: string;
}

const FORM_INICIAL: NuevaCitaForm = {
  dni: '',
  nombres: '',
  apellidos: '',
  sexo: 'Masculino',
  celular: '',
  especialidad: 'Medicina General',
  fecha: '',
  hora: '',
};

export default function CitasPage() {
  const { openSidebar } = useSidebar();

  const [citas, setCitas] = useState<Cita[]>(citasIniciales);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NuevaCitaForm>(FORM_INICIAL);
  const [mensaje, setMensaje] = useState('');

  // =========================================
  // CERRAR MODAL CON ESC
  // =========================================
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowModal(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // =========================================
  // BLOQUEAR SCROLL DEL BODY CON MODAL ABIERTO
  // =========================================
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  // =========================================
  // MÉTRICAS (calculadas de datos reales)
  // =========================================
  const totalProgramadas = citas.length;
  const totalPendientes = citas.filter((c) => c.estado === 'Pendientes').length;
  const totalConfirmadas = citas.filter((c) => c.estado === 'Confirmadas').length;
  const totalAtendidas = citas.filter((c) => c.estado === 'Atendidas').length;

  // =========================================
  // GUARDAR NUEVA CITA
  // =========================================
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarCita = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const numero = citas.length + 1;

    const nuevaCita: Cita = {
      id: `CIT-${String(numero).padStart(3, '0')}`,
      hc: `HC-${1000 + numero}`,
      dni: form.dni,
      paciente: `${form.nombres} ${form.apellidos}`.trim(),
      sexo: form.sexo,
      especialidad: form.especialidad,
      medico: 'Por asignar',
      fecha: form.fecha,
      hora: form.hora,
      estado: 'Pendientes',
    };

    setCitas((prev) => [...prev, nuevaCita]);
    setForm(FORM_INICIAL);
    setShowModal(false);

    setMensaje('Cita registrada correctamente');
    setTimeout(() => setMensaje(''), 2500);
  };

  // =========================================
  // ACCIONES SOBRE UNA CITA
  // =========================================
  const handleMarcarAtendida = (id: string) => {
    setCitas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: 'Atendidas' } : c))
    );
  };

  const handleCancelarCita = (id: string) => {
    setCitas((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* SIDEBAR COMPARTIDO */}
      <Sidebar />

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 min-w-0 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 min-h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">

          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={openSidebar}
              className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors shrink-0"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                Agenda Médica del Día
              </h1>
              <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">
                {new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#0d7a71] hover:bg-[#0a625b] text-white px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#0d7a71]/20 transition-all active:scale-[0.98] shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Agendar Cita</span>
            <span className="sm:hidden">Agendar</span>
          </button>
        </header>

        {/* CONTENIDO */}
        <div className="flex-1 p-4 sm:p-5 lg:p-6 space-y-5 sm:space-y-6 overflow-x-hidden">

          {/* MENSAJE DE ÉXITO */}
          {mensaje && (
            <div className="rounded-xl border border-[#0d7a71]/20 bg-[#0d7a71]/5 px-4 py-2.5 text-xs font-semibold text-[#0d7a71]">
              {mensaje}
            </div>
          )}

          {/* MÉTRICAS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

            <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">Total Programadas</p>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">{totalProgramadas}</p>
              </div>
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-amber-600 font-medium truncate">Pendientes por Llegar</p>
                <p className="text-xl sm:text-2xl font-extrabold text-amber-700 mt-1">{totalPendientes}</p>
              </div>
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">Confirmadas</p>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1">{totalConfirmadas}</p>
              </div>
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-blue-600 font-medium truncate">Atendidas</p>
                <p className="text-xl sm:text-2xl font-extrabold text-blue-700 mt-1">{totalAtendidas}</p>
              </div>
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* TABLA (solo filtros + tabla; sin modal ni métricas propias) */}
          <section className="w-full min-w-0">
            <CitasTable
              citas={citas}
              onMarcarAtendida={handleMarcarAtendida}
              onCancelarCita={handleCancelarCita}
            />
          </section>

        </div>
      </main>

      {/* MODAL — ÚNICO EN TODO EL MÓDULO */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="w-full max-w-lg max-h-[94vh] overflow-y-auto bg-white rounded-[26px] shadow-2xl border border-gray-100 p-5 sm:p-7">

            <div className="flex items-start justify-between gap-4 pb-5 border-b border-gray-100">
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Registrar Nueva Cita</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Complete los datos del paciente</p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Cerrar modal"
                className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleGuardarCita} className="mt-5 space-y-4">

              <div>
                <label htmlFor="dni" className="mb-2 block text-sm font-semibold text-gray-700">DNI *</label>
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  required
                  maxLength={8}
                  inputMode="numeric"
                  value={form.dni}
                  onChange={handleFormChange}
                  placeholder="Ingrese el DNI"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombres" className="mb-2 block text-sm font-semibold text-gray-700">Nombres *</label>
                  <input
                    id="nombres"
                    name="nombres"
                    type="text"
                    required
                    value={form.nombres}
                    onChange={handleFormChange}
                    placeholder="Nombres"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  />
                </div>

                <div>
                  <label htmlFor="apellidos" className="mb-2 block text-sm font-semibold text-gray-700">Apellidos *</label>
                  <input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    required
                    value={form.apellidos}
                    onChange={handleFormChange}
                    placeholder="Apellidos"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="sexo" className="mb-2 block text-sm font-semibold text-gray-700">Sexo</label>
                  <select
                    id="sexo"
                    name="sexo"
                    value={form.sexo}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="celular" className="mb-2 block text-sm font-semibold text-gray-700">Celular</label>
                  <input
                    id="celular"
                    name="celular"
                    type="tel"
                    inputMode="numeric"
                    value={form.celular}
                    onChange={handleFormChange}
                    placeholder="999 999 999"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="especialidad" className="mb-2 block text-sm font-semibold text-gray-700">Servicio *</label>
                <select
                  id="especialidad"
                  name="especialidad"
                  required
                  value={form.especialidad}
                  onChange={handleFormChange}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                >
                  <option value="Medicina General">Medicina General</option>
                  <option value="Urología">Urología</option>
                  <option value="Pediatría">Pediatría</option>
                  <option value="Ginecología">Ginecología</option>
                  <option value="Laboratorio Clínico">Laboratorio Clínico</option>
                  <option value="Ecografía General">Ecografía General</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fecha" className="mb-2 block text-sm font-semibold text-gray-700">Fecha *</label>
                  <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    required
                    value={form.fecha}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  />
                </div>

                <div>
                  <label htmlFor="hora" className="mb-2 block text-sm font-semibold text-gray-700">Hora *</label>
                  <input
                    id="hora"
                    name="hora"
                    type="time"
                    required
                    step="1800"
                    value={form.hora}
                    onChange={handleFormChange}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  />
                  <p className="mt-1 text-[10px] text-gray-400">Las citas se manejan en bloques de 30 minutos.</p>
                </div>
              </div>

              <div className="flex gap-2.5 rounded-xl border border-amber-100 bg-amber-50 p-3 text-[11px] leading-4 text-amber-700">
                <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86l-7.82 13.5A2 2 0 004.2 20.5h15.6a2 2 0 001.73-3.14l-7.82-13.5a2 2 0 00-3.42 0z" />
                </svg>
                <span>La disponibilidad del horario se validará con el módulo de Programación Médica.</span>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-11 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="h-11 rounded-xl bg-[#0d7a71] text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 transition hover:bg-[#0a625b] active:scale-[0.98]"
                >
                  Guardar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}