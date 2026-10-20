'use client';

import type { OrdenPreview } from './page';

interface Props {
  orden: OrdenPreview;
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

function IconoCheckCirculo({ className = 'w-4 h-4' }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16 9.5" />
    </svg>
  );
}

function IconoImpresora({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 9V3.5h10V9" />
      <rect x="3.5" y="9" width="17" height="8" rx="2" />
      <path d="M7 14h10v6.5H7z" />
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
  verde = false,
}: {
  icono: React.ReactNode;
  titulo: string;
  extra?: React.ReactNode;
  verde?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          verde
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-[#0d7a71]/10 text-[#0d7a71]'
        }`}>
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

export default function Lab_resultadollisto({
  orden,
}: Props) {

  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] border border-gray-100 overflow-hidden">

        {/* CABECERA */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <span className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <IconoFlask />
            </span>

            <div>

              <h2 className="text-lg font-semibold text-slate-900 leading-tight">
                Orden #{String(orden.id).padStart(4, '0')}
              </h2>

              <p className="text-sm text-slate-500 mt-0.5">
                Resultados completos de laboratorio
              </p>

            </div>

          </div>

          <span className="inline-flex px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium shrink-0">
            Resultado listo
          </span>

        </div>

        <div className="p-8 space-y-5 bg-slate-50/60">

          {/* PACIENTE + RESULTADO COMPLETO */}
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

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">

              <TituloTarjeta
                verde
                icono={<IconoCheckCirculo />}
                titulo="Resultado completo"
              />

              <div className="space-y-4">

                <Campo label="Estado">
                  Todos los exámenes han sido registrados.
                </Campo>

                <Campo label="Orden">
                  Orden completada
                </Campo>

              </div>

            </div>

          </div>

          {/* EXÁMENES */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">

            <TituloTarjeta
              icono={<IconoFlask className="w-4 h-4" />}
              titulo={`Exámenes (${orden.examenes.length}/${orden.examenes.length} con resultado)`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {orden.examenes.map((examen) => (

                <div
                  key={examen.id}
                  className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="text-sm font-medium text-slate-800">
                        {examen.nombre}
                      </p>

                      <p className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">
                        {examen.resultado}
                      </p>

                      <p className="text-xs text-slate-400 mt-2">
                        Resultado registrado correctamente
                      </p>

                    </div>

                    <div className="shrink-0">

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                        <IconoCheck />
                        Con resultado
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* PDF */}
          <button
            onClick={() => window.print()}
            className="w-full h-11 rounded-xl bg-[#0d7a71] text-white text-sm font-medium hover:bg-[#0b6a62] transition-colors inline-flex items-center justify-center gap-2"
          >
            <IconoImpresora />
            Imprimir / Generar PDF
          </button>

        </div>

      </div>

    </div>
  );
}
