'use client';

import type { ReactNode } from 'react';
import type { DetalleOrden, OrdenExamen } from '../../lib/api';
import { FormatoResultado } from './formatos';

/* =========================================================
   DETALLE DE UNA ORDEN DE LABORATORIO, según su estado

   Une las interfaces de los estados de laboratorio en un solo componente:
   - En análisis       (azul)     registro y procesamiento de exámenes
   - Resultado parcial (ámbar)    con barra de progreso
   - Resultado listo   (verde)    resultados completos + imprimir
   - Anulada           (rojo)     solo lectura, con el motivo

   Recibe los datos reales y los manejadores desde laboratorio/page.tsx.
========================================================= */

interface Props {
  detalle: DetalleOrden;
  examenEnEdicion: OrdenExamen | null;
  texto: string;
  guardando: boolean;
  error: string;
  onAbrirFormulario: (examen: OrdenExamen) => void;
  onCerrarFormulario: () => void;
  onTextoChange: (valor: string) => void;
  onGuardar: () => void;
  onCerrar: () => void;
}

type Tono = 'blue' | 'amber' | 'emerald' | 'red';

const TONOS: Record<Tono, { icono: string; pill: string }> = {
  blue: { icono: 'bg-blue-50 text-blue-500', pill: 'bg-blue-50 text-blue-700 border-blue-200' },
  amber: { icono: 'bg-amber-50 text-amber-500', pill: 'bg-amber-50 text-amber-700 border-amber-200' },
  emerald: { icono: 'bg-emerald-50 text-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  red: { icono: 'bg-red-50 text-red-500', pill: 'bg-red-50 text-red-600 border-red-200' },
};

function configuracion(estado: string): { tono: Tono; subtitulo: string } {
  switch (estado) {
    case 'Resultado parcial':
      return { tono: 'amber', subtitulo: 'Seguimiento de resultados' };
    case 'Resultado listo':
      return { tono: 'emerald', subtitulo: 'Resultados completos de laboratorio' };
    case 'Anulada':
      return { tono: 'red', subtitulo: 'Orden anulada' };
    default:
      return { tono: 'blue', subtitulo: 'Registro y procesamiento de exámenes' };
  }
}

function fechaHora(iso: string) {
  return new Date(iso).toLocaleString('es-PE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/* ---------- Iconos (SVG inline, sin dependencias) ---------- */

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function IconoFlask({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} {...svgProps}>
      <path d="M9 3h6" />
      <path d="M10 3v6.2L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

function IconoUsuario({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} {...svgProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </svg>
  );
}

function IconoCalendario({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} {...svgProps}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}

function IconoCheck({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} {...svgProps} strokeWidth={2.2}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function IconoCheckCirculo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16 9.5" />
    </svg>
  );
}

function IconoReloj({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} {...svgProps} strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconoImpresora({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} {...svgProps} strokeWidth={1.8}>
      <path d="M7 9V3.5h10V9" />
      <rect x="3.5" y="9" width="17" height="8" rx="2" />
      <path d="M7 14h10v6.5H7z" />
    </svg>
  );
}

function IconoCerrar({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} {...svgProps} strokeWidth={2}>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ---------- Piezas reutilizables ---------- */

function Campo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400">{label}</p>
      <div className="text-sm font-medium text-slate-800 mt-1 break-words">{children}</div>
    </div>
  );
}

function TituloTarjeta({
  icono,
  titulo,
  extra,
  verde = false,
}: {
  icono: ReactNode;
  titulo: string;
  extra?: ReactNode;
  verde?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <span
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            verde ? 'bg-emerald-100 text-emerald-600' : 'bg-[#0d7a71]/10 text-[#0d7a71]'
          }`}
        >
          {icono}
        </span>
        <h3 className="text-sm font-semibold text-slate-800">{titulo}</h3>
      </div>
      {extra}
    </div>
  );
}

const TARJETA = 'rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]';

export default function DetalleOrdenLab({
  detalle,
  examenEnEdicion,
  texto,
  guardando,
  error,
  onAbrirFormulario,
  onCerrarFormulario,
  onTextoChange,
  onGuardar,
  onCerrar,
}: Props) {
  const { orden, examenes } = detalle;
  const estado = orden.estado.estado;
  const { tono, subtitulo } = configuracion(estado);
  const colores = TONOS[tono];

  const anulada = estado === 'Anulada';
  const listo = estado === 'Resultado listo';
  const conResultado = examenes.filter((e) => e.estado === 'con_resultado').length;
  const porcentaje = examenes.length ? Math.round((conResultado / examenes.length) * 100) : 0;

  return (
    <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] border border-gray-100 overflow-hidden">
      {/* CABECERA */}
      <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <span className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colores.icono}`}>
            <IconoFlask />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900 leading-tight">
              Orden #{String(orden.id).padStart(4, '0')}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">{subtitulo}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-medium ${colores.pill}`}>
            {estado}
          </span>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <IconoCerrar />
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-5 bg-slate-50/60">
        {/* PACIENTE + MUESTRA (o resultado completo / anulación) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className={TARJETA}>
            <TituloTarjeta
              icono={<IconoUsuario />}
              titulo="Paciente"
              extra={
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-slate-600 text-xs font-medium shrink-0">
                  HC: {orden.paciente.historiaClinica}
                </span>
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="sm:col-span-2">
                <Campo label="Nombres y apellidos">
                  <span className="uppercase">
                    {orden.paciente.nombres} {orden.paciente.apellidos}
                  </span>
                </Campo>
              </div>
              <Campo label="DNI">{orden.paciente.dni}</Campo>
            </div>
          </div>

          {anulada ? (
            <div className="rounded-2xl border border-red-100 bg-red-50/40 p-6">
              <TituloTarjeta icono={<IconoCerrar className="w-4 h-4" />} titulo="Orden anulada" />
              <div className="space-y-4">
                {orden.motivoAnulacion && <Campo label="Motivo">{orden.motivoAnulacion}</Campo>}
                {orden.fechaAnulacion && (
                  <Campo label="Anulada el">
                    {fechaHora(orden.fechaAnulacion)}
                    {orden.usuarioAnulacion &&
                      ` · ${orden.usuarioAnulacion.nombres} ${orden.usuarioAnulacion.apellidos}`}
                  </Campo>
                )}
              </div>
            </div>
          ) : listo ? (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
              <TituloTarjeta verde icono={<IconoCheckCirculo />} titulo="Resultado completo" />
              <div className="space-y-4">
                <Campo label="Estado">Todos los exámenes han sido registrados.</Campo>
                {orden.fechaResultado && (
                  <Campo label="Completada">
                    {fechaHora(orden.fechaResultado)}
                    {orden.usuarioResultado &&
                      ` · ${orden.usuarioResultado.nombres} ${orden.usuarioResultado.apellidos}`}
                  </Campo>
                )}
                <Campo label="Toma de muestra">
                  {fechaHora(orden.fechaMuestra)} · {orden.usuarioMuestra.nombres} {orden.usuarioMuestra.apellidos}
                </Campo>
              </div>
            </div>
          ) : (
            <div className={TARJETA}>
              <TituloTarjeta icono={<IconoCalendario />} titulo="Toma de muestra" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Campo label="Fecha">{fechaHora(orden.fechaMuestra)}</Campo>
                <Campo label="Registrado por">
                  {orden.usuarioMuestra.nombres} {orden.usuarioMuestra.apellidos}
                </Campo>
              </div>
            </div>
          )}
        </div>

        {/* PROGRESO (solo resultado parcial) */}
        {estado === 'Resultado parcial' && (
          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 px-6 py-5">
            <div className="flex items-center justify-between gap-6">
              <div className="shrink-0">
                <p className="text-xs text-amber-700">Progreso</p>
                <p className="text-sm font-medium text-slate-800 mt-1">
                  {conResultado} de {examenes.length} exámenes registrados
                </p>
              </div>
              <div className="flex-1 h-2 rounded-full bg-amber-100 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${porcentaje}%` }} />
              </div>
              <p className="text-lg font-semibold text-amber-600 shrink-0">{porcentaje}%</p>
            </div>
          </div>
        )}

        {/* EXÁMENES */}
        <div className={TARJETA}>
          <TituloTarjeta
            icono={<IconoFlask className="w-4 h-4" />}
            titulo={`Exámenes (${conResultado}/${examenes.length} con resultado)`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examenes.map((ex) => {
              const tieneResultado = ex.estado === 'con_resultado';
              return (
                <div
                  key={ex.id}
                  className={`rounded-xl border p-4 ${
                    tieneResultado ? 'border-emerald-100 bg-emerald-50/40' : 'border-gray-100 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800">{ex.examen.nombre}</p>

                      {ex.resultado ? (
                        <>
                          <p className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">
                            {ex.resultado.resultadoTexto}
                          </p>
                          <p className="text-xs text-slate-400 mt-2">
                            Registrado por {ex.resultado.usuario.nombres} {ex.resultado.usuario.apellidos} ·{' '}
                            {fechaHora(ex.resultado.fechaRegistro)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-slate-400 mt-1">Pendiente de registrar</p>
                      )}
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          tieneResultado ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {tieneResultado ? <IconoCheck /> : <IconoReloj />}
                        {tieneResultado ? 'Con resultado' : 'Pendiente'}
                      </span>

                      {!anulada && (
                        <button
                          type="button"
                          onClick={() => onAbrirFormulario(ex)}
                          disabled={!!examenEnEdicion}
                          className={
                            tieneResultado
                              ? 'px-3 py-1 rounded-lg border border-gray-200 bg-white text-slate-600 text-xs font-medium hover:bg-gray-50 transition-colors disabled:opacity-40'
                              : 'px-3.5 py-1.5 rounded-lg bg-[#0d7a71] text-white text-xs font-medium hover:bg-[#0b6a62] transition-colors disabled:opacity-40'
                          }
                        >
                          {tieneResultado ? 'Editar' : 'Registrar'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FORMULARIO DEL EXAMEN */}
        {examenEnEdicion && (
          <div className="rounded-2xl border border-[#0d7a71]/20 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
            <TituloTarjeta
              icono={<IconoFlask className="w-4 h-4" />}
              titulo={examenEnEdicion.resultado ? 'Editar resultado' : 'Registrar resultado'}
            />

            <FormatoResultado
              nombreExamen={examenEnEdicion.examen.nombre}
              valor={texto}
              onChange={onTextoChange}
            />

            {error && <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>}

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onCerrarFormulario}
                disabled={guardando}
                className="px-5 h-10 rounded-xl border border-gray-200 bg-white text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (texto.trim()) onGuardar();
                }}
                disabled={guardando || !texto.trim()}
                className="px-5 h-10 rounded-xl bg-[#0d7a71] text-sm font-medium text-white hover:bg-[#0b6a62] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {guardando ? 'Guardando...' : 'Guardar resultado'}
              </button>
            </div>
          </div>
        )}

        {/* IMPRIMIR (solo resultado listo) */}
        {listo && (
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full h-11 rounded-xl bg-[#0d7a71] text-white text-sm font-medium hover:bg-[#0b6a62] transition-colors inline-flex items-center justify-center gap-2"
          >
            <IconoImpresora />
            Imprimir / Generar PDF
          </button>
        )}
      </div>
    </div>
  );
}
