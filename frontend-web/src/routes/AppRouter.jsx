import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ServiciosPage from '../pages/Servicios';
import Laboratorio from '../pages/Laboratorio';
import Paquetes from '../pages/Paquetes';
import Sedes from '../pages/Sedes';
import Contacto from '../pages/Contacto';
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
import Psicologia from '../pages/servicios/Psicologia';

// Importar análisis de laboratorio individuales
import Sangre from '../pages/laboratorio/Sangre';
import Heces from '../pages/laboratorio/Heces';
import Secreciones from '../pages/laboratorio/Secreciones';
import Glucosa from '../pages/laboratorio/Glucosa';
import Colesterol from '../pages/laboratorio/Colesterol';
import Trigliceridos from '../pages/laboratorio/Trigliceridos';
import Hemograma from '../pages/laboratorio/Hemograma';
import ExamenCompletoOrina from '../pages/laboratorio/ExamenCompletoOrina';
import Urocultivo from '../pages/laboratorio/Urocultivo';
import PruebaEmbarazo from '../pages/laboratorio/PruebaEmbarazo';
import Hormonas from '../pages/laboratorio/Hormonas';
import Vih from '../pages/laboratorio/Vih';
import Hepatitis from '../pages/laboratorio/Hepatitis';

export default function AppRouter() {
  return (
    <Routes>
      {/* Paginas Principales */}
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<ServiciosPage />} />
      <Route path="/laboratorio" element={<Laboratorio />} />
      <Route path="/paquetes" element={<Paquetes />} />
      <Route path="/sedes" element={<Sedes />} />
      <Route path="/contacto" element={<Contacto />} />
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
      <Route path="/servicios/psicologia" element={<Psicologia />} />

      {/* Rutas de Análisis de Laboratorio Individuales */}
      <Route path="/laboratorio/sangre" element={<Sangre />} />
      <Route path="/laboratorio/heces" element={<Heces />} />
      <Route path="/laboratorio/secreciones" element={<Secreciones />} />
      <Route path="/laboratorio/glucosa" element={<Glucosa />} />
      <Route path="/laboratorio/colesterol" element={<Colesterol />} />
      <Route path="/laboratorio/trigliceridos" element={<Trigliceridos />} />
      <Route path="/laboratorio/hemograma" element={<Hemograma />} />
      <Route path="/laboratorio/examen-completo-orina" element={<ExamenCompletoOrina />} />
      <Route path="/laboratorio/urocultivo" element={<Urocultivo />} />
      <Route path="/laboratorio/prueba-embarazo" element={<PruebaEmbarazo />} />
      <Route path="/laboratorio/hormonas" element={<Hormonas />} />
      <Route path="/laboratorio/vih" element={<Vih />} />
      <Route path="/laboratorio/hepatitis" element={<Hepatitis />} />
    </Routes>
  );
}