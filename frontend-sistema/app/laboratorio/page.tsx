'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Sidebar, { useSidebar } from '../../components/Sidebar';
import { useRequireSesion } from '../../lib/useSesion';
import DetalleOrdenLab from './DetalleOrdenLab';
import {
  anularOrden,
  buscarPacientePorDni,
  CategoriaCatalogo,
  crearOrdenLaboratorio,
  DetalleOrden,
  listarCategorias,
  listarOrdenes,
  obtenerDetalleOrden,
  OrdenExamen,
  OrdenLaboratorio,
  PacienteConsulta,
  registrarResultadoExamen,
} from '../../lib/api';

// ─── Utilidades ──────────────────────────────────────────────────────────────

const BADGE: Record<string, string> = {
  'En análisis':       'bg-blue-50 text-blue-700 border border-blue-200',
  'Resultado parcial': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Resultado listo':   'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Anulada':           'bg-red-50 text-red-600 border border-red-200',
};

function fechaHora(iso: string) {
  return new Date(iso).toLocaleString('es-PE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function fechaSola(iso: string) {
  return new Date(iso).toLocaleDateString('es-PE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

// ─── Tipos internos ──────────────────────────────────────────────────────────

interface GrupoCategoria {
  categoriaId: number;
  categoria: string;
  padreId: number | null;
  examenes: { id: number; nombre: string }[];
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function LaboratorioPage() {
  const { cargando } = useRequireSesion('/laboratorio');
  const { openSidebar } = useSidebar();

  // ── Listado ──
  const [ordenes, setOrdenes] = useState<OrdenLaboratorio[]>([]);
  const [cargandoOrdenes, setCargandoOrdenes] = useState(true);
  const [errorOrdenes, setErrorOrdenes] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [mensaje, setMensaje] = useState('');

  // ── Modal: nueva orden ──
  const [showModalNueva, setShowModalNueva] = useState(false);
  const [categorias, setCategorias] = useState<GrupoCategoria[]>([]);
  const [examenesSeleccionados, setExamenesSeleccionados] = useState<Set<number>>(new Set());
  const [formPaciente, setFormPaciente] = useState({ dni: '', nombres: '', apellidos: '', sexo: 'M' as 'M' | 'F', celular: '' });
  const [pacienteEncontrado, setPacienteEncontrado] = useState<PacienteConsulta | null>(null);
  const [buscandoPaciente, setBuscandoPaciente] = useState(false);
  const [guardandoOrden, setGuardandoOrden] = useState(false);
  const [errorNueva, setErrorNueva] = useState('');
  const [busquedaExamen, setBusquedaExamen] = useState('');

  // ── Modal: detalle ──
  const [detalle, setDetalle] = useState<DetalleOrden | null>(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [showModalDetalle, setShowModalDetalle] = useState(false);

  // ── Modal: resultado ──
  const [examenParaResultado, setExamenParaResultado] = useState<OrdenExamen | null>(null);
  const [textoResultado, setTextoResultado] = useState('');
  const [guardandoResultado, setGuardandoResultado] = useState(false);
  const [errorResultado, setErrorResultado] = useState('');

  // ── Modal: anular ──
  const [ordenParaAnular, setOrdenParaAnular] = useState<OrdenLaboratorio | null>(null);
  const [motivoAnulacion, setMotivoAnulacion] = useState('');
  const [anulando, setAnulando] = useState(false);
  const [errorAnular, setErrorAnular] = useState('');

  // ─── Carga inicial ────────────────────────────────────────────────────────

  const cargarOrdenes = useCallback(async () => {
    setCargandoOrdenes(true);
    setErrorOrdenes('');
    try {
      const data = await listarOrdenes({
        estado: filtroEstado || undefined,
        fecha: filtroFecha || undefined,
        busqueda: filtroBusqueda || undefined,
      });
      setOrdenes(data);
    } catch (e) {
      setErrorOrdenes(e instanceof Error ? e.message : 'Error al cargar órdenes.');
    } finally {
      setCargandoOrdenes(false);
    }
  }, [filtroEstado, filtroFecha, filtroBusqueda]);

  useEffect(() => {
    if (!cargando) cargarOrdenes();
  }, [cargando, cargarOrdenes]);

  // ─── Abrir modal nueva orden ──────────────────────────────────────────────

  const abrirNuevaOrden = async () => {
    if (categorias.length === 0) {
      try {
        const raw: CategoriaCatalogo[] = await listarCategorias();
        // Agrupar por categoría
        const mapa = new Map<number, GrupoCategoria>();
        for (const row of raw) {
          if (!mapa.has(row.categoria_id)) {
            mapa.set(row.categoria_id, {
              categoriaId: row.categoria_id,
              categoria: row.categoria,
              padreId: row.categoria_padre_id,
              examenes: [],
            });
          }
          mapa.get(row.categoria_id)!.examenes.push({ id: row.examen_id, nombre: row.examen });
        }
        setCategorias(Array.from(mapa.values()));
      } catch (e) {
        setErrorNueva(e instanceof Error ? e.message : 'Error al cargar catálogo.');
      }
    }
    setShowModalNueva(true);
    setFormPaciente({ dni: '', nombres: '', apellidos: '', sexo: 'M', celular: '' });
    setExamenesSeleccionados(new Set());
    setPacienteEncontrado(null);
    setErrorNueva('');
    setBusquedaExamen('');
  };

  // ─── Búsqueda DNI ─────────────────────────────────────────────────────────

  const handleBuscarDni = async () => {
    if (formPaciente.dni.length !== 8) return;
    setBuscandoPaciente(true);
    try {
      const p = await buscarPacientePorDni(formPaciente.dni);
      if (p) {
        setPacienteEncontrado(p);
        setFormPaciente(prev => ({
          ...prev,
          nombres: p.nombres,
          apellidos: p.apellidos,
          sexo: (p.sexo ?? 'M') as 'M' | 'F',
          celular: p.celular ?? '',
        }));
      } else {
        setPacienteEncontrado(null);
      }
    } catch (e) {
      setErrorNueva(e instanceof Error ? e.message : 'Error al buscar el paciente.');
    } finally {
      setBuscandoPaciente(false);
    }
  };

  // ─── Toggle examen ────────────────────────────────────────────────────────

  const toggleExamen = (id: number) => {
    setExamenesSeleccionados(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ─── Guardar nueva orden ──────────────────────────────────────────────────

  const handleGuardarOrden = async (e: React.FormEvent) => {
    e.preventDefault();
    if (examenesSeleccionados.size === 0) {
      setErrorNueva('Selecciona al menos un examen.');
      return;
    }
    setGuardandoOrden(true);
    setErrorNueva('');
    try {
      const nueva = await crearOrdenLaboratorio({
        paciente: {
          dni: formPaciente.dni,
          nombres: formPaciente.nombres,
          apellidos: formPaciente.apellidos,
          sexo: formPaciente.sexo,
          celular: formPaciente.celular || undefined,
        },
        examenesIds: Array.from(examenesSeleccionados),
      });
      setOrdenes(prev => [nueva, ...prev]);
      setShowModalNueva(false);
      showMensaje(`Orden #${nueva.id} registrada — ${nueva.paciente.nombres} ${nueva.paciente.apellidos}`);
    } catch (e) {
      setErrorNueva(e instanceof Error ? e.message : 'Error al guardar la orden.');
    } finally {
      setGuardandoOrden(false);
    }
  };

  // ─── Detalle de orden ─────────────────────────────────────────────────────

  const abrirDetalle = async (orden: OrdenLaboratorio) => {
    setShowModalDetalle(true);
    setCargandoDetalle(true);
    setDetalle(null);
    try {
      const d = await obtenerDetalleOrden(orden.id);
      setDetalle(d);
    } catch (e) {
      setDetalle(null);
    } finally {
      setCargandoDetalle(false);
    }
  };

  // ─── Registrar resultado ──────────────────────────────────────────────────

  const abrirFormResultado = (examen: OrdenExamen) => {
    setExamenParaResultado(examen);
    setTextoResultado(examen.resultado?.resultadoTexto ?? '');
    setErrorResultado('');
  };

  const cerrarDetalle = () => {
    setShowModalDetalle(false);
    setExamenParaResultado(null);
  };

  const handleGuardarResultado = async () => {
    if (!examenParaResultado || !detalle) return;
    setGuardandoResultado(true);
    setErrorResultado('');
    try {
      const nuevoDetalle = await registrarResultadoExamen(examenParaResultado.id, textoResultado);
      setDetalle(nuevoDetalle);
      // Actualizar la lista principal si el estado cambió
      setOrdenes(prev =>
        prev.map(o => o.id === nuevoDetalle.orden.id ? nuevoDetalle.orden : o)
      );
      setExamenParaResultado(null);
    } catch (e) {
      setErrorResultado(e instanceof Error ? e.message : 'Error al guardar el resultado.');
    } finally {
      setGuardandoResultado(false);
    }
  };

  // ─── Anular orden ─────────────────────────────────────────────────────────

  const handleAnular = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ordenParaAnular) return;
    setAnulando(true);
    setErrorAnular('');
    try {
      const anulada = await anularOrden(ordenParaAnular.id, motivoAnulacion);
      setOrdenes(prev => prev.map(o => o.id === anulada.id ? anulada : o));
      if (detalle?.orden.id === anulada.id) setDetalle((d: DetalleOrden | null) => d ? { ...d, orden: anulada } : null);
      setOrdenParaAnular(null);
      setMotivoAnulacion('');
      showMensaje(`Orden #${anulada.id} anulada.`);
    } catch (e) {
      setErrorAnular(e instanceof Error ? e.message : 'Error al anular la orden.');
    } finally {
      setAnulando(false);
    }
  };

  // ─── Helpers UI ───────────────────────────────────────────────────────────

  const showMensaje = (msg: string) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(''), 4000);
  };

  // Categorías filtradas por búsqueda
  const categoriasFiltradas = useMemo(() => {
    if (!busquedaExamen.trim()) return categorias;
    const q = busquedaExamen.trim().toLowerCase();
    return categorias
      .map(c => ({
        ...c,
        examenes: c.examenes.filter(e => e.nombre.toLowerCase().includes(q)),
      }))
      .filter(c => c.examenes.length > 0);
  }, [categorias, busquedaExamen]);

  const ESTADOS_FILTRO = ['', 'En análisis', 'Resultado parcial', 'Resultado listo', 'Anulada'];

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xs font-medium text-gray-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col">
        {/* TOPBAR */}
        <header className="h-16 min-h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={openSidebar}
              className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">Órdenes de Laboratorio</h1>
              <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">
                {new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
          <button
            onClick={abrirNuevaOrden}
            className="flex items-center gap-2 bg-[#0d7a71] hover:bg-[#0a625b] text-white px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#0d7a71]/20 transition-all active:scale-[0.98] shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Nueva Orden</span>
            <span className="sm:hidden">Nueva</span>
          </button>
        </header>

        <div className="flex-1 p-4 sm:p-5 lg:p-6 space-y-4 overflow-x-hidden">
          {/* Mensaje de éxito */}
          {mensaje && (
            <div className="rounded-xl border border-[#0d7a71]/20 bg-[#0d7a71]/5 px-4 py-2.5 text-xs font-semibold text-[#0d7a71]">
              {mensaje}
            </div>
          )}

          {/* Filtros */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[160px]">
              <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Buscar</label>
              <input
                type="text"
                placeholder="DNI, HC o nombre..."
                value={filtroBusqueda}
                onChange={e => setFiltroBusqueda(e.target.value)}
                className="h-9 w-full rounded-lg border border-gray-200 px-3 text-xs text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
              />
            </div>
            <div className="min-w-[140px]">
              <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Estado</label>
              <select
                value={filtroEstado}
                onChange={e => setFiltroEstado(e.target.value)}
                className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#0d7a71]"
              >
                {ESTADOS_FILTRO.map(e => (
                  <option key={e} value={e}>{e || 'Todos los estados'}</option>
                ))}
              </select>
            </div>
            <div className="min-w-[140px]">
              <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Fecha</label>
              <input
                type="date"
                value={filtroFecha}
                onChange={e => setFiltroFecha(e.target.value)}
                className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-[#0d7a71]"
              />
            </div>
            <button
              onClick={() => { setFiltroFecha(new Date().toISOString().split('T')[0]); }}
              className="h-9 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Hoy
            </button>
            <button
              onClick={cargarOrdenes}
              className="h-9 px-4 rounded-lg bg-[#0d7a71] text-white text-xs font-bold shadow-sm hover:bg-[#0a625b] transition"
            >
              Buscar
            </button>
            {(filtroEstado || filtroFecha || filtroBusqueda) && (
              <button
                onClick={() => { setFiltroEstado(''); setFiltroFecha(''); setFiltroBusqueda(''); }}
                className="h-9 px-3 rounded-lg text-xs font-semibold text-gray-400 hover:text-gray-600 transition"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {cargandoOrdenes ? (
              <div className="p-8 text-center text-xs font-medium text-gray-400">Cargando órdenes...</div>
            ) : errorOrdenes ? (
              <div className="p-6 text-center text-xs font-semibold text-red-500">{errorOrdenes}</div>
            ) : ordenes.length === 0 ? (
              <div className="p-10 text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-400">No se encontraron órdenes de laboratorio</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Orden', 'Paciente', 'DNI / HC', 'Fecha muestra', 'Tomada por', 'Estado', 'Acciones'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {ordenes.map(o => (
                      <tr
                        key={o.id}
                        className="hover:bg-gray-50/60 transition-colors cursor-pointer"
                        onClick={() => abrirDetalle(o)}
                      >
                        <td className="px-4 py-3 font-bold text-gray-700">#{String(o.id).padStart(4, '0')}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                          {o.paciente.nombres} {o.paciente.apellidos}
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {o.paciente.dni} · {o.paciente.historiaClinica}
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{fechaHora(o.fechaMuestra)}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {o.usuarioMuestra.nombres} {o.usuarioMuestra.apellidos}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${BADGE[o.estado.estado] ?? 'bg-gray-100 text-gray-600'}`}>
                            {o.estado.estado}
                          </span>
                        </td>
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => abrirDetalle(o)}
                              className="px-2.5 py-1 rounded-lg bg-[#0d7a71]/10 text-[#0d7a71] text-[11px] font-semibold hover:bg-[#0d7a71]/20 transition"
                            >
                              Ver
                            </button>
                            {o.estado.estado !== 'Anulada' && o.estado.estado !== 'Resultado listo' && (
                              <button
                                onClick={() => { setOrdenParaAnular(o); setMotivoAnulacion(''); setErrorAnular(''); }}
                                className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-[11px] font-semibold hover:bg-red-100 transition"
                              >
                                Anular
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ═══ MODAL: NUEVA ORDEN ════════════════════════════════════════════════ */}
      {showModalNueva && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4"
          onMouseDown={e => { if (e.target === e.currentTarget) setShowModalNueva(false); }}
        >
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-[26px] shadow-2xl border border-gray-100 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Nueva Orden de Laboratorio</h3>
                <p className="text-xs text-gray-400 mt-1">Registrar toma de muestra — fecha y hora automáticas</p>
              </div>
              <button
                onClick={() => setShowModalNueva(false)}
                className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleGuardarOrden} className="mt-5 space-y-5">
              {/* DNI */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">DNI del Paciente *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={8}
                    inputMode="numeric"
                    value={formPaciente.dni}
                    onChange={e => {
                      setFormPaciente(p => ({ ...p, dni: e.target.value }));
                      if (pacienteEncontrado) setPacienteEncontrado(null);
                    }}
                    onBlur={handleBuscarDni}
                    placeholder="12345678"
                    required
                    className="h-11 flex-1 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
                  />
                  <button
                    type="button"
                    onClick={handleBuscarDni}
                    disabled={buscandoPaciente}
                    className="h-11 px-4 rounded-xl bg-gray-100 text-xs font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
                  >
                    {buscandoPaciente ? '...' : 'Buscar'}
                  </button>
                </div>
                {pacienteEncontrado && (
                  <p className="mt-1.5 text-[11px] font-semibold text-[#0d7a71]">
                    {pacienteEncontrado.historiaClinica
                      ? `Paciente registrado — HC: ${pacienteEncontrado.historiaClinica}`
                      : 'Encontrado en RENIEC — se creará la historia clínica al guardar'}
                  </p>
                )}
              </div>

              {/* Nombres y Apellidos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Nombres *</label>
                  <input
                    type="text"
                    required
                    value={formPaciente.nombres}
                    onChange={e => setFormPaciente(p => ({ ...p, nombres: e.target.value }))}
                    disabled={!!pacienteEncontrado}
                    placeholder="JUAN CARLOS"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Apellidos *</label>
                  <input
                    type="text"
                    required
                    value={formPaciente.apellidos}
                    onChange={e => setFormPaciente(p => ({ ...p, apellidos: e.target.value }))}
                    disabled={!!pacienteEncontrado}
                    placeholder="GARCÍA LÓPEZ"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Sexo</label>
                  <select
                    value={formPaciente.sexo}
                    onChange={e => setFormPaciente(p => ({ ...p, sexo: e.target.value as 'M' | 'F' }))}
                    disabled={!!pacienteEncontrado}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#0d7a71] disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Celular</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formPaciente.celular}
                    onChange={e => setFormPaciente(p => ({ ...p, celular: e.target.value }))}
                    disabled={!!pacienteEncontrado}
                    placeholder="999 999 999"
                    className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d7a71] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Selección de exámenes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Exámenes * <span className="text-[#0d7a71] font-bold">({examenesSeleccionados.size} seleccionados)</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Buscar examen..."
                  value={busquedaExamen}
                  onChange={e => setBusquedaExamen(e.target.value)}
                  className="h-9 w-full rounded-xl border border-gray-200 px-3 text-xs outline-none focus:border-[#0d7a71] mb-3"
                />
                <div className="max-h-64 overflow-y-auto space-y-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                  {categoriasFiltradas.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">No se encontraron exámenes.</p>
                  ) : (
                    categoriasFiltradas.map(cat => (
                      <div key={cat.categoriaId}>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">{cat.categoria}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {cat.examenes.map(ex => (
                            <label key={ex.id} className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white cursor-pointer transition">
                              <input
                                type="checkbox"
                                checked={examenesSeleccionados.has(ex.id)}
                                onChange={() => toggleExamen(ex.id)}
                                className="rounded text-[#0d7a71] focus:ring-[#0d7a71]/30"
                              />
                              <span className="text-xs text-gray-700">{ex.nombre}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {errorNueva && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-semibold text-red-600">
                  {errorNueva}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button type="button" onClick={() => setShowModalNueva(false)}
                  className="h-11 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
                  Cancelar
                </button>
                <button type="submit" disabled={guardandoOrden}
                  className="h-11 rounded-xl bg-[#0d7a71] text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 hover:bg-[#0a625b] transition disabled:opacity-70 disabled:cursor-not-allowed">
                  {guardandoOrden ? 'Registrando...' : 'Registrar Orden'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══ MODAL: DETALLE DE ORDEN (interfaz según el estado) ══════════════ */}
      {showModalDetalle && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4"
          onMouseDown={e => { if (e.target === e.currentTarget && !examenParaResultado) cerrarDetalle(); }}
        >
          <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[28px]">
            {cargandoDetalle ? (
              <div className="rounded-[26px] bg-white p-10 text-center text-xs text-gray-400 shadow-2xl">
                Cargando detalle...
              </div>
            ) : !detalle ? (
              <div className="rounded-[26px] bg-white p-10 text-center shadow-2xl">
                <p className="text-xs text-red-500">Error al cargar el detalle.</p>
                <button
                  onClick={cerrarDetalle}
                  className="mt-4 h-9 px-4 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <DetalleOrdenLab
                detalle={detalle}
                examenEnEdicion={examenParaResultado}
                texto={textoResultado}
                guardando={guardandoResultado}
                error={errorResultado}
                onAbrirFormulario={abrirFormResultado}
                onCerrarFormulario={() => setExamenParaResultado(null)}
                onTextoChange={setTextoResultado}
                onGuardar={handleGuardarResultado}
                onCerrar={cerrarDetalle}
              />
            )}
          </div>
        </div>
      )}

      {/* ═══ MODAL: ANULAR ORDEN ════════════════════════════════════════════ */}
      {ordenParaAnular && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-[22px] shadow-2xl border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-1">Anular Orden #{String(ordenParaAnular.id).padStart(4, '0')}</h3>
            <p className="text-xs text-gray-400 mb-4">
              {ordenParaAnular.paciente.nombres} {ordenParaAnular.paciente.apellidos} · {fechaSola(ordenParaAnular.fechaMuestra)}
            </p>
            <form onSubmit={handleAnular} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Motivo de anulación *</label>
                <textarea
                  rows={3}
                  required
                  value={motivoAnulacion}
                  onChange={e => setMotivoAnulacion(e.target.value)}
                  placeholder="Ej: Muestra insuficiente, registro duplicado..."
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 resize-none"
                />
              </div>
              {errorAnular && (
                <p className="text-xs font-semibold text-red-500">{errorAnular}</p>
              )}
              <div className="flex gap-2.5">
                <button type="button" onClick={() => setOrdenParaAnular(null)}
                  className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
                  Cancelar
                </button>
                <button type="submit" disabled={anulando}
                  className="flex-1 h-11 rounded-xl bg-red-500 text-sm font-bold text-white hover:bg-red-600 transition disabled:opacity-70">
                  {anulando ? 'Anulando...' : 'Confirmar Anulación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
