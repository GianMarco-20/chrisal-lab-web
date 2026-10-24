'use client';

import { useMemo, useState } from 'react';

/* =========================================================
   SELECTOR DE EXÁMENES DE LABORATORIO

   La misma lista que se usa al crear una orden en Laboratorio: categorías en
   orden alfabético con su cantidad, exámenes en tarjetas (nombre, código,
   tubo, ayunas y tiempo de entrega) y búsqueda por nombre, código, tubo o
   muestra. Aquí no se muestran precios: es una indicación del médico.
   Lo usan el registro del diagnóstico y la edición de una cita atendida.
========================================================= */

export interface ExamenOpcion {
  id: string;
  nombre: string;
  categoria: string;
  muestra?: string;
  tubo?: string;
  condicion?: string;
  tiempo?: string;
}

interface Props {
  examenes: ExamenOpcion[];
  seleccionados: string[];
  onToggle: (id: string) => void;
}

function esAyunas(condicion?: string) {
  const c = (condicion ?? '').toUpperCase();
  return c.includes('AYUNAS') && !c.includes('NO AYUNAS');
}

export default function SelectorExamenes({ examenes, seleccionados, onToggle }: Props) {
  const [busqueda, setBusqueda] = useState('');

  const categorias = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    const filtrados = q
      ? examenes.filter(
          (e) =>
            e.nombre.toLowerCase().includes(q) ||
            e.id.toLowerCase().includes(q) ||
            (e.tubo ?? '').toLowerCase().includes(q) ||
            (e.muestra ?? '').toLowerCase().includes(q),
        )
      : examenes;

    const grupos = new Map<string, ExamenOpcion[]>();
    for (const e of filtrados) {
      grupos.set(e.categoria, [...(grupos.get(e.categoria) ?? []), e]);
    }
    return [...grupos.entries()]
      .sort(([a], [b]) => a.localeCompare(b, 'es'))
      .map(([nombre, lista]) => ({
        nombre,
        examenes: [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')),
      }));
  }, [examenes, busqueda]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar examen por nombre, código o tubo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 pr-8 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
        />
        {busqueda && (
          <button
            type="button"
            onClick={() => setBusqueda('')}
            aria-label="Borrar búsqueda"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <div className="max-h-64 space-y-3.5 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50/60 p-3">
        {categorias.length === 0 ? (
          <p className="py-4 text-center text-xs text-gray-400">
            {examenes.length === 0 ? 'Cargando catálogo...' : 'No se encontraron exámenes.'}
          </p>
        ) : (
          categorias.map((cat) => (
            <div key={cat.nombre}>
              <p className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-gray-500">
                <span>{cat.nombre}</span>
                <span className="text-[10px] font-normal text-gray-400">({cat.examenes.length})</span>
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {cat.examenes.map((ex) => {
                  const marcado = seleccionados.includes(ex.id);
                  return (
                    <label
                      key={ex.id}
                      className={`flex cursor-pointer select-none items-start gap-2.5 rounded-xl border p-2.5 transition-all ${
                        marcado
                          ? 'border-[#0d7a71] bg-teal-50/90'
                          : 'border-gray-200/70 bg-white hover:border-teal-200 hover:bg-teal-50/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={marcado}
                        onChange={() => onToggle(ex.id)}
                        className="mt-0.5 cursor-pointer rounded accent-[#0d7a71]"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-semibold leading-tight text-gray-900">{ex.nombre}</span>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px]">
                          <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[9px] text-gray-400">
                            {ex.id}
                          </span>
                          {ex.tubo && (
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
                              🧪 {ex.tubo}
                            </span>
                          )}
                          {esAyunas(ex.condicion) && (
                            <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-bold text-amber-800">
                              Ayunas
                            </span>
                          )}
                          {ex.tiempo && <span className="text-[10px] text-gray-500">⏱ {ex.tiempo}</span>}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {seleccionados.length > 0 && (
        <p className="text-xs font-medium text-gray-500">{seleccionados.length} examen(es) seleccionado(s)</p>
      )}
    </div>
  );
}
