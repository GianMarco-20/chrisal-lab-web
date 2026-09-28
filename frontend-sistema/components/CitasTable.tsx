'use client';

import { useMemo, useState } from 'react';

/* =========================================================
   TIPOS (exportados: la página los reutiliza)
========================================================= */

export type EstadoCita = 'Confirmadas' | 'Pendientes' | 'Atendidas';

export interface Cita {
  id: string;
  hc: string;
  dni: string;
  paciente: string;
  sexo: 'Masculino' | 'Femenino';
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  estado: EstadoCita;
}

interface CitasTableProps {
  citas: Cita[];
  onMarcarAtendida: (id: string) => void;
  onCancelarCita: (id: string) => void;
}

/* =========================================================
   OPCIONES
========================================================= */

// Deben coincidir con los nombres reales de la tabla `servicios` del backend.
const servicios = [
  'Todos los servicios',
  'Medicina General',
  'Flebología',
  'Urología',
  'Endocrinología',
  'Obstetricia',
  'Neurología',
  'Fisioterapia',
  'Podología',
  'Psicología',
  'Laboratorio',
];

const estadosFiltro = ['Todos los estados', 'Confirmadas', 'Pendientes', 'Atendidas'];

/* =========================================================
   ICONOS
========================================================= */

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CalendarIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function RefreshIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11a8.1 8.1 0 0 0-14.5-4.9L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 14.5 4.9L20 16" />
      <path d="M20 20v-4h-4" />
    </svg>
  );
}

function ClockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FilterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function SortIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5v14" />
      <path d="m5 8 3-3 3 3" />
      <path d="M16 19V5" />
      <path d="m13 16 3 3 3-3" />
    </svg>
  );
}

function ChevronDown({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function TrashIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function PulseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  );
}

/* =========================================================
   FUNCIONES
========================================================= */

function formatFecha(fecha: string) {
  const [year, month, day] = fecha.split('-');
  return `${day}/${month}/${year}`;
}

function formatHora(hora: string) {
  const [hoursString, minutes] = hora.split(':');
  let hours = Number(hoursString);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${suffix}`;
}

/* =========================================================
   ESTILOS DE ESTADO
========================================================= */

const estadoStyles: Record<EstadoCita, { badge: string; dot: string }> = {
  Confirmadas: { badge: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  Pendientes: { badge: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  Atendidas: { badge: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
};

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function CitasTable({ citas, onMarcarAtendida, onCancelarCita }: CitasTableProps) {

  /* FILTROS */
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [servicio, setServicio] = useState('Todos los servicios');
  const [estado, setEstado] = useState('Todos los estados');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [orden, setOrden] = useState<'proximas' | 'lejanas'>('proximas');

  /* DETALLE DE CITA (modal al hacer click en una fila) */
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

  const citasProcesadas = useMemo(() => {
    let resultado = [...citas];

    if (searchTerm.trim()) {
      const texto = searchTerm.toLowerCase().trim();
      resultado = resultado.filter((cita) =>
        [cita.id, cita.hc, cita.dni, cita.paciente, cita.especialidad, cita.medico].some((valor) =>
          valor.toLowerCase().includes(texto)
        )
      );
    }

    if (servicio !== 'Todos los servicios') {
      resultado = resultado.filter((cita) => cita.especialidad === servicio);
    }

    if (estado !== 'Todos los estados') {
      resultado = resultado.filter((cita) => cita.estado === estado);
    }

    if (fechaDesde) {
      resultado = resultado.filter((cita) => cita.fecha >= fechaDesde);
    }

    if (fechaHasta) {
      resultado = resultado.filter((cita) => cita.fecha <= fechaHasta);
    }

    resultado.sort((a, b) => {
      const fechaA = `${a.fecha} ${a.hora}`;
      const fechaB = `${b.fecha} ${b.hora}`;
      return orden === 'proximas' ? fechaA.localeCompare(fechaB) : fechaB.localeCompare(fechaA);
    });

    return resultado;
  }, [citas, searchTerm, servicio, estado, fechaDesde, fechaHasta, orden]);

  const handleBuscar = () => setSearchTerm(searchInput);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleBuscar();
  };

  const handleHoy = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    const fechaHoy = `${year}-${month}-${day}`;
    setFechaDesde(fechaHoy);
    setFechaHasta(fechaHoy);
  };

  const handleLimpiarFiltros = () => {
    setSearchInput('');
    setSearchTerm('');
    setServicio('Todos los servicios');
    setEstado('Todos los estados');
    setFechaDesde('');
    setFechaHasta('');
    setOrden('proximas');
  };

  const hayFiltrosActivos =
    searchTerm || servicio !== 'Todos los servicios' || estado !== 'Todos los estados' || fechaDesde || fechaHasta;

  const handleCancelar = (id: string) => {
    const confirmar = window.confirm('¿Deseas cancelar esta cita?');
    if (confirmar) onCancelarCita(id);
    return confirmar;
  };

  return (
    <div className="w-full">

      {/* =================================================
          FILTROS
      ================================================= */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-3 sm:p-4">

        {/* PRIMERA FILA */}
        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[158px_minmax(200px,1fr)_150px_140px]">

          <div className="relative">
            <select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pr-9 text-xs font-semibold text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
            >
              {servicios.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <ChevronDown />
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Buscar paciente, DNI, HC..."
              className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
            />
          </div>

          <div className="relative">
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pr-9 text-xs font-semibold text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
            >
              {estadosFiltro.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <ChevronDown />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOrden((prev) => (prev === 'proximas' ? 'lejanas' : 'proximas'))}
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            <SortIcon />
            {orden === 'proximas' ? 'Más próximas' : 'Más lejanas'}
          </button>
        </div>

        {/* SEGUNDA FILA */}
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_100px_80px_44px]">

          <div>
            <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-gray-400">
              Desde
            </label>
            <div className="relative">
              <input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 pr-9 text-xs font-medium text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
              />
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <CalendarIcon />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-gray-400">
              Hasta
            </label>
            <div className="relative">
              <input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 pr-9 text-xs font-medium text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
              />
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <CalendarIcon />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBuscar}
            className="flex h-10 items-center justify-center gap-2 self-end rounded-xl bg-[#0d7a71] px-3 text-xs font-bold text-white transition hover:bg-[#0a625b]"
          >
            <SearchIcon size={14} />
            Buscar
          </button>

          <button
            type="button"
            onClick={handleHoy}
            className="flex h-10 items-center justify-center gap-1.5 self-end rounded-xl border border-[#0d7a71]/20 bg-[#0d7a71]/5 text-xs font-bold text-[#0d7a71] transition hover:bg-[#0d7a71]/10"
          >
            <CalendarIcon />
            Hoy
          </button>

          <button
            type="button"
            onClick={() => setSearchTerm((prev) => prev)}
            title="Actualizar"
            className="flex h-10 items-center justify-center self-end rounded-xl border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50"
          >
            <RefreshIcon />
          </button>
        </div>

        {hayFiltrosActivos && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleLimpiarFiltros}
              className="text-[11px] font-semibold text-[#0d7a71] hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* =================================================
          RESULTADOS
      ================================================= */}
      <div className="mt-4">

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <FilterIcon />
            <span className="text-xs font-semibold">{citasProcesadas.length} registros</span>
          </div>

          <span className="hidden sm:block text-[11px] text-gray-400">
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Todas las citas'}
          </span>
        </div>

        {/* TABLA DESKTOP */}
        <div className="hidden md:block overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">N° CITA</th>
                  <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">HC / DNI</th>
                  <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">PACIENTE</th>
                  <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">SERVICIO</th>
                  <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">ESTADO</th>
                  <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">FECHA</th>
                  <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">HORA</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {citasProcesadas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0d7a71]/10 text-[#0d7a71]">
                          <SearchIcon size={19} />
                        </div>
                        <p className="text-sm font-semibold text-gray-700">No se encontraron citas</p>
                        <p className="mt-1 text-xs text-gray-400">Intenta cambiar los filtros de búsqueda.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  citasProcesadas.map((cita) => (
                    <tr
                      key={cita.id}
                      onClick={() => setCitaSeleccionada(cita)}
                      className="cursor-pointer hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-4 py-4 text-xs font-bold text-[#0d7a71]">{cita.id}</td>
                      <td className="px-4 py-4">
                        <p className="whitespace-nowrap text-xs font-bold text-gray-900">{cita.hc}</p>
                        <p className="mt-0.5 whitespace-nowrap text-[11px] text-gray-400">{cita.dni}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="whitespace-nowrap text-xs font-bold text-gray-900">{cita.paciente}</p>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-600">{cita.especialidad}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${estadoStyles[cita.estado].badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${estadoStyles[cita.estado].dot}`} />
                          {cita.estado}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600">{formatFecha(cita.fecha)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-600">
                          <ClockIcon />
                          {formatHora(cita.hora)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARDS MOBILE */}
        <div className="space-y-3 md:hidden">
          {citasProcesadas.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white px-5 py-10 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0d7a71]/10 text-[#0d7a71]">
                <SearchIcon size={19} />
              </div>
              <p className="text-sm font-semibold text-gray-700">No se encontraron citas</p>
              <p className="mt-1 text-xs text-gray-400">Intenta cambiar los filtros.</p>
            </div>
          ) : (
            citasProcesadas.map((cita) => (
              <div key={cita.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

                <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                  <div>
                    <p className="text-xs font-bold text-[#0d7a71]">{cita.id}</p>
                    <p className="mt-1 text-[10px] text-gray-400">{cita.hc}</p>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${estadoStyles[cita.estado].badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${estadoStyles[cita.estado].dot}`} />
                    {cita.estado}
                  </span>
                </div>

                <p className="pt-3 text-sm font-bold text-gray-900">{cita.paciente}</p>

                <div className="mt-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Médico</p>
                  <p className="mt-1 text-xs text-gray-600">{cita.medico}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">DNI</p>
                    <p className="mt-1 text-xs text-gray-600">{cita.dni}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Sexo</p>
                    <p className="mt-1 text-xs text-gray-600">{cita.sexo}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Servicio</p>
                    <p className="mt-1 text-xs text-gray-600">{cita.especialidad}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Fecha</p>
                    <p className="mt-1 text-xs text-gray-600">{formatFecha(cita.fecha)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Hora</p>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-600">
                      <ClockIcon size={13} />
                      {formatHora(cita.hora)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-3">
                  {cita.estado !== 'Atendidas' && (
                    <button
                      type="button"
                      onClick={() => onMarcarAtendida(cita.id)}
                      className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <CheckIcon size={14} />
                      Atendida
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCancelar(cita.id)}
                    className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-50 text-xs font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <TrashIcon size={14} />
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* =================================================
          MODAL DETALLE DE CITA (al hacer click en una fila)
      ================================================= */}
      {citaSeleccionada && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCitaSeleccionada(null);
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-[26px] border border-gray-100 bg-white shadow-2xl">

            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 sm:p-7">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0d7a71]">{citaSeleccionada.id}</p>
                <h3 className="mt-1 truncate text-lg sm:text-xl font-bold text-gray-900">{citaSeleccionada.paciente}</h3>
              </div>
              <button
                type="button"
                onClick={() => setCitaSeleccionada(null)}
                aria-label="Cerrar"
                className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 sm:p-7 space-y-5">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${estadoStyles[citaSeleccionada.estado].badge}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${estadoStyles[citaSeleccionada.estado].dot}`} />
                {citaSeleccionada.estado}
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Historia Clínica</p>
                  <p className="mt-1 text-xs font-semibold text-gray-800">{citaSeleccionada.hc}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">DNI</p>
                  <p className="mt-1 text-xs text-gray-600">{citaSeleccionada.dni}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Sexo</p>
                  <p className="mt-1 text-xs text-gray-600">{citaSeleccionada.sexo}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Servicio</p>
                  <p className="mt-1 text-xs text-gray-600">{citaSeleccionada.especialidad}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Médico</p>
                  <p className="mt-1 text-xs text-gray-600">{citaSeleccionada.medico}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Fecha</p>
                  <p className="mt-1 text-xs text-gray-600">{formatFecha(citaSeleccionada.fecha)}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Hora</p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-600">
                    <ClockIcon size={13} />
                    {formatHora(citaSeleccionada.hora)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 border-t border-gray-100 p-5 sm:p-7">
              {citaSeleccionada.estado !== 'Atendidas' && (
                // Botón sin lógica todavía: el formulario de signos vitales lo conecta otro compañero.
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-[#0d7a71]/20 bg-[#0d7a71]/5 text-xs font-bold text-[#0d7a71] transition hover:bg-[#0d7a71]/10"
                >
                  <PulseIcon size={14} />
                  Triaje
                </button>
              )}

              <div className="flex gap-2.5">
                {citaSeleccionada.estado !== 'Atendidas' && (
                  <button
                    type="button"
                    onClick={() => {
                      onMarcarAtendida(citaSeleccionada.id);
                      setCitaSeleccionada(null);
                    }}
                    className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    <CheckIcon size={14} />
                    Marcar atendida
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (handleCancelar(citaSeleccionada.id)) setCitaSeleccionada(null);
                  }}
                  className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-50 text-xs font-bold text-red-600 transition hover:bg-red-100"
                >
                  <TrashIcon size={14} />
                  Cancelar cita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}