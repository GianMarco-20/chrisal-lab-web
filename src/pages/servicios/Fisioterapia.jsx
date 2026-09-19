import ServiceDetailLayout from './ServiceDetailLayout';
import doctorImg from '../../assets/fisioterapia-doctor.jpg';

export default function Fisioterapia() {
  return (
    <ServiceDetailLayout
      titulo="Fisioterapia"
      descripcion="Tratamiento y rehabilitación física para la recuperación funcional, alivio del dolor y mejora de tu movilidad."
      imagen={doctorImg}
      checklist={[
        'Dolor muscular y articular',
        'Contracturas',
        'Hernia discal',
        'Esguinces, fracturas y luxaciones',
        'Síndrome del túnel carpiano',
        'Artrosis y artritis',
        'Lesiones deportivas',
        'Dolor del nervio ciático',
        'Artrofibrosis postoperatoria',
        'Lumbalgia y cervicalgia',
        'Parálisis facial',
        'Espolón'
      ]}
    />
  );
}
