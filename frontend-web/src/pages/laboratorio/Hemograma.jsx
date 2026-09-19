import { FaNotesMedical } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/hemograma-laboratorio.jpg';

export default function Hemograma() {
  return (
    <LabTestLayout
      titulo="Hemograma"
      icono={<FaNotesMedical />}
      imagen={imagen}
      descripcion="Conteo completo de glóbulos rojos, blancos y plaquetas para detectar anemia e infecciones."
      checklist={[
        'Recuento de glóbulos rojos y hemoglobina',
        'Recuento de glóbulos blancos (fórmula leucocitaria)',
        'Recuento de plaquetas',
        'Detección de anemia',
        'Detección de procesos infecciosos o inflamatorios'
      ]}
    />
  );
}
