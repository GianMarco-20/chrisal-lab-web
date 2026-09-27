"use client";

import React, { useMemo, useState } from "react";

/* =========================================================
   TIPOS
========================================================= */

type EstadoCita = "Confirmadas" | "Pendientes" | "Atendidas";

interface Cita {
  id: string;
  hc: string;
  dni: string;
  paciente: string;
  sexo: "Masculino" | "Femenino";
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  estado: EstadoCita;
}

interface NuevaCita {
  dni: string;
  nombres: string;
  apellidos: string;
  sexo: "Masculino" | "Femenino";
  celular: string;
  especialidad: string;
  fecha: string;
  hora: string;
}

/* =========================================================
   COLORES DEL SISTEMA
========================================================= */

const COLORS = {
  primary: "#0F8178",
  primaryDark: "#0B7068",
  primaryLight: "#E8F7F4",
  text: "#172033",
  textSecondary: "#53627A",
  textMuted: "#8A96A8",
  background: "#F7F9FB",
  border: "#E4E9EF",
};

/* =========================================================
   OPCIONES
========================================================= */

const servicios = [
  "Todos los servicios",
  "Medicina General",
  "Urología",
  "Pediatría",
  "Ginecología",
  "Odontología",
  "Laboratorio Clínico",
];

const estados = [
  "Todos los estados",
  "Confirmadas",
  "Pendientes",
  "Atendidas",
];

/* =========================================================
   DATOS DE EJEMPLO
========================================================= */

const citasIniciales: Cita[] = [
  {
    id: "CIT-001",
    hc: "HC-1001",
    dni: "74852136",
    paciente: "Juan Pérez García",
    sexo: "Masculino",
    especialidad: "Medicina General",
    medico: "Dr. Carlos Mendoza",
    fecha: "2026-09-27",
    hora: "08:30",
    estado: "Confirmadas",
  },
  {
    id: "CIT-002",
    hc: "HC-1002",
    dni: "71245896",
    paciente: "Diego Armando Ruiz",
    sexo: "Masculino",
    especialidad: "Urología",
    medico: "Dr. Carlos Mendoza",
    fecha: "2026-09-27",
    hora: "09:15",
    estado: "Pendientes",
  },
  {
    id: "CIT-003",
    hc: "HC-1003",
    dni: "70852147",
    paciente: "María Elena Torres",
    sexo: "Femenino",
    especialidad: "Laboratorio Clínico",
    medico: "Dra. Ana Rivera",
    fecha: "2026-09-27",
    hora: "10:00",
    estado: "Confirmadas",
  },
  {
    id: "CIT-004",
    hc: "HC-1004",
    dni: "75412369",
    paciente: "Lucía Fernández",
    sexo: "Femenino",
    especialidad: "Medicina General",
    medico: "Dr. Carlos Mendoza",
    fecha: "2026-09-27",
    hora: "10:45",
    estado: "Confirmadas",
  },
  {
    id: "CIT-005",
    hc: "HC-1005",
    dni: "70125896",
    paciente: "Pedro Ramírez",
    sexo: "Masculino",
    especialidad: "Pediatría",
    medico: "Dra. Rosa Salazar",
    fecha: "2026-09-27",
    hora: "11:30",
    estado: "Atendidas",
  },
  {
    id: "CIT-006",
    hc: "HC-1006",
    dni: "76321458",
    paciente: "María González",
    sexo: "Femenino",
    especialidad: "Ginecología",
    medico: "Dra. Ana Castillo",
    fecha: "2026-09-27",
    hora: "12:15",
    estado: "Atendidas",
  },
];

/* =========================================================
   ICONOS
========================================================= */

function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CalendarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function PlusIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function RefreshIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 11a8.1 8.1 0 0 0-14.5-4.9L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 14.5 4.9L20 16" />
      <path d="M20 20v-4h-4" />
    </svg>
  );
}

function ClockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FilterIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function SortIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 5v14" />
      <path d="m5 8 3-3 3 3" />
      <path d="M16 19V5" />
      <path d="m13 16 3 3 3-3" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* =========================================================
   FUNCIONES
========================================================= */

function formatFecha(fecha: string) {
  const [year, month, day] = fecha.split("-");

  return `${day}/${month}/${year}`;
}

function formatHora(hora: string) {
  const [hoursString, minutes] = hora.split(":");

  let hours = Number(hoursString);

  const suffix = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${suffix}`;
}

/* =========================================================
   ESTILOS DE ESTADO
========================================================= */

const estadoStyles: Record<
  EstadoCita,
  {
    badge: string;
    dot: string;
  }
> = {
  Confirmadas: {
    badge: "bg-[#E8F7F4] text-[#0F8178]",
    dot: "bg-[#0F8178]",
  },

  Pendientes: {
    badge: "bg-[#FFF5E8] text-[#D98A18]",
    dot: "bg-[#D98A18]",
  },

  Atendidas: {
    badge: "bg-[#EAF1FB] text-[#4A78B8]",
    dot: "bg-[#4A78B8]",
  },
};

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function CitasTable() {
  const [citas, setCitas] = useState<Cita[]>(citasIniciales);

  /* =======================================================
     FILTROS
  ======================================================= */

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [servicio, setServicio] =
    useState("Todos los servicios");

  const [estado, setEstado] =
    useState("Todos los estados");

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const [orden, setOrden] =
    useState<"proximas" | "lejanas">("proximas");

  /* =======================================================
     MODAL
  ======================================================= */

  const [mostrarModal, setMostrarModal] = useState(false);

  const [nuevaCita, setNuevaCita] =
    useState<NuevaCita>({
      dni: "",
      nombres: "",
      apellidos: "",
      sexo: "Masculino",
      celular: "",
      especialidad: "Medicina General",
      fecha: "",
      hora: "",
    });

  /* =======================================================
     MENSAJE
  ======================================================= */

  const [mensaje, setMensaje] = useState("");

  /* =======================================================
     PROCESAR CITAS
  ======================================================= */

  const citasProcesadas = useMemo(() => {
    let resultado = [...citas];

    /* BUSCADOR */

    if (searchTerm.trim()) {
      const texto = searchTerm.toLowerCase().trim();

      resultado = resultado.filter((cita) =>
        [
          cita.id,
          cita.hc,
          cita.dni,
          cita.paciente,
          cita.especialidad,
          cita.medico,
        ].some((valor) =>
          valor.toLowerCase().includes(texto)
        )
      );
    }

    /* SERVICIO */

    if (servicio !== "Todos los servicios") {
      resultado = resultado.filter(
        (cita) =>
          cita.especialidad === servicio
      );
    }

    /* ESTADO */

    if (estado !== "Todos los estados") {
      resultado = resultado.filter(
        (cita) =>
          cita.estado === estado
      );
    }

    /* FECHA DESDE */

    if (fechaDesde) {
      resultado = resultado.filter(
        (cita) =>
          cita.fecha >= fechaDesde
      );
    }

    /* FECHA HASTA */

    if (fechaHasta) {
      resultado = resultado.filter(
        (cita) =>
          cita.fecha <= fechaHasta
      );
    }

    /* ORDEN */

    resultado.sort((a, b) => {
      const fechaA = `${a.fecha} ${a.hora}`;
      const fechaB = `${b.fecha} ${b.hora}`;

      if (orden === "proximas") {
        return fechaA.localeCompare(fechaB);
      }

      return fechaB.localeCompare(fechaA);
    });

    return resultado;
  }, [
    citas,
    searchTerm,
    servicio,
    estado,
    fechaDesde,
    fechaHasta,
    orden,
  ]);

  /* =======================================================
     CONTADORES
  ======================================================= */

  const totalConfirmadas = citas.filter(
    (cita) =>
      cita.estado === "Confirmadas"
  ).length;

  const totalPendientes = citas.filter(
    (cita) =>
      cita.estado === "Pendientes"
  ).length;

  const totalAtendidas = citas.filter(
    (cita) =>
      cita.estado === "Atendidas"
  ).length;

  /* =======================================================
     BUSCAR
  ======================================================= */

  const handleBuscar = () => {
    setSearchTerm(searchInput);
  };

  const handleSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleBuscar();
    }
  };

  /* =======================================================
     HOY
  ======================================================= */

  const handleHoy = () => {
    const hoy = new Date();

    const year = hoy.getFullYear();

    const month = String(
      hoy.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      hoy.getDate()
    ).padStart(2, "0");

    const fechaHoy =
      `${year}-${month}-${day}`;

    setFechaDesde(fechaHoy);
    setFechaHasta(fechaHoy);
  };

  /* =======================================================
     LIMPIAR
  ======================================================= */

  const handleLimpiarFiltros = () => {
    setSearchInput("");
    setSearchTerm("");

    setServicio(
      "Todos los servicios"
    );

    setEstado(
      "Todos los estados"
    );

    setFechaDesde("");
    setFechaHasta("");

    setOrden("proximas");
  };

  /* =======================================================
     ACTUALIZAR
  ======================================================= */

  const handleRefresh = () => {
    setMensaje(
      "Información actualizada"
    );

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  };

  /* =======================================================
     FORMULARIO NUEVA CITA
  ======================================================= */

  const handleNuevaCitaChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setNuevaCita((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     GUARDAR NUEVA CITA
  ======================================================= */

  const handleGuardarCita = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const nuevoNumero =
      citas.length + 1;

    const nuevaCitaCompleta: Cita = {
      id: `CIT-${String(
        nuevoNumero
      ).padStart(3, "0")}`,

      hc: `HC-${String(
        1000 + nuevoNumero
      )}`,

      dni: nuevaCita.dni,

      paciente:
        `${nuevaCita.nombres} ${nuevaCita.apellidos}`,

      sexo: nuevaCita.sexo,

      especialidad:
        nuevaCita.especialidad,

      medico: "Por asignar",

      fecha: nuevaCita.fecha,

      hora: nuevaCita.hora,

      estado: "Pendientes",
    };

    setCitas((prev) => [
      ...prev,
      nuevaCitaCompleta,
    ]);

    setNuevaCita({
      dni: "",
      nombres: "",
      apellidos: "",
      sexo: "Masculino",
      celular: "",
      especialidad: "Medicina General",
      fecha: "",
      hora: "",
    });

    setMostrarModal(false);

    setMensaje(
      "Cita registrada correctamente"
    );

    setTimeout(() => {
      setMensaje("");
    }, 2500);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor:
          COLORS.background,
        color: COLORS.text,
      }}
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1
              className="text-[20px] font-bold tracking-[-0.2px]"
              style={{
                color: COLORS.text,
              }}
            >
              Registro de Citas
            </h1>

            <p
              className="mt-1 text-[13px]"
              style={{
                color: COLORS.textMuted,
              }}
            >
              Citas agendadas en
              consultorios y laboratorio
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setMostrarModal(true)
            }
            className="flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor:
                COLORS.primary,
            }}
          >
            <PlusIcon size={17} />
            Agendar Cita
          </button>
        </div>

        {/* =================================================
            RESUMEN
        ================================================= */}

        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

          {/* TOTAL */}

          <div
            className="rounded-2xl border bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
            style={{
              borderColor: COLORS.border,
            }}
          >
            <p
              className="text-[12px] font-medium"
              style={{
                color: COLORS.textMuted,
              }}
            >
              Total de citas
            </p>

            <p
              className="mt-2 text-[23px] font-bold"
              style={{
                color: COLORS.text,
              }}
            >
              {citas.length}
            </p>
          </div>

          {/* CONFIRMADAS */}

          <div
            className="rounded-2xl border bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
            style={{
              borderColor: COLORS.border,
            }}
          >
            <p className="text-[12px] font-medium text-[#8A96A8]">
              Confirmadas
            </p>

            <p className="mt-2 text-[23px] font-bold text-[#0F8178]">
              {totalConfirmadas}
            </p>
          </div>

          {/* PENDIENTES */}

          <div
            className="rounded-2xl border bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
            style={{
              borderColor: COLORS.border,
            }}
          >
            <p className="text-[12px] font-medium text-[#8A96A8]">
              Pendientes
            </p>

            <p className="mt-2 text-[23px] font-bold text-[#D98A18]">
              {totalPendientes}
            </p>
          </div>

          {/* ATENDIDAS */}

          <div
            className="rounded-2xl border bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
            style={{
              borderColor: COLORS.border,
            }}
          >
            <p className="text-[12px] font-medium text-[#8A96A8]">
              Atendidas
            </p>

            <p className="mt-2 text-[23px] font-bold text-[#4A78B8]">
              {totalAtendidas}
            </p>
          </div>
        </div>

        {/* =================================================
            FILTROS
        ================================================= */}

        <div
          className="rounded-2xl border bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-4"
          style={{
            borderColor: COLORS.border,
          }}
        >

          {/* PRIMERA FILA */}

          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[158px_minmax(200px,1fr)_132px_132px]">

            {/* SERVICIO */}

            <div className="relative">
              <select
                value={servicio}
                onChange={(e) =>
                  setServicio(
                    e.target.value
                  )
                }
                className="h-10 w-full appearance-none rounded-xl border bg-white px-3 pr-9 text-[12px] font-semibold outline-none"
                style={{
                  borderColor:
                    COLORS.border,
                  color:
                    COLORS.textSecondary,
                }}
              >
                {servicios.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <ChevronDown size={15} />
              </div>
            </div>

            {/* BUSCADOR */}

            <div className="relative">
              <div
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                style={{
                  color:
                    COLORS.textMuted,
                }}
              >
                <SearchIcon size={16} />
              </div>

              <input
                type="text"
                value={searchInput}
                onChange={(e) =>
                  setSearchInput(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleSearchKeyDown
                }
                placeholder="Buscar paciente, DNI, HC..."
                className="h-10 w-full rounded-xl border bg-white pl-9 pr-3 text-[12px] outline-none placeholder:text-[#A1AAB8]"
                style={{
                  borderColor:
                    COLORS.border,
                  color: COLORS.text,
                }}
              />
            </div>

            {/* ESTADO */}

            <div className="relative">
              <select
                value={estado}
                onChange={(e) =>
                  setEstado(
                    e.target.value
                  )
                }
                className="h-10 w-full appearance-none rounded-xl border bg-white px-3 pr-9 text-[12px] font-semibold outline-none"
                style={{
                  borderColor:
                    COLORS.border,
                  color:
                    COLORS.textSecondary,
                }}
              >
                {estados.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <ChevronDown size={15} />
              </div>
            </div>

            {/* ORDEN */}

            <button
              type="button"
              onClick={() =>
                setOrden(
                  (prev) =>
                    prev === "proximas"
                      ? "lejanas"
                      : "proximas"
                )
              }
              className="flex h-10 items-center justify-center gap-2 rounded-xl border bg-white px-3 text-[12px] font-semibold transition hover:bg-[#F8FAFB]"
              style={{
                borderColor:
                  COLORS.border,
                color:
                  COLORS.textSecondary,
              }}
            >
              <SortIcon size={15} />

              {orden === "proximas"
                ? "Más próximas"
                : "Más lejanas"}
            </button>
          </div>

          {/* SEGUNDA FILA */}

          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_92px_70px_42px]">

            {/* DESDE */}

            <div>
              <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.04em] text-[#8A96A8]">
                DESDE
              </label>

              <div className="relative">
                <input
                  type="date"
                  value={fechaDesde}
                  onChange={(e) =>
                    setFechaDesde(
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-xl border bg-white px-3 pr-9 text-[12px] font-medium outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                    color:
                      COLORS.textSecondary,
                  }}
                />

                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8A96A8]">
                  <CalendarIcon size={15} />
                </div>
              </div>
            </div>

            {/* HASTA */}

            <div>
              <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.04em] text-[#8A96A8]">
                HASTA
              </label>

              <div className="relative">
                <input
                  type="date"
                  value={fechaHasta}
                  onChange={(e) =>
                    setFechaHasta(
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-xl border bg-white px-3 pr-9 text-[12px] font-medium outline-none"
                  style={{
                    borderColor:
                      COLORS.border,
                    color:
                      COLORS.textSecondary,
                  }}
                />

                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8A96A8]">
                  <CalendarIcon size={15} />
                </div>
              </div>
            </div>

            {/* BUSCAR */}

            <button
              type="button"
              onClick={handleBuscar}
              className="flex h-10 items-center justify-center gap-2 self-end rounded-xl px-3 text-[12px] font-bold text-white transition hover:opacity-90"
              style={{
                backgroundColor:
                  COLORS.primary,
              }}
            >
              <SearchIcon size={15} />
              Buscar
            </button>

            {/* HOY */}

            <button
              type="button"
              onClick={handleHoy}
              className="flex h-10 items-center justify-center gap-1.5 rounded-xl border text-[12px] font-bold transition hover:bg-[#E8F7F4]"
              style={{
                borderColor: "#B9DED9",
                color: COLORS.primary,
                backgroundColor:
                  "#F4FBFA",
              }}
            >
              <CalendarIcon size={15} />
              Hoy
            </button>

            {/* ACTUALIZAR */}

            <button
              type="button"
              onClick={handleRefresh}
              title="Actualizar"
              className="flex h-10 items-center justify-center rounded-xl border bg-white transition hover:bg-[#F8FAFB]"
              style={{
                borderColor:
                  COLORS.border,
                color:
                  COLORS.textMuted,
              }}
            >
              <RefreshIcon size={17} />
            </button>
          </div>

          {/* LIMPIAR */}

          {(searchTerm ||
            servicio !==
              "Todos los servicios" ||
            estado !==
              "Todos los estados" ||
            fechaDesde ||
            fechaHasta) && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={
                  handleLimpiarFiltros
                }
                className="text-[11px] font-semibold hover:underline"
                style={{
                  color:
                    COLORS.primary,
                }}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            MENSAJE
        ================================================= */}

        {mensaje && (
          <div
            className="mt-3 rounded-xl border px-4 py-2.5 text-[12px] font-semibold"
            style={{
              backgroundColor:
                COLORS.primaryLight,
              borderColor: "#C7E8E3",
              color: COLORS.primary,
            }}
          >
            {mensaje}
          </div>
        )}

        {/* =================================================
            RESULTADOS
        ================================================= */}

        <div className="mt-5">

          <div className="mb-3 flex items-center justify-between">

            <div className="flex items-center gap-2">
              <FilterIcon size={15} />

              <span
                className="text-[12px] font-semibold"
                style={{
                  color:
                    COLORS.textSecondary,
                }}
              >
                {citasProcesadas.length}{" "}
                registros
              </span>
            </div>

            <span className="hidden text-[11px] text-[#8A96A8] sm:block">
              {searchTerm
                ? `Resultados para "${searchTerm}"`
                : "Todas las citas"}
            </span>
          </div>

          {/* =================================================
              TABLA DESKTOP
          ================================================= */}

          <div
            className="hidden overflow-hidden rounded-2xl border bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] md:block"
            style={{
              borderColor:
                COLORS.border,
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px] border-collapse">

                {/* HEADER */}

                <thead>
                  <tr
                    className="border-b bg-[#FAFBFC]"
                    style={{
                      borderColor:
                        COLORS.border,
                    }}
                  >
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      N° CITA
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      HC
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      DNI
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      PACIENTE
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      SEXO
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      SERVICIO
                    </th>

                    {/* MÉDICO SEPARADO */}

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      MÉDICO
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      ESTADO
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      FECHA
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-[#68758A]">
                      HORA
                    </th>
                  </tr>
                </thead>

                {/* BODY */}

                <tbody>

                  {citasProcesadas.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center">

                          <div
                            className="mb-3 flex h-11 w-11 items-center justify-center rounded-full"
                            style={{
                              backgroundColor:
                                COLORS.primaryLight,
                              color:
                                COLORS.primary,
                            }}
                          >
                            <SearchIcon size={19} />
                          </div>

                          <p className="text-[13px] font-semibold text-[#172033]">
                            No se encontraron citas
                          </p>

                          <p className="mt-1 text-[11px] text-[#8A96A8]">
                            Intenta cambiar los filtros de búsqueda.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    citasProcesadas.map(
                      (cita) => (
                        <tr
                          key={cita.id}
                          className="border-b last:border-b-0 hover:bg-[#FCFDFD]"
                          style={{
                            borderColor:
                              COLORS.border,
                          }}
                        >

                          {/* N° CITA */}

                          <td className="px-4 py-4">
                            <span className="text-[12px] font-bold text-[#0F8178]">
                              {cita.id}
                            </span>
                          </td>

                          {/* HC */}

                          <td className="px-4 py-4">
                            <span className="text-[12px] text-[#53627A]">
                              {cita.hc}
                            </span>
                          </td>

                          {/* DNI */}

                          <td className="px-4 py-4">
                            <span className="text-[12px] text-[#53627A]">
                              {cita.dni}
                            </span>
                          </td>

                          {/* PACIENTE
                              SIN ICONO */}

                          <td className="px-4 py-4">
                            <p className="whitespace-nowrap text-[12px] font-semibold text-[#172033]">
                              {cita.paciente}
                            </p>
                          </td>

                          {/* SEXO */}

                          <td className="px-4 py-4">
                            <span className="text-[12px] text-[#53627A]">
                              {cita.sexo}
                            </span>
                          </td>

                          {/* SERVICIO */}

                          <td className="px-4 py-4">
                            <span className="text-[12px] text-[#53627A]">
                              {cita.especialidad}
                            </span>
                          </td>

                          {/* MÉDICO
                              COLUMNA INDEPENDIENTE */}

                          <td className="px-4 py-4">
                            <span className="whitespace-nowrap text-[12px] text-[#53627A]">
                              {cita.medico}
                            </span>
                          </td>

                          {/* ESTADO */}

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${estadoStyles[cita.estado].badge}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${estadoStyles[cita.estado].dot}`}
                              />

                              {cita.estado}
                            </span>
                          </td>

                          {/* FECHA */}

                          <td className="px-4 py-4">
                            <span className="whitespace-nowrap text-[12px] text-[#53627A]">
                              {formatFecha(
                                cita.fecha
                              )}
                            </span>
                          </td>

                          {/* HORA */}

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5 whitespace-nowrap text-[12px] text-[#53627A]">
                              <ClockIcon size={14} />

                              {formatHora(
                                cita.hora
                              )}
                            </div>
                          </td>

                        </tr>
                      )
                    )
                  )}

                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              CARDS MOBILE
          ================================================= */}

          <div className="space-y-3 md:hidden">

            {citasProcesadas.length === 0 ? (
              <div
                className="rounded-2xl border bg-white px-5 py-10 text-center"
                style={{
                  borderColor:
                    COLORS.border,
                }}
              >
                <div
                  className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      COLORS.primaryLight,
                    color:
                      COLORS.primary,
                  }}
                >
                  <SearchIcon size={19} />
                </div>

                <p className="text-[13px] font-semibold text-[#172033]">
                  No se encontraron citas
                </p>

                <p className="mt-1 text-[11px] text-[#8A96A8]">
                  Intenta cambiar los filtros.
                </p>
              </div>
            ) : (
              citasProcesadas.map(
                (cita) => (
                  <div
                    key={cita.id}
                    className="rounded-2xl border bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
                    style={{
                      borderColor:
                        COLORS.border,
                    }}
                  >

                    {/* CABECERA */}

                    <div
                      className="flex items-start justify-between gap-3 border-b pb-3"
                      style={{
                        borderColor:
                          COLORS.border,
                      }}
                    >
                      <div>
                        <p className="text-[12px] font-bold text-[#0F8178]">
                          {cita.id}
                        </p>

                        <p className="mt-1 text-[10px] text-[#8A96A8]">
                          {cita.hc}
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${estadoStyles[cita.estado].badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${estadoStyles[cita.estado].dot}`}
                        />

                        {cita.estado}
                      </span>
                    </div>

                    {/* PACIENTE */}

                    <div className="pt-3">
                      <p className="text-[14px] font-bold text-[#172033]">
                        {cita.paciente}
                      </p>
                    </div>

                    {/* MÉDICO SEPARADO */}

                    <div className="mt-3">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-[#8A96A8]">
                        Médico
                      </p>

                      <p className="mt-1 text-[11px] text-[#53627A]">
                        {cita.medico}
                      </p>
                    </div>

                    {/* INFORMACIÓN */}

                    <div className="mt-4 grid grid-cols-2 gap-3">

                      {/* DNI */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wide text-[#8A96A8]">
                          DNI
                        </p>

                        <p className="mt-1 text-[11px] text-[#53627A]">
                          {cita.dni}
                        </p>
                      </div>

                      {/* SEXO */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wide text-[#8A96A8]">
                          Sexo
                        </p>

                        <p className="mt-1 text-[11px] text-[#53627A]">
                          {cita.sexo}
                        </p>
                      </div>

                      {/* SERVICIO */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wide text-[#8A96A8]">
                          Servicio
                        </p>

                        <p className="mt-1 text-[11px] text-[#53627A]">
                          {cita.especialidad}
                        </p>
                      </div>

                      {/* FECHA */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wide text-[#8A96A8]">
                          Fecha
                        </p>

                        <p className="mt-1 text-[11px] text-[#53627A]">
                          {formatFecha(
                            cita.fecha
                          )}
                        </p>
                      </div>

                      {/* HORA */}

                      <div className="col-span-2">
                        <p className="text-[9px] font-bold uppercase tracking-wide text-[#8A96A8]">
                          Hora
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#53627A]">
                          <ClockIcon size={13} />

                          {formatHora(
                            cita.hora
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          MODAL NUEVA CITA
      ===================================================== */}

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">

          <div className="max-h-[92vh] w-full max-w-[650px] overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div
              className="flex items-center justify-between border-b px-5 py-4"
              style={{
                borderColor:
                  COLORS.border,
              }}
            >
              <div>
                <h2 className="text-[17px] font-bold text-[#172033]">
                  Registrar Nueva Cita
                </h2>

                <p className="mt-0.5 text-[11px] text-[#8A96A8]">
                  Ingresa los datos del paciente y la cita.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMostrarModal(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8A96A8] transition hover:bg-[#F3F5F7] hover:text-[#172033]"
              >
                <XIcon size={17} />
              </button>
            </div>

            {/* FORMULARIO */}

            <form
              onSubmit={
                handleGuardarCita
              }
              className="space-y-5 p-5"
            >

              {/* DATOS DEL PACIENTE */}

              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#68758A]">
                  Datos del paciente
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* DNI */}

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#53627A]">
                      DNI *
                    </label>

                    <input
                      required
                      name="dni"
                      value={
                        nuevaCita.dni
                      }
                      onChange={
                        handleNuevaCitaChange
                      }
                      placeholder="Ingrese DNI"
                      className="h-10 w-full rounded-xl border px-3 text-[12px] outline-none"
                      style={{
                        borderColor:
                          COLORS.border,
                        color:
                          COLORS.text,
                      }}
                    />
                  </div>

                  {/* CELULAR */}

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#53627A]">
                      Celular
                    </label>

                    <input
                      name="celular"
                      value={
                        nuevaCita.celular
                      }
                      onChange={
                        handleNuevaCitaChange
                      }
                      placeholder="999 999 999"
                      className="h-10 w-full rounded-xl border px-3 text-[12px] outline-none"
                      style={{
                        borderColor:
                          COLORS.border,
                        color:
                          COLORS.text,
                      }}
                    />
                  </div>

                  {/* NOMBRES */}

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#53627A]">
                      Nombres *
                    </label>

                    <input
                      required
                      name="nombres"
                      value={
                        nuevaCita.nombres
                      }
                      onChange={
                        handleNuevaCitaChange
                      }
                      placeholder="Nombres"
                      className="h-10 w-full rounded-xl border px-3 text-[12px] outline-none"
                      style={{
                        borderColor:
                          COLORS.border,
                        color:
                          COLORS.text,
                      }}
                    />
                  </div>

                  {/* APELLIDOS */}

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#53627A]">
                      Apellidos *
                    </label>

                    <input
                      required
                      name="apellidos"
                      value={
                        nuevaCita.apellidos
                      }
                      onChange={
                        handleNuevaCitaChange
                      }
                      placeholder="Apellidos"
                      className="h-10 w-full rounded-xl border px-3 text-[12px] outline-none"
                      style={{
                        borderColor:
                          COLORS.border,
                        color:
                          COLORS.text,
                      }}
                    />
                  </div>

                  {/* SEXO */}

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#53627A]">
                      Sexo
                    </label>

                    <select
                      name="sexo"
                      value={
                        nuevaCita.sexo
                      }
                      onChange={
                        handleNuevaCitaChange
                      }
                      className="h-10 w-full rounded-xl border bg-white px-3 text-[12px] outline-none"
                      style={{
                        borderColor:
                          COLORS.border,
                        color:
                          COLORS.text,
                      }}
                    >
                      <option value="Masculino">
                        Masculino
                      </option>

                      <option value="Femenino">
                        Femenino
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* DATOS DE LA CITA */}

              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#68758A]">
                  Datos de la cita
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* SERVICIO */}

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#53627A]">
                      Servicio *
                    </label>

                    <select
                      required
                      name="especialidad"
                      value={
                        nuevaCita.especialidad
                      }
                      onChange={
                        handleNuevaCitaChange
                      }
                      className="h-10 w-full rounded-xl border bg-white px-3 text-[12px] outline-none"
                      style={{
                        borderColor:
                          COLORS.border,
                        color:
                          COLORS.text,
                      }}
                    >
                      {servicios
                        .filter(
                          (
                            item
                          ) =>
                            item !==
                            "Todos los servicios"
                        )
                        .map(
                          (
                            item
                          ) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}
                    </select>
                  </div>

                  {/* FECHA */}

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#53627A]">
                      Fecha *
                    </label>

                    <input
                      required
                      type="date"
                      name="fecha"
                      value={
                        nuevaCita.fecha
                      }
                      onChange={
                        handleNuevaCitaChange
                      }
                      className="h-10 w-full rounded-xl border px-3 text-[12px] outline-none"
                      style={{
                        borderColor:
                          COLORS.border,
                        color:
                          COLORS.text,
                      }}
                    />
                  </div>

                  {/* HORA */}

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-[#53627A]">
                      Hora *
                    </label>

                    <input
                      required
                      type="time"
                      step="1800"
                      name="hora"
                      value={
                        nuevaCita.hora
                      }
                      onChange={
                        handleNuevaCitaChange
                      }
                      className="h-10 w-full rounded-xl border px-3 text-[12px] outline-none"
                      style={{
                        borderColor:
                          COLORS.border,
                        color:
                          COLORS.text,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* AVISO */}

              <div
                className="rounded-xl border p-3"
                style={{
                  backgroundColor:
                    COLORS.primaryLight,
                  borderColor:
                    "#C7E8E3",
                }}
              >
                <p className="text-[11px] leading-5 text-[#53627A]">
                  <strong className="text-[#0F8178]">
                    Importante:
                  </strong>{" "}
                  la disponibilidad de horario
                  será validada de acuerdo con
                  la programación médica.
                </p>
              </div>

              {/* BOTONES */}

              <div
                className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end"
                style={{
                  borderColor:
                    COLORS.border,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setMostrarModal(false)
                  }
                  className="h-10 rounded-xl border px-5 text-[12px] font-semibold text-[#53627A] transition hover:bg-[#F7F9FB]"
                  style={{
                    borderColor:
                      COLORS.border,
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="h-10 rounded-xl px-5 text-[12px] font-bold text-white transition hover:opacity-90"
                  style={{
                    backgroundColor:
                      COLORS.primary,
                  }}
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