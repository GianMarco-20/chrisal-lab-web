import ServiceDetailLayout from './ServiceDetailLayout';
import doctorImg from '../../assets/obstetricia-doctor.jpg';

export default function Obstetricia() {
  return (
    <ServiceDetailLayout
      titulo="Obstetricia"
      descripcion="Cuidado y monitoreo integral de la mujer durante el embarazo, parto, posparto y control de la salud reproductiva."
      imagen={doctorImg}
      checklist={[
        'Consulta Obstétrica',
        'Descarte Básico de ETS',
        'VIH (SIDA) 1–2 Anticuerpos',
        'RPR (Sífilis)',
        'Herpes IgM – IgG',
        'Hepatitis B Antígeno de Superficie'
      ]}
    />
  );
}
