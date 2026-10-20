'use client';

import { useState } from 'react';

import type { OrdenPreview } from './page';

interface NuevaOrdenProps {
  onCrearOrden: (orden: OrdenPreview) => void;
}

export default function NuevaOrden({
  onCrearOrden,
}: NuevaOrdenProps) {

  const [dni, setDni] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');
  const [celular, setCelular] = useState('');

  const [biopsia, setBiopsia] = useState(false);
  const [higado, setHigado] = useState(false);

  const [error, setError] = useState('');

  const registrarOrden = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dni || dni.length !== 8) {
      setError('Ingresa un DNI válido de 8 dígitos.');
      return;
    }

    if (!nombres.trim() || !apellidos.trim()) {
      setError('Completa los nombres y apellidos.');
      return;
    }

    if (!biopsia && !higado) {
      setError('Selecciona al menos un examen.');
      return;
    }

    const examenes = [];

    if (biopsia) {
      examenes.push({
        id: 1,
        nombre: 'Biopsia Quirúrgica (con pieza operatoria)',
      });
    }

    if (higado) {
      examenes.push({
        id: 2,
        nombre: 'Hígado',
      });
    }

    const nuevaOrden: OrdenPreview = {
      id: 3,

      paciente: {
        nombres: nombres.toUpperCase(),
        apellidos: apellidos.toUpperCase(),
        dni,
        historiaClinica: 'HC-000001',
      },

      fechaMuestra: '18/10/2026, 09:47 p. m.',

      usuarioMuestra: 'Gian Castañeda',

      examenes,
    };

    onCrearOrden(nuevaOrden);
  };

  return (
    <div className="max-w-2xl mx-auto">

      <div className="bg-white rounded-[26px] border border-gray-100 shadow-sm overflow-hidden">

        {/* CABECERA */}
        <div className="px-6 py-5 border-b border-gray-100">

          <p className="text-[11px] uppercase tracking-wide font-bold text-gray-400">
            Laboratorio
          </p>

          <h2 className="text-lg font-bold text-gray-900">
            Nueva Orden de Laboratorio
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Registrar toma de muestra — fecha y hora automáticas
          </p>

        </div>

        <form
          onSubmit={registrarOrden}
          className="p-6 space-y-5"
        >

          {/* DNI */}
          <div>

            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              DNI del Paciente *
            </label>

            <div className="flex gap-2">

              <input
                value={dni}
                onChange={(e) =>
                  setDni(
                    e.target.value.replace(/\D/g, '').slice(0, 8)
                  )
                }
                placeholder="12345678"
                inputMode="numeric"
                className="h-11 flex-1 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/10"
              />

              <button
                type="button"
                className="h-11 px-4 rounded-xl bg-gray-100 text-xs font-bold text-gray-600 hover:bg-gray-200"
              >
                Buscar
              </button>

            </div>
          </div>

          {/* NOMBRES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Nombres *
              </label>

              <input
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="JUAN CARLOS"
                className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d7a71]"
              />

            </div>

            <div>

              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Apellidos *
              </label>

              <input
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="GARCÍA LÓPEZ"
                className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d7a71]"
              />

            </div>

          </div>

          {/* SEXO / CELULAR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Sexo
              </label>

              <select
                value={sexo}
                onChange={(e) =>
                  setSexo(e.target.value as 'M' | 'F')
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#0d7a71]"
              >
                <option value="M">
                  Masculino
                </option>

                <option value="F">
                  Femenino
                </option>
              </select>

            </div>

            <div>

              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Celular
              </label>

              <input
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="999 999 999"
                className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#0d7a71]"
              />

            </div>

          </div>

          {/* EXÁMENES */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="text-xs font-bold text-gray-700">
                Exámenes *
              </label>

              <span className="text-[11px] font-semibold text-[#0d7a71]">
                {[biopsia, higado].filter(Boolean).length} seleccionados
              </span>

            </div>

            <input
              placeholder="Buscar examen..."
              className="h-10 w-full rounded-xl border border-gray-200 px-3 text-xs outline-none focus:border-[#0d7a71] mb-3"
            />

            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-4">

              <div>

                <p className="text-[10px] uppercase tracking-wide font-bold text-gray-400 mb-2">
                  Anatomía Patológica
                </p>

                <label className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white cursor-pointer">

                  <input
                    type="checkbox"
                    checked={biopsia}
                    onChange={(e) =>
                      setBiopsia(e.target.checked)
                    }
                    className="rounded"
                  />

                  <span className="text-xs text-gray-700">
                    Biopsia Quirúrgica (con pieza operatoria)
                  </span>

                </label>

              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wide font-bold text-gray-400 mb-2">
                  Histología
                </p>

                <label className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white cursor-pointer">

                  <input
                    type="checkbox"
                    checked={higado}
                    onChange={(e) =>
                      setHigado(e.target.checked)
                    }
                    className="rounded"
                  />

                  <span className="text-xs text-gray-700">
                    Hígado
                  </span>

                </label>

              </div>

            </div>

          </div>

          {/* ERROR */}
          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* BOTONES */}
          <div className="grid grid-cols-2 gap-3 pt-2">

            <button
              type="button"
              onClick={() => {
                setDni('');
                setNombres('');
                setApellidos('');
                setCelular('');
                setBiopsia(false);
                setHigado(false);
                setError('');
              }}
              className="h-11 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50"
            >
              Limpiar
            </button>

            <button
              type="submit"
              className="h-11 rounded-xl bg-[#0d7a71] text-sm font-bold text-white hover:bg-[#0a625b] shadow-md shadow-[#0d7a71]/20"
            >
              Registrar Orden
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}