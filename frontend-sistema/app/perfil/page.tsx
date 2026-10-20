'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Sidebar, { useSidebar } from '../../components/Sidebar';
import { useRequireSesion } from '../../lib/useSesion';
import {
  actualizarPerfil,
  actualizarUsuarioSesion,
  cambiarPassword,
  obtenerPerfil,
  type PerfilBackend,
} from '../../lib/api';

const inputClass =
  'h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#0d7a71] focus:ring-2 focus:ring-[#0d7a71]/15 disabled:bg-gray-50 disabled:text-gray-500';
const labelClass = 'mb-1.5 block text-xs font-semibold text-gray-700';
const btnPrimary =
  'h-10 rounded-xl bg-[#0d7a71] px-5 text-sm font-bold text-white transition hover:bg-[#0a625b] disabled:cursor-not-allowed disabled:opacity-60';

const ROLES: Record<string, string> = {
  admin: 'Administrador',
  recepcion: 'Recepción',
  medico: 'Médico',
  laboratorio: 'Laboratorio',
};

const PASSWORD_MIN = 8;

function Aviso({ tipo, texto }: { tipo: 'ok' | 'error'; texto: string }) {
  if (!texto) return null;
  return (
    <p
      role={tipo === 'error' ? 'alert' : 'status'}
      className={`rounded-xl px-3 py-2 text-xs font-semibold ${
        tipo === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
      }`}
    >
      {texto}
    </p>
  );
}

export default function PerfilPage() {
  const { cargando } = useRequireSesion('/perfil');
  const { openSidebar } = useSidebar();

  const [perfil, setPerfil] = useState<PerfilBackend | null>(null);
  const [errorCarga, setErrorCarga] = useState('');

  // Datos personales
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [guardandoDatos, setGuardandoDatos] = useState(false);
  const [avisoDatos, setAvisoDatos] = useState<{ tipo: 'ok' | 'error'; texto: string }>({ tipo: 'ok', texto: '' });

  // Contraseña
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordRepetida, setPasswordRepetida] = useState('');
  const [guardandoPassword, setGuardandoPassword] = useState(false);
  const [avisoPassword, setAvisoPassword] = useState<{ tipo: 'ok' | 'error'; texto: string }>({ tipo: 'ok', texto: '' });

  const cargarFormulario = (datos: PerfilBackend) => {
    setPerfil(datos);
    setNombreUsuario(datos.nombreUsuario);
    setNombres(datos.nombres);
    setApellidos(datos.apellidos);
  };

  useEffect(() => {
    if (cargando) return;
    let cancelado = false;
    obtenerPerfil()
      .then((datos) => {
        if (!cancelado) cargarFormulario(datos);
      })
      .catch((err: unknown) => {
        if (!cancelado) setErrorCarga(err instanceof Error ? err.message : 'No se pudo cargar tu perfil.');
      });
    return () => {
      cancelado = true;
    };
  }, [cargando]);

  if (cargando) return null;

  const datosSinCambios =
    !perfil ||
    (nombreUsuario.trim() === perfil.nombreUsuario &&
      nombres.trim() === perfil.nombres &&
      apellidos.trim() === perfil.apellidos);

  const guardarDatos = async (e: FormEvent) => {
    e.preventDefault();
    setAvisoDatos({ tipo: 'ok', texto: '' });
    setGuardandoDatos(true);
    try {
      const actualizado = await actualizarPerfil({
        nombreUsuario: nombreUsuario.trim(),
        nombres: nombres.trim(),
        apellidos: apellidos.trim(),
      });
      cargarFormulario(actualizado);
      // Mantiene al día el nombre que muestra el menú lateral.
      actualizarUsuarioSesion({
        id: actualizado.id,
        nombreUsuario: actualizado.nombreUsuario,
        nombres: actualizado.nombres,
        apellidos: actualizado.apellidos,
        rol: actualizado.rol,
        esAdmin: actualizado.esAdmin,
      });
      setAvisoDatos({ tipo: 'ok', texto: 'Tus datos se guardaron correctamente.' });
    } catch (err) {
      setAvisoDatos({ tipo: 'error', texto: err instanceof Error ? err.message : 'No se pudo guardar.' });
    } finally {
      setGuardandoDatos(false);
    }
  };

  const guardarPassword = async (e: FormEvent) => {
    e.preventDefault();
    setAvisoPassword({ tipo: 'ok', texto: '' });

    if (passwordNueva.length < PASSWORD_MIN) {
      setAvisoPassword({ tipo: 'error', texto: `La contraseña nueva debe tener al menos ${PASSWORD_MIN} caracteres.` });
      return;
    }
    if (passwordNueva !== passwordRepetida) {
      setAvisoPassword({ tipo: 'error', texto: 'La confirmación no coincide con la contraseña nueva.' });
      return;
    }

    setGuardandoPassword(true);
    try {
      await cambiarPassword(passwordActual, passwordNueva);
      setPasswordActual('');
      setPasswordNueva('');
      setPasswordRepetida('');
      setAvisoPassword({ tipo: 'ok', texto: 'Tu contraseña se cambió correctamente.' });
    } catch (err) {
      setAvisoPassword({ tipo: 'error', texto: err instanceof Error ? err.message : 'No se pudo cambiar la contraseña.' });
    } finally {
      setGuardandoPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 min-h-16 bg-white border-b border-gray-100 flex items-center gap-3 px-4 sm:px-6 sticky top-0 z-30">
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
            <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">Mi Perfil</h1>
            <span className="hidden sm:inline text-[11px] text-gray-400 font-medium">
              Tus datos y tu contraseña
            </span>
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6">
          {errorCarga && <Aviso tipo="error" texto={errorCarga} />}

          {/* ===== DATOS DEL USUARIO ===== */}
          <section className="rounded-[22px] border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-bold text-gray-900">Datos del usuario</h2>
              {perfil && (
                <span className="rounded-full bg-[#0d7a71]/10 px-3 py-1 text-[11px] font-bold text-[#0d7a71]">
                  {ROLES[perfil.rol] ?? perfil.rol}
                </span>
              )}
            </div>

            <form onSubmit={guardarDatos} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombres" className={labelClass}>Nombres *</label>
                  <input id="nombres" required maxLength={100} value={nombres}
                    onChange={(e) => setNombres(e.target.value)} disabled={!perfil} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="apellidos" className={labelClass}>Apellidos *</label>
                  <input id="apellidos" required maxLength={100} value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)} disabled={!perfil} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="nombreUsuario" className={labelClass}>Nombre de usuario *</label>
                  <input id="nombreUsuario" required minLength={3} maxLength={50} value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)} disabled={!perfil} className={inputClass} />
                  <p className="mt-1 text-[11px] text-gray-400">Es el que usas para iniciar sesión.</p>
                </div>

                {perfil?.rol === 'medico' && (
                  <>
                    <div>
                      <label className={labelClass}>Especialidad</label>
                      <input value={perfil.especialidad ?? '—'} disabled className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>DNI</label>
                      <input value={perfil.dni ?? '—'} disabled className={inputClass} />
                    </div>
                    <p className="text-[11px] text-gray-400 sm:col-span-2">
                      La especialidad y el DNI los cambia el administrador desde Gestión de Usuarios.
                    </p>
                  </>
                )}
              </div>

              <Aviso tipo={avisoDatos.tipo} texto={avisoDatos.texto} />

              <div className="flex justify-end">
                <button type="submit" disabled={guardandoDatos || datosSinCambios} className={btnPrimary}>
                  {guardandoDatos ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </section>

          {/* ===== CONTRASEÑA ===== */}
          <section className="rounded-[22px] border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-1 text-base font-bold text-gray-900">Cambiar contraseña</h2>
            <p className="mb-4 text-xs text-gray-400">Mínimo {PASSWORD_MIN} caracteres.</p>

            <form onSubmit={guardarPassword} className="space-y-4">
              <div>
                <label htmlFor="passwordActual" className={labelClass}>Contraseña actual *</label>
                <input id="passwordActual" type="password" required autoComplete="current-password"
                  maxLength={72} value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="passwordNueva" className={labelClass}>Contraseña nueva *</label>
                  <input id="passwordNueva" type="password" required autoComplete="new-password"
                    minLength={PASSWORD_MIN} maxLength={72} value={passwordNueva}
                    onChange={(e) => setPasswordNueva(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="passwordRepetida" className={labelClass}>Repetir contraseña nueva *</label>
                  <input id="passwordRepetida" type="password" required autoComplete="new-password"
                    maxLength={72} value={passwordRepetida}
                    onChange={(e) => setPasswordRepetida(e.target.value)} className={inputClass} />
                </div>
              </div>

              <Aviso tipo={avisoPassword.tipo} texto={avisoPassword.texto} />

              <div className="flex justify-end">
                <button type="submit" disabled={guardandoPassword} className={btnPrimary}>
                  {guardandoPassword ? 'Cambiando...' : 'Cambiar contraseña'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
