'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CitasTable from '../../components/CitasTable';
import { obtenerToken, obtenerUsuario, cerrarSesion, UsuarioSesion } from '../../lib/api';

export default function CitasPage() {
  const [showModal, setShowModal] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  const [verificandoSesion, setVerificandoSesion] = useState(true);
  const router = useRouter();

  // =========================================
  // EXIGIR SESIÓN INICIADA
  // =========================================
  // localStorage solo existe en el navegador, así que esta lectura no puede
  // hacerse durante el render (que también corre en el servidor). Es un caso
  // legítimo de efecto: sincronizar con un sistema externo al montar, no
  // derivar estado de props/estado ya disponibles en el render.
  useEffect(() => {
    const token = obtenerToken();
    if (!token) {
      router.replace('/login');
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura única de localStorage al montar, no deriva de render
    setUsuario(obtenerUsuario());
    setVerificandoSesion(false);
  }, [router]);

  const handleLogout = () => {
    cerrarSesion();
    router.push('/login');
  };

  // =========================================
  // CERRAR CON ESC
  // =========================================
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // =========================================
  // BLOQUEAR SCROLL DEL BODY EN MÓVIL
  // =========================================
  useEffect(() => {
    if (sidebarOpen || showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen, showModal]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Mientras se confirma la sesión, no se muestra el panel (evita el parpadeo
  // de contenido protegido antes de redirigir a /login).
  if (verificandoSesion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xs font-medium text-gray-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* =========================================
          OVERLAY MOBILE
      ========================================= */}
      {sidebarOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={closeSidebar}
          className="
            fixed inset-0
            bg-black/40
            backdrop-blur-[2px]
            z-40
            lg:hidden
          "
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50 lg:z-20
          h-screen
          w-72 lg:w-64
          bg-white
          border-r border-gray-100
          flex flex-col
          shrink-0
          shadow-xl lg:shadow-none
          transition-transform
          duration-300
          ease-in-out
          ${
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >

        {/* Logo */}
        <div className="p-5 sm:p-6 flex items-center gap-3 border-b border-gray-100">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-1.5
              shadow-sm
              shrink-0
            "
          >
            {logoLoaded ? (
              <img
                src="/logo.png"
                alt="Chrisal Lab Logo"
                className="h-full w-full object-contain"
                onError={() => setLogoLoaded(false)}
              />
            ) : (
              <span className="text-lg font-bold text-[#0d7a71]">
                CL
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">

            <h2 className="font-extrabold text-gray-900 text-sm truncate tracking-tight">
              Chrisal-Lab
            </h2>

            <span
              className="
                text-[11px]
                font-medium
                text-emerald-700
                bg-emerald-50
                px-2
                py-0.5
                rounded-full
                border
                border-emerald-100
                inline-block
                mt-0.5
              "
            >
              Panel Recepción
            </span>

          </div>

          {/* Cerrar sidebar móvil */}
          <button
            onClick={closeSidebar}
            className="
              lg:hidden
              h-9
              w-9
              rounded-xl
              flex
              items-center
              justify-center
              text-gray-400
              hover:text-gray-700
              hover:bg-gray-100
              transition-colors
            "
            aria-label="Cerrar menú"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>

        {/* Navegación */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">

          {/* Gestión de Citas */}
          <a
            href="#"
            onClick={closeSidebar}
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              bg-[#0d7a71]
              text-white
              font-semibold
              text-xs
              shadow-md
              shadow-[#0d7a71]/20
              transition-all
              hover:bg-[#0b6e66]
            "
          >
            <svg
              className="w-4 h-4 shrink-0"
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

            <span>Gestión de Citas</span>
          </a>

          {/* Directorio */}
          <a
            href="#"
            onClick={closeSidebar}
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-gray-500
              hover:bg-gray-50
              hover:text-gray-700
              font-medium
              text-xs
              transition-all
            "
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            <span>Directorio Pacientes</span>
          </a>

          {/* Laboratorio */}
          <a
            href="#"
            onClick={closeSidebar}
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-gray-500
              hover:bg-gray-50
              hover:text-gray-700
              font-medium
              text-xs
              transition-all
            "
          >
            <svg
              className="w-4 h-4 shrink-0"
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

            <span>Órdenes Laboratorio</span>
          </a>

        </nav>

        {/* Footer sidebar */}
        <div className="p-4 border-t border-gray-100">

          <div className="bg-gray-50 rounded-2xl p-3">

            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              {usuario?.rol ?? 'Sistema'}
            </p>

            <p className="text-xs font-medium text-gray-700 mt-1 truncate">
              {usuario ? `${usuario.nombres} ${usuario.apellidos}` : 'Panel de Recepción'}
            </p>

            <button
              onClick={handleLogout}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 text-[11px] font-semibold text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>

          </div>

        </div>

      </aside>

      {/* =========================================
          ÁREA PRINCIPAL
      ========================================= */}
      <main className="flex-1 min-w-0 flex flex-col">

        {/* =========================================
            TOPBAR
        ========================================= */}
        <header
          className="
            h-16
            min-h-16
            bg-white
            border-b
            border-gray-100
            flex
            items-center
            justify-between
            px-4
            sm:px-6
            sticky
            top-0
            z-30
          "
        >

          <div className="flex items-center gap-3 min-w-0">

            {/* Hamburguesa */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="
                lg:hidden
                h-10
                w-10
                rounded-xl
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-gray-100
                active:bg-gray-200
                transition-colors
                shrink-0
              "
              aria-label="Abrir menú"
              aria-expanded={sidebarOpen}
            >
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="min-w-0">

              <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                Agenda Médica del Día
              </h1>

              <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">
                23 Septiembre, 2026
              </span>

            </div>

          </div>

          {/* Botón Agendar */}
          <button
            onClick={() => setShowModal(true)}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-[#0d7a71]
              hover:bg-[#0a625b]
              text-white
              px-3
              sm:px-4
              py-2.5
              rounded-xl
              text-xs
              font-bold
              shadow-md
              shadow-[#0d7a71]/20
              transition-all
              active:scale-[0.98]
              shrink-0
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

            <span className="hidden sm:inline">
              Agendar Cita
            </span>

            <span className="sm:hidden">
              Agendar
            </span>

          </button>

        </header>

        {/* =========================================
            CONTENIDO
        ========================================= */}
        <div
          className="
            flex-1
            p-4
            sm:p-5
            lg:p-6
            space-y-5
            sm:space-y-6
            overflow-x-hidden
          "
        >

          {/* =========================================
              MÉTRICAS
          ========================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

            {/* Total */}
            <div
              className="
                bg-white
                p-4
                sm:p-5
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-100
                shadow-sm
                flex
                items-center
                justify-between
                gap-3
              "
            >

              <div className="min-w-0">

                <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">
                  Total Programadas
                </p>

                <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                  28
                </p>

              </div>

              <div
                className="
                  h-9
                  w-9
                  sm:h-10
                  sm:w-10
                  rounded-xl
                  sm:rounded-2xl
                  bg-gray-50
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  shrink-0
                "
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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

            </div>

            {/* Pendientes */}
            <div
              className="
                bg-white
                p-4
                sm:p-5
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-100
                shadow-sm
                flex
                items-center
                justify-between
                gap-3
              "
            >

              <div className="min-w-0">

                <p className="text-[10px] sm:text-xs text-amber-600 font-medium truncate">
                  Pendientes por Llegar
                </p>

                <p className="text-xl sm:text-2xl font-extrabold text-amber-700 mt-1">
                  6
                </p>

              </div>

              <div
                className="
                  h-9
                  w-9
                  sm:h-10
                  sm:w-10
                  rounded-xl
                  sm:rounded-2xl
                  bg-amber-50
                  flex
                  items-center
                  justify-center
                  text-amber-600
                  shrink-0
                "
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
              </div>

            </div>

            {/* Confirmadas */}
            <div
              className="
                bg-white
                p-4
                sm:p-5
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-100
                shadow-sm
                flex
                items-center
                justify-between
                gap-3
              "
            >

              <div className="min-w-0">

                <p className="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">
                  Confirmadas
                </p>

                <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1">
                  18
                </p>

              </div>

              <div
                className="
                  h-9
                  w-9
                  sm:h-10
                  sm:w-10
                  rounded-xl
                  sm:rounded-2xl
                  bg-emerald-50
                  flex
                  items-center
                  justify-center
                  text-emerald-600
                  shrink-0
                "
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

            </div>

            {/* Atendidas */}
            <div
              className="
                bg-white
                p-4
                sm:p-5
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-100
                shadow-sm
                flex
                items-center
                justify-between
                gap-3
              "
            >

              <div className="min-w-0">

                <p className="text-[10px] sm:text-xs text-blue-600 font-medium truncate">
                  Atendidas
                </p>

                <p className="text-xl sm:text-2xl font-extrabold text-blue-700 mt-1">
                  4
                </p>

              </div>

              <div
                className="
                  h-9
                  w-9
                  sm:h-10
                  sm:w-10
                  rounded-xl
                  sm:rounded-2xl
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                  text-blue-600
                  shrink-0
                "
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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

            </div>

          </div>

          {/* =========================================
              TABLA
          ========================================= */}
          <section className="w-full min-w-0">
            <CitasTable />
          </section>

        </div>

      </main>

      {/* =========================================
          MODAL - REGISTRAR NUEVA CITA
      ========================================= */}
      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/45
            backdrop-blur-sm
            p-3
            sm:p-4
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >

          <div
            className="
              w-full
              max-w-lg
              max-h-[94vh]
              overflow-y-auto
              bg-white
              rounded-[26px]
              shadow-2xl
              border
              border-gray-100
              p-5
              sm:p-7
              animate-in
              fade-in
              zoom-in-95
              duration-150
            "
          >

            {/* =====================================
                CABECERA DEL MODAL
            ===================================== */}
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
                pb-5
                border-b
                border-gray-100
              "
            >

              <div className="min-w-0">

                <h3
                  className="
                    text-lg
                    sm:text-xl
                    font-bold
                    text-gray-900
                  "
                >
                  Registrar Nueva Cita
                </h3>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-gray-400
                    mt-1
                  "
                >
                  Complete los datos del paciente
                </p>

              </div>

              {/* Cerrar */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Cerrar modal"
                className="
                  w-9
                  h-9
                  shrink-0
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-gray-700
                  hover:bg-gray-100
                  transition-all
                "
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

            </div>

            {/* =====================================
                FORMULARIO
            ===================================== */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
              className="mt-5 space-y-4"
            >

              {/* =================================
                  NOMBRE
              ================================= */}
              <div>

                <label
                  htmlFor="nombrePaciente"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Nombre Completo del Paciente
                </label>

                <input
                  id="nombrePaciente"
                  name="nombrePaciente"
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="Ej. Juan Pérez García"
                  className="
                    w-full
                    h-12
                    px-4

                    rounded-xl
                    border
                    border-gray-200
                    bg-white

                    text-gray-900
                    caret-gray-900
                    placeholder:text-gray-300

                    text-sm
                    font-medium

                    outline-none

                    transition-all

                    focus:border-[#0d7a71]
                    focus:ring-2
                    focus:ring-[#0d7a71]/15

                    hover:border-gray-300
                  "
                />

              </div>

              {/* =================================
                  DNI
              ================================= */}
              <div>

                <label
                  htmlFor="dniPaciente"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  DNI / Documento de Identidad
                </label>

                <input
                  id="dniPaciente"
                  name="dniPaciente"
                  type="text"
                  required
                  maxLength={8}
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="8 dígitos"
                  className="
                    w-full
                    h-12
                    px-4

                    rounded-xl
                    border
                    border-gray-200
                    bg-white

                    text-gray-900
                    caret-gray-900
                    placeholder:text-gray-300

                    text-sm
                    font-medium

                    outline-none

                    transition-all

                    focus:border-[#0d7a71]
                    focus:ring-2
                    focus:ring-[#0d7a71]/15

                    hover:border-gray-300
                  "
                />

              </div>

              {/* =================================
                  ESPECIALIDAD + HORA
              ================================= */}
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                "
              >

                {/* Especialidad */}
                <div>

                  <label
                    htmlFor="especialidad"
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >
                    Especialidad
                  </label>

                  <div className="relative">

                    <select
                      id="especialidad"
                      name="especialidad"
                      defaultValue="Medicina General"
                      className="
                        appearance-none
                        w-full
                        h-12
                        px-4
                        pr-10

                        rounded-xl
                        border
                        border-gray-200
                        bg-white

                        text-gray-900

                        text-sm
                        font-medium

                        outline-none

                        transition-all

                        focus:border-[#0d7a71]
                        focus:ring-2
                        focus:ring-[#0d7a71]/15

                        hover:border-gray-300
                      "
                    >

                      <option value="Medicina General">
                        Medicina General
                      </option>

                      <option value="Laboratorio Clínico">
                        Laboratorio Clínico
                      </option>

                      <option value="Pediatría">
                        Pediatría
                      </option>

                      <option value="Ginecología">
                        Ginecología
                      </option>

                    </select>

                    {/* Flecha */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                  </div>

                </div>

                {/* Hora */}
                <div>

                  <label
                    htmlFor="horaCita"
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >
                    Hora Cita
                  </label>

                  <input
                    id="horaCita"
                    name="horaCita"
                    type="time"
                    required
                    className="
                      w-full
                      h-12
                      px-4

                      rounded-xl
                      border
                      border-gray-200
                      bg-white

                      text-gray-900
                      caret-gray-900

                      text-sm
                      font-medium

                      outline-none

                      transition-all

                      focus:border-[#0d7a71]
                      focus:ring-2
                      focus:ring-[#0d7a71]/15

                      hover:border-gray-300

                      [color-scheme:light]
                    "
                  />

                </div>

              </div>

              {/* =================================
                  BOTONES
              ================================= */}
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-3
                  pt-3
                "
              >

                {/* Cancelar */}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="
                    h-12
                    rounded-xl

                    border
                    border-gray-200

                    bg-white

                    text-gray-600
                    text-sm
                    font-bold

                    hover:bg-gray-50
                    hover:border-gray-300

                    transition-all

                    active:scale-[0.98]
                  "
                >
                  Cancelar
                </button>

                {/* Guardar */}
                <button
                  type="submit"
                  className="
                    h-12
                    rounded-xl

                    bg-[#0d7a71]
                    hover:bg-[#0a625b]

                    text-white
                    text-sm
                    font-bold

                    shadow-md
                    shadow-[#0d7a71]/20

                    transition-all

                    active:scale-[0.98]
                  "
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