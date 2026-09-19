import { FaShieldVirus } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';

export default function Hepatitis() {
  return (
    <LabTestLayout
      titulo='Hepatitis "A" "B" "C"'
      icono={<FaShieldVirus />}
      descripcion="Descarte serológico para infecciones virales de Hepatitis tipos A, B y C."
      checklist={[
        'Descarte de Hepatitis A (HAV)',
        'Descarte de Hepatitis B (HBsAg)',
        'Descarte de Hepatitis C (Anti-HCV)',
        'Resultados confidenciales',
        'Recomendado en chequeos preventivos y prequirúrgicos'
      ]}
    />
  );
}
