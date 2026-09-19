import ServiceDetailLayout from './ServiceDetailLayout';
import doctorImg from '../../assets/endocrinologia-doctor.jpg';

export default function Endocrinologia() {
  return (
    <ServiceDetailLayout
      titulo="Endocrinología"
      descripcion="Atención especializada en el sistema endocrino, metabolismo y equilibrio hormonal."
      imagen={doctorImg}
      checklist={[
        'Diagnóstico y control de diabetes',
        'Tratamiento de trastornos tiroideos (Hipotiroidismo / Hipertiroidismo)',
        'Evaluación de desórdenes hormonales y metabólicos',
        'Manejo de sobrepeso y obesidad',
        'Control de alteraciones en colesterol y triglicéridos'
      ]}
    />
  );
}
