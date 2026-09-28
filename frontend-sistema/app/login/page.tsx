'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [logoLoaded, setLogoLoaded] = useState(true);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      router.push('/citas');
    } else {
      setError('Por favor ingrese sus credenciales completas.');
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f4f7f7] font-sans">

      <div className="flex min-h-screen w-full">

        {/* =====================================================
            PANEL IZQUIERDO
        ====================================================== */}
        <section className="relative hidden overflow-hidden bg-[#0d7f75] text-white lg:flex lg:w-[54%]">

          {/* Fondo decorativo */}
          <div className="absolute inset-0 overflow-hidden">

            <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-white/5" />

            <div className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-black/5" />

            <div className="absolute right-[10%] top-[18%] h-32 w-32 rounded-full border border-white/10" />

            <div className="absolute right-[15%] top-[23%] h-20 w-20 rounded-full border border-white/10" />

            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage: `url('/bg-medical.jpg')`,
              }}
            />

          </div>

          {/* Contenido */}
          <div className="relative z-10 flex w-full flex-col px-10 py-10 xl:px-16">


            {/* =================================================
                CONTENIDO PRINCIPAL
            ================================================== */}
            <div className="my-auto max-w-[650px] py-10">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm">

                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />

                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-50">
                  Plataforma Médica
                </span>

              </div>


              <h1 className="max-w-[600px] text-4xl font-extrabold leading-[1.1] tracking-tight xl:text-5xl">
                Gestión médica
                <span className="block text-emerald-100">
                  simple y eficiente.
                </span>
              </h1>


              <p className="mt-5 max-w-[590px] text-sm leading-7 text-emerald-50/90 xl:text-base">
                Administre pacientes, laboratorio clínico y programación
                de citas desde una plataforma centralizada, moderna y
                fácil de utilizar.
              </p>


              {/* =================================================
                  CARACTERÍSTICAS
              ================================================== */}
              <div className="mt-8 grid grid-cols-3 gap-3">

                {/* Pacientes */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12]">

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">

                    <svg
                      className="h-5 w-5 text-emerald-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                  </div>

                  <p className="text-sm font-bold">
                    Pacientes
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-emerald-100/70">
                    Expedientes organizados
                  </p>

                </div>


                {/* Laboratorio */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12]">

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">

                    <svg
                      className="h-5 w-5 text-emerald-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M9 3h6m-3 0v6m-4 0h8l3 9a2 2 0 01-2 2H7a2 2 0 01-2-2l3-9z"
                      />
                    </svg>

                  </div>

                  <p className="text-sm font-bold">
                    Laboratorio
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-emerald-100/70">
                    Órdenes y resultados
                  </p>

                </div>


                {/* Citas */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12]">

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">

                    <svg
                      className="h-5 w-5 text-emerald-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M8 7V3m8 4V3M5 11h14M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
                      />
                    </svg>

                  </div>

                  <p className="text-sm font-bold">
                    Citas
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-emerald-100/70">
                    Agenda y programación
                  </p>

                </div>

              </div>


              {/* =================================================
                  MÉTRICAS
              ================================================== */}
              <div className="mt-8 grid max-w-[500px] grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-black/[0.06]">

                <div className="border-r border-white/10 px-5 py-4">

                  <div className="flex items-end gap-2">

                    <span className="text-3xl font-extrabold tracking-tight">
                      100%
                    </span>

                  </div>

                  <p className="mt-1 text-[11px] font-medium text-emerald-100/75">
                    Seguridad de Datos
                  </p>

                </div>


                <div className="px-5 py-4">

                  <div className="text-3xl font-extrabold tracking-tight">
                    24/7
                  </div>

                  <p className="mt-1 text-[11px] font-medium text-emerald-100/75">
                    Disponibilidad del Sistema
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                PIE
            ================================================== */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5">

              <div className="flex items-center gap-2 text-[11px] text-emerald-100/70">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

                Plataforma administrativa

              </div>

              <span className="text-[11px] text-emerald-100/50">
                Chrisal-Lab
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            PANEL DERECHO
        ====================================================== */}
        <section className="flex min-h-screen w-full items-center justify-center bg-[#f5f7f8] px-5 py-8 sm:px-8 lg:w-[46%] lg:px-12">

          <div className="w-full max-w-[470px]">

            {/* Pequeño encabezado externo */}
            <div className="mb-5 text-center lg:hidden">

              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-sm">

                {logoLoaded ? (
                  <img
                    src="/logo.png"
                    alt="Chrisal Lab"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="font-bold text-[#0d7f75]">
                    CL
                  </span>
                )}

              </div>

              <p className="text-sm font-bold text-gray-800">
                Policlínico Chrisal-Lab
              </p>

            </div>


            {/* =================================================
                CARD LOGIN
            ================================================== */}
            <div className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white p-7 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.20)] sm:p-9">

              {/* Línea decorativa superior */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#0d7f75] via-emerald-400 to-[#0d7f75]" />


              {/* Encabezado */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">

                  {logoLoaded ? (
                    <img
                      src="/logo.png"
                      alt="Chrisal Lab Logo"
                      className="h-full w-full object-contain"
                      onError={() => setLogoLoaded(false)}
                    />
                  ) : (
                    <span className="text-xl font-extrabold text-[#0d7f75]">
                      CL
                    </span>
                  )}

                </div>


                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-[10px] font-bold text-emerald-700">
                  Acceso Restringido
                </span>

              </div>


              {/* Título */}
              <div className="mt-7">

                <h2 className="text-[28px] font-extrabold tracking-tight text-gray-900">
                  Iniciar Sesión
                </h2>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Ingrese sus credenciales para acceder al panel administrativo.
                </p>

              </div>


              {/* Error */}
              {error && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-600">

                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>
                    {error}
                  </span>

                </div>
              )}


              {/* =================================================
                  FORMULARIO
              ================================================== */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >

                {/* Usuario */}
                <div>

                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    Usuario / Correo
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                      <svg
                        className="h-[18px] w-[18px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.7"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>

                    </span>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="usuario@chrisal.com"
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/60 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0d7f75] focus:bg-white focus:ring-4 focus:ring-[#0d7f75]/10"
                    />

                  </div>

                </div>


                {/* Contraseña */}
                <div>

                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    Contraseña
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                      <svg
                        className="h-[18px] w-[18px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.7"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>

                    </span>


                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/60 pl-11 pr-12 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0d7f75] focus:bg-white focus:ring-4 focus:ring-[#0d7f75]/10"
                    />


                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#0d7f75] focus:outline-none"
                      aria-label={
                        showPassword
                          ? 'Ocultar contraseña'
                          : 'Mostrar contraseña'
                      }
                    >

                      {showPassword ? (

                        <svg
                          className="h-[18px] w-[18px]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>

                      ) : (

                        <svg
                          className="h-[18px] w-[18px]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.038 10.038 0 013.122-.863c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"
                          />
                        </svg>

                      )}

                    </button>

                  </div>

                </div>


                {/* Recuperar contraseña */}
                <div className="flex justify-end">

                  <a
                    href="#"
                    className="text-xs font-bold text-[#0d7f75] transition-colors hover:text-[#09655d] hover:underline"
                  >
                    ¿Olvidó su contraseña?
                  </a>

                </div>


                {/* Botón */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d7f75] text-sm font-bold text-white shadow-lg shadow-[#0d7f75]/20 transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#096b63] hover:shadow-xl hover:shadow-[#0d7f75]/25 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#0d7f75]/20"
                >

                  <span>
                    Acceder al Sistema
                  </span>

                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>

                </button>

              </form>


              {/* =================================================
                  SEGURIDAD
              ================================================== */}
              <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-5">

                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50">

                  <svg
                    className="h-3.5 w-3.5 text-[#0d7f75]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>

                </div>

                <span className="text-[10px] font-medium text-gray-400">
                  Sus datos están protegidos y son confidenciales
                </span>

              </div>

            </div>


            {/* Texto inferior */}
            <p className="mt-5 text-center text-[10px] text-gray-400">
              © {new Date().getFullYear()} Policlínico Chrisal-Lab
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}