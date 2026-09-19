import { FaHeartbeat } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/examen-de-colesterol.jpg';

export default function Colesterol() {
  return (
    <LabTestLayout
      titulo="Análisis de Colesterol"
      icono={<FaHeartbeat />}
      imagen={imagen}
      descripcion="Medición de niveles de colesterol total, HDL y LDL para el control cardiovascular."
      checklist={[
        'Colesterol total',
        'Colesterol HDL (colesterol bueno)',
        'Colesterol LDL (colesterol malo)',
        'Índice de riesgo cardiovascular',
        'Recomendado para chequeos preventivos'
      ]}
    />
  );
}
