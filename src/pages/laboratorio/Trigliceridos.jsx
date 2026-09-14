import { FaChartLine } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/trigleceridos-examen.jpg';

export default function Trigliceridos() {
  return (
    <LabTestLayout
      titulo="Análisis de Triglicéridos"
      icono={<FaChartLine />}
      imagen={imagen}
      descripcion="Evaluación de niveles de triglicéridos para prevenir riesgos metabólicos."
      checklist={[
        'Medición de triglicéridos en ayunas',
        'Evaluación de riesgo cardiovascular',
        'Apoyo en el control del síndrome metabólico',
        'Seguimiento de pacientes en dieta o tratamiento',
        'Resultados rápidos y confiables'
      ]}
    />
  );
}
