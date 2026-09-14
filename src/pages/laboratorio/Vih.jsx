import { FaRibbon } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/vih-laboratorio.jpg';

export default function Vih() {
  return (
    <LabTestLayout
      titulo="Prueba de VIH (SIDA)"
      icono={<FaRibbon />}
      imagen={imagen}
      descripcion="Prueba rápida de descarte serológico, confidencial y rápida."
      checklist={[
        'Prueba rápida de detección de anticuerpos',
        'Resultados en minutos',
        'Atención 100% confidencial',
        'Orientación y consejería incluida',
        'Descarte serológico inicial'
      ]}
    />
  );
}
