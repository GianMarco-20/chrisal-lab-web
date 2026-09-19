import { FaBacteria } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/urocultivo-laboratorio.jpg';

export default function Urocultivo() {
  return (
    <LabTestLayout
      titulo="Urocultivo"
      icono={<FaBacteria />}
      imagen={imagen}
      descripcion="Prueba microbiológica para identificar gérmenes urinarios y su tratamiento idóneo."
      checklist={[
        'Cultivo de orina para identificar bacterias',
        'Recuento de colonias bacterianas',
        'Antibiograma (sensibilidad a antibióticos)',
        'Confirmación de infecciones urinarias',
        'Orientación para el tratamiento adecuado'
      ]}
    />
  );
}
