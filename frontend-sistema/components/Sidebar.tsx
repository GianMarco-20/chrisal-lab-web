'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { obtenerUsuario, cerrarSesion } from '../lib/api';

// =============================================
// CONTEXTO DEL SIDEBAR (estado compartido)
// =============================================
interface SidebarContextType {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Bloquear scroll del body cuando el sidebar móvil está abierto
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar debe usarse dentro de <SidebarProvider>');
  }
  return context;
}

// =============================================
// ITEMS DE NAVEGACIÓN
// =============================================
interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
  soloAdmin?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/citas',
    label: 'Gestión de Citas',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/pacientes',
    label: 'Directorio Pacientes',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: '/laboratorio',
    label: 'Órdenes Laboratorio',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    href: '/programacion-medica',
    label: 'Programación Médica',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/usuarios',
    label: 'Gestión de Usuarios',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    soloAdmin: true,
  },
];

// =============================================
// COMPONENTE SIDEBAR
// =============================================
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, closeSidebar } = useSidebar();
  const [logoLoaded, setLogoLoaded] = useState(true);
  // Este componente solo se monta dentro de páginas ya protegidas por
  // useRequireSesion, así que para cuando se renderiza siempre hay sesión.
  const usuario = obtenerUsuario();

  const handleLogout = () => {
    cerrarSesion();
    router.push('/login');
  };

  return (
    <>
      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50 lg:z-20
          h-screen
          w-72 lg:w-64
          bg-white
          border-r border-gray-100
          flex flex-col
          shrink-0
          shadow-xl lg:shadow-none
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-5 sm:p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm shrink-0">
            {logoLoaded ? (
              <img
                src="/logo.png"
                alt="Chrisal Lab Logo"
                className="h-full w-full object-contain"
                onError={() => setLogoLoaded(false)}
              />
            ) : (
              <span className="text-lg font-bold text-[#0d7a71]">CL</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold text-gray-900 text-sm truncate tracking-tight">
              Chrisal-Lab
            </h2>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 inline-block mt-0.5">
              Panel Recepción
            </span>
          </div>

          <button
            onClick={closeSidebar}
            className="lg:hidden h-9 w-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Cerrar menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navegación */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {NAV_ITEMS.filter((item) => !item.soloAdmin || usuario?.esAdmin).map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl text-xs transition-all
                  ${
                    isActive
                      ? 'bg-[#0d7a71] text-white font-semibold shadow-md shadow-[#0d7a71]/20 hover:bg-[#0b6e66]'
                      : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              {usuario?.rol ?? 'Sistema'}
            </p>
            <p className="text-xs font-medium text-gray-700 mt-1 truncate">
              {usuario ? `${usuario.nombres} ${usuario.apellidos}` : 'Panel de Recepción'}
            </p>
            <button
              onClick={handleLogout}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 text-[11px] font-semibold text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}