"use client";

import { useMemo, useState } from "react";
import Sidebar, { useSidebar } from "./Sidebar";

/* =========================================================
   TIPOS
========================================================= */

type Turno = "Mañana" | "Tarde";

interface Medico {
  id: string;
  nombre: string;
  especialidad: string;
}

interface Programacion {
  id: string;
  medicoId: string;
  fecha: string;
  turno: Turno;
  horaInicio: string;
  horaFin: string;
  sede: string;
}

/* =========================================================
   DATOS
========================================================= */

const especialidades = [
  "Medicina General",
  "Urología",
  "Pediatría",
  "Ginecología",
  "Odontología",
];

const medicos: Medico[] = [
  { id: "MED-001", nombre: "Médico 1", especialidad: "Medicina General" },
  { id: "MED-002", nombre: "Médico 2", especialidad: "Medicina General" },
  { id: "MED-003", nombre: "Médico 3", especialidad: "Medicina General" },
  { id: "MED-004", nombre: "Médico 4", especialidad: "Urología" },
  { id: "MED-005", nombre: "Médico 5", especialidad: "Urología" },
  { id: "MED-006", nombre: "Médico 6", especialidad: "Pediatría" },
  { id: "MED-007", nombre: "Médico 7", especialidad: "Ginecología" },
  { id: "MED-008", nombre: "Médico 8", especialidad: "Odontología" },
];

/*
  Datos iniciales para que el calendario se vea con contenido.
  Después estos datos serán reemplazados por la base de datos.
*/
const programacionesIniciales: Programacion[] = [
  { id: "PROG-001", medicoId: "MED-001", fecha: "2026-09-03", turno: "Mañana", horaInicio: "08:00", horaFin: "12:00", sede: "Jr. Real" },
  { id: "PROG-002", medicoId: "MED-001", fecha: "2026-09-05", turno: "Tarde", horaInicio: "14:00", horaFin: "18:00", sede: "Sede Central" },
  { id: "PROG-003", medicoId: "MED-001", fecha: "2026-09-10", turno: "Mañana", horaInicio: "08:00", horaFin: "12:00", sede: "Jr. Real" },
  { id: "PROG-004", medicoId: "MED-002", fecha: "2026-09-04", turno: "Mañana", horaInicio: "08:00", horaFin: "12:00", sede: "Jr. Real" },
  { id: "PROG-005", medicoId: "MED-002", fecha: "2026-09-12", turno: "Tarde", horaInicio: "14:00", horaFin: "18:00", sede: "Sede Central" },
];

/* =========================================================
   ICONOS
========================================================= */

function CalendarIcon({ size = 20, strokeWidth = 1.8 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChevronLeft({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function UserIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function TrashIcon({ size = 18 }: { size?: number }) {
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

function ClockIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

function AlertIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 3.6 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/* =========================================================
   FUNCIONES DE FECHAS
========================================================= */

const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const diasSemana = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function fechaKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatearFecha(fecha: string) {
  const [year, month, day] = fecha.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function ProgramacionMedica() {
  const { openSidebar } = useSidebar();
  const hoy = new Date();

  const [especialidad, setEspecialidad] = useState("Medicina General");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState<string>("MED-001");
  const [mes, setMes] = useState(hoy.getMonth());
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [programaciones, setProgramaciones] = useState<Programacion[]>(programacionesIniciales);
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const medicosFiltrados = useMemo(() => {
    return medicos.filter((medico) => medico.especialidad === especialidad);
  }, [especialidad]);

  const medicoActual = useMemo(() => {
    return medicos.find((m) => m.id === medicoSeleccionado);
  }, [medicoSeleccionado]);

  const cambiarEspecialidad = (valor: string) => {
    setEspecialidad(valor);
    const primerMedico = medicos.find((medico) => medico.especialidad === valor);
    setMedicoSeleccionado(primerMedico?.id ?? "");
  };

  const diasCalendario = useMemo(() => {
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);
    const primerDiaSemana = primerDia.getDay() === 0 ? 6 : primerDia.getDay() - 1;
    const cantidadDias = ultimoDia.getDate();
    const totalCeldas = Math.ceil((primerDiaSemana + cantidadDias) / 7) * 7;

    const dias: Array<Date | null> = [];
    for (let i = 0; i < primerDiaSemana; i++) dias.push(null);
    for (let dia = 1; dia <= cantidadDias; dia++) dias.push(new Date(anio, mes, dia));
    while (dias.length < totalCeldas) dias.push(null);

    return dias;
  }, [mes, anio]);

  const obtenerProgramacionesDia = (fecha: string) => {
    return programaciones.filter(
      (programacion) => programacion.medicoId === medicoSeleccionado && programacion.fecha === fecha
    );
  };

  const obtenerConflictosEspecialidad = (fecha: string) => {
    if (!medicoActual) return [];

    return programaciones.filter((programacion) => {
      const medico = medicos.find((m) => m.id === programacion.medicoId);
      return (
        programacion.fecha === fecha &&
        medico?.especialidad === medicoActual.especialidad &&
        programacion.medicoId !== medicoSeleccionado
      );
    });
  };

  const seleccionarDia = (date: Date) => {
    if (!medicoSeleccionado) {
      alert("Selecciona primero un médico en la lista de la izquierda.");
      return;
    }

    const fecha = fechaKey(date);
    setDiaSeleccionado(fecha);
    setModalAbierto(true);
  };

  const mesAnterior = () => {
    if (mes === 0) {
      setMes(11);
      setAnio((prev) => prev - 1);
    } else {
      setMes((prev) => prev - 1);
    }
  };

  const mesSiguiente = () => {
    if (mes === 11) {
      setMes(0);
      setAnio((prev) => prev + 1);
    } else {
      setMes((prev) => prev + 1);
    }
  };

  const irHoy = () => {
    setMes(hoy.getMonth());
    setAnio(hoy.getFullYear());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* SIDEBAR COMPARTIDO */}
      <Sidebar />

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
                Programación Médica
              </h1>
              <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">
                Horarios y disponibilidad de médicos por sede.
              </span>
            </div>

          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-500 shrink-0">
            <ClockIcon size={16} />
            <span>
              {hoy.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", hour12: false })}
            </span>
          </div>

        </header>

        {/* CONTENIDO */}
        <div className="flex-1 p-4 sm:p-5 lg:p-6 overflow-x-hidden">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">

            {/* =================================================
                COLUMNA IZQUIERDA
            ================================================= */}
            <div className="space-y-4">

              {/* Especialidad */}
              <section className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
                <label className="mb-2 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
                  Especialidad
                </label>

                <select
                  value={especialidad}
                  onChange={(e) => cambiarEspecialidad(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                >
                  {especialidades.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </section>

              {/* Médicos */}
              <section className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
                  Médicos
                </h3>

                <div className="space-y-1.5">
                  {medicosFiltrados.map((medico) => {
                    const seleccionado = medico.id === medicoSeleccionado;

                    return (
                      <button
                        key={medico.id}
                        type="button"
                        onClick={() => setMedicoSeleccionado(medico.id)}
                        className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-left text-xs font-semibold transition ${
                          seleccionado
                            ? "bg-[#0d7a71] text-white shadow-md shadow-[#0d7a71]/20"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        <UserIcon size={17} />
                        <span>{medico.nombre} - {medico.especialidad}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Médico seleccionado */}
              {medicoActual && (
                <section className="rounded-2xl sm:rounded-3xl border border-[#0d7a71]/20 bg-[#0d7a71]/5 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#0d7a71]">
                    Viendo agenda de
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-gray-900">
                    {medicoActual.nombre} - {medicoActual.especialidad}
                  </p>

                  <button
                    type="button"
                    onClick={() => setMedicoSeleccionado("")}
                    className="mt-2 text-xs font-semibold text-[#0d7a71] hover:underline"
                  >
                    × Quitar selección
                  </button>
                </section>
              )}
            </div>

            {/* =================================================
                CALENDARIO
            ================================================= */}
            <section className="min-w-0">

              {/* Controles calendario */}
              <div className="mb-4 flex flex-col gap-3 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={mesAnterior}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                    aria-label="Mes anterior"
                  >
                    <ChevronLeft />
                  </button>

                  <select
                    value={mes}
                    onChange={(e) => setMes(Number(e.target.value))}
                    className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 outline-none"
                  >
                    {meses.map((nombre, index) => (
                      <option key={nombre} value={index}>{nombre}</option>
                    ))}
                  </select>

                  <select
                    value={anio}
                    onChange={(e) => setAnio(Number(e.target.value))}
                    className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 outline-none"
                  >
                    {Array.from({ length: 7 }, (_, index) => hoy.getFullYear() - 2 + index).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={mesSiguiente}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                    aria-label="Mes siguiente"
                  >
                    <ChevronRight />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={irHoy}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0d7a71] px-5 text-xs font-bold text-white shadow-md shadow-[#0d7a71]/20 transition hover:bg-[#0a625b] active:scale-[0.98]"
                >
                  <CalendarIcon size={16} />
                  Hoy
                </button>
              </div>

              {/* Calendario */}
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-sm">

                <div className="grid grid-cols-7 bg-gray-800">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="px-2 py-3 text-center text-[10px] sm:text-[11px] font-extrabold text-white">
                      {dia}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {diasCalendario.map((date, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="min-h-[95px] sm:min-h-[115px] border-b border-r border-gray-100 bg-gray-50/40" />;
                    }

                    const fecha = fechaKey(date);
                    const programacionesDia = obtenerProgramacionesDia(fecha);
                    const conflictos = obtenerConflictosEspecialidad(fecha);
                    const esHoy = fecha === fechaKey(hoy);
                    const tieneProgramacion = programacionesDia.length > 0;
                    const tieneConflicto = conflictos.length > 0;

                    return (
                      <button
                        key={fecha}
                        type="button"
                        onClick={() => seleccionarDia(date)}
                        className={`group relative min-h-[95px] sm:min-h-[115px] border-b border-r border-gray-100 bg-white p-1.5 sm:p-2 text-left align-top transition hover:bg-gray-50/70 ${
                          esHoy ? "bg-[#0d7a71]/5" : ""
                        }`}
                      >
                        <div className={`mb-1.5 text-[11px] sm:text-xs font-bold ${esHoy ? "text-[#0d7a71]" : "text-gray-500"}`}>
                          {date.getDate()}
                        </div>

                        <div className="space-y-1">
                          {programacionesDia.map((programacion) => (
                            <div
                              key={programacion.id}
                              className={`rounded-md px-1.5 py-1 text-[9px] sm:text-[10px] leading-tight ${
                                programacion.turno === "Mañana"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-indigo-50 text-indigo-700"
                              }`}
                            >
                              <p className="font-extrabold">{programacion.horaInicio}-{programacion.horaFin}</p>
                              <p className="mt-0.5 font-medium truncate">{medicoActual?.nombre}</p>
                              <p className="font-medium truncate">{programacion.sede}</p>
                            </div>
                          ))}

                          {tieneConflicto && !tieneProgramacion && (
                            <div className="rounded-md bg-amber-50 px-1.5 py-1 text-[8px] sm:text-[9px] font-semibold leading-tight text-amber-700">
                              Otro médico de {especialidad}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Leyenda */}
              <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-5 text-[11px] sm:text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-blue-50 border border-blue-100" />
                  <span>Mañana</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-indigo-50 border border-indigo-100" />
                  <span>Tarde</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-amber-50 border border-amber-100" />
                  <span>Otro médico de la especialidad</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* MODAL PROGRAMAR MÉDICO */}
      {modalAbierto && diaSeleccionado && medicoActual && (
        <ModalProgramar
          fecha={diaSeleccionado}
          medico={medicoActual}
          especialidad={especialidad}
          programaciones={programaciones}
          setProgramaciones={setProgramaciones}
          conflictos={obtenerConflictosEspecialidad(diaSeleccionado)}
          onClose={() => {
            setModalAbierto(false);
            setDiaSeleccionado(null);
          }}
        />
      )}
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

interface ModalProps {
  fecha: string;
  medico: Medico;
  especialidad: string;
  programaciones: Programacion[];
  setProgramaciones: React.Dispatch<React.SetStateAction<Programacion[]>>;
  conflictos: Programacion[];
  onClose: () => void;
}

function ModalProgramar({
  fecha,
  medico,
  especialidad,
  programaciones,
  setProgramaciones,
  conflictos,
  onClose,
}: ModalProps) {
  const [turno, setTurno] = useState<Turno>("Mañana");
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFin, setHoraFin] = useState("12:00");
  const [sede, setSede] = useState("");

  const programacionesDelDia = programaciones.filter(
    (programacion) => programacion.fecha === fecha && programacion.medicoId === medico.id
  );

  const seleccionarTurno = (nuevoTurno: Turno) => {
    setTurno(nuevoTurno);
    if (nuevoTurno === "Mañana") {
      setHoraInicio("08:00");
      setHoraFin("12:00");
    } else {
      setHoraInicio("14:00");
      setHoraFin("18:00");
    }
  };

  const guardar = () => {
    if (!sede) {
      alert("Selecciona una sede.");
      return;
    }
    if (!horaInicio || !horaFin) {
      alert("Completa el horario.");
      return;
    }

    const nuevaProgramacion: Programacion = {
      id: `PROG-${Date.now()}`,
      medicoId: medico.id,
      fecha,
      turno,
      horaInicio,
      horaFin,
      sede,
    };

    setProgramaciones((prev) => [...prev, nuevaProgramacion]);
    onClose();
  };

  const eliminarProgramacion = (id: string) => {
    const confirmar = window.confirm("¿Deseas eliminar esta programación?");
    if (!confirmar) return;
    setProgramaciones((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-3 sm:p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-[26px] bg-white shadow-2xl border border-gray-100">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 sm:px-7 py-5">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Programar médico</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 capitalize">
              {capitalizar(formatearFecha(fecha))}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <XIcon />
          </button>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto px-5 sm:px-7 py-5 space-y-5">

          {/* Programaciones existentes */}
          {programacionesDelDia.length > 0 && (
            <div>
              <p className="mb-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
                Ya programado ese día
              </p>

              <div className="space-y-2">
                {programacionesDelDia.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {medico.nombre} - {especialidad}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {item.turno} · {item.horaInicio}-{item.horaFin} · {item.sede}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => eliminarProgramacion(item.id)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                      title="Eliminar"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aviso de conflicto */}
          {conflictos.length > 0 && (
            <div className="flex gap-2.5 rounded-xl border border-amber-100 bg-amber-50 p-3 text-[11px] leading-4 text-amber-700">
              <div className="mt-0.5 shrink-0">
                <AlertIcon size={17} />
              </div>

              <div>
                <p className="font-bold text-amber-800">
                  Ya hay un médico de {especialidad} programado ese día
                </p>
                <p className="mt-1">
                  Es otro médico de la misma especialidad. Puedes continuar si lo deseas.
                </p>

                <div className="mt-2 space-y-1">
                  {conflictos.map((item) => {
                    const otroMedico = medicos.find((m) => m.id === item.medicoId);
                    return (
                      <div key={item.id} className="font-semibold">
                        • {otroMedico?.nombre} · {item.turno} · {item.horaInicio}-{item.horaFin} · {item.sede}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Médico */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Médico *</label>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-gray-700">
              <UserIcon size={17} />
              <span>{medico.nombre} - {medico.especialidad}</span>
            </div>
          </div>

          {/* Turno */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Turno *</label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => seleccionarTurno("Mañana")}
                className={`rounded-xl border px-3 py-3 text-center transition ${
                  turno === "Mañana"
                    ? "border-[#0d7a71] bg-[#0d7a71]/5 text-[#0d7a71]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <p className="text-sm font-bold">Mañana</p>
                <p className="mt-0.5 text-xs opacity-70">08:00 - 12:00</p>
              </button>

              <button
                type="button"
                onClick={() => seleccionarTurno("Tarde")}
                className={`rounded-xl border px-3 py-3 text-center transition ${
                  turno === "Tarde"
                    ? "border-[#0d7a71] bg-[#0d7a71]/5 text-[#0d7a71]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <p className="text-sm font-bold">Tarde</p>
                <p className="mt-0.5 text-xs opacity-70">14:00 - 18:00</p>
              </button>
            </div>
          </div>

          {/* Horas */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Hora inicio</label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Hora fin</label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
              />
            </div>
          </div>

          {/* Sede */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Sede *</label>
            <select
              value={sede}
              onChange={(e) => setSede(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
            >
              <option value="">Seleccionar...</option>
              <option value="Jr. Real">Jr. Real</option>
              <option value="Sede Central">Sede Central</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-1 gap-3 border-t border-gray-100 px-5 sm:px-7 py-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={guardar}
            className="h-11 rounded-xl bg-[#0d7a71] text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 transition hover:bg-[#0a625b] active:scale-[0.98]"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}