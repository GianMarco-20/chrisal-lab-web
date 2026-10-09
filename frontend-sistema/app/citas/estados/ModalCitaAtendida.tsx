'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CITA_EJEMPLO,
  type CitaModal,
  type DiagnosticoModal,
  type TriajeModal,
  Campo,
  DocIcon,
  ModalShell,
  PulseIcon,
  Signo,
  Tarjeta,
  UserIcon,
  btnPrimary,
  btnSecondary,
  formatFecha,
  formatHora,
  textareaClass,
} from './ModalBase';

/* =========================================================
   MODAL: CITA "ATENDIDA" — Resumen de la atención

   Distribución:
   - Arriba (ancho completo): datos del paciente y de la cita
   - Izquierda: Triaje
   - Derecha:   Síntomas, Diagnóstico, Indicaciones, Laboratorio

   Cada tarjeta de triaje y de diagnóstico se puede corregir
   EN EL MISMO LUGAR con el lápiz (✓ guarda, ✕ cancela).
   No abre otras ventanas.

   "Volver" solo aparece si se pasa onVolver.
========================================================= */

interface Props {
  cita?: CitaModal;
  triaje?: TriajeModal;
  diagnostico?: DiagnosticoModal;
  onClose: () => void;
  onVolver?: () => void;
  onGuardarTriaje?: (triaje: TriajeModal) => void;
  onGuardarDiagnostico?: (diagnostico: DiagnosticoModal) => void;
}

/* =========================================================
   DATOS DE EJEMPLO
   Simulan lo registrado en los estados anteriores.
   Con el backend, el padre pasa los datos reales.
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

const DIAGNOSTICO_EJEMPLO: DiagnosticoModal = {
  sintomas:
    'Cefalea de intensidad moderada desde hace dos días, sin fiebre. Refiere cansancio y poco apetito.',
  diagnostico: 'Cefalea tensional',
  indicaciones:
    'Paracetamol 500 mg cada 8 horas por 3 días. Reposo, hidratación y control en una semana si persiste.',
  requiereLaboratorio: true,
  examenesLaboratorio: 'Hemograma completo, examen de orina',
};

/* =========================================================
   TIPOS Y CLASES
========================================================= */

type SeccionEdit =
  | 'triaje'
  | 'sintomas'
  | 'diagnostico'
  | 'indicaciones'
  | 'laboratorio';

const inputInline =
  'w-full min-w-0 bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:font-normal placeholder:text-gray-300';

const casillaEdit =
  'block rounded-xl border border-[#0d7a71]/25 bg-white px-3 py-2.5 transition focus-within:border-[#0d7a71] focus-within:ring-2 focus-within:ring-[#0d7a71]/15';

const labelCasilla = 'text-[11px] font-semibold text-gray-400';

const btnIcono =
  'flex h-8 w-8 items-center justify-center rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7a71]/40';

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

const CheckCircleIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.8 2.8L16 10" />
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const ClipboardIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="M9 3h6v3H9z" />
    <path d="M9 4.5H7a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2h-2" />
    <path d="M9 12h6M9 16h4" />
  </svg>
);

const PillIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="M10.5 20.5a4.95 4.95 0 0 1-7-7l10-10a4.95 4.95 0 0 1 7 7z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
);

const FlaskIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...iconProps(size)}>
    <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" />
    <path d="M7.5 15h9" />
  </svg>
);

/* =========================================================
   ACCIONES DE CADA TARJETA
   Lápiz en lectura; ✕ y ✓ en edición.
========================================================= */

function Acciones({
  editando,
  bloqueado,
  formId,
  etiqueta,
  onEditar,
  onCancelar,
}: {
  editando: boolean;
  bloqueado: boolean;
  formId: string;
  etiqueta: string;
  onEditar: () => void;
  onCancelar: () => void;
}) {
  if (editando) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onCancelar}
          aria-label="Cancelar edición"
          title="Cancelar"
          className={`${btnIcono} text-gray-400 hover:bg-gray-100 hover:text-gray-700`}
        >
          <XIcon />
        </button>

        <button
          type="submit"
          form={formId}
          aria-label="Guardar cambios"
          title="Guardar"
          className={`${btnIcono} bg-[#0d7a71] text-white shadow-sm shadow-[#0d7a71]/25 hover:bg-[#0a625b]`}
        >
          <CheckIcon />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onEditar}
      disabled={bloqueado}
      aria-label={`Editar ${etiqueta}`}
      title={bloqueado ? 'Guarde o cancele la edición en curso' : `Editar ${etiqueta}`}
      className={`${btnIcono} text-gray-400 hover:bg-[#0d7a71]/10 hover:text-[#0d7a71] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-400`}
    >
      <EditIcon />
    </button>
  );
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function ModalCitaAtendida({
  cita = CITA_EJEMPLO,
  triaje = TRIAJE_EJEMPLO,
  diagnostico = DIAGNOSTICO_EJEMPLO,
  onClose,
  onVolver,
  onGuardarTriaje,
  onGuardarDiagnostico,
}: Props) {
  /* Datos que se muestran (se actualizan al guardar) */
  const [triajeActual, setTriajeActual] = useState<TriajeModal>(triaje);
  const [diagActual, setDiagActual] = useState<DiagnosticoModal>(diagnostico);

  /* Borradores mientras se edita */
  const [triajeForm, setTriajeForm] = useState<TriajeModal>(triaje);
  const [diagForm, setDiagForm] = useState<DiagnosticoModal>(diagnostico);

  /* Qué tarjeta se está editando (solo una a la vez) */
  const [editando, setEditando] = useState<SeccionEdit | null>(null);

  const empezar = (seccion: SeccionEdit) => {
    setTriajeForm(triajeActual);
    setDiagForm(diagActual);
    setEditando(seccion);
  };

  const cancelar = () => setEditando(null);

  const handleTriajeChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTriajeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiagChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDiagForm((prev) => ({ ...prev, [name]: value }));
  };

  const guardarTriaje = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTriajeActual(triajeForm);
    onGuardarTriaje?.(triajeForm);
    setEditando(null);
  };

  const guardarDiagnostico = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Si ya no requiere laboratorio, se limpia la lista de exámenes */
    const final: DiagnosticoModal = diagForm.requiereLaboratorio
      ? diagForm
      : { ...diagForm, examenesLaboratorio: '' };

    setDiagActual(final);
    onGuardarDiagnostico?.(final);
    setEditando(null);
  };

  const hayEdicion = editando !== null;

  /* Acciones comunes de cada tarjeta */
  const acciones = (seccion: SeccionEdit, etiqueta: string) => (
    <Acciones
      editando={editando === seccion}
      bloqueado={hayEdicion}
      formId={`form-${seccion}`}
      etiqueta={etiqueta}
      onEditar={() => empezar(seccion)}
      onCancelar={cancelar}
    />
  );

  /* Casilla editable del triaje */
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
          value={triajeForm[name]}
          onChange={handleTriajeChange}
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

  /* Texto largo en modo lectura */
  const texto = (valor: string) => (
    <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
      {valor || '---'}
    </p>
  );

  /* Exámenes de laboratorio como etiquetas */
  const examenes = diagActual.examenesLaboratorio
    .split(/[,\n]/)
    .map((x) => x.trim())
    .filter(Boolean);

  return (
    <ModalShell
      titulo="Resumen de la atención"
      subtitulo="Triaje, diagnóstico y tratamiento registrados"
      tono="blue"
      icono={<CheckCircleIcon size={22} />}
      onClose={onClose}
      footer={
        <>
          {onVolver && (
            <button type="button" onClick={onVolver} className={btnSecondary}>
              Volver
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className={onVolver ? btnPrimary : btnSecondary}
          >
            Cerrar
          </button>
        </>
      }
    >
      {/* =====================================================
          PACIENTE Y CITA (franja a lo ancho, solo lectura)
      ===================================================== */}

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
          <p className="text-base font-bold leading-tight text-gray-900">
            {cita.paciente}
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-gray-100 pt-4 md:grid-cols-4">
            <Campo label="DNI">{cita.dni}</Campo>
            <Campo label="Celular">{cita.celular}</Campo>
            <Campo label="Sexo">{cita.sexo}</Campo>
            <Campo label="Servicio">{cita.especialidad}</Campo>

            <Campo label="N° de cita">{cita.id}</Campo>
            <Campo label="Médico">{cita.medico}</Campo>
            <Campo label="Fecha">{formatFecha(cita.fecha)}</Campo>
            <Campo label="Hora">{formatHora(cita.hora)}</Campo>
          </div>
        </div>
      </Tarjeta>

      {/* =====================================================
          TRIAJE (izquierda) + ATENCIÓN MÉDICA (derecha)
      ===================================================== */}

      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        {/* ---------------- TRIAJE ---------------- */}
        <Tarjeta
          titulo="Triaje registrado"
          icono={<PulseIcon />}
          derecha={acciones('triaje', 'triaje')}
        >
          {editando === 'triaje' ? (
            <form
              id="form-triaje"
              onSubmit={guardarTriaje}
              className="space-y-4"
            >
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
                      value={triajeForm.peso}
                      onChange={handleTriajeChange}
                      placeholder="70"
                      className={inputInline}
                    />

                    <span className="text-gray-300">/</span>

                    <input
                      name="talla"
                      type="number"
                      inputMode="numeric"
                      aria-label="Talla en cm"
                      value={triajeForm.talla}
                      onChange={handleTriajeChange}
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
                  value={triajeForm.motivoConsulta}
                  onChange={handleTriajeChange}
                  placeholder="Describa por qué acude el paciente"
                  className={`${textareaClass} mt-1`}
                />
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2.5">
                <Signo label="P. arterial" valor={triajeActual.presionArterial} unidad="mmHg" />
                <Signo label="F. cardiaca" valor={triajeActual.frecuenciaCardiaca} unidad="lpm" />
                <Signo label="F. respiratoria" valor={triajeActual.frecuenciaRespiratoria} unidad="rpm" />
                <Signo label="Temperatura" valor={triajeActual.temperatura} unidad="°C" />
                <Signo label="SpO₂" valor={triajeActual.saturacion} unidad="%" />
                <Signo
                  label="Peso / Talla"
                  valor={
                    triajeActual.peso || triajeActual.talla
                      ? `${triajeActual.peso}/${triajeActual.talla}`
                      : ''
                  }
                  unidad="kg/cm"
                />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <Campo label="Motivo de consulta">
                  <span className="font-medium text-gray-700">
                    {triajeActual.motivoConsulta || '---'}
                  </span>
                </Campo>
              </div>
            </div>
          )}
        </Tarjeta>

        {/* ---------------- ATENCIÓN MÉDICA ---------------- */}
        <div className="space-y-5">
          {/* SÍNTOMAS */}
          <Tarjeta
            titulo="Síntomas"
            icono={<ClipboardIcon />}
            derecha={acciones('sintomas', 'síntomas')}
          >
            {editando === 'sintomas' ? (
              <form id="form-sintomas" onSubmit={guardarDiagnostico}>
                <label htmlFor="sintomas" className="sr-only">
                  Síntomas
                </label>

                <textarea
                  id="sintomas"
                  name="sintomas"
                  required
                  rows={4}
                  value={diagForm.sintomas}
                  onChange={handleDiagChange}
                  placeholder="Inicio, duración e intensidad"
                  className={textareaClass}
                />
              </form>
            ) : (
              texto(diagActual.sintomas)
            )}
          </Tarjeta>

          {/* DIAGNÓSTICO */}
          <Tarjeta
            titulo="Diagnóstico médico"
            icono={<DocIcon />}
            derecha={acciones('diagnostico', 'diagnóstico')}
          >
            {editando === 'diagnostico' ? (
              <form id="form-diagnostico" onSubmit={guardarDiagnostico}>
                <label htmlFor="diagnostico" className="sr-only">
                  Diagnóstico
                </label>

                <textarea
                  id="diagnostico"
                  name="diagnostico"
                  required
                  rows={3}
                  value={diagForm.diagnostico}
                  onChange={handleDiagChange}
                  placeholder="Describa el diagnóstico"
                  className={textareaClass}
                />
              </form>
            ) : (
              <p className="whitespace-pre-line text-base font-semibold leading-6 text-gray-900">
                {diagActual.diagnostico || '---'}
              </p>
            )}
          </Tarjeta>

          {/* INDICACIONES */}
          <Tarjeta
            titulo="Indicaciones y tratamiento"
            icono={<PillIcon />}
            derecha={acciones('indicaciones', 'indicaciones')}
          >
            {editando === 'indicaciones' ? (
              <form id="form-indicaciones" onSubmit={guardarDiagnostico}>
                <label htmlFor="indicaciones" className="sr-only">
                  Indicaciones y tratamiento
                </label>

                <textarea
                  id="indicaciones"
                  name="indicaciones"
                  rows={4}
                  value={diagForm.indicaciones}
                  onChange={handleDiagChange}
                  placeholder="Medicamentos, dosis y recomendaciones"
                  className={textareaClass}
                />
              </form>
            ) : (
              texto(diagActual.indicaciones)
            )}
          </Tarjeta>

          {/* LABORATORIO */}
          <Tarjeta
            titulo="Orden de laboratorio"
            icono={<FlaskIcon />}
            derecha={acciones('laboratorio', 'orden de laboratorio')}
          >
            {editando === 'laboratorio' ? (
              <form
                id="form-laboratorio"
                onSubmit={guardarDiagnostico}
                className="space-y-4"
              >
                <label
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${
                    diagForm.requiereLaboratorio
                      ? 'border-[#0d7a71]/30 bg-[#0d7a71]/5'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-semibold text-gray-800">
                    Requiere exámenes de laboratorio
                  </span>

                  <input
                    type="checkbox"
                    checked={diagForm.requiereLaboratorio}
                    onChange={(e) =>
                      setDiagForm((prev) => ({
                        ...prev,
                        requiereLaboratorio: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 shrink-0 rounded border-gray-300 accent-[#0d7a71]"
                  />
                </label>

                {diagForm.requiereLaboratorio && (
                  <div>
                    <label
                      htmlFor="examenesLaboratorio"
                      className={labelCasilla}
                    >
                      Exámenes solicitados{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      id="examenesLaboratorio"
                      name="examenesLaboratorio"
                      required
                      rows={3}
                      value={diagForm.examenesLaboratorio}
                      onChange={handleDiagChange}
                      placeholder="Ej: Hemograma completo, examen de orina"
                      className={`${textareaClass} mt-1`}
                    />
                  </div>
                )}
              </form>
            ) : diagActual.requiereLaboratorio && examenes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {examenes.map((examen) => (
                  <span
                    key={examen}
                    className="rounded-lg bg-[#0d7a71]/10 px-2.5 py-1 text-xs font-semibold text-[#0d7a71]"
                  >
                    {examen}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No se solicitaron exámenes de laboratorio.
              </p>
            )}
          </Tarjeta>
        </div>
      </div>
    </ModalShell>
  );
}