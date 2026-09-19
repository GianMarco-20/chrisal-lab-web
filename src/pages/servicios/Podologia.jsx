import ServiceDetailLayout from './ServiceDetailLayout';
import doctorImg from '../../assets/podologia-doctor.jpg';

export default function Podologia() {
  return (
    <ServiceDetailLayout
      titulo="Podología"
      descripcion="Especialistas en salud podológica y cuidado de tus pies. ¡Salud y bienestar desde tus pies!"
      imagen={doctorImg}
      checklist={[
        'Onicomicosis (uñas con hongos)',
        'Tratamiento de profilaxis profunda',
        'Tratamiento con láser',
        'Oniplastia',
        'Colocación de fórmula preparada',
        'Delaminación de toda la lámina ungueal'
      ]}
    />
  );
}
