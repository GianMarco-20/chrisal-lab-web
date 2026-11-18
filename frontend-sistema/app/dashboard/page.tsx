'use client';

import { useEffect, useState } from 'react';
import { useRequireSesion } from '../../lib/useSesion';
import Sidebar, { useSidebar } from '../../components/Sidebar';
import { obtenerDashboard, type DashboardDatos } from '../../lib/api';
import {
  ActividadPorDia,
  BarrasHorizontales,
  BarrasVerticales,
  COLOR_CITAS,
  COLOR_EXAMENES,
  COLOR_ORDENES,
  DonaEstados,
  RegistrosPorUsuario,
  Tarjeta,
} from './Graficos';

const MS_DIA = 24 * 60 * 60 * 1000;

/** Fecha de hoy en Lima como AAAA-MM-DD (el servidor también cuenta los días en hora de Lima). */
function hoyLima(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });
}

/** Resta días a una fecha AAAA-MM-DD sin depender de la zona horaria del navegador. */
function restarDias(fecha: string, dias: number): string {
  const [a, m, d] = fecha.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d) - dias * MS_DIA).toISOString().slice(0, 10);
}

const ATAJOS = [
  { etiqueta: '7 días', desde: (hoy: string) => restarDias(hoy, 6) },
  { etiqueta: '30 días', desde: (hoy: string) => restarDias(hoy, 29) },
  { etiqueta: 'Este mes', desde: (hoy: string) => `${hoy.slice(0, 8)}01` },
  { etiqueta: '90 días', desde: (hoy: string) => restarDias(hoy, 89) },
];

function Indicador({
  etiqueta,
  valor,
  detalle,
  color,
}: {
  etiqueta: string;
  valor: number;
  detalle?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-3">
      <span className="w-1 rounded-full shrink-0" style={{ background: color }} />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{etiqueta}</p>
        <p className="text-2xl font-extrabold text-gray-900 mt-1 leading-none">{valor.toLocaleString('es-PE')}</p>
        {detalle && <p className="text-[11px] text-gray-400 font-medium mt-1.5">{detalle}</p>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { usuario, cargando } = useRequireSesion('/dashboard');
  const { openSidebar } = useSidebar();

  // Se inicializa en un efecto (no en el render) para que servidor y navegador
  // no calculen "hoy" por separado.
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  // La respuesta se guarda junto con el rango que la originó: así "cargando" se
  // deriva (hay rango y aún no llegó su respuesta) y se sigue mostrando la
  // respuesta anterior, atenuada, mientras llega la nueva.
  const [respuesta, setRespuesta] = useState<{ rango: string; datos: DashboardDatos | null; error: string } | null>(null);
  const rangoActual = `${desde}|${hasta}`;
  // Se deriva en el render (no en un efecto): el rango es inválido si "desde" pasa a "hasta".
  const rangoInvalido = !!desde && !!hasta && desde > hasta;
  const datos = respuesta?.datos ?? null;
  const cargandoDatos = !!desde && !!hasta && !rangoInvalido && respuesta?.rango !== rangoActual;
  const errorCarga = respuesta?.rango === rangoActual ? respuesta.error : '';
  const error = rangoInvalido ? 'La fecha "desde" no puede ser posterior a "hasta".' : errorCarga;

  useEffect(() => {
    const hoy = hoyLima();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valor inicial que depende del reloj del navegador
    setHasta(hoy);
    setDesde(restarDias(hoy, 29));
  }, []);

  useEffect(() => {
    if (!usuario || !desde || !hasta || rangoInvalido) return;

    // Evita que una respuesta lenta pise a otra más nueva si se cambia el rango rápido.
    let vigente = true;
    const rango = `${desde}|${hasta}`;
    obtenerDashboard(desde, hasta)
      .then((datos) => {
        if (vigente) setRespuesta({ rango, datos, error: '' });
      })
      .catch((e: unknown) => {
        if (vigente) {
          const mensaje = e instanceof Error ? e.message : 'No se pudo cargar el dashboard.';
          setRespuesta((anterior) => ({ rango, datos: anterior?.datos ?? null, error: mensaje }));
        }
      });
    return () => {
      vigente = false;
    };
  }, [usuario, desde, hasta, rangoInvalido]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xs font-medium text-gray-400">Cargando...</p>
      </div>
    );
  }

  const r = datos?.resumen;
  const hoy = hoyLima();
  const porcentajeAtendidas = r && r.citas > 0 ? Math.round((r.citasAtendidas / r.citas) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col">
        {/* TOPBAR */}
        <header className="h-16 min-h-16 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 sticky top-0 z-30">
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
              <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">Dashboard</h1>
              <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">
                Resumen de citas y laboratorio
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-5 lg:p-6 space-y-4 overflow-x-hidden">
          {/* FILTRO DE FECHAS */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap items-end gap-x-6 gap-y-3">
            <div className="flex flex-wrap gap-2">
              {ATAJOS.map((a) => {
                const activo = hasta === hoy && desde === a.desde(hoy);
                return (
                  <button
                    key={a.etiqueta}
                    type="button"
                    onClick={() => {
                      setDesde(a.desde(hoy));
                      setHasta(hoy);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      activo
                        ? 'bg-[#0d7a71] text-white border-[#0d7a71]'
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {a.etiqueta}
                  </button>
                );
              })}
            </div>
            <div className="flex items-end gap-3">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Desde
                <input
                  type="date"
                  value={desde}
                  max={hasta || undefined}
                  onChange={(e) => e.target.value && setDesde(e.target.value)}
                  className="mt-1 block rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 normal-case tracking-normal"
                />
              </label>
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Hasta
                <input
                  type="date"
                  value={hasta}
                  min={desde || undefined}
                  onChange={(e) => e.target.value && setHasta(e.target.value)}
                  className="mt-1 block rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 normal-case tracking-normal"
                />
              </label>
            </div>
            {cargandoDatos && !error && <span className="text-xs font-medium text-gray-400 pb-2">Actualizando...</span>}
          </div>

          {error && (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          {datos && r && (
            <div className={`space-y-4 transition-opacity ${cargandoDatos ? 'opacity-60' : ''}`}>
              {/* INDICADORES */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                <Indicador etiqueta="Citas" valor={r.citas} color={COLOR_CITAS} detalle={`${porcentajeAtendidas}% atendidas`} />
                <Indicador etiqueta="Órdenes lab." valor={r.ordenes} color={COLOR_ORDENES} />
                <Indicador etiqueta="Exámenes" valor={r.examenes} color={COLOR_EXAMENES} />
                <Indicador etiqueta="Pacientes" valor={r.pacientes} color="#0ea5e9" detalle="distintos atendidos" />
                <Indicador etiqueta="Citas canceladas" valor={r.citasCanceladas} color="#9ca3af" />
                <Indicador etiqueta="Órdenes anuladas" valor={r.ordenesAnuladas} color="#f43f5e" />
              </div>

              <Tarjeta
                titulo="Actividad por día"
                subtitulo="Citas según su fecha de cita; órdenes según su fecha de toma de muestra"
                vacio={datos.porDia.every((d) => d.citas === 0 && d.ordenes === 0)}
              >
                <ActividadPorDia datos={datos.porDia} />
              </Tarjeta>

              <Tarjeta
                titulo="Registros por usuario"
                subtitulo="Citas, órdenes y exámenes que registró cada persona en el período"
                vacio={datos.porUsuario.length === 0}
              >
                <RegistrosPorUsuario datos={datos.porUsuario} />
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                        <th className="py-2 pr-4">Usuario</th>
                        <th className="py-2 pr-4">Rol</th>
                        <th className="py-2 pr-4 text-right">Citas</th>
                        <th className="py-2 pr-4 text-right">Órdenes</th>
                        <th className="py-2 pr-4 text-right">Exámenes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datos.porUsuario.map((u) => (
                        <tr key={u.usuarioId} className="border-b border-gray-50 last:border-0">
                          <td className="py-2 pr-4 font-semibold text-gray-700">{u.nombre}</td>
                          <td className="py-2 pr-4 text-gray-500 capitalize">{u.rol}</td>
                          <td className="py-2 pr-4 text-right font-bold text-gray-900">{u.citas}</td>
                          <td className="py-2 pr-4 text-right font-bold text-gray-900">{u.ordenes}</td>
                          <td className="py-2 pr-4 text-right font-bold text-gray-900">{u.examenes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {datos.citasSinRegistrar > 0 && (
                  <p className="mt-3 text-[11px] text-gray-400 font-medium">
                    {datos.citasSinRegistrar} cita{datos.citasSinRegistrar === 1 ? '' : 's'} del período no se muestran
                    aquí porque se crearon antes de que el sistema guardara quién las registraba.
                  </p>
                )}
              </Tarjeta>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Tarjeta titulo="Estado de las citas" vacio={datos.citasPorEstado.length === 0}>
                  <DonaEstados datos={datos.citasPorEstado} />
                </Tarjeta>
                <Tarjeta titulo="Estado de las órdenes de laboratorio" vacio={datos.ordenesPorEstado.length === 0}>
                  <DonaEstados datos={datos.ordenesPorEstado} />
                </Tarjeta>

                <Tarjeta titulo="Citas por especialidad" vacio={datos.citasPorEspecialidad.length === 0}>
                  <BarrasHorizontales datos={datos.citasPorEspecialidad} color={COLOR_CITAS} etiqueta="Citas" />
                </Tarjeta>
                <Tarjeta titulo="Citas por hora" subtitulo="Horarios con más demanda" vacio={datos.citasPorHora.length === 0}>
                  <BarrasVerticales datos={datos.citasPorHora} color={COLOR_CITAS} etiqueta="Citas" />
                </Tarjeta>

                <Tarjeta titulo="Exámenes más solicitados" subtitulo="Top 10" vacio={datos.examenesTop.length === 0}>
                  <BarrasHorizontales datos={datos.examenesTop} color={COLOR_EXAMENES} etiqueta="Veces solicitado" />
                </Tarjeta>
                <Tarjeta titulo="Exámenes por categoría" vacio={datos.examenesPorCategoria.length === 0}>
                  <BarrasHorizontales datos={datos.examenesPorCategoria} color={COLOR_ORDENES} etiqueta="Exámenes" />
                </Tarjeta>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
