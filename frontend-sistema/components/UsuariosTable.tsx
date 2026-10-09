'use client';

import { useMemo, useState } from 'react';

export interface Usuario {
  id: number;
  nombreUsuario: string;
  nombres: string;
  apellidos: string;
  rol: 'admin' | 'recepcion' | 'medico' | 'laboratorio';
  activo: boolean;
  fechaCreacion: string;
  ultimoLogin: string | null;
  medicoId: number | null;
  especialidad?: string;
  dni?: string;
}

interface UsuariosTableProps {
  usuarios: Usuario[];
  // password solo viene definido si se escribió una nueva en el formulario.
  onUpdateUsuario: (usuario: Usuario, password?: string) => Promise<void>;
}

function UserIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CalendarIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ShieldIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function formatFecha(fecha: string) {
  if (!fecha) return '---';
  const d = new Date(fecha);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function UsuariosTable({ usuarios, onUpdateUsuario }: UsuariosTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  
  // Modals for editing
  const [modalEditActivo, setModalEditActivo] = useState(false);
  const [modalEditServiceActivo, setModalEditServiceActivo] = useState(false);
  
  const [editForm, setEditForm] = useState<Partial<Usuario> & { password?: string }>({});
  const [guardandoEdit, setGuardandoEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState('');
  const [guardandoService, setGuardandoService] = useState(false);
  const [errorService, setErrorService] = useState('');

  const usuariosProcesados = useMemo(() => {
    if (!searchTerm.trim()) return usuarios;
    const text = searchTerm.toLowerCase();
    return usuarios.filter(
      (u) =>
        u.nombres.toLowerCase().includes(text) ||
        u.apellidos.toLowerCase().includes(text) ||
        u.nombreUsuario.toLowerCase().includes(text)
    );
  }, [usuarios, searchTerm]);

  const handleEditClick = () => {
    if (!usuarioSeleccionado) return;
    setErrorEdit('');
    setEditForm({
      nombres: usuarioSeleccionado.nombres,
      apellidos: usuarioSeleccionado.apellidos,
      nombreUsuario: usuarioSeleccionado.nombreUsuario,
      rol: usuarioSeleccionado.rol,
      activo: usuarioSeleccionado.activo,
      password: '',
    });
    setModalEditActivo(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioSeleccionado) return;
    const actualizado = { ...usuarioSeleccionado, ...editForm } as Usuario;
    setErrorEdit('');
    setGuardandoEdit(true);
    try {
      await onUpdateUsuario(actualizado, editForm.password || undefined);
      setModalEditActivo(false);
      setUsuarioSeleccionado(actualizado);
    } catch (err) {
      setErrorEdit(err instanceof Error ? err.message : 'No se pudo guardar el usuario.');
    } finally {
      setGuardandoEdit(false);
    }
  };

  const handleChangeServiceClick = () => {
    if (!usuarioSeleccionado) return;
    setErrorService('');
    setEditForm({
      especialidad: usuarioSeleccionado.especialidad || '',
    });
    setModalEditServiceActivo(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioSeleccionado) return;
    const actualizado = { ...usuarioSeleccionado, especialidad: editForm.especialidad } as Usuario;
    setErrorService('');
    setGuardandoService(true);
    try {
      await onUpdateUsuario(actualizado);
      setModalEditServiceActivo(false);
      setUsuarioSeleccionado(actualizado);
    } catch (err) {
      setErrorService(err instanceof Error ? err.message : 'No se pudo actualizar la especialidad.');
    } finally {
      setGuardandoService(false);
    }
  };

  const getRoleBadge = (rol: string) => {
    switch (rol) {
      case 'admin': return <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">Administrador</span>;
      case 'recepcion': return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">Recepción</span>;
      case 'medico': return <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">Médico</span>;
      case 'laboratorio': return <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Laboratorio</span>;
      default: return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">{rol}</span>;
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-3 sm:p-4 mb-4">
        <div className="relative max-w-md">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, apellido o usuario..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">USUARIO</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">NOMBRES Y APELLIDOS</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">ROL</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">CREACIÓN</th>
                <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">ESTADO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usuariosProcesados.map((u) => (
                <tr key={u.id} onClick={() => setUsuarioSeleccionado(u)} className="cursor-pointer hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-4 text-xs font-bold text-gray-900">{u.nombreUsuario}</td>
                  <td className="px-4 py-4 text-xs text-gray-700">{u.nombres} {u.apellidos}</td>
                  <td className="px-4 py-4">{getRoleBadge(u.rol)}</td>
                  <td className="px-4 py-4 text-xs text-gray-500">{formatFecha(u.fechaCreacion)}</td>
                  <td className="px-4 py-4">
                    {u.activo ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Inactivo
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETALLE USUARIO */}
      {usuarioSeleccionado && !modalEditActivo && !modalEditServiceActivo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) setUsuarioSeleccionado(null); }}>
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <UserIcon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Detalle del Usuario</h3>
                  <p className="mt-1 text-sm text-gray-500">Información y opciones de cuenta</p>
                </div>
              </div>
              <button onClick={() => setUsuarioSeleccionado(null)} className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 bg-gray-50/50 space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Nombres y Apellidos</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">{usuarioSeleccionado.nombres} {usuarioSeleccionado.apellidos}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Nombre de Usuario</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">{usuarioSeleccionado.nombreUsuario}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Rol del Sistema</p>
                    <div className="mt-1">{getRoleBadge(usuarioSeleccionado.rol)}</div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Estado de la cuenta</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">{usuarioSeleccionado.activo ? 'Activo' : 'Inactivo'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Fecha Creación</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800 flex items-center gap-1.5"><CalendarIcon size={14}/> {formatFecha(usuarioSeleccionado.fechaCreacion)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Último Acceso</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">{formatFecha(usuarioSeleccionado.ultimoLogin || '')}</p>
                  </div>
                </div>
              </div>
              
              {usuarioSeleccionado.medicoId && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                      <ShieldIcon size={16} /> Perfil Médico Vinculado
                    </h4>
                    <p className="mt-1.5 text-xs text-emerald-700">DNI: {usuarioSeleccionado.dni} • Especialidad: <b>{usuarioSeleccionado.especialidad}</b></p>
                  </div>
                  <button onClick={handleChangeServiceClick} className="rounded-xl bg-white border border-emerald-200 px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors shadow-sm">
                    Cambiar Servicio
                  </button>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button onClick={handleEditClick} className="rounded-xl bg-[#0d7a71] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 hover:bg-[#0a625b] transition-colors">
                Editar Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR USUARIO */}
      {modalEditActivo && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Editar Usuario</h3>
              <button onClick={() => setModalEditActivo(false)} className="text-gray-400 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="edit-user-form" onSubmit={handleSaveEdit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombres</label>
                    <input required type="text" value={editForm.nombres} onChange={(e) => setEditForm({...editForm, nombres: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Apellidos</label>
                    <input required type="text" value={editForm.apellidos} onChange={(e) => setEditForm({...editForm, apellidos: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombre de Usuario</label>
                    <input required type="text" value={editForm.nombreUsuario} onChange={(e) => setEditForm({...editForm, nombreUsuario: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nueva Contraseña <span className="text-gray-400 font-normal">(Opcional)</span></label>
                    <input type="password" placeholder="Dejar en blanco para no cambiar" value={editForm.password} onChange={(e) => setEditForm({...editForm, password: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Rol</label>
                    <select required value={editForm.rol} onChange={(e) => setEditForm({...editForm, rol: e.target.value as Usuario['rol']})} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15">
                      <option value="recepcion">Recepción</option>
                      <option value="admin">Administrador</option>
                      <option value="laboratorio">Laboratorio</option>
                      <option value="medico">Médico</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editForm.activo} onChange={(e) => setEditForm({...editForm, activo: e.target.checked})} className="w-4 h-4 text-[#0d7a71] rounded border-gray-300 focus:ring-[#0d7a71]" />
                      <span className="text-sm font-semibold text-gray-700">Cuenta Activa</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
              {errorEdit && <p className="mr-auto text-xs font-semibold text-red-600">{errorEdit}</p>}
              <button type="button" onClick={() => setModalEditActivo(false)} disabled={guardandoEdit} className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:cursor-not-allowed disabled:opacity-60">Cancelar</button>
              <button type="submit" form="edit-user-form" disabled={guardandoEdit} className="rounded-xl bg-[#0d7a71] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 hover:bg-[#0a625b] transition-colors disabled:cursor-not-allowed disabled:opacity-60">{guardandoEdit ? 'Guardando...' : 'Guardar Cambios'}</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CAMBIAR SERVICIO */}
      {modalEditServiceActivo && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Cambiar Servicio/Especialidad</h3>
              <button onClick={() => setModalEditServiceActivo(false)} className="text-gray-400 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <form id="edit-service-form" onSubmit={handleSaveService} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Especialidad Asignada</label>
                  <select required value={editForm.especialidad} onChange={(e) => setEditForm({...editForm, especialidad: e.target.value})} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15">
                    <option value="">Seleccione especialidad</option>
                    <option value="Medicina General">Medicina General</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Neurología">Neurología</option>
                    <option value="Fisioterapia">Fisioterapia</option>
                    <option value="Obstetricia">Obstetricia</option>
                    <option value="Urología">Urología</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
              {errorService && <p className="mr-auto text-xs font-semibold text-red-600">{errorService}</p>}
              <button type="button" onClick={() => setModalEditServiceActivo(false)} disabled={guardandoService} className="rounded-xl px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:cursor-not-allowed disabled:opacity-60">Cancelar</button>
              <button type="submit" form="edit-service-form" disabled={guardandoService} className="rounded-xl bg-[#0d7a71] px-4 py-2 text-sm font-bold text-white shadow-md shadow-[#0d7a71]/20 hover:bg-[#0a625b] transition-colors disabled:cursor-not-allowed disabled:opacity-60">{guardandoService ? 'Guardando...' : 'Actualizar Especialidad'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
