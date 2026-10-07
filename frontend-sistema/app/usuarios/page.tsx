'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireSesion } from '../../lib/useSesion';
import Sidebar, { useSidebar } from '../../components/Sidebar';
import UsuariosTable, { Usuario } from '../../components/UsuariosTable';

const MOCK_USUARIOS: Usuario[] = [
  {
    id: 1,
    nombreUsuario: 'admin',
    nombres: 'Administrador',
    apellidos: 'Principal',
    rol: 'admin',
    activo: true,
    fechaCreacion: new Date().toISOString(),
    ultimoLogin: new Date().toISOString(),
    medicoId: null,
  },
  {
    id: 2,
    nombreUsuario: 'recepcion1',
    nombres: 'María',
    apellidos: 'García',
    rol: 'recepcion',
    activo: true,
    fechaCreacion: new Date(Date.now() - 86400000 * 5).toISOString(),
    ultimoLogin: new Date(Date.now() - 3600000 * 2).toISOString(),
    medicoId: null,
  },
  {
    id: 3,
    nombreUsuario: 'medico1',
    nombres: 'Carlos',
    apellidos: 'López',
    rol: 'medico',
    activo: true,
    fechaCreacion: new Date(Date.now() - 86400000 * 10).toISOString(),
    ultimoLogin: new Date(Date.now() - 3600000 * 24).toISOString(),
    medicoId: 1,
    especialidad: 'Cardiología',
    dni: '12345678',
  },
];

export default function UsuariosPage() {
  const { cargando } = useRequireSesion();
  const { openSidebar } = useSidebar();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [form, setForm] = useState({
    nombreUsuario: '',
    password: '',
    nombres: '',
    apellidos: '',
    rol: 'recepcion',
    // Si es médico:
    especialidad: '',
    dni: '',
  });

  useEffect(() => {
    setUsuarios(MOCK_USUARIOS);
  }, []);

  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0d7a71]/20 border-t-[#0d7a71]" />
          <p className="text-sm font-semibold text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleCrearUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;
    const isMedico = form.rol === 'medico';

    const nuevoUsuario: Usuario = {
      id: newId,
      nombreUsuario: form.nombreUsuario,
      nombres: form.nombres,
      apellidos: form.apellidos,
      rol: form.rol as any,
      activo: true,
      fechaCreacion: new Date().toISOString(),
      ultimoLogin: null,
      medicoId: isMedico ? newId + 100 : null,
      especialidad: isMedico ? form.especialidad : undefined,
      dni: isMedico ? form.dni : undefined,
    };

    setUsuarios([nuevoUsuario, ...usuarios]);
    setShowModal(false);
    setForm({
      nombreUsuario: '',
      password: '',
      nombres: '',
      apellidos: '',
      rol: 'recepcion',
      especialidad: '',
      dni: '',
    });
  };

  const handleUpdateUsuario = (updated: Usuario) => {
    setUsuarios((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const totalUsuarios = usuarios.length;
  const totalAdmin = usuarios.filter(u => u.rol === 'admin').length;
  const totalRecepcion = usuarios.filter(u => u.rol === 'recepcion').length;
  const totalMedico = usuarios.filter(u => u.rol === 'medico').length;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* SIDEBAR COMPARTIDO */}
      <Sidebar />

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 min-w-0 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 min-h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={openSidebar}
              className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors shrink-0"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                Gestión de Usuarios
              </h1>
              <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">
                Panel de Administración
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-[#0d7a71] hover:bg-[#0a625b] text-white px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#0d7a71]/20 transition-all active:scale-[0.98] shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Agregar Usuario</span>
            <span className="sm:hidden">Agregar</span>
          </button>
        </header>

        {/* CONTENIDO */}
        <div className="flex-1 p-4 sm:p-5 lg:p-6 space-y-5 sm:space-y-6 overflow-x-hidden">
          
          {/* TARJETAS DE INFORMACIÓN */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Total Usuarios</p>
                  <p className="text-lg sm:text-2xl font-black text-gray-900 mt-0.5">{totalUsuarios}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Admin</p>
                  <p className="text-lg sm:text-2xl font-black text-gray-900 mt-0.5">{totalAdmin}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Recepción</p>
                  <p className="text-lg sm:text-2xl font-black text-gray-900 mt-0.5">{totalRecepcion}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Médicos</p>
                  <p className="text-lg sm:text-2xl font-black text-gray-900 mt-0.5">{totalMedico}</p>
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#0d7a71] rounded-full" />
                Directorio de Usuarios
              </h2>
            </div>
            <UsuariosTable usuarios={usuarios} onUpdateUsuario={handleUpdateUsuario} />
          </section>
        </div>
      </main>

      {/* MODAL AGREGAR USUARIO */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Agregar Nuevo Usuario</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="crear-usuario-form" onSubmit={handleCrearUsuario} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombres *</label>
                    <input required type="text" value={form.nombres} onChange={(e) => setForm({...form, nombres: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Apellidos *</label>
                    <input required type="text" value={form.apellidos} onChange={(e) => setForm({...form, apellidos: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombre de Usuario *</label>
                    <input required type="text" value={form.nombreUsuario} onChange={(e) => setForm({...form, nombreUsuario: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contraseña *</label>
                    <input required type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Rol *</label>
                  <select required value={form.rol} onChange={(e) => setForm({...form, rol: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 outline-none">
                    <option value="recepcion">Recepción</option>
                    <option value="admin">Administrador</option>
                    <option value="laboratorio">Laboratorio</option>
                    <option value="medico">Médico</option>
                  </select>
                </div>

                {form.rol === 'medico' && (
                  <div className="mt-6 p-5 border border-[#0d7a71]/20 bg-[#0d7a71]/5 rounded-xl space-y-4">
                    <h4 className="text-sm font-bold text-[#0d7a71] flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Registro de Perfil Médico
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Especialidad *</label>
                        <select required value={form.especialidad} onChange={(e) => setForm({...form, especialidad: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 outline-none bg-white">
                          <option value="">Seleccione especialidad</option>
                          <option value="Medicina General">Medicina General</option>
                          <option value="Cardiología">Cardiología</option>
                          <option value="Neurología">Neurología</option>
                          <option value="Fisioterapia">Fisioterapia</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">DNI *</label>
                        <input required type="text" value={form.dni} onChange={(e) => setForm({...form, dni: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 outline-none bg-white" />
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button type="button" onClick={() => setShowModal(false)} className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancelar</button>
              <button type="submit" form="crear-usuario-form" className="rounded-xl bg-[#0d7a71] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 hover:bg-[#0a625b] transition-colors">Guardar Usuario</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
