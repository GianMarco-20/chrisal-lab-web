'use client';

import { useMemo, useState } from 'react';
import type { CategoriaCatalogo, DatosDetalleExamen } from '../../lib/api';

interface Props {
  catalogo: CategoriaCatalogo[];
  cargando: boolean;
  /** Guarda los datos de un examen (PATCH /examenes-catalogo/:id/detalle). */
  onGuardar: (examenId: string, datos: DatosDetalleExamen) => Promise<void>;
  onCerrar: () => void;
}

// Ayudante de estilo para los tubos según su color/nombre
function estiloTubo(tuboStr?: string | null) {
  if (!tuboStr) return { bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
  const t = tuboStr.toUpperCase();
  if (t.includes('ROJO') && t.includes('AMARILLO')) {
    return { bg: 'bg-gradient-to-r from-red-50 to-amber-50 text-red-700 border-red-200', dot: 'bg-red-500' };
  }
  if (t.includes('ROJO')) {
    return { bg: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' };
  }
  if (t.includes('AMARILLO') || t.includes('GEL')) {
    return { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' };
  }
  if (t.includes('LILA') || t.includes('EDTA')) {
    return { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' };
  }
  if (t.includes('CELESTE') || t.includes('CITRATO')) {
    return { bg: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' };
  }
  if (t.includes('VERDE') || t.includes('HEPARINA')) {
    return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
  }
  if (t.includes('ORINA') || t.includes('FRASCO')) {
    return { bg: 'bg-yellow-50 text-yellow-800 border-yellow-200', dot: 'bg-yellow-500' };
  }
  return { bg: 'bg-teal-50 text-teal-800 border-teal-200', dot: 'bg-teal-500' };
}

// Faltan datos si el examen no tiene precio, tubo, muestra, condición o tiempo de entrega.
function estaIncompleto(item: CategoriaCatalogo) {
  return (
    item.precio_publico == null || !item.tubo || !item.muestra || !item.condicion || !item.tiempo
  );
}

interface FormDetalle {
  precioPublico: string;
  precioCorporativo: string;
  muestra: string;
  tubo: string;
  condicion: string;
  tiempo: string;
}

const CLASE_CAMPO =
  'w-full h-8 px-2 text-xs bg-white rounded-lg border border-gray-200 text-gray-800 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15';

export default function CatalogoDetallesModal({ catalogo, cargando, onGuardar, onCerrar }: Props) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('todas');
  const [filtroCondicion, setFiltroCondicion] = useState<'todos' | 'ayunas' | 'mismo_dia' | 'incompletos'>('todos');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<FormDetalle | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');

  const empezarEdicion = (item: CategoriaCatalogo) => {
    setEditandoId(item.examen_id);
    setErrorGuardar('');
    setForm({
      precioPublico: item.precio_publico != null ? String(Number(item.precio_publico)) : '',
      precioCorporativo: item.precio_corporativo != null ? String(Number(item.precio_corporativo)) : '',
      muestra: item.muestra ?? '',
      tubo: item.tubo ?? '',
      condicion: item.condicion ?? '',
      tiempo: item.tiempo ?? '',
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(null);
    setErrorGuardar('');
  };

  const guardarEdicion = async (examenId: string) => {
    if (!form) return;
    const precio = (v: string) => (v.trim() === '' ? null : Number(v));
    const publico = precio(form.precioPublico);
    const corporativo = precio(form.precioCorporativo);
    if ([publico, corporativo].some((v) => v !== null && (Number.isNaN(v) || v < 0))) {
      setErrorGuardar('Los precios deben ser números positivos.');
      return;
    }
    setGuardando(true);
    setErrorGuardar('');
    try {
      await onGuardar(examenId, {
        precioPublico: publico,
        precioCorporativo: corporativo,
        muestra: form.muestra,
        tubo: form.tubo,
        condicion: form.condicion,
        tiempo: form.tiempo,
      });
      cancelarEdicion();
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo guardar.');
    } finally {
      setGuardando(false);
    }
  };

  // Valores ya usados en el catálogo: se sugieren al escribir para mantener la misma redacción.
  const sugerencias = useMemo(() => {
    const unicos = (campo: 'muestra' | 'tubo' | 'condicion' | 'tiempo') =>
      Array.from(new Set(catalogo.map((c) => c[campo]).filter((v): v is string => !!v))).sort();
    return {
      muestra: unicos('muestra'),
      tubo: unicos('tubo'),
      condicion: unicos('condicion'),
      tiempo: unicos('tiempo'),
    };
  }, [catalogo]);

  // Categorías únicas para el filtro
  const categoriasUnicas = useMemo(() => {
    const set = new Set<string>();
    catalogo.forEach((c) => {
      if (c.categoria) set.add(c.categoria);
    });
    return Array.from(set).sort();
  }, [catalogo]);

  // Filtrado de exámenes
  const examenesFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return catalogo.filter((item) => {
      // Filtro categoría
      if (categoriaSeleccionada !== 'todas' && item.categoria !== categoriaSeleccionada) {
        return false;
      }
      // Filtro condición
      if (filtroCondicion === 'incompletos') {
        if (!estaIncompleto(item)) return false;
      } else if (filtroCondicion === 'ayunas') {
        const cond = (item.condicion || '').toUpperCase();
        if (!cond.includes('AYUNAS') || cond.includes('NO AYUNAS')) return false;
      } else if (filtroCondicion === 'mismo_dia') {
        const t = (item.tiempo || '').toUpperCase();
        if (!t.includes('MISMO DIA') && !t.includes('MISMO DÍA')) return false;
      }

      // Filtro texto
      if (!q) return true;
      return (
        item.examen.toLowerCase().includes(q) ||
        item.examen_id.toLowerCase().includes(q) ||
        (item.tubo || '').toLowerCase().includes(q) ||
        (item.muestra || '').toLowerCase().includes(q) ||
        (item.categoria || '').toLowerCase().includes(q) ||
        (item.condicion || '').toLowerCase().includes(q)
      );
    });
  }, [catalogo, busqueda, categoriaSeleccionada, filtroCondicion]);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-3 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
    >
      <div className="w-full max-w-6xl max-h-[92vh] flex flex-col bg-white rounded-[28px] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* CABECERA */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-[#0d4f49] to-[#0d7a71] text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-teal-200 shadow-inner">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Catálogo y Detalles de Exámenes</h2>
                <span className="text-[11px] font-semibold bg-white/15 px-2.5 py-0.5 rounded-full text-teal-100 border border-white/10">
                  {examenesFiltrados.length} {examenesFiltrados.length === 1 ? 'examen' : 'exámenes'}
                </span>
              </div>
              <p className="text-xs text-teal-100/80 mt-0.5">
                Guía rápida de tubos a usar, condiciones del paciente, tiempos de entrega y precios
              </p>
            </div>
          </div>

          <button
            onClick={onCerrar}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Cerrar (Esc)"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* FILTROS Y BÚSQUEDA */}
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-slate-50/70 shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Buscador general */}
            <div className="relative flex-1">
              <svg
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por código (ej. E0454), nombre del examen, tubo o muestra..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full h-10 pl-9 pr-8 text-xs bg-white rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 transition shadow-sm"
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Selector de Categoría */}
            <div className="sm:w-60">
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-white rounded-xl border border-gray-200 text-gray-700 outline-none focus:border-[#0d7a71] shadow-sm font-medium"
              >
                <option value="todas">Todas las categorías ({categoriasUnicas.length})</option>
                {categoriasUnicas.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtros rápidos */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setFiltroCondicion('todos')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  filtroCondicion === 'todos'
                    ? 'bg-[#0d7a71] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setFiltroCondicion('ayunas')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  filtroCondicion === 'ayunas'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200'
                }`}
              >
                <span>Requiere Ayunas</span>
              </button>
              <button
                type="button"
                onClick={() => setFiltroCondicion('mismo_dia')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  filtroCondicion === 'mismo_dia'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200'
                }`}
              >
                <span>Mismo Día</span>
              </button>
              <button
                type="button"
                onClick={() => setFiltroCondicion('incompletos')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  filtroCondicion === 'incompletos'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-rose-50 hover:text-rose-800 hover:border-rose-200'
                }`}
              >
                <span>Datos incompletos ({catalogo.filter(estaIncompleto).length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* LISTADO / TABLA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {cargando ? (
            <div className="p-12 text-center text-xs text-gray-400 font-medium">
              Cargando catálogo de exámenes y detalles...
            </div>
          ) : examenesFiltrados.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm font-semibold text-gray-700">No se encontraron exámenes</p>
              <p className="text-xs text-gray-400 mt-1">
                Intenta ajustar tu término de búsqueda o selecciona otra categoría.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {examenesFiltrados.map((item) => {
                const estilo = estiloTubo(item.tubo);
                const precioPub = item.precio_publico != null ? Number(item.precio_publico).toFixed(2) : null;
                const precioCorp = item.precio_corporativo != null ? Number(item.precio_corporativo).toFixed(2) : null;
                const esAyunas = (item.condicion || '').toUpperCase().includes('AYUNAS') && !(item.condicion || '').toUpperCase().includes('NO AYUNAS');
                const editando = editandoId === item.examen_id && form !== null;

                return (
                  <div
                    key={item.examen_id}
                    className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-[#0d7a71]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Cabecera del examen: Código + Categoría */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                          {item.examen_id}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide truncate max-w-[180px]">
                          {item.categoria}
                        </span>
                      </div>

                      {/* Nombre */}
                      <h4 className="text-sm font-bold text-gray-900 leading-snug mb-3">
                        {item.examen}
                      </h4>

                      {editando && form && (
                      <div className="space-y-2.5 pt-2 border-t border-gray-100">
                        <label className="block">
                          <span className="mb-0.5 block text-[11px] font-semibold text-gray-500">Tubo</span>
                          <input
                            list="lista-tubo"
                            value={form.tubo}
                            onChange={(e) => setForm({ ...form, tubo: e.target.value })}
                            className={CLASE_CAMPO}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-0.5 block text-[11px] font-semibold text-gray-500">Muestra</span>
                          <input
                            list="lista-muestra"
                            value={form.muestra}
                            onChange={(e) => setForm({ ...form, muestra: e.target.value })}
                            className={CLASE_CAMPO}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-0.5 block text-[11px] font-semibold text-gray-500">Condición</span>
                          <input
                            list="lista-condicion"
                            value={form.condicion}
                            onChange={(e) => setForm({ ...form, condicion: e.target.value })}
                            className={CLASE_CAMPO}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-0.5 block text-[11px] font-semibold text-gray-500">Entrega</span>
                          <input
                            list="lista-tiempo"
                            value={form.tiempo}
                            onChange={(e) => setForm({ ...form, tiempo: e.target.value })}
                            className={CLASE_CAMPO}
                          />
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <label className="block">
                            <span className="mb-0.5 block text-[11px] font-semibold text-gray-500">Cobro paciente (S/.)</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              inputMode="decimal"
                              placeholder="0.00"
                              value={form.precioPublico}
                              onChange={(e) => setForm({ ...form, precioPublico: e.target.value })}
                              className={CLASE_CAMPO}
                            />
                          </label>
                          <label className="block">
                            <span className="mb-0.5 block text-[11px] font-semibold text-gray-500">P. corporativo (S/.)</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              inputMode="decimal"
                              placeholder="0.00"
                              value={form.precioCorporativo}
                              onChange={(e) => setForm({ ...form, precioCorporativo: e.target.value })}
                              className={CLASE_CAMPO}
                            />
                          </label>
                        </div>
                        {errorGuardar && (
                          <p className="text-[11px] font-semibold text-red-600">{errorGuardar}</p>
                        )}
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={cancelarEdicion}
                            disabled={guardando}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={() => guardarEdicion(item.examen_id)}
                            disabled={guardando}
                            className="px-3 py-1.5 rounded-lg bg-[#0d7a71] text-xs font-bold text-white hover:bg-[#0a635b] disabled:opacity-60"
                          >
                            {guardando ? 'Guardando...' : 'Guardar'}
                          </button>
                        </div>
                      </div>
                      )}
                      {!editando && (
                      <>
                      {/* Info de laboratorio: Tubo y Muestra */}
                      <div className="space-y-2 mb-3 pt-2 border-t border-gray-100">
                        {/* Tubo */}
                        <div className="flex items-start gap-2">
                          <span className="text-[11px] font-semibold text-gray-400 w-16 shrink-0 mt-0.5">Tubo:</span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${estilo.bg}`}>
                            <span className={`w-2 h-2 rounded-full ${estilo.dot}`} />
                            {item.tubo || 'No especificado'}
                          </span>
                        </div>

                        {/* Muestra */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-gray-400 w-16 shrink-0">Muestra:</span>
                          <span className="text-xs font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                            {item.muestra || 'No especificada'}
                          </span>
                        </div>

                        {/* Condición (Ayunas) */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-gray-400 w-16 shrink-0">Condición:</span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                              esAyunas
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {item.condicion || 'Normal'}
                          </span>
                        </div>

                        {/* Tiempo */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-gray-400 w-16 shrink-0">Entrega:</span>
                          <span className="text-xs text-gray-600 font-medium">
                            ⏱ {item.tiempo || 'Consultar'}
                          </span>
                        </div>
                      </div>
                      </>
                      )}
                    </div>

                    {!editando && (
                      <>
                    {/* Precios (Cobro al paciente y Corporativo) */}
                    <div className="pt-3 border-t border-gray-100 mt-1 flex items-center justify-between bg-teal-50/40 -mx-4 -mb-4 p-3 rounded-b-2xl">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#0d7a71]">Cobro Paciente</p>
                        <p className="text-base font-extrabold text-[#0d7a71]">
                          {precioPub ? `S/. ${precioPub}` : 'Por cotizar'}
                        </p>
                      </div>

                      {precioCorp && (
                        <div className="text-right">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase">P. Corporativo</p>
                          <p className="text-xs font-bold text-gray-600">S/. {precioCorp}</p>
                        </div>
                      )}
                    </div>
                        <button
                          type="button"
                          onClick={() => empezarEdicion(item)}
                          className="mt-5 w-full rounded-lg border border-[#0d7a71]/30 bg-white py-1.5 text-xs font-bold text-[#0d7a71] transition hover:bg-[#0d7a71]/5"
                        >
                          {estaIncompleto(item) ? 'Completar datos' : 'Editar datos'}
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {(['tubo', 'muestra', 'condicion', 'tiempo'] as const).map((campo) => (
          <datalist key={campo} id={`lista-${campo}`}>
            {sugerencias[campo].map((valor) => (
              <option key={valor} value={valor} />
            ))}
          </datalist>
        ))}

        {/* PIE DE PÁGINA */}
        <div className="px-6 py-3.5 bg-white border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">Total en catálogo: {catalogo.length} exámenes</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="hidden sm:inline text-gray-400">Precios actualizados para recepción y laboratorio</span>
          </div>
          <button
            onClick={onCerrar}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
