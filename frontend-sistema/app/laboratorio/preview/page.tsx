'use client';

import { useState } from 'react';

import NuevaOrden from './NuevaOrden';
import Lab_enanalisis from './Lab_enanalisis';
import Lab_analisisparcial from './Lab_analisisparcial';
import Lab_resultadollisto from './Lab_resultadollisto';

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
  };
  fechaMuestra: string;
  usuarioMuestra: string;
  examenes: ExamenPreview[];
}

const ORDEN_INICIAL: OrdenPreview = {
  id: 3,
  paciente: {
    nombres: 'GIAN MARCO WILLIAM',
    apellidos: 'CASTAÑEDA CAYCHO',
    dni: '75840140',
    historiaClinica: 'HC-000001',
  },
  fechaMuestra: '18/10/2026, 09:47 p. m.',
  usuarioMuestra: 'Gian Castañeda',
  examenes: [
    {
      id: 1,
      nombre: 'Biopsia Quirúrgica (con pieza operatoria)',
    },
    {
      id: 2,
      nombre: 'Hígado',
    },
  ],
};

export default function LaboratorioPreviewPage() {
  const [pantalla, setPantalla] =
    useState<EstadoPreview>('nueva');

  const [orden, setOrden] =
    useState<OrdenPreview>(ORDEN_INICIAL);

  const [examenSeleccionado, setExamenSeleccionado] =
    useState<number | null>(null);

  const [resultadoTemporal, setResultadoTemporal] =
    useState('');

  /*
   * Cuando se crea una nueva orden
   */
  const handleCrearOrden = (nuevaOrden: OrdenPreview) => {
    setOrden(nuevaOrden);
    setPantalla('en_analisis');
  };

  /*
   * Registrar resultado de un examen
   */
  const handleRegistrarResultado = (
    examenId: number,
    resultado: string
  ) => {
    setOrden((prev) => ({
      ...prev,
      examenes: prev.examenes.map((examen) =>
        examen.id === examenId
          ? {
              ...examen,
              resultado,
            }
          : examen
      ),
    }));

    setExamenSeleccionado(null);
    setResultadoTemporal('');

    /*
     * Revisamos cuántos exámenes ya tienen resultado
     */
    const nuevosExamenes = orden.examenes.map((examen) =>
      examen.id === examenId
        ? {
            ...examen,
            resultado,
          }
        : examen
    );

    const resultados = nuevosExamenes.filter(
      (examen) => examen.resultado?.trim()
    ).length;

    if (resultados === nuevosExamenes.length) {
      setPantalla('resultado_listo');
    } else {
      setPantalla('resultado_parcial');
    }
  };

  /*
   * Abrir formulario específico del examen
   */
  const abrirFormularioExamen = (examenId: number) => {
    setExamenSeleccionado(examenId);

    const examen = orden.examenes.find(
      (item) => item.id === examenId
    );

    setResultadoTemporal(examen?.resultado ?? '');
  };

  /*
   * Reiniciar todo el Preview
   */
  const reiniciar = () => {
    setOrden(ORDEN_INICIAL);
    setPantalla('nueva');
    setExamenSeleccionado(null);
    setResultadoTemporal('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* CABECERA DEL PREVIEW */}
      <div className="max-w-6xl mx-auto mb-6">

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
                Preview
              </p>

              <h1 className="text-lg font-bold text-gray-900">
                Secuencia de Laboratorio
              </h1>

              <p className="text-xs text-gray-400 mt-1">
                Entorno de prueba — no modifica el laboratorio original
              </p>
            </div>

            {/* NAVEGACIÓN DE PRUEBA */}
            <div className="flex flex-wrap gap-2">

              <button
                onClick={() => setPantalla('nueva')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  pantalla === 'nueva'
                    ? 'bg-[#0d7a71] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Nueva orden
              </button>

              <button
                onClick={() => setPantalla('en_analisis')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  pantalla === 'en_analisis'
                    ? 'bg-[#0d7a71] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                En análisis
              </button>

              <button
                onClick={() => setPantalla('resultado_parcial')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  pantalla === 'resultado_parcial'
                    ? 'bg-[#0d7a71] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Resultado parcial
              </button>

              <button
                onClick={() => setPantalla('resultado_listo')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  pantalla === 'resultado_listo'
                    ? 'bg-[#0d7a71] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Resultado listo
              </button>

              <button
                onClick={reiniciar}
                className="px-3 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50"
              >
                Reiniciar
              </button>

            </div>
          </div>

          {/* INDICADOR DE FLUJO */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">

            {[
              ['nueva', '1. Nueva orden'],
              ['en_analisis', '2. En análisis'],
              ['resultado_parcial', '3. Resultado parcial'],
              ['resultado_listo', '4. Resultado listo'],
            ].map(([estado, nombre], index) => {

              const activo = pantalla === estado;

              return (
                <div
                  key={estado}
                  className="flex items-center gap-2 shrink-0"
                >

                  <div
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold ${
                      activo
                        ? 'bg-[#0d7a71] text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {nombre}
                  </div>

                  {index < 3 && (
                    <span className="text-gray-300">
                      →
                    </span>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto">

        {pantalla === 'nueva' && (
          <NuevaOrden
            onCrearOrden={handleCrearOrden}
          />
        )}

        {pantalla === 'en_analisis' && (
          <Lab_enanalisis
            orden={orden}
            examenSeleccionado={examenSeleccionado}
            resultadoTemporal={resultadoTemporal}
            onAbrirFormulario={abrirFormularioExamen}
            onCerrarFormulario={() => {
              setExamenSeleccionado(null);
              setResultadoTemporal('');
            }}
            onResultadoChange={setResultadoTemporal}
            onGuardarResultado={handleRegistrarResultado}
          />
        )}

        {pantalla === 'resultado_parcial' && (
          <Lab_analisisparcial
            orden={orden}
            onAbrirFormulario={abrirFormularioExamen}
            examenSeleccionado={examenSeleccionado}
            resultadoTemporal={resultadoTemporal}
            onCerrarFormulario={() => {
              setExamenSeleccionado(null);
              setResultadoTemporal('');
            }}
            onResultadoChange={setResultadoTemporal}
            onGuardarResultado={handleRegistrarResultado}
          />
        )}

        {pantalla === 'resultado_listo' && (
          <Lab_resultadollisto
            orden={orden}
          />
        )}

      </div>
    </div>
  );
}