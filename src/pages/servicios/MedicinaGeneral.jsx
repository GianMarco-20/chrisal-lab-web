import ServiceDetailLayout from './ServiceDetailLayout';
import doctorImg from '../../assets/medicina-general-doctor.jpg';

export default function MedicinaGeneral() {
  return (
    <ServiceDetailLayout
      titulo="Medicina General"
      descripcion="Especialistas en atención médica integral para toda la familia"
      imagen={doctorImg}
      checklist={[
        'Consultas y atención a: niños, adolescentes, adultos, adultos mayores',
        'Evaluación, diagnóstico y tratamiento de enfermedades',
        'Solicitud e interpretación de laboratorios',
        'Administración de sueros',
        'Curaciones en general',
        'Extensión de certificados médicos',
        'Colocación y retiro de sondas',
        'Administración de inyectables',
        'Atención a domicilio',
        'Suturas de heridas'
      ]}
    />
  );
}
