'use client';

import { useEffect, useState } from 'react';
import Sidebar, { useSidebar } from '../../components/Sidebar';
import CitasTable, { Cita } from '../../components/CitasTable';
import { useRequireSesion } from '../../lib/useSesion';
import {
  buscarPacientePorDni,
  crearCita,
  listarCitas,
  PacienteConsulta,
  CitaBackend,
} from '../../lib/api';

/* =========================================================
   SERVICIOS (deben existir con este nombre exacto en la tabla `servicios`)
========================================================= */

const ESPECIALIDADES = [
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

/* =========================================================
   BACKEND <-> FRONTEND
========================================================= */

function sexoATexto(sexo: 'M' | 'F' | null): 'Masculino' | 'Femenino' {
  return sexo === 'F' ? 'Femenino' : 'Masculino';
}

function sexoACodigo(sexo: 'Masculino' | 'Femenino'): 'M' | 'F' {
  return sexo === 'Femenino' ? 'F' : 'M';
}

function mapearCita(c: CitaBackend): Cita {
  const paciente = c.cuenta.paciente;
  return {
    id: `CIT-${String(c.id).padStart(3, '0')}`,
    hc: paciente.historiaClinica,
    dni: paciente.dni,
    paciente: `${paciente.nombres} ${paciente.apellidos}`.trim(),
    sexo: sexoATexto(paciente.sexo),
    especialidad: c.servicio.nombre,
    // No hay módulo de Programación Médica conectado todavía.
    medico: 'Por asignar',
    fecha: c.fechaCita,
    hora: c.horaInicio.slice(0, 5),
    // El backend solo distingue 'programada' | 'atendida' | 'no_asistio';
    // no existe un estado "Confirmadas" todavía.
    estado: c.estado === 'atendida' ? 'Atendidas' : 'Pendientes',
  };
}

const CITAS_MOCK: Cita[] = [
  {
    id: 'CIT-M01',
    hc: '100001',
    dni: '11111111',
    paciente: 'JUAN PEREZ (MOCK)',
    sexo: 'Masculino',
    especialidad: 'Medicina General',
    medico: 'Dr. Smith',
    fecha: new Date().toISOString().split('T')[0],
    hora: '08:00',
    estado: 'Pendientes',
  },
  {
    id: 'CIT-M02',
    hc: '100002',
    dni: '22222222',
    paciente: 'MARIA GARCIA (MOCK)',
    sexo: 'Femenino',
    especialidad: 'Laboratorio',
    medico: 'Dra. Jones',
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    estado: 'Confirmadas',
    triaje: {
      peso: '65.2',
      talla: '160',
      presion: '120/80',
      temp: '36.8'
    }
  },
  {
    id: 'CIT-M03',
    hc: '100003',
    dni: '33333333',
    paciente: 'CARLOS LOPEZ (MOCK)',
    sexo: 'Masculino',
    especialidad: 'Fisioterapia',
    medico: 'Dr. Brown',
    fecha: new Date().toISOString().split('T')[0],
    hora: '10:00',
    estado: 'Atendidas',
    triaje: {
      peso: '80.0',
      talla: '175',
      presion: '125/85',
      temp: '37.1'
    },
    diagnostico: 'Paciente presenta dolor leve en la zona lumbar tras esfuerzo físico. Se recomienda reposo por 3 días y aplicación de compresas calientes. Paracetamol 500mg cada 8h en caso de dolor.'
  },
  {
    id: 'CIT-M04',
    hc: '100004',
    dni: '44444444',
    paciente: 'ANA MARTINEZ (MOCK)',
    sexo: 'Femenino',
    especialidad: 'Obstetricia',
    medico: 'Dra. White',
    fecha: new Date().toISOString().split('T')[0],
    hora: '11:00',
    estado: 'Ausente',
  },
  {
    id: 'CIT-M05',
    hc: '100005',
    dni: '55555555',
    paciente: 'LUIS RODRIGUEZ (MOCK)',
    sexo: 'Masculino',
    especialidad: 'Neurología',
    medico: 'Dr. Black',
    fecha: new Date().toISOString().split('T')[0],
    hora: '12:00',
    estado: 'Eliminado',
  }
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
  const { cargando } = useRequireSesion();
  const { openSidebar } = useSidebar();

  const [citas, setCitas] = useState<Cita[]>([]);
  const [cargandoCitas, setCargandoCitas] = useState(true);
  const [errorCitas, setErrorCitas] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NuevaCitaForm>(FORM_INICIAL);
  const [mensaje, setMensaje] = useState('');

  // Paciente encontrado al buscar el DNI. Puede venir de dos lugares:
  // - de nuestra base, ya con historia clínica -> datos de solo lectura.
  // - de RENIEC (vía backend), sin historia clínica todavía -> son un punto
  //   de partida para un paciente nuevo, así que se dejan editables.
  const [pacienteEncontrado, setPacienteEncontrado] = useState<PacienteConsulta | null>(null);
  const [buscandoPaciente, setBuscandoPaciente] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');
  const [guardando, setGuardando] = useState(false);

  const pacienteYaRegistrado = !!pacienteEncontrado?.historiaClinica;

  // =========================================
  // CARGAR CITAS DEL BACKEND
  // =========================================
  useEffect(() => {
    if (cargando) return;
    let cancelado = false;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- arranca el estado de carga antes del fetch, no deriva de render
    setCargandoCitas(true);
    listarCitas()
      .then((citasBackend) => {
        if (!cancelado) setCitas([...CITAS_MOCK, ...citasBackend.map(mapearCita)]);
      })
      .catch((err: unknown) => {
        if (!cancelado) {
          setErrorCitas(err instanceof Error ? err.message : 'No se pudieron cargar las citas.');
        }
      })
      .finally(() => {
        if (!cancelado) setCargandoCitas(false);
      });

    return () => {
      cancelado = true;
    };
  }, [cargando]);

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
  // DNI -> HISTORIA CLÍNICA (autocompletar)
  // =========================================
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Si cambia el DNI después de haber encontrado un paciente, se
    // destrababan los campos: ya no aplica el autocompletado anterior.
    if (name === 'dni' && pacienteEncontrado) {
      setPacienteEncontrado(null);
    }
    if (errorGuardar) setErrorGuardar('');
  };

  const handleBuscarDni = async () => {
    if (form.dni.length !== 8) return;

    setBuscandoPaciente(true);
    try {
      const paciente = await buscarPacientePorDni(form.dni);
      if (paciente) {
        setPacienteEncontrado(paciente);
        setForm((prev) => ({
          ...prev,
          nombres: paciente.nombres,
          apellidos: paciente.apellidos,
          sexo: sexoATexto(paciente.sexo),
          celular: paciente.celular ?? '',
        }));
      } else {
        setPacienteEncontrado(null);
      }
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo buscar el DNI.');
    } finally {
      setBuscandoPaciente(false);
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
    setForm(FORM_INICIAL);
    setPacienteEncontrado(null);
    setErrorGuardar('');
  };

  // =========================================
  // GUARDAR NUEVA CITA
  // =========================================
  const handleGuardarCita = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorGuardar('');
    setGuardando(true);
    try {
      const citaCreada = await crearCita({
        paciente: {
          dni: form.dni,
          nombres: form.nombres,
          apellidos: form.apellidos,
          sexo: sexoACodigo(form.sexo),
          celular: form.celular || undefined,
        },
        especialidad: form.especialidad,
        fecha: form.fecha,
        hora: form.hora,
      });

      setCitas((prev) => [mapearCita(citaCreada), ...prev]);
      cerrarModal();

      setMensaje(
        `Cita registrada correctamente (historia clínica ${citaCreada.cuenta.paciente.historiaClinica})`,
      );
      setTimeout(() => setMensaje(''), 3500);
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo registrar la cita.');
    } finally {
      setGuardando(false);
    }
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

  const handleReprogramarCita = (cita: Cita) => {
    const parts = cita.paciente.replace(' (MOCK)', '').split(' ');
    const nombres = parts.slice(0, Math.ceil(parts.length / 2)).join(' ');
    const apellidos = parts.slice(Math.ceil(parts.length / 2)).join(' ');

    setForm({
      dni: cita.dni,
      nombres,
      apellidos,
      sexo: cita.sexo,
      celular: '',
      especialidad: cita.especialidad,
      fecha: cita.fecha,
      hora: cita.hora,
    });
    
    setPacienteEncontrado({
      id: 0,
      historiaClinica: cita.hc,
      dni: cita.dni,
      nombres,
      apellidos,
      sexo: cita.sexo === 'Femenino' ? 'F' : 'M',
      celular: null
    });

    setShowModal(true);
  };

  // Sin sesión confirmada no se muestra el panel; el hook ya está redirigiendo a /login.
  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xs font-medium text-gray-400">Cargando...</p>
      </div>
    );
  }

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

          {/* ERROR AL CARGAR CITAS */}
          {errorCitas && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">
              {errorCitas}
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
            {cargandoCitas ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-xs font-medium text-gray-400">
                Cargando citas...
              </div>
            ) : (
              <CitasTable
                citas={citas}
                onMarcarAtendida={handleMarcarAtendida}
                onCancelarCita={handleCancelarCita}
                onReprogramarCita={handleReprogramarCita}
              />
            )}
          </section>

        </div>
      </main>

      {/* MODAL — ÚNICO EN TODO EL MÓDULO */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrarModal();
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
                onClick={cerrarModal}
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
                  onBlur={handleBuscarDni}
                  placeholder="Ingrese el DNI"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                />
                {buscandoPaciente && (
                  <p className="mt-1.5 text-[11px] font-medium text-gray-400">Buscando historia clínica...</p>
                )}
                {!buscandoPaciente && pacienteYaRegistrado && (
                  <p className="mt-1.5 text-[11px] font-semibold text-[#0d7a71]">
                    Paciente ya registrado — {pacienteEncontrado?.historiaClinica}
                  </p>
                )}
                {!buscandoPaciente && pacienteEncontrado && !pacienteYaRegistrado && (
                  <p className="mt-1.5 text-[11px] font-medium text-gray-400">
                    Encontrado en RENIEC: verifique los datos para crear su historia clínica.
                  </p>
                )}
                {!buscandoPaciente && !pacienteEncontrado && form.dni.length === 8 && (
                  <p className="mt-1.5 text-[11px] font-medium text-gray-400">
                    Paciente nuevo: complete sus datos para crear su historia clínica.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombres" className="mb-2 block text-sm font-semibold text-gray-700">Nombres *</label>
                  <input
                    id="nombres"
                    name="nombres"
                    type="text"
                    required
                    disabled={pacienteYaRegistrado}
                    value={form.nombres}
                    onChange={handleFormChange}
                    placeholder="Nombres"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="apellidos" className="mb-2 block text-sm font-semibold text-gray-700">Apellidos *</label>
                  <input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    required
                    disabled={pacienteYaRegistrado}
                    value={form.apellidos}
                    onChange={handleFormChange}
                    placeholder="Apellidos"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
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
                    disabled={pacienteYaRegistrado}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
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
                    disabled={pacienteYaRegistrado}
                    value={form.celular}
                    onChange={handleFormChange}
                    placeholder="999 999 999"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
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
                  {ESPECIALIDADES.map((nombre) => (
                    <option key={nombre} value={nombre}>{nombre}</option>
                  ))}
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

              {errorGuardar && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-semibold text-red-600">
                  {errorGuardar}
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={cerrarModal}
                  disabled={guardando}
                  className="h-11 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={guardando}
                  className="h-11 rounded-xl bg-[#0d7a71] text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 transition hover:bg-[#0a625b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {guardando ? 'Guardando...' : 'Guardar Cita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}