import ServiceDetailLayout from './ServiceDetailLayout';
import psicologiaImg from '../../assets/psicologia-doctor.jpg';

export default function Psicologia() {
  return (
    <ServiceDetailLayout
      titulo="Psicología"
      descripcion="Un espacio de escucha y acompañamiento para tu bienestar emocional"
      imagen={psicologiaImg}
      checklist={[
        'Consulta psicológica para adolescentes y adultos',
        'Manejo de ansiedad, estrés y depresión',
        'Acompañamiento emocional en procesos de duelo',
        'Orientación en el manejo de conflictos personales',
        'Evaluación psicológica inicial',
        'Atención confidencial en un espacio de confianza'
      ]}
    />
  );
}
