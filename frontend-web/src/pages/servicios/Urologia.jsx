import ServiceDetailLayout from './ServiceDetailLayout';
import doctorImg from '../../assets/urologia-doctor.jpg';

export default function Urologia() {
  return (
    <ServiceDetailLayout
      titulo="Urología"
      descripcion="Atención especializada en la salud del sistema urinario y reproductor masculino"
      imagen={doctorImg}
      checklist={[
        'Especialistas en urología general y salud masculina',
        'Eco renal',
        'Eco vesicorenal',
        'Eco testicular',
        'Tratamiento de vejiga hiperactiva',
        'Atención integral de disfunción eréctil',
        'Diagnóstico y tratamiento de fimosis',
        'Tratamiento de incontinencia urinaria',
        'Cauterización de verrugas genitales'
      ]}
    />
  );
}
