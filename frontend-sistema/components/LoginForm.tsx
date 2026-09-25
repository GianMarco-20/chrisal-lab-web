'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface Cita {
  id: number;
  dni: string;
  paciente: string;
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  estado: string;
}

const FORM_INICIAL = {
  dni: '',
  paciente: '',
  especialidad: 'Medicina General',
  medico: '',
  fecha: '',
  hora: '',
};

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [form, setForm] = useState(FORM_INICIAL);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCita = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevaCita: Cita = {
      ...form,
      id: Date.now(),
      estado: 'Programada',
    };

    setCitas((prev) => [...prev, nuevaCita]);
    setForm(FORM_INICIAL);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-6">
      <div className="max-w-6xl mx-auto">

        {/* =====================================================
            CABECERA
        ===================================================== */}
        <div className="mb-5 sm:mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <div className="flex items-center gap-2 mb-1.5">

                <div className="w-8 h-8 rounded-xl bg-[#0d7a71]/10 text-[#0d7a71] flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d7a71]">
                  Recepción
                </span>

              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Registrar Nueva Cita
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Programa una nueva cita médica para un paciente.
              </p>
            </div>

            {/* Contador */}
            <div className="self-start sm:self-auto bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm">

              <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">
                Citas registradas
              </p>

              <div className="flex items-center gap-2 mt-0.5">

                <span className="text-xl font-extrabold text-gray-900">
                  {citas.length}
                </span>

                <span className="text-[10px] text-gray-400">
                  citas
                </span>

              </div>

            </div>

          </div>
        </div>

        {/* =====================================================
            FORMULARIO
        ===================================================== */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">

          {/* Cabecera */}
          <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-[#0d7a71]/10 text-[#0d7a71] flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-sm sm:text-base font-bold text-gray-900">
                  Datos de la cita
                </h2>

                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                  Complete la información solicitada.
                </p>
              </div>

            </div>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleAddCita}
            className="p-4 sm:p-6"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* =================================================
                  DNI
              ================================================= */}
              <div>
                <label
                  htmlFor="dni"
                  className="block text-[11px] font-bold text-gray-700 mb-1.5"
                >
                  DNI del paciente
                </label>

                <div className="relative">

                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2 2 0 002-2v-11a2 2 0 00-2-2h-15a2 2 0 00-2 2v11a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <input
                    id="dni"
                    type="text"
                    name="dni"
                    value={form.dni}
                    onChange={handleChange}
                    required
                    maxLength={8}
                    inputMode="numeric"
                    placeholder="45892134"
                    className="
                      w-full
                      h-10
                      pl-10 pr-3
                      rounded-xl
                      border border-gray-200
                      bg-white
                      text-gray-900
                      text-sm
                      font-medium
                      placeholder:text-gray-400
                      outline-none
                      focus:border-[#0d7a71]
                      focus:ring-2
                      focus:ring-[#0d7a71]/10
                      transition-all
                    "
                  />

                </div>
              </div>

              {/* =================================================
                  PACIENTE
              ================================================= */}
              <div>
                <label
                  htmlFor="paciente"
                  className="block text-[11px] font-bold text-gray-700 mb-1.5"
                >
                  Nombre del paciente
                </label>

                <div className="relative">

                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                      />
                    </svg>
                  </div>

                  <input
                    id="paciente"
                    type="text"
                    name="paciente"
                    value={form.paciente}
                    onChange={handleChange}
                    required
                    placeholder="Juan Pérez García"
                    className="
                      w-full
                      h-10
                      pl-10 pr-3
                      rounded-xl
                      border border-gray-200
                      bg-white
                      text-gray-900
                      text-sm
                      font-medium
                      placeholder:text-gray-400
                      outline-none
                      focus:border-[#0d7a71]
                      focus:ring-2
                      focus:ring-[#0d7a71]/10
                      transition-all
                    "
                  />

                </div>
              </div>

              {/* =================================================
                  ESPECIALIDAD
              ================================================= */}
              <div>
                <label
                  htmlFor="especialidad"
                  className="block text-[11px] font-bold text-gray-700 mb-1.5"
                >
                  Especialidad
                </label>

                <select
                  id="especialidad"
                  name="especialidad"
                  value={form.especialidad}
                  onChange={handleChange}
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-gray-900
                    text-sm
                    font-medium
                    outline-none
                    focus:border-[#0d7a71]
                    focus:ring-2
                    focus:ring-[#0d7a71]/10
                    transition-all
                  "
                >
                  <option value="Medicina General">
                    Medicina General
                  </option>

                  <option value="Urología">
                    Urología
                  </option>

                  <option value="Obstetricia">
                    Obstetricia
                  </option>
                </select>
              </div>

              {/* =================================================
                  MÉDICO
              ================================================= */}
              <div>
                <label
                  htmlFor="medico"
                  className="block text-[11px] font-bold text-gray-700 mb-1.5"
                >
                  Médico asignado
                </label>

                <input
                  id="medico"
                  type="text"
                  name="medico"
                  value={form.medico}
                  onChange={handleChange}
                  required
                  placeholder="Dr. Carlos Mendoza"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-gray-900
                    text-sm
                    font-medium
                    placeholder:text-gray-400
                    outline-none
                    focus:border-[#0d7a71]
                    focus:ring-2
                    focus:ring-[#0d7a71]/10
                    transition-all
                  "
                />
              </div>

              {/* =================================================
                  FECHA
              ================================================= */}
              <div>
                <label
                  htmlFor="fecha"
                  className="block text-[11px] font-bold text-gray-700 mb-1.5"
                >
                  Fecha de la cita
                </label>

                <input
                  id="fecha"
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-gray-900
                    text-sm
                    font-medium
                    outline-none
                    focus:border-[#0d7a71]
                    focus:ring-2
                    focus:ring-[#0d7a71]/10
                    transition-all
                  "
                />
              </div>

              {/* =================================================
                  HORA
              ================================================= */}
              <div>
                <label
                  htmlFor="hora"
                  className="block text-[11px] font-bold text-gray-700 mb-1.5"
                >
                  Hora de la cita
                </label>

                <input
                  id="hora"
                  type="time"
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-gray-900
                    text-sm
                    font-medium
                    outline-none
                    focus:border-[#0d7a71]
                    focus:ring-2
                    focus:ring-[#0d7a71]/10
                    transition-all
                  "
                />
              </div>

            </div>

            {/* =================================================
                BOTÓN
            ================================================= */}
            <div className="mt-5 pt-5 border-t border-gray-100">

              <button
                type="submit"
                className="
                  w-full
                  sm:w-auto
                  sm:min-w-[170px]
                  h-10
                  px-5
                  rounded-xl
                  bg-[#0d7a71]
                  hover:bg-[#0a625b]
                  text-white
                  text-xs
                  font-bold
                  shadow-sm
                  hover:shadow-md
                  transition-all
                  active:scale-[0.98]
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>

                Registrar Cita
              </button>

            </div>

          </form>
        </div>

        {/* =====================================================
            LISTADO DE CITAS
        ===================================================== */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Cabecera */}
          <div className="px-4 py-4 sm:px-5 border-b border-gray-100">

            <div className="flex items-center justify-between gap-3">

              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Citas registradas
                </h2>

                <p className="text-[10px] text-gray-400 mt-1">
                  Historial de citas programadas.
                </p>
              </div>

              {citas.length > 0 && (
                <span className="bg-[#0d7a71]/10 text-[#0d7a71] px-2.5 py-1 rounded-full text-[10px] font-bold">
                  {citas.length}
                </span>
              )}

            </div>
          </div>

          {/* =================================================
              VISTA MÓVIL
          ================================================= */}
          <div className="block sm:hidden p-3 space-y-3">

            {citas.length === 0 ? (

              <div className="py-10 text-center">

                <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-3">

                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>

                </div>

                <p className="text-xs font-semibold text-gray-600">
                  No hay citas registradas
                </p>

                <p className="text-[10px] text-gray-400 mt-1">
                  Las nuevas citas aparecerán aquí.
                </p>

              </div>

            ) : (

              citas.map((cita) => (

                <div
                  key={cita.id}
                  className="
                    rounded-2xl
                    border border-gray-100
                    bg-gray-50/50
                    p-4
                    transition-all
                    hover:border-gray-200
                  "
                >

                  {/* Paciente + estado */}
                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="text-sm font-bold text-gray-900 truncate">
                        {cita.paciente}
                      </p>

                      <p className="text-[11px] text-[#0d7a71] font-semibold mt-1">
                        DNI: {cita.dni}
                      </p>

                    </div>

                    <span className="shrink-0 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-2.5 py-1 rounded-full">

                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                      {cita.estado}

                    </span>

                  </div>

                  {/* Información */}
                  <div className="mt-4 pt-3 border-t border-gray-200/70 grid grid-cols-2 gap-4">

                    <div className="min-w-0">

                      <span className="block text-[9px] uppercase tracking-wider font-bold text-gray-400">
                        Especialidad
                      </span>

                      <p className="text-xs font-medium text-gray-700 mt-1 break-words">
                        {cita.especialidad}
                      </p>

                    </div>

                    <div className="min-w-0">

                      <span className="block text-[9px] uppercase tracking-wider font-bold text-gray-400">
                        Médico
                      </span>

                      <p className="text-xs font-medium text-gray-700 mt-1 break-words">
                        {cita.medico}
                      </p>

                    </div>

                  </div>

                  {/* Fecha */}
                  <div className="mt-3 pt-3 border-t border-gray-200/70 flex flex-wrap items-center gap-x-4 gap-y-1">

                    <span className="text-[10px] font-medium text-gray-500">
                      📅 {cita.fecha}
                    </span>

                    <span className="text-[10px] font-medium text-gray-500">
                      🕐 {cita.hora}
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

          {/* =================================================
              VISTA PC / TABLET
          ================================================= */}
          <div className="hidden sm:block overflow-x-auto">

            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">

                  <th className="px-5 py-3.5">
                    DNI
                  </th>

                  <th className="px-5 py-3.5">
                    Paciente
                  </th>

                  <th className="px-5 py-3.5">
                    Especialidad
                  </th>

                  <th className="px-5 py-3.5">
                    Médico
                  </th>

                  <th className="px-5 py-3.5">
                    Fecha / Hora
                  </th>

                  <th className="px-5 py-3.5">
                    Estado
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {citas.length === 0 ? (

                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center"
                    >

                      <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-3">

                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>

                      </div>

                      <p className="text-xs font-semibold text-gray-600">
                        No hay citas registradas
                      </p>

                      <p className="text-[10px] text-gray-400 mt-1">
                        Registra una nueva cita desde el formulario superior.
                      </p>

                    </td>
                  </tr>

                ) : (

                  citas.map((cita) => (

                    <tr
                      key={cita.id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >

                      <td className="px-5 py-4 text-xs font-bold text-[#0d7a71]">
                        {cita.dni}
                      </td>

                      <td className="px-5 py-4">

                        <p className="text-xs font-bold text-gray-900">
                          {cita.paciente}
                        </p>

                      </td>

                      <td className="px-5 py-4 text-xs text-gray-700">
                        {cita.especialidad}
                      </td>

                      <td className="px-5 py-4 text-xs text-gray-700">
                        {cita.medico}
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">

                        <p className="text-xs font-semibold text-gray-700">
                          {cita.fecha}
                        </p>

                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {cita.hora}
                        </p>

                      </td>

                      <td className="px-5 py-4">

                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold px-2.5 py-1 rounded-full">

                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                          {cita.estado}

                        </span>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}