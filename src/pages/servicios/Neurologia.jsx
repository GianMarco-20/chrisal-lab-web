import ServiceDetailLayout from './ServiceDetailLayout';
import doctorImg from '../../assets/neurologia-doctor.jpg';

export default function Neurologia() {
  return (
    <ServiceDetailLayout
      titulo="Neurología"
      descripcion="Diagnóstico, prevención y tratamiento integral de enfermedades del sistema nervioso central y periférico"
      imagen={doctorImg}
      checklist={[
        'Consulta Especializada',
        'Neuropediatra',
        'Electroencefalogramas',
        'Electromiografías',
        'Mapeo Cerebral',
        'Tratamiento del Dolor'
      ]}
    />
  );
}
