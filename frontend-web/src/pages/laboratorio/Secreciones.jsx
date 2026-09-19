import { FaLungs } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/secreciones-laboratorio.jpg';

export default function Secreciones() {
  return (
    <LabTestLayout
      titulo="Análisis de Secreciones"
      icono={<FaLungs />}
      imagen={imagen}
      descripcion="Análisis microbiológico de secreciones en distintas áreas corporales."
      checklist={[
        'Cultivo de secreciones vaginales, faríngeas u óticas',
        'Identificación de agentes infecciosos',
        'Antibiograma para orientar el tratamiento',
        'Descarte de infecciones bacterianas y fúngicas',
        'Resultados con recomendación de tratamiento'
      ]}
    />
  );
}
