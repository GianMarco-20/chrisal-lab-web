'use client';

import { useEffect, useState } from 'react';
import Sidebar, { useSidebar } from '../../components/Sidebar';
import CitasTable, {
  Cita,
  Diagnostico,
  OrdenLaboratorio,
  Triaje,
  type DatosFormDiagnostico,
  type DatosReprogramacion,
  type ExamenCatalogoOpcion,
  type HorarioReprogramacion,
} from '../../components/CitasTable';
import { useRequireSesion } from '../../lib/useSesion';
import {
  buscarPacientePorDni,
  crearCita,
  listarCitas,
  listarTriajes,
  crearTriaje,
  actualizarTriaje,
  listarDiagnosticos,
  crearDiagnostico,
  actualizarDiagnostico,
  listarExamenesCatalogo,
  listarCitaExamenes,
  crearCitaExamen,
  eliminarCitaExamen,
  cancelarCita,
  reprogramarCita,
  listarProgramacionMedica,
  PacienteConsulta,
  CitaBackend,
  EstadoCitaBackend,
  TriajeBackend,
  DiagnosticoBackend,
  CitaExamenBackend,
  ProgramacionMedicaBackend,
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

// Traduce el código del backend (estados_cita.codigo) al literal que usa CitasTable.
const ESTADO_POR_CODIGO: Record<EstadoCitaBackend['codigo'], Cita['estado']> = {
  pendiente_triaje: 'Pendientes',
  pendiente_diagnostico: 'Confirmadas',
  atendida: 'Atendidas',
  ausente: 'Ausente',
  cancelada: 'Cancelada',
};

function mapearCita(c: CitaBackend): Cita {
  const paciente = c.cuenta.paciente;
  return {
    id: `CIT-${String(c.id).padStart(3, '0')}`,
    citaId: c.id,
    hc: paciente.historiaClinica,
    dni: paciente.dni,
    paciente: `${paciente.nombres} ${paciente.apellidos}`.trim(),
    celular: paciente.celular ?? '',
    sexo: sexoATexto(paciente.sexo),
    especialidad: c.servicio.nombre,
    medico: c.programacionMedica
      ? `${c.programacionMedica.medico.nombres} ${c.programacionMedica.medico.apellidos}`.trim()
      : 'Por asignar',
    fecha: c.fechaCita,
    hora: c.horaInicio.slice(0, 5),
    estado: ESTADO_POR_CODIGO[c.estado.codigo],
  };
}

// =========================================================
// TRIAJE/DIAGNÓSTICO DEL BACKEND -> FORMA QUE ESPERA CitasTable
// =========================================================

function numeroATexto(valor: number | null | undefined): string {
  return valor === null || valor === undefined ? '' : String(valor);
}

function triajeParaTabla(t: TriajeBackend): Triaje {
  return {
    id: t.id,
    presionArterial: t.presionArterial ?? '',
    frecuenciaCardiaca: numeroATexto(t.frecuenciaCardiaca),
    frecuenciaRespiratoria: numeroATexto(t.frecuenciaRespiratoria),
    temperatura: numeroATexto(t.temperatura),
    saturacion: numeroATexto(t.saturacionO2),
    peso: numeroATexto(t.peso),
    talla: numeroATexto(t.talla),
    motivoConsulta: t.motivoConsulta ?? '',
  };
}

function diagnosticoParaTabla(d: DiagnosticoBackend, ordenesBackend: CitaExamenBackend[]): Diagnostico {
  const ordenes: OrdenLaboratorio[] = ordenesBackend.map((o) => ({
    citaExamenId: o.id,
    examenId: o.examen.id,
    nombre: o.examen.nombre,
  }));
  return {
    id: d.id,
    sintomas: d.sintomas ?? '',
    diagnostico: d.diagnostico,
    indicaciones: d.indicaciones ?? '',
    requiereLaboratorio: ordenes.length > 0,
    examenesLaboratorio: ordenes.map((o) => o.nombre).join(', '),
    ordenes,
  };
}

interface NuevaCitaForm {
  dni: string;
  nombres: string;
  apellidos: string;
  sexo: 'Masculino' | 'Femenino';
  celular: string;
  especialidad: string;
  fecha: string;
  hora: string;
  // Horario ya programado elegido (id de programacion_medica); '' = ninguno,
  // la cita queda "Por asignar".
  programacionId: string;
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
  programacionId: '',
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
  const [examenesCatalogo, setExamenesCatalogo] = useState<ExamenCatalogoOpcion[]>([]);

  // Horarios ya programados (Programación Médica) para la especialidad y
  // fecha elegidas en "Agendar Cita"; de ahí sale a qué médico se asigna.
  const [horariosDisponibles, setHorariosDisponibles] = useState<ProgramacionMedicaBackend[]>([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);

  // Paciente encontrado al buscar el DNI. Puede venir de dos lugares:
  // - de nuestra base, ya con historia clínica -> datos de solo lectura.
  // - de RENIEC (vía backend), sin historia clínica todavía -> son un punto
  //   de partida para un paciente nuevo, así que se dejan editables.
  const [pacienteEncontrado, setPacienteEncontrado] = useState<PacienteConsulta | null>(null);
  const [buscandoPaciente, setBuscandoPaciente] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');
  const [guardando, setGuardando] = useState(false);

  const pacienteYaRegistrado = !!pacienteEncontrado?.historiaClinica;

  const mostrarMensaje = (texto: string) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3500);
  };

  // Catálogo de laboratorio: se carga una sola vez, lo usa el modal de diagnóstico.
  useEffect(() => {
    if (cargando) return;
    listarExamenesCatalogo()
      .then((examenes) =>
        setExamenesCatalogo(examenes.map((ex) => ({ id: ex.id, nombre: ex.nombre, categoria: ex.categoria.nombre }))),
      )
      .catch(() => {
        // Si falla, el modal de diagnóstico simplemente no deja elegir exámenes.
      });
  }, [cargando]);

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
        if (!cancelado) setCitas(citasBackend.map(mapearCita));
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

  // Horarios programados para la especialidad/fecha elegidas en "Agendar
  // Cita" (de ahí sale el médico). Sin fecha todavía no se busca nada.
  useEffect(() => {
    if (!showModal || !form.fecha) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- limpia la lista si se cierra el modal o se borra la fecha, no deriva de render
      setHorariosDisponibles([]);
      return;
    }
    let cancelado = false;

    setCargandoHorarios(true);
    listarProgramacionMedica(form.fecha)
      .then((horarios) => {
        if (!cancelado) setHorariosDisponibles(horarios);
      })
      .catch(() => {
        // Si falla, simplemente no se puede elegir médico; la cita se
        // puede seguir agendando igual, queda "Por asignar".
        if (!cancelado) setHorariosDisponibles([]);
      })
      .finally(() => {
        if (!cancelado) setCargandoHorarios(false);
      });

    return () => {
      cancelado = true;
    };
  }, [showModal, form.fecha]);

  const horariosFiltrados = horariosDisponibles.filter(
    (h) => h.medico.especialidad?.trim().toLowerCase() === form.especialidad.trim().toLowerCase(),
  );

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
  const totalPendienteTriaje = citas.filter((c) => c.estado === 'Pendientes').length;
  const totalPendienteDiagnostico = citas.filter((c) => c.estado === 'Confirmadas').length;
  const totalAtendidas = citas.filter((c) => c.estado === 'Atendidas').length;

  // =========================================
  // DNI -> HISTORIA CLÍNICA (autocompletar)
  // =========================================
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // El horario elegido era para la especialidad/fecha anteriores: si
      // cambia cualquiera de las dos, hay que volver a elegirlo.
      ...(name === 'especialidad' || name === 'fecha' ? { programacionId: '' } : {}),
    }));

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
        programacionId: form.programacionId ? Number(form.programacionId) : undefined,
      });

      setCitas((prev) => [mapearCita(citaCreada), ...prev]);
      cerrarModal();

      mostrarMensaje(
        `Cita registrada correctamente (historia clínica ${citaCreada.cuenta.paciente.historiaClinica})`,
      );
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo registrar la cita.');
    } finally {
      setGuardando(false);
    }
  };

  const actualizarEstadoLocal = (citaId: number, estado: Cita['estado']) => {
    setCitas((prev) => prev.map((c) => (c.citaId === citaId ? { ...c, estado } : c)));
  };

  // =========================================
  // CANCELAR CITA -> pasa a "Cancelada" (solo si está Pendientes/Ausente)
  // =========================================
  const handleCancelarCita = async (id: string) => {
    const cita = citas.find((c) => c.id === id);
    if (!cita) return;

    await cancelarCita(cita.citaId);
    actualizarEstadoLocal(cita.citaId, 'Cancelada');
    mostrarMensaje('Cita cancelada correctamente.');
  };

  // =========================================
  // REPROGRAMAR CITA -> cambia fecha/hora/médico y vuelve a "Pendientes"
  // =========================================
  const handleReprogramarCita = async (id: string, datos: DatosReprogramacion) => {
    const cita = citas.find((c) => c.id === id);
    if (!cita) return;

    const actualizada = await reprogramarCita(cita.citaId, datos);
    setCitas((prev) => prev.map((c) => (c.citaId === cita.citaId ? mapearCita(actualizada) : c)));
    mostrarMensaje('Cita reprogramada correctamente.');
  };

  // Horarios programados (Programación Médica) para la especialidad de la
  // cita en la fecha elegida al reprogramar; si viene vacío, el modal
  // bloquea la reprogramación con una alerta.
  const handleBuscarHorariosReprogramacion = async (
    fecha: string,
    especialidad: string,
  ): Promise<HorarioReprogramacion[]> => {
    const horarios = await listarProgramacionMedica(fecha);
    return horarios
      .filter((h) => h.medico.especialidad?.trim().toLowerCase() === especialidad.trim().toLowerCase())
      .map((h) => ({
        id: h.id,
        horaInicio: h.horaInicio.slice(0, 5),
        etiqueta: `${h.medico.nombres} ${h.medico.apellidos} — ${h.turno === 'mañana' ? 'Mañana' : 'Tarde'} ${h.horaInicio.slice(0, 5)}-${h.horaFin.slice(0, 5)} · ${h.consultorio.nombre}`,
      }));
  };

  // =========================================
  // ABRIR CITA -> trae triaje/diagnóstico antes de mostrar el modal
  // (lo llama CitasTable; "Pendientes"/"Ausente" no necesitan nada más)
  // =========================================
  const handleAbrirCita = async (cita: Cita): Promise<Cita> => {
    if (cita.estado === 'Confirmadas') {
      const [triaje] = await listarTriajes(cita.citaId);
      return { ...cita, triaje: triaje ? triajeParaTabla(triaje) : undefined };
    }
    if (cita.estado === 'Atendidas') {
      const [[triaje], [diagnostico], ordenes] = await Promise.all([
        listarTriajes(cita.citaId),
        listarDiagnosticos(cita.citaId),
        listarCitaExamenes(cita.citaId),
      ]);
      return {
        ...cita,
        triaje: triaje ? triajeParaTabla(triaje) : undefined,
        diagnostico: diagnostico ? diagnosticoParaTabla(diagnostico, ordenes) : undefined,
      };
    }
    return cita;
  };

  // =========================================
  // GUARDAR TRIAJE -> la cita pasa a "Confirmadas"
  // =========================================
  const handleGuardarTriaje = async (id: string, datos: Triaje) => {
    const cita = citas.find((c) => c.id === id);
    if (!cita) return;

    await crearTriaje({
      citaId: cita.citaId,
      peso: datos.peso ? Number(datos.peso) : undefined,
      talla: datos.talla ? Number(datos.talla) : undefined,
      presionArterial: datos.presionArterial || undefined,
      temperatura: datos.temperatura ? Number(datos.temperatura) : undefined,
      frecuenciaCardiaca: datos.frecuenciaCardiaca ? Number(datos.frecuenciaCardiaca) : undefined,
      frecuenciaRespiratoria: datos.frecuenciaRespiratoria
        ? Number(datos.frecuenciaRespiratoria)
        : undefined,
      saturacionO2: datos.saturacion ? Number(datos.saturacion) : undefined,
      motivoConsulta: datos.motivoConsulta || undefined,
    });

    actualizarEstadoLocal(cita.citaId, 'Confirmadas');
    mostrarMensaje('Triaje registrado correctamente.');
  };

  // =========================================
  // FINALIZAR DIAGNÓSTICO -> la cita pasa a "Atendidas"
  // =========================================
  const handleFinalizarAtencion = async (id: string, datos: DatosFormDiagnostico) => {
    const cita = citas.find((c) => c.id === id);
    if (!cita) return;

    await crearDiagnostico({
      citaId: cita.citaId,
      sintomas: datos.sintomas || undefined,
      diagnostico: datos.diagnostico,
      indicaciones: datos.indicaciones || undefined,
      examenIds: datos.examenIds,
    });

    actualizarEstadoLocal(cita.citaId, 'Atendidas');
    mostrarMensaje('Diagnóstico registrado correctamente.');
  };

  // =========================================
  // EDICIÓN EN LÍNEA (Confirmadas/Atendidas): corrige un triaje o
  // diagnóstico ya guardado, sin cambiar el estado de la cita.
  // =========================================
  const handleActualizarTriaje = async (triajeId: number, datos: Triaje): Promise<Triaje> => {
    const actualizado = await actualizarTriaje(triajeId, {
      peso: datos.peso ? Number(datos.peso) : undefined,
      talla: datos.talla ? Number(datos.talla) : undefined,
      presionArterial: datos.presionArterial || undefined,
      temperatura: datos.temperatura ? Number(datos.temperatura) : undefined,
      frecuenciaCardiaca: datos.frecuenciaCardiaca ? Number(datos.frecuenciaCardiaca) : undefined,
      frecuenciaRespiratoria: datos.frecuenciaRespiratoria
        ? Number(datos.frecuenciaRespiratoria)
        : undefined,
      saturacionO2: datos.saturacion ? Number(datos.saturacion) : undefined,
      motivoConsulta: datos.motivoConsulta || undefined,
    });
    mostrarMensaje('Triaje actualizado correctamente.');
    return triajeParaTabla(actualizado);
  };

  const handleActualizarDiagnostico = async (
    diagnosticoId: number,
    citaId: number,
    datos: DatosFormDiagnostico,
    ordenesActuales: OrdenLaboratorio[],
  ): Promise<Diagnostico> => {
    await actualizarDiagnostico(diagnosticoId, {
      sintomas: datos.sintomas || undefined,
      diagnostico: datos.diagnostico,
      indicaciones: datos.indicaciones || undefined,
    });

    const idsActuales = ordenesActuales.map((o) => o.examenId);
    const aAgregar = datos.examenIds.filter((id) => !idsActuales.includes(id));
    const aQuitar = ordenesActuales.filter((o) => !datos.examenIds.includes(o.examenId));

    await Promise.all([
      ...aAgregar.map((examenId) => crearCitaExamen(citaId, examenId)),
      ...aQuitar.map((o) => eliminarCitaExamen(o.citaExamenId)),
    ]);

    const [diagnosticoFresco] = await listarDiagnosticos(citaId);
    const ordenesFrescas = await listarCitaExamenes(citaId);

    mostrarMensaje('Diagnóstico actualizado correctamente.');
    return diagnosticoParaTabla(diagnosticoFresco, ordenesFrescas);
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
                <p className="text-[10px] sm:text-xs text-amber-600 font-medium truncate">Pendiente de Triaje</p>
                <p className="text-xl sm:text-2xl font-extrabold text-amber-700 mt-1">{totalPendienteTriaje}</p>
              </div>
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-violet-600 font-medium truncate">Pendiente de Diagnóstico</p>
                <p className="text-xl sm:text-2xl font-extrabold text-violet-700 mt-1">{totalPendienteDiagnostico}</p>
              </div>
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
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

          {/* TABLA (solo filtros + tabla; los modales por estado viven en CitasTable) */}
          <section className="w-full min-w-0">
            {cargandoCitas ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-xs font-medium text-gray-400">
                Cargando citas...
              </div>
            ) : (
              <CitasTable
                citas={citas}
                examenesCatalogo={examenesCatalogo}
                onAbrirCita={handleAbrirCita}
                onCancelarCita={handleCancelarCita}
                onReprogramarCita={handleReprogramarCita}
                onBuscarHorariosReprogramacion={handleBuscarHorariosReprogramacion}
                onGuardarTriaje={handleGuardarTriaje}
                onFinalizarAtencion={handleFinalizarAtencion}
                onActualizarTriaje={handleActualizarTriaje}
                onActualizarDiagnostico={handleActualizarDiagnostico}
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

              <div>
                <label htmlFor="programacionId" className="mb-2 block text-sm font-semibold text-gray-700">
                  Médico
                </label>
                <select
                  id="programacionId"
                  name="programacionId"
                  value={form.programacionId}
                  onChange={handleFormChange}
                  disabled={!form.fecha || cargandoHorarios || horariosFiltrados.length === 0}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">Por asignar</option>
                  {horariosFiltrados.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.medico.nombres} {h.medico.apellidos} — {h.turno === 'mañana' ? 'Mañana' : 'Tarde'}{' '}
                      {h.horaInicio.slice(0, 5)}-{h.horaFin.slice(0, 5)} · {h.consultorio.nombre}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-[11px] text-gray-400">
                  {!form.fecha
                    ? 'Elige una fecha para ver los médicos programados ese día.'
                    : cargandoHorarios
                      ? 'Buscando médicos programados...'
                      : horariosFiltrados.length === 0
                        ? 'Nadie está programado ese día para este servicio (Programación Médica). Puedes agendar igual; el médico quedará "Por asignar".'
                        : 'Solo aparecen los médicos ya programados ese día para este servicio.'}
                </p>
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
