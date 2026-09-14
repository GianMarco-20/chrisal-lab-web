import { FaMicroscope } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/heces-laboratorio.jpg';

export default function Heces() {
  return (
    <LabTestLayout
      titulo="Análisis de Heces"
      icono={<FaMicroscope />}
      imagen={imagen}
      descripcion="Estudios coprológicos para descartar infecciones y parásitos digestivos."
      checklist={[
        'Examen directo y seriado de heces',
        'Detección de parásitos y huevos',
        'Descarte de sangre oculta',
        'Evaluación de flora bacteriana',
        'Estudio de consistencia y pH'
      ]}
    />
  );
}
