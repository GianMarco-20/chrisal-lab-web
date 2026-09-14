import { FaBaby } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/prueba-embarazo-laboratorio.jpg';

export default function PruebaEmbarazo() {
  return (
    <LabTestLayout
      titulo="Prueba de Embarazo"
      icono={<FaBaby />}
      imagen={imagen}
      descripcion="Pruebas rápidas y cuantitativas en sangre u orina para confirmación de embarazo."
      checklist={[
        'Prueba cualitativa en orina (resultado rápido)',
        'Prueba cuantitativa de Beta-hCG en sangre',
        'Confirmación temprana de embarazo',
        'Resultados confidenciales',
        'Atención con orientación profesional'
      ]}
    />
  );
}
