'use client';

import type { ReactElement, ReactNode } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ConteoDashboard, DashboardDatos } from '../../lib/api';

// Un color fijo por concepto en todo el dashboard: así "citas" es siempre verde,
// "órdenes" siempre ámbar y "exámenes" siempre índigo, en cualquier gráfico.
export const COLOR_CITAS = '#0d7a71';
export const COLOR_ORDENES = '#d97706';
export const COLOR_EXAMENES = '#6366f1';

// Los estados vienen del backend con un nombre de color (columna estados.color).
const COLOR_ESTADO: Record<string, string> = {
  amber: '#f59e0b',
  violet: '#8b5cf6',
  blue: '#3b82f6',
  red: '#ef4444',
  gray: '#9ca3af',
  emerald: '#10b981',
  rose: '#f43f5e',
};
const COLOR_ESTADO_POR_DEFECTO = '#9ca3af';

const EJE = { fontSize: 11, fill: '#6b7280' };
const REJILLA = '#f3f4f6';
const TOOLTIP_ESTILO = {
  borderRadius: 12,
  border: '1px solid #e5e7eb',
  fontSize: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
};

const recortar = (texto: string, max = 26) =>
  texto.length > max ? `${texto.slice(0, max - 1)}…` : texto;

/** "2026-11-17" → "17/11" (sin pasar por Date, para no depender de la zona horaria). */
const fechaCorta = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;

/**
 * ResponsiveContainer mide su contenedor con un ResizeObserver, así que en el
 * primer render todavía no tiene tamaño (width/height = -1) y Recharts avisa
 * "The width(-1) and height(-1) of chart should be greater than 0". Con un
 * tamaño inicial y minWidth 0 ese primer dibujo ya tiene medidas válidas y
 * enseguida se ajusta al tamaño real.
 */
function Responsivo({ height, children }: { height: number | `${number}%`; children: ReactElement }) {
  return (
    <ResponsiveContainer
      width="100%"
      height={height}
      minWidth={0}
      initialDimension={{ width: 320, height: typeof height === 'number' ? height : 176 }}
    >
      {children}
    </ResponsiveContainer>
  );
}

// ─── Contenedor de cada gráfico ─────────────────────────────────────────────

export function Tarjeta({
  titulo,
  subtitulo,
  vacio,
  className = '',
  children,
}: {
  titulo: string;
  subtitulo?: string;
  /** true = no hay datos en el período: se muestra un aviso en lugar del gráfico. */
  vacio?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 ${className}`}>
      <h2 className="text-sm font-bold text-gray-900">{titulo}</h2>
      {subtitulo && <p className="text-[11px] text-gray-400 font-medium mt-0.5">{subtitulo}</p>}
      <div className="mt-4">
        {vacio ? (
          <div className="h-40 flex items-center justify-center rounded-xl bg-gray-50 text-xs font-medium text-gray-400">
            Sin datos en este período
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

// ─── Actividad por día ──────────────────────────────────────────────────────

export function ActividadPorDia({ datos }: { datos: DashboardDatos['porDia'] }) {
  return (
    <Responsivo height={280}>
      <LineChart data={datos} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
        <CartesianGrid stroke={REJILLA} vertical={false} />
        <XAxis
          dataKey="fecha"
          tickFormatter={fechaCorta}
          tick={EJE}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          minTickGap={24}
        />
        <YAxis tick={EJE} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip contentStyle={TOOLTIP_ESTILO} labelFormatter={(f) => fechaCorta(String(f))} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="citas" name="Citas" stroke={COLOR_CITAS} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="ordenes" name="Órdenes de laboratorio" stroke={COLOR_ORDENES} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </Responsivo>
  );
}

// ─── Registros por usuario ──────────────────────────────────────────────────

export function RegistrosPorUsuario({ datos }: { datos: DashboardDatos['porUsuario'] }) {
  return (
    <Responsivo height={300}>
      <BarChart data={datos} margin={{ top: 8, right: 12, left: -12, bottom: 0 }} barGap={4}>
        <CartesianGrid stroke={REJILLA} vertical={false} />
        <XAxis
          dataKey="nombre"
          tickFormatter={(n: string) => recortar(n, 18)}
          tick={EJE}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          interval={0}
        />
        <YAxis tick={EJE} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip contentStyle={TOOLTIP_ESTILO} cursor={{ fill: '#f9fafb' }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="citas" name="Citas" fill={COLOR_CITAS} radius={[6, 6, 0, 0]} maxBarSize={36} />
        <Bar dataKey="ordenes" name="Órdenes" fill={COLOR_ORDENES} radius={[6, 6, 0, 0]} maxBarSize={36} />
        <Bar dataKey="examenes" name="Exámenes" fill={COLOR_EXAMENES} radius={[6, 6, 0, 0]} maxBarSize={36} />
      </BarChart>
    </Responsivo>
  );
}

// ─── Dona por estado ────────────────────────────────────────────────────────

export function DonaEstados({ datos }: { datos: ConteoDashboard[] }) {
  const total = datos.reduce((suma, d) => suma + d.total, 0);
  const colorDe = (d: ConteoDashboard) =>
    (d.color && COLOR_ESTADO[d.color]) || COLOR_ESTADO_POR_DEFECTO;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative w-44 h-44 shrink-0">
        <Responsivo height="100%">
          <PieChart>
            <Pie
              data={datos}
              dataKey="total"
              nameKey="nombre"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={datos.length > 1 ? 2 : 0}
              stroke="none"
            >
              {datos.map((d) => (
                <Cell key={d.nombre} fill={colorDe(d)} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_ESTILO} />
          </PieChart>
        </Responsivo>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-gray-900 leading-none">{total}</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">total</span>
        </div>
      </div>

      <ul className="flex-1 w-full space-y-2">
        {datos.map((d) => (
          <li key={d.nombre} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: colorDe(d) }} />
            <span className="flex-1 text-gray-600 font-medium truncate">{d.nombre}</span>
            <span className="font-bold text-gray-900">{d.total}</span>
            <span className="w-10 text-right text-gray-400 font-medium">
              {total ? `${Math.round((d.total / total) * 100)}%` : '0%'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Barras de un solo concepto ─────────────────────────────────────────────

/** Ranking horizontal (nombre a la izquierda): para listas con nombres largos, como los exámenes. */
export function BarrasHorizontales({
  datos,
  color,
  etiqueta,
}: {
  datos: ConteoDashboard[];
  color: string;
  etiqueta: string;
}) {
  return (
    <Responsivo height={Math.max(160, datos.length * 34 + 20)}>
      <BarChart data={datos} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={REJILLA} horizontal={false} />
        <XAxis type="number" tick={EJE} tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="nombre"
          width={150}
          tickFormatter={(n: string) => recortar(n)}
          tick={EJE}
          tickLine={false}
          axisLine={false}
          interval={0}
        />
        <Tooltip contentStyle={TOOLTIP_ESTILO} cursor={{ fill: '#f9fafb' }} />
        <Bar dataKey="total" name={etiqueta} fill={color} radius={[0, 6, 6, 0]} maxBarSize={20} />
      </BarChart>
    </Responsivo>
  );
}

/** Barras verticales: para pocas categorías cortas, como las horas del día. */
export function BarrasVerticales({
  datos,
  color,
  etiqueta,
}: {
  datos: ConteoDashboard[];
  color: string;
  etiqueta: string;
}) {
  return (
    <Responsivo height={240}>
      <BarChart data={datos} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
        <CartesianGrid stroke={REJILLA} vertical={false} />
        <XAxis dataKey="nombre" tick={EJE} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
        <YAxis tick={EJE} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip contentStyle={TOOLTIP_ESTILO} cursor={{ fill: '#f9fafb' }} />
        <Bar dataKey="total" name={etiqueta} fill={color} radius={[6, 6, 0, 0]} maxBarSize={36} />
      </BarChart>
    </Responsivo>
  );
}
