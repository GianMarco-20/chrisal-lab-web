import { FaProcedures } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/examen-completo-orina-laboratorio.jpg';

export default function ExamenCompletoOrina() {
  return (
    <LabTestLayout
      titulo="Examen Completo de Orina"
      icono={<FaProcedures />}
      imagen={imagen}
      descripcion="Evaluación física, química y microscópica detallada de la muestra de orina."
      checklist={[
        'Examen físico completo (color, densidad y aspecto)',
        'Examen químico (glucosa, proteínas, bilirrubina y nitritos)',
        'Examen microscópico del sedimento urinario',
        'Detección de infecciones urinarias',
        'Evaluación integral de la función renal'
      ]}
    />
  );
}
