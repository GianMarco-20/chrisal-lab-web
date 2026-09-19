import { FaDna } from 'react-icons/fa';
import LabTestLayout from './LabTestLayout';
import imagen from '../../assets/hormonas-laboratorio.jpg';

export default function Hormonas() {
  return (
    <LabTestLayout
      titulo="Análisis de Hormonas"
      icono={<FaDna />}
      imagen={imagen}
      descripcion="Perfil tiroideo, prolactina, testosterona y estudios hormonales integrales."
      checklist={[
        'Perfil tiroideo (TSH, T3, T4)',
        'Prolactina',
        'Testosterona y hormonas sexuales',
        'Evaluación de trastornos hormonales',
        'Apoyo en diagnóstico de fertilidad y metabolismo'
      ]}
    />
  );
}
