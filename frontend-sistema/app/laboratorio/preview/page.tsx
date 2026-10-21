'use client';

/**
 * PREVIEW DE LABORATORIO — solo para visualizar. NO se sube a GitHub.
 *
 * Para añadir un examen al visor: agrega una línea en EXAMENES.
 *   ['NombreDelArchivo', 'Nombre visible', 'Categoría']
 * El visor busca solo formatos/NombreDelArchivo.tsx:
 *   - si existe  -> "Ver formato" (se carga solo, sin importarlo aquí)
 *   - si no      -> "Por crear" (se puede abrir con un cuadro de texto genérico)
 * Después de crear un archivo nuevo, pulsa "Volver a revisar".
 */

import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react';

import NuevaOrden from './NuevaOrden';
import Lab_enanalisis from './Lab_enanalisis';
import Lab_analisisparcial from './Lab_analisisparcial';
import Lab_resultadollisto from './Lab_resultadollisto';

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

export type EstadoPreview =
  | 'nueva'
  | 'en_analisis'
  | 'resultado_parcial'
  | 'resultado_listo';

export interface ExamenPreview {
  id: number;
  nombre: string;
  resultado?: string;
}

export interface OrdenPreview {
  id: number;
  paciente: {
    nombres: string;
    apellidos: string;
    dni: string;
    historiaClinica: string;
    sexo?: 'M' | 'F';
  };
  fechaMuestra: string;
  usuarioMuestra: string;
  examenes: ExamenPreview[];
}

/** Lo que recibe cada formato (solo el cuerpo con los campos). */
export interface FormatoProps {
  valor: string;
  onChange: (valor: string) => void;
  /** Datos de la orden (sexo para los valores de referencia). */
  paciente?: { sexo: 'M' | 'F'; edad?: number };
}

/* ------------------------------------------------------------------ */
/* Exámenes: [archivo en formatos/, nombre visible, categoría]         */
/* ------------------------------------------------------------------ */

const EXAMENES: [string, string, string][] = [
  // --- YA CREADOS (15) ---
  ['AcidoUrico', 'Ácido úrico', 'Bioquímica'],
  ['AcidosBiliares', 'Ácidos biliares', 'Bioquímica'],
  ['AmilasaLipasaMasc', 'Amilasa y lipasa (masculino)', 'Bioquímica'],
  ['AmilasaLipasaFem', 'Amilasa y lipasa (femenino)', 'Bioquímica'],
  ['BilirrubinasTotales', 'Bilirrubinas totales y fraccionadas', 'Bioquímica'],
  ['CalcioSerico', 'Calcio sérico', 'Bioquímica'],
  ['Colesterol', 'Colesterol total', 'Bioquímica'],
  ['ColesterolLdl', 'Colesterol LDL', 'Bioquímica'],
  ['ColesterolYTrigliceridosMasc', 'Colesterol y Triglicéridos (masculino)', 'Bioquímica'],
  ['ColesterolYTrigliceridosFem', 'Colesterol y Triglicéridos (femenino)', 'Bioquímica'],

  ['Aglutinaciones', 'Aglutinaciones febriles (Widal)', 'Inmunología'],
  ['AntiCcp', 'Anti-CCP', 'Inmunología'],

  ['Bk', 'B.K. (Baciloscopía)', 'Microbiología'],
  ['Coprocultivo', 'Coprocultivo', 'Microbiología'],

  ['Coprologico', 'Coprológico funcional', 'Parasitología'],

  // --- PRÓXIMOS A CREAR (15) ---
  ['Cortisol', 'Cortisol', 'Hormonas'],
  ['CoprologicoMasc', 'Coprológico (masculino)', 'Parasitología'],
  ['Creatinina', 'Creatinina', 'Bioquímica'],
  ['CultivoSecrecionFaringea', 'Cultivo de secreción faríngea', 'Microbiología'],
  ['CultivoSecrecionOtidica', 'Cultivo de secreción otídica', 'Microbiología'],
  ['CultivoSecrecionOcular', 'Cultivo de secreción ocular', 'Microbiología'],
  ['CultivoSecrecionVaginal', 'Cultivo de secreción vaginal', 'Microbiología'],
  ['ElectrolitosSericos', 'Electrolitos séricos', 'Bioquímica'],
  ['CultivoSecrecionVaginalMacConkey', 'Cultivo de secreción vaginal (Agar MacConkey)', 'Microbiología'],
  ['ExamenCompletoOrina1', 'Examen completo de orina (Formato 1)', 'Uroanálisis'],
  ['ExamenCompletoOrina2', 'Examen completo de orina (Formato 2)', 'Uroanálisis'],
  ['FactorReumatoide', 'Factor reumatoide (FR)', 'Inmunología'],
  ['Ferritina', 'Ferritina', 'Inmunología'],
  ['GlucosaFem', 'Glucosa (femenino)', 'Bioquímica'],
  ['GlucosaMasc', 'Glucosa (masculino)', 'Bioquímica'],
];

/* ------------------------------------------------------------------ */
/* Datos de ejemplo de la orden                                        */
/* ------------------------------------------------------------------ */

const ORDEN_BASE: OrdenPreview = {
  id: 3,
  paciente: {
    nombres: 'GIAN MARCO WILLIAM',
    apellidos: 'CASTAÑEDA CAYCHO',
    dni: '75840140',
    historiaClinica: 'HC-000001',
    sexo: 'M', // cámbialo a 'F' para ver el rango de mujeres en los formatos
  },
  fechaMuestra: '18/10/2026, 09:47 p. m.',
  usuarioMuestra: 'Gian Castañeda',
  examenes: [
    { id: 1, nombre: 'Ácido úrico' },
    { id: 2, nombre: 'Amilasa y lipasa' },
  ],
};

function ordenParaEstado(estado: EstadoPreview): OrdenPreview {
  const examenes = ORDEN_BASE.examenes.map((e) => ({ ...e }));

  if (estado === 'resultado_parcial') {
    examenes[0].resultado = 'Ácido úrico: 3.6 mg/dL';
  }
  if (estado === 'resultado_listo') {
    examenes[0].resultado = 'Ácido úrico: 3.6 mg/dL';
    examenes[1].resultado = 'Lipasa: 40.5 UI/L, Amilasa: 90.0 UI/L';
  }
  return { ...ORDEN_BASE, examenes };
}

const ESTADOS: {
  clave: EstadoPreview;
  etiqueta: string;
  descripcion: string;
  badge: string;
  dot: string;
}[] = [
  {
    clave: 'nueva',
    etiqueta: 'Nueva orden',
    descripcion: 'Recepción elige al paciente y los exámenes a solicitar',
    badge: 'bg-teal-50 text-teal-700',
    dot: 'bg-teal-500',
  },
  {
    clave: 'en_analisis',
    etiqueta: 'En análisis',
    descripcion: 'La orden fue creada y ningún examen tiene resultado aún',
    badge: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
  },
  {
    clave: 'resultado_parcial',
    etiqueta: 'Resultado parcial',
    descripcion: 'Algunos exámenes ya tienen resultado y otros siguen pendientes',
    badge: 'bg-violet-50 text-violet-700',
    dot: 'bg-violet-500',
  },
  {
    clave: 'resultado_listo',
    etiqueta: 'Resultado listo',
    descripcion: 'Todos los exámenes tienen resultado (solo lectura)',
    badge: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
  },
];

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

const normalizar = (t: string) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const CHIP = 'rounded-full px-3 py-1.5 text-xs font-semibold transition';
const CHIP_ON = 'bg-[#0d7a71] text-white';
const CHIP_OFF = 'bg-gray-100 text-gray-600 hover:bg-gray-200';

function IconoFlask({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6" />
      <path d="M10 3v6.2L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ventana con barra superior                                          */
/* ------------------------------------------------------------------ */

function Ventana({
  etiqueta,
  titulo,
  controles,
  onCerrar,
  children,
}: {
  etiqueta?: string;
  titulo?: string;
  controles?: ReactNode;
  onCerrar: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 p-4 sm:p-8"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
    >
      <div className="mx-auto max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {titulo && (
          <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-white px-5 py-3 shadow-lg">
            <div className="mr-auto">
              {etiqueta && (
                <p className="text-[11px] font-semibold text-gray-400">{etiqueta}</p>
              )}
              <p className="text-sm font-bold text-gray-900">{titulo}</p>
            </div>

            {controles}

            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar vista previa"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-500 hover:bg-gray-200 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

type Cargados = Record<string, ComponentType<FormatoProps> | null | undefined>;

export default function LaboratorioPreviewPage() {
  /* Estados de la orden */
  const [vista, setVista] = useState<EstadoPreview | null>(null);
  const [orden, setOrden] = useState<OrdenPreview>(ORDEN_BASE);
  const [examenSeleccionado, setExamenSeleccionado] = useState<number | null>(null);
  const [resultadoTemporal, setResultadoTemporal] = useState('');

  /* Formatos: undefined = revisando, null = no existe, componente = listo */
  const [cargados, setCargados] = useState<Cargados>({});
  const [revision, setRevision] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'listos' | 'pendientes'>('todos');
  const [formatoAbierto, setFormatoAbierto] = useState<string | null>(null);
  const [valorFormato, setValorFormato] = useState('');

  /* Detecta qué archivos de formatos/ ya existen */
  useEffect(() => {
    let activo = true;
    setCargados({});

    EXAMENES.forEach(([archivo]) => {
      import(`./formatos/${archivo}`)
        .then((m) => {
          if (activo) setCargados((p) => ({ ...p, [archivo]: m.default }));
        })
        .catch(() => {
          if (activo) setCargados((p) => ({ ...p, [archivo]: null }));
        });
    });

    return () => {
      activo = false;
    };
  }, [revision]);

  const limpiarFormulario = () => {
    setExamenSeleccionado(null);
    setResultadoTemporal('');
  };

  const cerrarEstado = () => {
    setVista(null);
    limpiarFormulario();
  };

  const abrirFormato = (archivo: string) => {
    setValorFormato('');
    setFormatoAbierto(archivo);
  };

  const cerrarFormato = () => {
    setFormatoAbierto(null);
    setValorFormato('');
  };

  /* Catálogo filtrado */
  const listos = EXAMENES.filter(([a]) => cargados[a]).length;
  const revisando = EXAMENES.some(([a]) => cargados[a] === undefined);
  const porcentaje = Math.round((listos / EXAMENES.length) * 100);

  const visibles = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return EXAMENES.filter(([archivo, nombre, categoria]) => {
      const listo = !!cargados[archivo];
      if (filtro === 'listos' && !listo) return false;
      if (filtro === 'pendientes' && listo) return false;
      if (!q) return true;
      return normalizar(nombre).includes(q) || normalizar(categoria).includes(q);
    });
  }, [busqueda, filtro, cargados]);

  const indiceActual = visibles.findIndex(([a]) => a === formatoAbierto);

  /* Anterior / siguiente dentro de la lista visible */
  const irA = (desplazamiento: number) => {
    if (indiceActual === -1 || visibles.length === 0) return;
    const nuevo = (indiceActual + desplazamiento + visibles.length) % visibles.length;
    abrirFormato(visibles[nuevo][0]);
  };

  /* Teclado: Esc cierra; flechas cambian de formato */
  useEffect(() => {
    if (!vista && !formatoAbierto) return;

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const escribiendo = ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName);

      if (e.key === 'Escape') {
        cerrarEstado();
        cerrarFormato();
      } else if (formatoAbierto && !escribiendo) {
        if (e.key === 'ArrowRight') irA(1);
        if (e.key === 'ArrowLeft') irA(-1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [vista, formatoAbierto, visibles]);

  /* Lógica de estados (se deriva del conteo, como en el backend) */
  const abrirEstado = (estado: EstadoPreview) => {
    setOrden(ordenParaEstado(estado));
    limpiarFormulario();
    setVista(estado);
  };

  const handleCrearOrden = (nuevaOrden: OrdenPreview) => {
    setOrden(nuevaOrden);
    limpiarFormulario();
    setVista('en_analisis');
  };

  const abrirFormularioExamen = (examenId: number) => {
    setExamenSeleccionado(examenId);
    const examen = orden.examenes.find((e) => e.id === examenId);
    setResultadoTemporal(examen?.resultado ?? '');
  };

  const handleRegistrarResultado = (examenId: number, resultado: string) => {
    const nuevos = orden.examenes.map((e) =>
      e.id === examenId ? { ...e, resultado } : e
    );
    setOrden({ ...orden, examenes: nuevos });
    limpiarFormulario();

    const conResultado = nuevos.filter((e) => e.resultado?.trim()).length;
    setVista(conResultado === nuevos.length ? 'resultado_listo' : 'resultado_parcial');
  };

  const itemAbierto = EXAMENES.find(([a]) => a === formatoAbierto);
  const Formato = formatoAbierto ? cargados[formatoAbierto] : null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* ESTADOS */}
        <section className="rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] sm:p-9">
          <h1 className="text-2xl font-bold text-gray-900">Vista previa de modales</h1>
          <p className="mt-2 text-sm text-gray-400">
            Elige un estado para ver su ventana. Solo diseño, sin backend.
          </p>

          <div className="mt-7 space-y-3">
            {ESTADOS.map((estado) => (
              <button
                key={estado.clave}
                type="button"
                onClick={() => abrirEstado(estado.clave)}
                className="block w-full rounded-2xl border border-gray-100 px-5 py-4 text-left transition hover:border-gray-200 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0d7a71]"
              >
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${estado.badge}`}>
                  <span className={`h-2 w-2 rounded-full ${estado.dot}`} />
                  {estado.etiqueta}
                </span>
                <p className="mt-3 text-sm text-gray-500">{estado.descripcion}</p>
              </button>
            ))}
          </div>
        </section>

        {/* FORMATOS */}
        <section className="rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] sm:p-9">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Vista previa de formatos</h2>
            <span className="text-sm font-semibold text-gray-500">
              {revisando ? 'Revisando...' : `${listos} de ${EXAMENES.length} listos`}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Cada examen abre su formato dentro del cuadro "Registrar resultado".
          </p>

          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-valuenow={porcentaje}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Formatos terminados"
          >
            <div className="h-full rounded-full bg-[#0d7a71] transition-all" style={{ width: `${porcentaje}%` }} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar examen o categoría..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#0d7a71] focus:outline-none"
            />
            <div className="flex shrink-0 gap-1.5">
              {(['todos', 'listos', 'pendientes'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  className={`${CHIP} ${filtro === f ? CHIP_ON : CHIP_OFF}`}
                >
                  {f === 'todos' ? 'Todos' : f === 'listos' ? 'Listos' : 'Pendientes'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRevision((r) => r + 1)}
            className="mt-3 text-xs font-semibold text-[#0d7a71] hover:underline"
          >
            Volver a revisar archivos
          </button>

          <div className="mt-4 space-y-2.5">
            {visibles.length === 0 && (
              <p className="rounded-2xl border border-dashed border-gray-200 px-5 py-8 text-center text-sm text-gray-400">
                Ningún examen coincide con la búsqueda.
              </p>
            )}

            {visibles.map(([archivo, nombre, categoria]) => {
              const listo = !!cargados[archivo];
              return (
                <button
                  key={archivo}
                  type="button"
                  onClick={() => abrirFormato(archivo)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-5 py-3.5 text-left transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0d7a71] ${
                    listo ? 'border-gray-100 hover:border-gray-200' : 'border-dashed border-gray-200'
                  }`}
                >
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${listo ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-gray-900">{nombre}</span>
                    <span className="block text-xs text-gray-400">{categoria}</span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      listo ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {listo ? 'Ver formato' : 'Por crear'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* VENTANA DE ESTADO */}
      {vista && (
        <Ventana etiqueta="Vista previa" titulo={ESTADOS.find((e) => e.clave === vista)?.etiqueta ?? ''} onCerrar={cerrarEstado}>
          {vista === 'nueva' && <NuevaOrden onCrearOrden={handleCrearOrden} />}

          {vista === 'en_analisis' && (
            <Lab_enanalisis
              orden={orden}
              examenSeleccionado={examenSeleccionado}
              resultadoTemporal={resultadoTemporal}
              onAbrirFormulario={abrirFormularioExamen}
              onCerrarFormulario={limpiarFormulario}
              onResultadoChange={setResultadoTemporal}
              onGuardarResultado={handleRegistrarResultado}
            />
          )}

          {vista === 'resultado_parcial' && (
            <Lab_analisisparcial
              orden={orden}
              examenSeleccionado={examenSeleccionado}
              resultadoTemporal={resultadoTemporal}
              onAbrirFormulario={abrirFormularioExamen}
              onCerrarFormulario={limpiarFormulario}
              onResultadoChange={setResultadoTemporal}
              onGuardarResultado={handleRegistrarResultado}
            />
          )}

          {vista === 'resultado_listo' && <Lab_resultadollisto orden={orden} />}
        </Ventana>
      )}

      {/* VENTANA DE FORMATO */}
      {itemAbierto && (
        <Ventana onCerrar={cerrarFormato}>
          {/* Réplica de la tarjeta "Registrar resultado" de Lab_enanalisis */}
          <div className="mx-auto max-w-5xl rounded-2xl border border-[#0d7a71]/20 bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0d7a71]/10 text-[#0d7a71]">
                <IconoFlask />
              </span>
              <h3 className="text-sm font-semibold text-slate-800">Registrar resultado</h3>
            </div>

            <p className="text-xs text-slate-400">Examen</p>
            <p className="mb-4 mt-1 text-sm font-medium text-slate-800">{itemAbierto[1]}</p>

            <div>
              {Formato ? (
                <Formato
                  valor={valorFormato}
                  onChange={setValorFormato}
                  paciente={{ sexo: ORDEN_BASE.paciente.sexo ?? 'M' }}
                />
              ) : (
                <div className="space-y-3">
                  <p className="rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs text-amber-700">
                    Este formato aún no existe. Crea <b>formatos/{itemAbierto[0]}.tsx</b> y pulsa
                    "Volver a revisar archivos". Mientras tanto se muestra el cuadro genérico.
                  </p>
                  <textarea
                    rows={5}
                    value={valorFormato}
                    onChange={(e) => setValorFormato(e.target.value)}
                    placeholder="Ingrese el resultado..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#0d7a71] focus:ring-4 focus:ring-[#0d7a71]/10"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={cerrarFormato}
                className="h-10 rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium text-slate-600 transition-colors hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!valorFormato.trim()) return;
                  cerrarFormato();
                }}
                className="h-10 rounded-xl bg-[#0d7a71] px-5 text-sm font-medium text-white transition-colors hover:bg-[#0b6a62]"
              >
                Guardar resultado
              </button>
            </div>
          </div>
        </Ventana>
      )}
    </div>
  );
}