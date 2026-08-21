import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ServiciosPage from '../pages/ServiciosPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Ruta de la Portada */}
      <Route path="/" element={<Home />} />

      {/* Ruta de Servicios */}
      <Route path="/servicios" element={<ServiciosPage />} />
    </Routes>
  );
}