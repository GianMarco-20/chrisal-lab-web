'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [logoLoaded, setLogoLoaded] = useState(true);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
    <div className="flex min-h-screen w-full font-sans bg-gray-100">
      {/* SECCIÓN IZQUIERDA: LADO INFORMATIVO */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0d7a71] flex-col justify-between p-12 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
          style={{ backgroundImage: `url('/bg-medical.jpg')` }}
        />
        
        {/* Tag Superior */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SISTEMA MÉDICO V1.0
          </span>
        </div>

        {/* Texto Central */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Policlínico Chrisal-Lab
          </h1>
          <p className="text-emerald-100 text-base leading-relaxed mb-6">
            Plataforma integral de gestión médica y laboratorio clínico. Acceda a expedientes de pacientes, órdenes de laboratorio y programación de citas.
          </p>

          {/* Tarjeta de métricas decorativa */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs text-emerald-200">Seguridad de Datos</p>
            </div>
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-emerald-200">Disponibilidad del Sistema</p>
            </div>
          </div>
        </div>

        {/* Pie Informativo */}
        <div className="relative z-10 flex items-center justify-between text-xs text-emerald-200 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Conexión cifrada SSL 256-bit</span>
          </div>
          <span>v1.0.4</span>
        </div>
      </div>

      {/* SECCIÓN DERECHA: FORMULARIO */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-gray-50/50">
        <div className="w-full max-w-[460px] bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
          
          {/* Cabecera del Formulario con Logo y Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
              {logoLoaded ? (
                <img
                  src="/logo.png"
                  alt="Chrisal Lab Logo"
                  className="h-full w-full object-contain"
                  onError={() => setLogoLoaded(false)}
                />
              ) : (
                <span className="text-xl font-bold text-[#0d7a71]">CL</span>
              )}
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Acceso Restringido
            </span>
          </div>

          {/* Título y Subtítulo */}
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Iniciar Sesión</h2>
          <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
            Ingrese sus credenciales para acceder al panel administrativo.
          </p>

          {/* Mensaje de Error */}
          {error && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-100 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Campo Correo */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Usuario / Correo
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="usuario@chrisal.com"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-xs text-gray-800 placeholder-gray-400 transition-all focus:border-[#0d7a71] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0d7a71]/20"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-10 text-xs text-gray-800 placeholder-gray-400 transition-all focus:border-[#0d7a71] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0d7a71]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.038 10.038 0 013.122-.863c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Opciones Adicionales */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-3.5 w-3.5 rounded border-gray-300 text-[#0d7a71] focus:ring-[#0d7a71]"
                />
                <span className="ml-2 font-medium">Mantener sesión activa</span>
              </label>
              <a href="#" className="font-semibold text-[#0d7a71] hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>

            {/* Botón de Entrada */}
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d7a71] py-3 text-xs font-bold text-white shadow-md shadow-[#0d7a71]/20 transition-all hover:bg-[#0a625b] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#0d7a71]"
            >
              <span>Acceder al Sistema</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Tarjeta de Soporte y Ayuda Integrada */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[#0d7a71]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="font-medium text-gray-600">Soporte Técnico</span>
            </div>
            <a href="#" className="font-semibold text-[#0d7a71] hover:underline">
              Mesa de Ayuda TI
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}