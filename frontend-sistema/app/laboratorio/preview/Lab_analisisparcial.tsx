'use client';

import type {
  OrdenPreview,
} from './page';

interface Props {
  orden: OrdenPreview;

  examenSeleccionado: number | null;

  resultadoTemporal: string;

  onAbrirFormulario: (examenId: number) => void;

  onCerrarFormulario: () => void;

  onResultadoChange: (valor: string) => void;

  onGuardarResultado: (
    examenId: number,
    resultado: string
  ) => void;
}

/* ---------- Iconos (SVG inline, sin dependencias) ---------- */

function IconoFlask({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3h6" />
      <path d="M10 3v6.2L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

function IconoUsuario({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </svg>
  );
}

function IconoCalendario({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}

function IconoCheck({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function IconoReloj({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* ---------- Piezas reutilizables ---------- */

function Campo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400">
        {label}
      </p>
      <div className="text-sm font-medium text-slate-800 mt-1 break-words">
        {children}
      </div>
    </div>
  );
}

function TituloTarjeta({
  icono,
  titulo,
  extra,
}: {
  icono: React.ReactNode;
  titulo: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-xl bg-[#0d7a71]/10 text-[#0d7a71] flex items-center justify-center shrink-0">
          {icono}
        </span>
        <h3 className="text-sm font-semibold text-slate-800">
          {titulo}
        </h3>
      </div>
      {extra}
    </div>
  );
}

export default function Lab_analisisparcial({
  orden,
  examenSeleccionado,
  resultadoTemporal,
  onAbrirFormulario,
  onCerrarFormulario,
  onResultadoChange,
  onGuardarResultado,
}: Props) {

  const conResultado = orden.examenes.filter(
    (examen) => examen.resultado?.trim()
  ).length;

  const examenActual = orden.examenes.find(
    (examen) => examen.id === examenSeleccionado
  );

  const porcentaje = Math.round(
    (conResultado / orden.examenes.length) * 100
  );

  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] border border-gray-100 overflow-hidden">

        {/* CABECERA */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <span className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <IconoFlask />
            </span>

            <div>

              <h2 className="text-lg font-semibold text-slate-900 leading-tight">
                Orden #{String(orden.id).padStart(4, '0')}
              </h2>

              <p className="text-sm text-slate-500 mt-0.5">
                Seguimiento de resultados
              </p>

            </div>

          </div>

          <span className="inline-flex px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium shrink-0">
            Resultado parcial
          </span>

        </div>

        <div className="p-8 space-y-5 bg-slate-50/60">

          {/* PACIENTE + MUESTRA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">

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

                <Campo label="DNI">
                  {orden.paciente.dni}
                </Campo>

              </div>

            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">

              <TituloTarjeta
                icono={<IconoCalendario />}
                titulo="Toma de muestra"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">

                <Campo label="Fecha">
                  {orden.fechaMuestra}
                </Campo>

                <Campo label="Registrado por">
                  {orden.usuarioMuestra}
                </Campo>

              </div>

            </div>

          </div>

          {/* PROGRESO */}
          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 px-6 py-5">

            <div className="flex items-center justify-between gap-6">

              <div className="shrink-0">
                <p className="text-xs text-amber-700">
                  Progreso
                </p>

                <p className="text-sm font-medium text-slate-800 mt-1">
                  {conResultado} de {orden.examenes.length} exámenes registrados
                </p>
              </div>

              <div className="flex-1 h-2 rounded-full bg-amber-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>

              <p className="text-lg font-semibold text-amber-600 shrink-0">
                {porcentaje}%
              </p>

            </div>

          </div>

          {/* EXÁMENES */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">

            <TituloTarjeta
              icono={<IconoFlask className="w-4 h-4" />}
              titulo={`Exámenes (${conResultado}/${orden.examenes.length} con resultado)`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {orden.examenes.map((examen) => {

                const tieneResultado =
                  !!examen.resultado?.trim();

                return (
                  <div
                    key={examen.id}
                    className={`rounded-xl border p-4 ${
                      tieneResultado
                        ? 'border-emerald-100 bg-emerald-50/40'
                        : 'border-gray-100 bg-white'
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <p className="text-sm font-medium text-slate-800">
                          {examen.nombre}
                        </p>

                        {tieneResultado && (
                          <p className="text-sm text-slate-500 mt-2 whitespace-pre-wrap">
                            {examen.resultado}
                          </p>
                        )}

                      </div>

                      <div className="shrink-0 flex items-center gap-2">

                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          tieneResultado
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {tieneResultado
                            ? <IconoCheck />
                            : <IconoReloj />}
                          {tieneResultado
                            ? 'Con resultado'
                            : 'Pendiente'}
                        </span>

                        {!tieneResultado && (
                          <button
                            onClick={() =>
                              onAbrirFormulario(examen.id)
                            }
                            className="px-3.5 py-1.5 rounded-lg bg-[#0d7a71] text-white text-xs font-medium hover:bg-[#0b6a62] transition-colors"
                          >
                            Registrar
                          </button>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* FORMULARIO */}
          {examenActual && (
            <div className="rounded-2xl border border-[#0d7a71]/20 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">

              <TituloTarjeta
                icono={<IconoFlask className="w-4 h-4" />}
                titulo="Registrar resultado"
              />

              <p className="text-xs text-slate-400">
                Examen
              </p>

              <p className="text-sm font-medium text-slate-800 mt-1 mb-4">
                {examenActual.nombre}
              </p>

              <textarea
                rows={5}
                value={resultadoTemporal}
                onChange={(e) =>
                  onResultadoChange(e.target.value)
                }
                placeholder="Ingrese el resultado..."
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10 resize-none"
              />

              <div className="flex justify-end gap-3 mt-4">

                <button
                  onClick={onCerrarFormulario}
                  className="px-5 h-10 rounded-xl border border-gray-200 bg-white text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => {

                    if (!resultadoTemporal.trim()) {
                      return;
                    }

                    onGuardarResultado(
                      examenActual.id,
                      resultadoTemporal
                    );
                  }}
                  className="px-5 h-10 rounded-xl bg-[#0d7a71] text-sm font-medium text-white hover:bg-[#0b6a62] transition-colors"
                >
                  Guardar resultado
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
