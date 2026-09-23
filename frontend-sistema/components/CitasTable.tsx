'use client';

import { useMemo, useState } from 'react';

interface Cita {
  id: string;
  paciente: string;
  dni: string;
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  estado: 'Confirmadas' | 'Pendientes' | 'Atendidas';
}

const CITAS_MOCK: Cita[] = [
  {
    id: 'CIT-001',
    paciente: 'Juan Pérez García',
    dni: '45892134',
    especialidad: 'Medicina General',
    medico: 'Dr. Carlos Mendoza',
    fecha: '2026-09-23',
    hora: '08:30 AM',
    estado: 'Confirmadas',
  },
  {
    id: 'CIT-005',
    paciente: 'Diego Armando Ruiz',
    dni: '78901234',
    especialidad: 'Ecografía General',
    medico: 'Dr. Carlos Mendoza',
    fecha: '2026-09-23',
    hora: '09:15 AM',
    estado: 'Confirmadas',
  },
  {
    id: 'CIT-008',
    paciente: 'María Elena Torres',
    dni: '10293847',
    especialidad: 'Laboratorio Clínico',
    medico: 'Dra. Ana Rivera',
    fecha: '2026-09-24',
    hora: '10:00 AM',
    estado: 'Pendientes',
  },
  {
    id: 'CIT-002',
    paciente: 'Lucía Fernández',
    dni: '45892135',
    especialidad: 'Pediatría',
    medico: 'Dra. Ana Rivera',
    fecha: '2026-09-22',
    hora: '11:00 AM',
    estado: 'Atendidas',
  },
];

export default function CitasTable() {
  const [filtroEstado, setFiltroEstado] = useState<string>('Todas');
  const [busquedaDni, setBusquedaDni] = useState<string>('');
  const [ordenFecha, setOrdenFecha] = useState<'asc' | 'desc'>('asc');

  /*
   * ==========================================
   * FORMATEAR FECHA
   * ==========================================
   */
  const formatearFecha = (fecha: string) => {
    const [year, month, day] = fecha.split('-');

    return `${day}/${month}/${year}`;
  };

  /*
   * ==========================================
   * FILTRADO + ORDENAMIENTO
   * ==========================================
   */
  const citasProcesadas = useMemo(() => {
    return [...CITAS_MOCK]
      .filter((cita) => {
        const textoBusqueda = busquedaDni.trim().toLowerCase();

        const cumpleEstado =
          filtroEstado === 'Todas' ||
          cita.estado === filtroEstado;

        const cumpleBusqueda =
          cita.dni.includes(textoBusqueda) ||
          cita.paciente.toLowerCase().includes(textoBusqueda);

        return cumpleEstado && cumpleBusqueda;
      })
      .sort((a, b) => {
        const fechaA = new Date(
          `${a.fecha} ${a.hora}`
        ).getTime();

        const fechaB = new Date(
          `${b.fecha} ${b.hora}`
        ).getTime();

        return ordenFecha === 'asc'
          ? fechaA - fechaB
          : fechaB - fechaA;
      });
  }, [filtroEstado, busquedaDni, ordenFecha]);

  /*
   * ==========================================
   * ESTILOS DEL ESTADO
   * ==========================================
   */
  const estadoStyles = (estado: Cita['estado']) => {
    switch (estado) {
      case 'Confirmadas':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
        };

      case 'Pendientes':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };

      case 'Atendidas':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
        };
    }
  };

  return (
    <div className="w-full min-w-0 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

      {/* =====================================================
          CABECERA
      ===================================================== */}
      <div className="p-4 sm:p-5 border-b border-gray-100">

        {/* Título */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              Listado de Citas
            </h3>

            <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium mt-0.5">
              Búsqueda rápida por DNI y control cronológico
            </p>
          </div>

          {/* Orden */}
          <button
            onClick={() =>
              setOrdenFecha(
                ordenFecha === 'asc' ? 'desc' : 'asc'
              )
            }
            className="
              self-start sm:self-auto
              flex items-center gap-1.5
              px-3 py-2
              bg-gray-50
              border border-gray-200
              rounded-xl
              text-[11px]
              font-semibold
              text-gray-700
              hover:bg-gray-100
              transition-colors
            "
          >
            <svg
              className="w-3.5 h-3.5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>

            <span>
              {ordenFecha === 'asc'
                ? 'Próximas primero'
                : 'Recientes primero'}
            </span>
          </button>
        </div>

        {/* =====================================================
            FILTROS
        ===================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">

          {/* Buscador */}
          <div className="sm:col-span-2 relative">

            <input
              type="text"
              placeholder="Buscar por DNI o nombre..."
              value={busquedaDni}
              onChange={(e) =>
                setBusquedaDni(e.target.value)
              }
              className="
                w-full
                pl-9 pr-3.5
                py-2.5
                bg-gray-50
                border border-gray-200
                rounded-xl
                text-xs
                font-medium
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:border-[#0d7a71]
                focus:bg-white
                focus:ring-2
                focus:ring-[#0d7a71]/10
                transition-all
              "
            />

            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Estado */}
          <select
            value={filtroEstado}
            onChange={(e) =>
              setFiltroEstado(e.target.value)
            }
            className="
              w-full
              px-3
              py-2.5
              bg-gray-50
              border border-gray-200
              rounded-xl
              text-xs
              font-semibold
              text-gray-700
              focus:outline-none
              focus:border-[#0d7a71]
              focus:ring-2
              focus:ring-[#0d7a71]/10
            "
          >
            <option value="Todas">
              Todos los Estados
            </option>

            <option value="Confirmadas">
              Confirmadas
            </option>

            <option value="Pendientes">
              Pendientes
            </option>

            <option value="Atendidas">
              Atendidas
            </option>
          </select>
        </div>
      </div>

      {/* =====================================================
          VISTA MÓVIL
      ===================================================== */}
      <div className="block sm:hidden">

        {citasProcesadas.length === 0 ? (
          <div className="py-12 px-5 text-center">
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
                  strokeWidth="2"
                  d="M9 13h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <p className="text-xs font-semibold text-gray-600">
              No se encontraron citas
            </p>

            <p className="text-[10px] text-gray-400 mt-1">
              Intenta cambiar los filtros de búsqueda.
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-3">

            {citasProcesadas.map((cita) => {
              const styles = estadoStyles(cita.estado);

              return (
                <article
                  key={cita.id}
                  className="
                    bg-white
                    rounded-2xl
                    border border-gray-100
                    shadow-sm
                    overflow-hidden
                  "
                >

                  {/* -----------------------------------------
                      CABECERA DE CARD
                  ----------------------------------------- */}
                  <div className="px-4 py-3 bg-gray-50/70 border-b border-gray-100">

                    <div className="flex items-center justify-between gap-2">

                      <div className="flex items-center gap-2 min-w-0">

                        <span className="font-mono text-xs font-extrabold text-[#0d7a71] shrink-0">
                          {cita.id}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-gray-300 shrink-0" />

                        <span className="text-[10px] font-semibold text-gray-500 truncate">
                          {formatearFecha(cita.fecha)}
                        </span>
                      </div>

                      {/* Estado */}
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          text-[9px]
                          font-bold
                          px-2
                          py-1
                          rounded-full
                          border
                          shrink-0
                          ${styles.badge}
                        `}
                      >
                        <span
                          className={`
                            w-1.5
                            h-1.5
                            rounded-full
                            ${styles.dot}
                          `}
                        />

                        {cita.estado}
                      </span>
                    </div>

                    {/* Hora */}
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-gray-400">

                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span className="font-semibold">
                        {cita.hora}
                      </span>
                    </div>
                  </div>

                  {/* -----------------------------------------
                      INFORMACIÓN PACIENTE
                  ----------------------------------------- */}
                  <div className="px-4 py-3.5">

                    <div className="flex items-start gap-3">

                      {/* Avatar */}
                      <div className="
                        h-10
                        w-10
                        rounded-xl
                        bg-[#0d7a71]/10
                        text-[#0d7a71]
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-xs
                        shrink-0
                      ">
                        {cita.paciente
                          .split(' ')
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="font-bold text-sm text-gray-900 truncate">
                          {cita.paciente}
                        </p>

                        <p className="text-[11px] text-[#0d7a71] font-semibold mt-0.5">
                          DNI: {cita.dni}
                        </p>
                      </div>
                    </div>

                    {/* -----------------------------------------
                        DATOS DE ATENCIÓN
                    ----------------------------------------- */}
                    <div className="
                      mt-4
                      pt-3
                      border-t border-gray-100
                      grid grid-cols-1
                      gap-3
                    ">

                      {/* Especialidad */}
                      <div className="flex items-start gap-3">

                        <div className="
                          h-8
                          w-8
                          rounded-lg
                          bg-gray-50
                          flex
                          items-center
                          justify-center
                          text-gray-400
                          shrink-0
                        ">
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
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        </div>

                        <div className="min-w-0">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                            Especialidad
                          </span>

                          <p className="text-xs font-semibold text-gray-700 mt-0.5 break-words">
                            {cita.especialidad}
                          </p>
                        </div>
                      </div>

                      {/* Médico */}
                      <div className="flex items-start gap-3">

                        <div className="
                          h-8
                          w-8
                          rounded-lg
                          bg-gray-50
                          flex
                          items-center
                          justify-center
                          text-gray-400
                          shrink-0
                        ">
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>

                        <div className="min-w-0">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                            Médico asignado
                          </span>

                          <p className="text-xs font-semibold text-gray-700 mt-0.5 break-words">
                            {cita.medico}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================
          VISTA DESKTOP / TABLET
      ===================================================== */}
      <div className="hidden sm:block overflow-x-auto">

        <table className="w-full text-left text-xs">

          <thead className="
            bg-gray-50/70
            border-b border-gray-100
            text-[10px]
            font-bold
            text-gray-400
            uppercase
            tracking-wider
          ">
            <tr>

              <th className="py-3.5 px-5">
                Cita ID
              </th>

              <th className="py-3.5 px-5">
                Fecha / Hora
              </th>

              <th className="py-3.5 px-5">
                Paciente / DNI
              </th>

              <th className="py-3.5 px-5">
                Especialidad
              </th>

              <th className="py-3.5 px-5">
                Médico Asignado
              </th>

              <th className="py-3.5 px-5">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {citasProcesadas.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-400"
                >
                  No se encontraron citas.
                </td>
              </tr>
            ) : (
              citasProcesadas.map((cita) => {

                const styles = estadoStyles(cita.estado);

                return (
                  <tr
                    key={cita.id}
                    className="
                      hover:bg-gray-50/60
                      transition-colors
                    "
                  >

                    <td className="py-4 px-5">
                      <span className="font-mono font-extrabold text-[#0d7a71]">
                        {cita.id}
                      </span>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">

                      <p className="font-bold text-gray-800">
                        {formatearFecha(cita.fecha)}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {cita.hora}
                      </p>

                    </td>

                    <td className="py-4 px-5">

                      <p className="font-bold text-gray-900">
                        {cita.paciente}
                      </p>

                      <p className="text-[11px] text-[#0d7a71] font-semibold mt-0.5">
                        DNI: {cita.dni}
                      </p>

                    </td>

                    <td className="py-4 px-5 text-gray-700">
                      {cita.especialidad}
                    </td>

                    <td className="py-4 px-5 text-gray-700">
                      {cita.medico}
                    </td>

                    <td className="py-4 px-5">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          text-[10px]
                          font-bold
                          px-2.5
                          py-1
                          rounded-full
                          border
                          ${styles.badge}
                        `}
                      >
                        <span
                          className={`
                            w-1.5
                            h-1.5
                            rounded-full
                            ${styles.dot}
                          `}
                        />

                        {cita.estado}
                      </span>

                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          PIE
      ===================================================== */}
      <div className="
        px-4
        sm:px-5
        py-3
        bg-gray-50/50
        border-t border-gray-100
        flex
        items-center
        justify-between
      ">
        <p className="text-[10px] text-gray-400 font-medium">
          {citasProcesadas.length}{' '}
          {citasProcesadas.length === 1
            ? 'cita encontrada'
            : 'citas encontradas'}
        </p>

        <p className="hidden sm:block text-[10px] text-gray-400">
          Actualizado hoy
        </p>
      </div>
    </div>
  );
}