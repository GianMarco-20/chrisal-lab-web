'use client';

import Sidebar, { useSidebar } from '../../components/Sidebar';
import { useRequireSesion } from '../../lib/useSesion';

// Pantalla base de Órdenes de Laboratorio: ya protegida por rol
// (recepción y laboratorio); el listado de órdenes se construye sobre
// /cita-examenes en el siguiente paso.
export default function LaboratorioPage() {
  const { cargando } = useRequireSesion('/laboratorio');
  const { openSidebar } = useSidebar();

  if (cargando) return null;

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
          <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">Órdenes de Laboratorio</h1>
        </header>
        <div className="p-4 sm:p-6 text-sm text-gray-500">Próximamente: listado de órdenes de laboratorio.</div>
      </main>
    </div>
  );
}
