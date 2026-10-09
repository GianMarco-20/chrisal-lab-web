import { FaVial } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/orina-examen.jpg';

export default function Orina() {
  return (
    <LabTestLayout
      titulo="Análisis de Orina"
      icono={<FaVial />}
      imagen={imagen}
      descripcion="Análisis de muestras de orina para evaluar la función renal y las vías urinarias."
      checklist={[
        'Examen físico (color, aspecto y densidad)',
        'Examen químico (glucosa, proteínas, cetonas y pH)',
        'Estudio del sedimento urinario (células, cristales y bacterias)',
        'Descarte de infecciones urinarias',
        'Evaluación básica de la función renal'
      ]}
    />
  );
}
