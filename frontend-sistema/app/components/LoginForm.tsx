'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface Cita {
  id: number;
  dni: string;
  paciente: string;
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  estado: string;
}

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [form, setForm] = useState({
    dni: '',
    paciente: '',
    especialidad: 'Medicina General',
    medico: '',
    fecha: '',
    hora: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCita = (e: FormEvent) => {
    e.preventDefault();
    const nuevaCita: Cita = {
      ...form,
      id: Date.now(),
      estado: 'Programada',
    };
    setCitas([...citas, nuevaCita]);
    setForm({
      dni: '',
      paciente: '',
      especialidad: 'Medicina General',
      medico: '',
      fecha: '',
      hora: '',
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Módulo de Recepción - Gestión de Citas</h1>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Programar Cita Médica</h2>
        <form onSubmit={handleAddCita} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600">DNI Paciente</label>
            <input
              type="text"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Nombre del Paciente</label>
            <input
              type="text"
              name="paciente"
              value={form.paciente}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Especialidad</label>
            <select
              name="especialidad"
              value={form.especialidad}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            >
              <option value="Medicina General">Medicina General</option>
              <option value="Urología">Urología</option>
              <option value="Obstetricia">Obstetricia</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Médico Asignado</label>
            <input
              type="text"
              name="medico"
              value={form.medico}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Hora</label>
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 text-sm"
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Registrar Cita
            </button>
          </div>
        </form>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase">
              <th className="p-3">DNI</th>
              <th className="p-3">Paciente</th>
              <th className="p-3">Especialidad</th>
              <th className="p-3">Médico</th>
              <th className="p-3">Fecha / Hora</th>
              <th className="p-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {citas.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No hay citas registradas.
                </td>
              </tr>
            ) : (
              citas.map((cita) => (
                <tr key={cita.id}>
                  <td className="p-3">{cita.dni}</td>
                  <td className="p-3 font-medium">{cita.paciente}</td>
                  <td className="p-3">{cita.especialidad}</td>
                  <td className="p-3">{cita.medico}</td>
                  <td className="p-3">{cita.fecha} - {cita.hora}</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {cita.estado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}