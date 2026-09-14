import { FaCube } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/glucosa-laboratorio.jpg';

export default function Glucosa() {
  return (
    <LabTestLayout
      titulo="Análisis de Glucosa"
      icono={<FaCube />}
      imagen={imagen}
      descripcion="Control y descarte de diabetes midiendo los niveles de glucosa en sangre."
      checklist={[
        'Glucosa basal en ayunas',
        'Glucosa postprandial (después de comer)',
        'Curva de tolerancia a la glucosa (opcional)',
        'Apoyo en el control de pacientes diabéticos',
        'Descarte de hipoglucemia e hiperglucemia'
      ]}
    />
  );
}
