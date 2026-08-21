import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ServiciosPage from '../pages/Servicios';
import Laboratorio from '../pages/Laboratorio';
import AtencionDomicilio from '../pages/AtencionDomicilio';

// Importar servicios individuales
import MedicinaGeneral from '../pages/servicios/MedicinaGeneral';
import Urologia from '../pages/servicios/Urologia';
import Obstetricia from '../pages/servicios/Obstetricia';
import Neurologia from '../pages/servicios/Neurologia';
import Fisioterapia from '../pages/servicios/Fisioterapia';
import Podologia from '../pages/servicios/Podologia';
import Flebologia from '../pages/servicios/Flebologia';
import Endocrinologia from '../pages/servicios/Endocrinologia';

export default function AppRouter() {
  return (
    <Routes>
      {/* Paginas Principales */}
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<ServiciosPage />} />
      <Route path="/laboratorio" element={<Laboratorio />} />
      <Route path="/atencion-a-domicilio" element={<AtencionDomicilio />} />
      
      {/* Rutas de Servicios Individuales */}
      <Route path="/servicios/medicina-general" element={<MedicinaGeneral />} />
      <Route path="/servicios/urologia" element={<Urologia />} />
      <Route path="/servicios/obstetricia" element={<Obstetricia />} />
      <Route path="/servicios/neurologia" element={<Neurologia />} />
      <Route path="/servicios/fisioterapia" element={<Fisioterapia />} />
      <Route path="/servicios/podologia" element={<Podologia />} />
      <Route path="/servicios/flebologia" element={<Flebologia />} />
      <Route path="/servicios/endocrinologia" element={<Endocrinologia />} />
    </Routes>
  );
}