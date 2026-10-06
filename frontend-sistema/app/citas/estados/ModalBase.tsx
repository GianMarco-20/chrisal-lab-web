'use client';

import { useEffect, type ChangeEvent, type ReactNode } from 'react';

/* =========================================================
   MODAL BASE (compartido por todos los modales de estados)

   Contiene:
   - Tipos
   - Formateadores
   - Íconos
   - Estructura del modal
   - Piezas de UI
   - TarjetaPaciente
   - TarjetaTriaje
   - Formulario de triaje

   Ubicación sugerida:
   app/citas/estados/ModalBase.tsx
========================================================= */

/* =========================================================
   TIPOS
========================================================= */

export interface CitaModal {
  id: string;
  hc: string;
  dni: string;
  paciente: string;
  celular: string;
  sexo: 'Masculino' | 'Femenino';
  especialidad: string;
  medico: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:mm
}

export interface TriajeModal {
  presionArterial: string;
  frecuenciaCardiaca: string;
  frecuenciaRespiratoria: string;
  temperatura: string;
  saturacion: string;
  peso: string;
  talla: string;
  motivoConsulta: string;
}

export interface DiagnosticoModal {
  sintomas: string;
  diagnostico: string;
  indicaciones: string;
  requiereLaboratorio: boolean;
  examenesLaboratorio: string;
}

/* =========================================================
   VALORES INICIALES
========================================================= */

export const TRIAJE_VACIO: TriajeModal = {
  presionArterial: '',
  frecuenciaCardiaca: '',
  frecuenciaRespiratoria: '',
  temperatura: '',
  saturacion: '',
  peso: '',
  talla: '',
  motivoConsulta: '',
};

export const CITA_EJEMPLO: CitaModal = {
  id: 'CIT-001',
  hc: 'HC-000002',
  dni: '71977410',
  paciente: 'JHOSSEP DILSON FERNANDEZ ASTO',
  celular: '987 654 321',
  sexo: 'Masculino',
  especialidad: 'Medicina General',
  medico: 'Por asignar',
  fecha: '2026-10-01',
  hora: '07:30',
};

/* =========================================================
   FORMATEADORES
========================================================= */

export function formatFecha(fecha: string) {
  const [y, m, d] = fecha.slice(0, 10).split('-');

  return `${d}/${m}/${y}`;
}

export function formatHora(hora: string) {
  const [h, min] = hora.split(':');
  const horas = Number(h);

  return `${horas % 12 || 12}:${min} ${
    horas >= 12 ? 'PM' : 'AM'
  }`;
}

/* =========================================================
   CLASES REUTILIZABLES
========================================================= */

export const inputClass =
  'h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15';

export const textareaClass =
  'w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15';

export const labelClass =
  'mb-1.5 block text-xs font-semibold text-gray-700';

const btnBase =
  'inline-flex h-10 items-center justify-center rounded-xl px-5 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40';

export const btnPrimary =
  `${btnBase} bg-[#0d7a71] text-white shadow-sm shadow-[#0d7a71]/25 hover:bg-[#0a625b]`;

export const btnSecondary =
  `${btnBase} border border-gray-200 bg-white text-gray-600 hover:bg-gray-50`;

export const btnDanger =
  `${btnBase} bg-red-50 text-red-600 hover:bg-red-100`;

/* =========================================================
   ÍCONOS
========================================================= */

type IconProps = {
  size?: number;
};

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const CalendarIcon = ({
  size = 16,
}: IconProps) => (
  <svg {...svgProps(size)}>
    <rect
      x="3"
      y="4"
      width="18"
      height="17"
      rx="2"
    />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export const PulseIcon = ({
  size = 16,
}: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="M3 12h4l2-7 4 14 2-7h6" />
  </svg>
);

export const DocIcon = ({
  size = 16,
}: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

export const UserIcon = ({
  size = 16,
}: IconProps) => (
  <svg {...svgProps(size)}>
    <circle
      cx="12"
      cy="8"
      r="4"
    />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </svg>
);

export const AlertIcon = ({
  size = 16,
}: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20.5h15.6a2 2 0 0 0 1.7-3.1L13.7 3.9a2 2 0 0 0-3.4 0z" />
  </svg>
);

export const CloseIcon = ({
  size = 20,
}: IconProps) => (
  <svg {...svgProps(size)}>
    <path d="M6 18 18 6M6 6l12 12" />
  </svg>
);

/* =========================================================
   INSIGNIA DE ESTADO
========================================================= */

const tonos = {
  amber: {
    badge: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
    icon: 'bg-amber-50 text-amber-600',
  },

  red: {
    badge: 'bg-red-50 text-red-600',
    dot: 'bg-red-500',
    icon: 'bg-red-50 text-red-600',
  },

  violet: {
    badge: 'bg-violet-50 text-violet-700',
    dot: 'bg-violet-500',
    icon: 'bg-violet-50 text-violet-600',
  },

  blue: {
    badge: 'bg-blue-50 text-blue-700',
    dot: 'bg-blue-500',
    icon: 'bg-blue-50 text-blue-600',
  },
};

export type Tono = keyof typeof tonos;

export function EstadoBadge({
  tono,
  children,
}: {
  tono: Tono;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-500">
        Estado de la cita
      </span>

      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${tonos[tono].badge}`}
      >
        <span
          className={`h-2 w-2 rounded-full ${tonos[tono].dot}`}
        />

        {children}
      </span>
    </div>
  );
}

/* =========================================================
   ESTRUCTURA DEL MODAL
========================================================= */

export function ModalShell({
  titulo,
  subtitulo,
  tono,
  icono,
  onClose,
  footer,
  children,
}: {
  titulo: string;
  subtitulo: string;
  tono: Tono;
  icono?: ReactNode;
  onClose: () => void;
  footer: ReactNode;
  children: ReactNode;
}) {
  /* Cerrar con ESC */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener(
      'keydown',
      onKey
    );

    return () =>
      document.removeEventListener(
        'keydown',
        onKey
      );
  }, [onClose]);

  /* Bloquear scroll del body */
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
        {/* CABECERA */}

        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex min-w-0 items-center gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tonos[tono].icon}`}
            >
              {icono ?? (
                <CalendarIcon size={22} />
              )}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold leading-tight text-gray-900">
                {titulo}
              </h3>

              <p className="mt-0.5 text-[13px] text-gray-500">
                {subtitulo}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <CloseIcon />
          </button>
        </header>

        {/* CUERPO */}

        <div className="flex-1 space-y-5 overflow-y-auto bg-gray-50/60 px-5 py-5 sm:px-7 sm:py-6">
          {children}
        </div>

        {/* BOTONERA */}

        <footer className="flex shrink-0 flex-wrap items-center justify-end gap-2.5 border-t border-gray-100 bg-white px-5 py-4 sm:px-7">
          {footer}
        </footer>
      </div>
    </div>
  );
}

/* =========================================================
   PIEZAS DE UI
========================================================= */

export function Campo({
  label,
  children,
  className = '',
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold text-gray-400">
        {label}
      </p>

      <div className="mt-0.5 text-sm font-semibold text-gray-800">
        {children}
      </div>
    </div>
  );
}

export function Tarjeta({
  titulo,
  icono,
  derecha,
  children,
}: {
  titulo: string;
  icono: ReactNode;
  derecha?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d7a71]/10 text-[#0d7a71]">
            {icono}
          </div>

          <h4 className="text-sm font-bold text-gray-900">
            {titulo}
          </h4>
        </div>

        {derecha}
      </div>

      {children}
    </section>
  );
}

export function Signo({
  label,
  valor,
  unidad,
}: {
  label: string;
  valor: string;
  unidad: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
      <p className="text-[11px] font-semibold text-gray-400">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-semibold text-gray-800">
        {valor || '---'}{' '}

        {valor && (
          <span className="text-xs font-medium text-gray-400">
            {unidad}
          </span>
        )}
      </p>
    </div>
  );
}

/* =========================================================
   TARJETA "PACIENTE"

   modo:
   - "normal":
       Mantiene el comportamiento tradicional.

   - "soloPaciente":
       Muestra solamente información propia del paciente.
       No repite datos de la tarjeta "Información de la cita".

   completo:
   - Se mantiene para compatibilidad con los modales
     que ya lo utilizan, especialmente Atendida.
========================================================= */

export type ModoTarjetaPaciente =
  | 'normal'
  | 'soloPaciente';

export function TarjetaPaciente({
  cita,
  completo = false,
  modo = 'normal',
}: {
  cita: CitaModal;
  completo?: boolean;
  modo?: ModoTarjetaPaciente;
}) {
  const soloPaciente =
    modo === 'soloPaciente';

  return (
    <Tarjeta
      titulo="Paciente"
      icono={<UserIcon />}
      derecha={
        <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-600">
          HC: {cita.hc}
        </span>
      }
    >
      <div className="space-y-4">
        {/* DATOS PROPIOS DEL PACIENTE */}

        <Campo label="Nombres y apellidos">
          {cita.paciente}
        </Campo>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
          <Campo label="DNI">
            {cita.dni}
          </Campo>

          <Campo label="Celular">
            {cita.celular}
          </Campo>

          <Campo label="Sexo">
            {cita.sexo}
          </Campo>

          {/* -------------------------------------------------
             SERVICIO
             Solo se muestra cuando NO estamos en modo
             "soloPaciente".
          ------------------------------------------------- */}

          {!soloPaciente && (
            <Campo label="Servicio">
              {cita.especialidad}
            </Campo>
          )}

          {/* -------------------------------------------------
             DATOS COMPLETOS DE LA CITA

             Se conservan para componentes como
             ModalCitaAtendida.tsx que utilizan:

             <TarjetaPaciente cita={cita} completo />
          ------------------------------------------------- */}

          {!soloPaciente && completo && (
            <>
              <Campo label="N° de cita">
                {cita.id}
              </Campo>

              <Campo label="Médico">
                {cita.medico}
              </Campo>

              <Campo label="Fecha">
                {formatFecha(cita.fecha)}
              </Campo>

              <Campo label="Hora">
                {formatHora(cita.hora)}
              </Campo>
            </>
          )}

          {/* -------------------------------------------------
             MODO NORMAL

             Si no es "soloPaciente" y no se utiliza
             "completo", mantenemos Fecha y Hora para
             no alterar el comportamiento anterior.
          ------------------------------------------------- */}

          {!soloPaciente && !completo && (
            <>
              <Campo label="Fecha">
                {formatFecha(cita.fecha)}
              </Campo>

              <Campo label="Hora">
                {formatHora(cita.hora)}
              </Campo>
            </>
          )}
        </div>
      </div>
    </Tarjeta>
  );
}

/* =========================================================
   TARJETA DE SOLO LECTURA CON EL TRIAJE REGISTRADO
========================================================= */

export function TarjetaTriaje({
  triaje,
  titulo = 'Triaje',
}: {
  triaje: TriajeModal;
  titulo?: string;
}) {
  return (
    <Tarjeta
      titulo={titulo}
      icono={<PulseIcon />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2.5">
          <Signo
            label="P. arterial"
            valor={triaje.presionArterial}
            unidad="mmHg"
          />

          <Signo
            label="F. cardiaca"
            valor={triaje.frecuenciaCardiaca}
            unidad="lpm"
          />

          <Signo
            label="F. respiratoria"
            valor={triaje.frecuenciaRespiratoria}
            unidad="rpm"
          />

          <Signo
            label="Temperatura"
            valor={triaje.temperatura}
            unidad="°C"
          />

          <Signo
            label="SpO₂"
            valor={triaje.saturacion}
            unidad="%"
          />

          <Signo
            label="Peso / Talla"
            valor={
              triaje.peso || triaje.talla
                ? `${triaje.peso}/${triaje.talla}`
                : ''
            }
            unidad="kg/cm"
          />
        </div>

        <Campo label="Motivo de consulta">
          <span className="font-medium text-gray-700">
            {triaje.motivoConsulta || '---'}
          </span>
        </Campo>
      </div>
    </Tarjeta>
  );
}

/* =========================================================
   FORMULARIO DE TRIAJE
========================================================= */

type OnChange = (
  e: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => void;

export function TriajeFormulario({
  cita,
  form,
  onChange,
}: {
  cita: CitaModal;
  form: TriajeModal;
  onChange: OnChange;
}) {
  const peso = parseFloat(form.peso);

  const tallaM =
    parseFloat(form.talla) / 100;

  const imc =
    peso > 0 && tallaM > 0
      ? (
          peso /
          (tallaM * tallaM)
        ).toFixed(1)
      : null;

  const campo = (
    name: keyof TriajeModal,
    label: string,
    placeholder: string,
    extra: {
      type?: string;
      step?: string;
      required?: boolean;
      inputMode?: 'numeric' | 'decimal';
    } = {}
  ) => (
    <div>
      <label
        htmlFor={name}
        className={labelClass}
      >
        {label}

        {extra.required && ' *'}
      </label>

      <input
        id={name}
        name={name}
        value={form[name]}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
        {...extra}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="space-y-5">
        <TarjetaPaciente
          cita={cita}
        />

        <Tarjeta
          titulo="Motivo de consulta"
          icono={<DocIcon />}
        >
          <label
            htmlFor="motivoConsulta"
            className="sr-only"
          >
            Motivo de consulta
          </label>

          <textarea
            id="motivoConsulta"
            name="motivoConsulta"
            required
            rows={4}
            value={form.motivoConsulta}
            onChange={onChange}
            placeholder="Describa por qué acude el paciente"
            className={textareaClass}
          />
        </Tarjeta>
      </div>

      <Tarjeta
        titulo="Signos vitales"
        icono={<PulseIcon />}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
          {campo(
            'presionArterial',
            'Presión arterial',
            '120/80 mmHg',
            {
              required: true,
            }
          )}

          {campo(
            'frecuenciaCardiaca',
            'Frec. cardiaca',
            '80 lpm',
            {
              type: 'number',
              inputMode: 'numeric',
              required: true,
            }
          )}

          {campo(
            'frecuenciaRespiratoria',
            'Frec. respiratoria',
            '18 rpm',
            {
              type: 'number',
              inputMode: 'numeric',
            }
          )}

          {campo(
            'temperatura',
            'Temperatura (°C)',
            '36.5',
            {
              type: 'number',
              step: '0.1',
              inputMode: 'decimal',
              required: true,
            }
          )}

          {campo(
            'saturacion',
            'Saturación O₂ (%)',
            '98',
            {
              type: 'number',
              inputMode: 'numeric',
            }
          )}

          {campo(
            'peso',
            'Peso (kg)',
            '70',
            {
              type: 'number',
              step: '0.1',
              inputMode: 'decimal',
            }
          )}

          {campo(
            'talla',
            'Talla (cm)',
            '170',
            {
              type: 'number',
              inputMode: 'numeric',
            }
          )}

          <div className="flex flex-col justify-end">
            <p className={labelClass}>
              IMC calculado
            </p>

            <div className="flex h-10 items-center rounded-xl border border-gray-100 bg-gray-50 px-3 text-sm font-bold text-gray-600">
              {imc ?? '---'}
            </div>
          </div>
        </div>
      </Tarjeta>
    </div>
  );
}