'use client';

import { useEffect, useState } from 'react';

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

// Un horario ya programado (programacion_medica) disponible para la
// especialidad de la cita en la nueva fecha elegida.
export interface HorarioReprogramacion {
  id: number;
  horaInicio: string; // "HH:mm" — se envía como `hora` al confirmar
  etiqueta: string; // texto para la opción del select
}

export interface DatosReprogramacion {
  fecha: string;
  hora: string;
  programacionId: number;
}

interface Props {
  cita?: CitaModal;
  onClose: () => void;
  // Busca los horarios programados para esa fecha y la especialidad de la
  // cita. Si no hay ninguno, el selector se queda vacío y se bloquea el
  // "Confirmar" con una alerta.
  onBuscarHorarios?: (fecha: string) => Promise<HorarioReprogramacion[]>;
  onConfirmar?: (datos: DatosReprogramacion) => void | Promise<void>;
}

export default function ModalCitaReprogramar({
  cita = CITA_EJEMPLO,
  onClose,
  onBuscarHorarios,
  onConfirmar,
}: Props) {
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [programacionId, setProgramacionId] = useState('');
  const [horarios, setHorarios] = useState<HorarioReprogramacion[]>([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [errorHorarios, setErrorHorarios] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState('');

  // Cada vez que cambia la fecha, se vuelve a buscar qué médicos de esta
  // especialidad están programados ese día.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- limpia la selección anterior al cambiar de fecha, no deriva de render
    setProgramacionId('');
    if (!nuevaFecha || !onBuscarHorarios) {
      setHorarios([]);
      return;
    }

    let cancelado = false;
    setErrorHorarios('');
    setCargandoHorarios(true);
    onBuscarHorarios(nuevaFecha)
      .then((lista) => {
        if (!cancelado) setHorarios(lista);
      })
      .catch((err) => {
        if (!cancelado) {
          setHorarios([]);
          setErrorHorarios(
            err instanceof Error ? err.message : 'No se pudo buscar la programación médica.',
          );
        }
      })
      .finally(() => {
        if (!cancelado) setCargandoHorarios(false);
      });

    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onBuscarHorarios es estable (viene de props del padre)
  }, [nuevaFecha]);

  const sinMedicosProgramados =
    nuevaFecha !== '' && !cargandoHorarios && !errorHorarios && horarios.length === 0;

  const puedeConfirmar =
    nuevaFecha.trim() !== '' && programacionId !== '' && !guardando;

  const confirmarReprogramacion = async () => {
    if (!puedeConfirmar || !onConfirmar) {
      return;
    }
    const horario = horarios.find((h) => String(h.id) === programacionId);
    if (!horario) return;

    setErrorGuardar('');
    setGuardando(true);
    try {
      await onConfirmar({
        fecha: nuevaFecha,
        hora: horario.horaInicio,
        programacionId: horario.id,
      });
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

            {/* HORARIO / MÉDICO PROGRAMADO */}

            <div>
              <label
                htmlFor="nuevo-horario"
                className="mb-1.5 block text-xs font-semibold text-gray-700"
              >
                Horario médico
              </label>

              <select
                id="nuevo-horario"
                value={programacionId}
                onChange={(e) => setProgramacionId(e.target.value)}
                disabled={!nuevaFecha || cargandoHorarios || horarios.length === 0}
                className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/10 disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">
                  {!nuevaFecha
                    ? 'Elija primero la fecha'
                    : cargandoHorarios
                      ? 'Buscando médicos programados...'
                      : horarios.length === 0
                        ? 'Sin médicos programados'
                        : 'Seleccione un horario'}
                </option>
                {horarios.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.etiqueta}
                  </option>
                ))}
              </select>

              <p className="mt-1.5 text-[10px] text-gray-400">
                Solo se muestran los médicos ya programados ({cita.especialidad}) ese día.
              </p>
            </div>

          </div>
        </section>

        {/* =====================================================
            ALERTA: SIN MÉDICOS PROGRAMADOS
        ===================================================== */}

        {errorHorarios && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
            {errorHorarios}
          </div>
        )}

        {sinMedicosProgramados && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
            <p className="text-xs font-bold text-red-700">
              No hay médicos programados
            </p>
            <p className="mt-1 text-xs text-red-600">
              Nadie de {cita.especialidad} está programado el {nuevaFecha}. Elija otra fecha o
              programe primero un médico ese día en Programación Médica.
            </p>
          </div>
        )}

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
                  Horario
                </p>

                <p className="text-sm font-bold text-emerald-800">
                  {horarios.find((h) => String(h.id) === programacionId)?.etiqueta}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </ModalShell>
  );
}