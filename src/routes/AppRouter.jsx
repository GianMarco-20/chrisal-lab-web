import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ServiciosPage from '../pages/Servicios';
import MedicinaGeneral from '../pages/servicios/MedicinaGeneral';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<ServiciosPage />} />
      <Route path="/servicios/medicina-general" element={<MedicinaGeneral />} />
    </Routes>
  );
}