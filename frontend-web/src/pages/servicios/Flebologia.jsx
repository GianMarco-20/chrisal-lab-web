import ServiceDetailLayout from './ServiceDetailLayout';
import doctorImg from '../../assets/flebologia-doctor.jpg';

export default function Flebologia() {
  return (
    <ServiceDetailLayout
      titulo="Flebología"
      descripcion="Tratamiento moderno e integral de várices y afecciones venosas, sin cirugía y sin dolor."
      imagen={doctorImg}
      checklist={[
        'Tratamiento integral de várices grandes y pequeñas',
        'Escleroterapia',
        'Ecoesclerosis (tratamiento con guía ecográfica)',
        'Alivio de ardor, dolor, quemazón y calambres',
        'Tratamiento para pesadez de piernas e inflamación',
        'Cuidado y tratamiento de heridas vasculares',
        'Método seguro, ambulatorio, sin cirugía y sin dolor'
      ]}
    />
  );
}
