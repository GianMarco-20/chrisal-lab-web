import { FaTint } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/analisis-sangre.jpg';

export default function Sangre() {
  return (
    <LabTestLayout
      titulo="Análisis de Sangre"
      icono={<FaTint />}
      imagen={imagen}
      descripcion="Evaluación de muestras de sangre para control general, prevención y descarte de patologías."
      checklist={[
        'Hemograma Completo (glóbulos rojos, blancos y plaquetas)',
        'Determinación de Grupo Sanguíneo y Factor Rh',
        'Pruebas de Coagulación (Tiempo de Protrombina y Tromboplastina)',
        'Marcadores Inflamatorios (Velocidad de Sedimentación / PCR)',
        'Análisis para detección y descarte de anemia e infecciones'
      ]}
    />
  );
}
