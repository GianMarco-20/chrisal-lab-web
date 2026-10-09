'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CITA_EJEMPLO,
  type CitaModal,
  type TriajeModal,
  Campo,
  ModalShell,
  PulseIcon,
  Signo,
  Tarjeta,
  TarjetaPaciente,
  btnPrimary,
  btnSecondary,
  textareaClass,
} from './ModalBase';

/* =========================================================
   MODAL INTERMEDIO: CITA "PENDIENTE DE DIAGNÓSTICO"
   Información del paciente + triaje registrado.
   Acciones: Cerrar, Registrar diagnóstico.

   Edición del triaje EN EL MISMO LUGAR:
   el lápiz vuelve editables las casillas de la tarjeta
   (sin abrir ventanas ni cambiar el diseño).
   ✓ guarda, ✕ cancela.
========================================================= */

interface Props {
  cita?: CitaModal;
  triaje?: TriajeModal;
  onClose: () => void;
  onRegistrarDiagnostico?: () => void; // abre ModalCitaDiagnostico
  onGuardarTriaje?: (triaje: TriajeModal) => void; // triaje corregido
}

/* =========================================================
   TRIAJE DE EJEMPLO
   Simula lo que se guardó en el estado anterior
   ("Pendiente de triaje"). Cuando conectes el backend,
   el padre pasará el triaje real y esto ya no se usa.
========================================================= */

const TRIAJE_EJEMPLO: TriajeModal = {
  presionArterial: '120/80',
  frecuenciaCardiaca: '78',
  frecuenciaRespiratoria: '18',
  temperatura: '36.8',
  saturacion: '98',
  peso: '72',
  talla: '170',
  motivoConsulta:
    'Dolor de cabeza intenso desde hace dos días, acompañado de malestar general.',
};

/* =========================================================
   ÍCONOS
========================================================= */

const iconProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const EditIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="M6 18 18 6M6 6l12 12" />
  </svg>
);

/* =========================================================
   CLASES
========================================================= */

const inputInline =
  'w-full min-w-0 bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:font-normal placeholder:text-gray-300';

const casillaEdit =
  'block rounded-xl border border-[#0d7a71]/25 bg-white px-3 py-2.5 transition focus-within:border-[#0d7a71] focus-within:ring-2 focus-within:ring-[#0d7a71]/15';

const labelCasilla = 'text-[11px] font-semibold text-gray-400';

const FORM_ID = 'form-editar-triaje';

/* =========================================================
   COMPONENTE
========================================================= */

export default function ModalInfoPendienteDiagnostico({
  cita = CITA_EJEMPLO,
  triaje = TRIAJE_EJEMPLO,
  onClose,
  onRegistrarDiagnostico,
  onGuardarTriaje,
}: Props) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<TriajeModal>(triaje);

  const empezarEdicion = () => {
    setForm(triaje); // siempre parte de lo último guardado
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setEditando(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const guardar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGuardarTriaje?.(form);
    setEditando(false);
  };

  /* Casilla editable: mismo aspecto que "Signo", con input adentro */
  const casilla = (
    name: keyof TriajeModal,
    label: string,
    placeholder: string,
    unidad: string,
    extra: {
      type?: string;
      step?: string;
      required?: boolean;
      inputMode?: 'numeric' | 'decimal';
    } = {}
  ) => (
    <label htmlFor={`edit-${name}`} className={casillaEdit}>
      <span className={labelCasilla}>
        {label}
        {extra.required && <span className="text-red-500"> *</span>}
      </span>

      <div className="mt-0.5 flex items-center gap-1">
        <input
          id={`edit-${name}`}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputInline}
          {...extra}
        />

        <span className="shrink-0 text-xs font-medium text-gray-400">
          {unidad}
        </span>
      </div>
    </label>
  );

  return (
    <ModalShell
      titulo="Pendiente diagnóstico"
      subtitulo="Revise la información del paciente y el triaje registrado"
      tono="violet"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={btnSecondary}>
            Cerrar
          </button>
          <button
            type="button"
            onClick={onRegistrarDiagnostico}
            disabled={editando}
            title={editando ? 'Guarde o cancele la edición del triaje' : undefined}
            className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Registrar diagnóstico
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <TarjetaPaciente cita={cita} completo />

        <Tarjeta
          titulo="Triaje registrado"
          icono={<PulseIcon />}
          derecha={
            editando ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  aria-label="Cancelar edición"
                  title="Cancelar"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40"
                >
                  <XIcon />
                </button>

                <button
                  type="submit"
                  form={FORM_ID}
                  aria-label="Guardar cambios"
                  title="Guardar"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d7a71] text-white shadow-sm shadow-[#0d7a71]/25 transition hover:bg-[#0a625b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40"
                >
                  <CheckIcon />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={empezarEdicion}
                aria-label="Editar triaje"
                title="Editar triaje"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#0d7a71]/10 hover:text-[#0d7a71] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40"
              >
                <EditIcon />
              </button>
            )
          }
        >
          {editando ? (
            /* =================================================
               MODO EDICIÓN: mismas casillas, ahora editables
            ================================================= */
            <form id={FORM_ID} onSubmit={guardar} className="space-y-4">
              <div className="grid grid-cols-2 gap-2.5">
                {casilla('presionArterial', 'P. arterial', '120/80', 'mmHg', {
                  required: true,
                })}

                {casilla('frecuenciaCardiaca', 'F. cardiaca', '80', 'lpm', {
                  type: 'number',
                  inputMode: 'numeric',
                  required: true,
                })}

                {casilla('frecuenciaRespiratoria', 'F. respiratoria', '18', 'rpm', {
                  type: 'number',
                  inputMode: 'numeric',
                })}

                {casilla('temperatura', 'Temperatura', '36.5', '°C', {
                  type: 'number',
                  step: '0.1',
                  inputMode: 'decimal',
                  required: true,
                })}

                {casilla('saturacion', 'SpO₂', '98', '%', {
                  type: 'number',
                  inputMode: 'numeric',
                })}

                {/* Peso / Talla en una sola casilla */}
                <div className={casillaEdit}>
                  <span className={labelCasilla}>Peso / Talla</span>

                  <div className="mt-0.5 flex items-center gap-1">
                    <input
                      name="peso"
                      type="number"
                      step="0.1"
                      inputMode="decimal"
                      aria-label="Peso en kg"
                      value={form.peso}
                      onChange={handleChange}
                      placeholder="70"
                      className={inputInline}
                    />

                    <span className="text-gray-300">/</span>

                    <input
                      name="talla"
                      type="number"
                      inputMode="numeric"
                      aria-label="Talla en cm"
                      value={form.talla}
                      onChange={handleChange}
                      placeholder="170"
                      className={inputInline}
                    />

                    <span className="shrink-0 text-xs font-medium text-gray-400">
                      kg/cm
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="edit-motivoConsulta" className={labelCasilla}>
                  Motivo de consulta <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="edit-motivoConsulta"
                  name="motivoConsulta"
                  required
                  rows={3}
                  value={form.motivoConsulta}
                  onChange={handleChange}
                  placeholder="Describa por qué acude el paciente"
                  className={`${textareaClass} mt-1`}
                />
              </div>
            </form>
          ) : (
            /* =================================================
               MODO LECTURA
            ================================================= */
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2.5">
                <Signo label="P. arterial" valor={triaje.presionArterial} unidad="mmHg" />
                <Signo label="F. cardiaca" valor={triaje.frecuenciaCardiaca} unidad="lpm" />
                <Signo label="F. respiratoria" valor={triaje.frecuenciaRespiratoria} unidad="rpm" />
                <Signo label="Temperatura" valor={triaje.temperatura} unidad="°C" />
                <Signo label="SpO₂" valor={triaje.saturacion} unidad="%" />
                <Signo
                  label="Peso / Talla"
                  valor={triaje.peso || triaje.talla ? `${triaje.peso}/${triaje.talla}` : ''}
                  unidad="kg/cm"
                />
              </div>

              <Campo label="Motivo de consulta">
                <span className="font-medium text-gray-700">
                  {triaje.motivoConsulta || '---'}
                </span>
              </Campo>
            </div>
          )}
        </Tarjeta>
      </div>
    </ModalShell>
  );
}