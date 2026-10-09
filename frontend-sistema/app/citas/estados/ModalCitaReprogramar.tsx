'use client';

import { useState } from 'react';

import {
  CITA_EJEMPLO,
  type CitaModal,
  CalendarIcon,
  ModalShell,
  btnPrimary,
  btnSecondary,
  formatFecha,
  formatHora,
} from './ModalBase';

export interface DatosReprogramacion {
  fecha: string;
  hora: string;
}

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  onConfirmar?: (datos: DatosReprogramacion) => void | Promise<void>;
}

export default function ModalCitaReprogramar({
  cita = CITA_EJEMPLO,
  onClose,
  onConfirmar,
}: Props) {
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');

  const puedeConfirmar =
    nuevaFecha.trim() !== '' &&
    nuevaHora.trim() !== '' &&
    !guardando;

  const confirmarReprogramacion = async () => {
    if (!puedeConfirmar || !onConfirmar) {
      return;
    }

    setErrorGuardar('');
    setGuardando(true);
    try {
      await onConfirmar({ fecha: nuevaFecha, hora: nuevaHora });
    } catch (err) {
      setErrorGuardar(err instanceof Error ? err.message : 'No se pudo reprogramar la cita.');
      setGuardando(false);
    }
  };

  return (
    <ModalShell
      titulo="Reprogramar cita"
      subtitulo="Seleccione la nueva fecha y hora para la atención"
      tono="blue"
      icono={<CalendarIcon />}
      onClose={onClose}
      footer={
        <>
          {errorGuardar && <p className="mr-auto text-xs font-semibold text-red-600">{errorGuardar}</p>}
          <button
            type="button"
            onClick={onClose}
            disabled={guardando}
            className={btnSecondary}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={confirmarReprogramacion}
            disabled={!puedeConfirmar}
            className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {guardando ? 'Guardando...' : 'Confirmar reprogramación'}
          </button>
        </>
      }
    >
      <div className="space-y-6">

        {/* =====================================================
            CITA ACTUAL
        ===================================================== */}

        <section>
          <div className="mb-3 flex items-center gap-2">
            <CalendarIcon size={17} />

            <h4 className="text-sm font-bold text-gray-900">
              Cita actual
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
              <p className="text-[11px] font-semibold text-gray-400">
                Fecha
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-700">
                {formatFecha(cita.fecha)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
              <p className="text-[11px] font-semibold text-gray-400">
                Hora
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-700">
                {formatHora(cita.hora)}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            SEPARADOR
        ===================================================== */}

        <div className="h-px w-full bg-gray-200" />

        {/* =====================================================
            NUEVA PROGRAMACIÓN
        ===================================================== */}

        <section>
          <div className="mb-4">
            <h4 className="text-sm font-bold text-gray-900">
              Nueva programación
            </h4>

            <p className="mt-1 text-xs text-gray-400">
              Seleccione la fecha y hora para la nueva atención.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* NUEVA FECHA */}

            <div>
              <label
                htmlFor="nueva-fecha"
                className="mb-1.5 block text-xs font-semibold text-gray-700"
              >
                Nueva fecha
              </label>

              <input
                id="nueva-fecha"
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/10"
              />

              <p className="mt-1.5 text-[10px] text-gray-400">
                Seleccione el día de la atención.
              </p>
            </div>

            {/* NUEVA HORA */}

            <div>
              <label
                htmlFor="nueva-hora"
                className="mb-1.5 block text-xs font-semibold text-gray-700"
              >
                Nueva hora
              </label>

              <input
                id="nueva-hora"
                type="time"
                value={nuevaHora}
                onChange={(e) => setNuevaHora(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/10"
              />

              <p className="mt-1.5 text-[10px] text-gray-400">
                Seleccione el horario de la atención.
              </p>
            </div>

          </div>
        </section>

        {/* =====================================================
            CONFIRMACIÓN
        ===================================================== */}

        {puedeConfirmar && (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
            <p className="text-xs font-semibold text-emerald-700">
              Nueva programación
            </p>

            <div className="mt-2 flex flex-wrap gap-x-8 gap-y-2">
              <div>
                <p className="text-[10px] text-emerald-600">
                  Fecha
                </p>

                <p className="text-sm font-bold text-emerald-800">
                  {nuevaFecha}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-emerald-600">
                  Hora
                </p>

                <p className="text-sm font-bold text-emerald-800">
                  {nuevaHora}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </ModalShell>
  );
}