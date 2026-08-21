import { Link } from 'react-router-dom';
import { 
  FaStethoscope, 
  FaUserNurse, 
  FaBrain, 
  FaRunning, 
  FaFlask, 
  FaHeartbeat 
} from 'react-icons/fa';
import { GiKidneys, GiFootprint, GiSyringe } from 'react-icons/gi';
import heroBg from '../assets/hero-bg.jpg';

const serviciosData = [
  {
    id: 'medicina-general',
    titulo: 'Medicina General',
    icono: <FaStethoscope />,
    descripcion: 'Evaluación médica integral, diagnóstico preventivo y tratamiento continuo para cuidar la salud de toda la familia.',
    link: '/servicios/medicina-general'
  },
  {
    id: 'flebologia',
    titulo: 'Flebología',
    icono: <GiSyringe />,
    descripcion: 'Especialidad dedicada al diagnóstico y tratamiento de várices, arañitas vasculares y problemas de circulación venosa.',
    link: '/servicios/flebologia'
  },
  {
    id: 'urologia',
    titulo: 'Urología',
    icono: <GiKidneys />,
    descripcion: 'Atención especializada en enfermedades del sistema urinario, riñones, vejiga y patologías del aparato reproductor masculino.',
    link: '/servicios/urologia'
  },
  {
    id: 'endocrinologia',
    titulo: 'Endocrinología',
    icono: <FaHeartbeat />,
    descripcion: 'Diagnóstico y control de trastornos hormonales, metabolismo, diabetes, tiroides y alteraciones endocrinas.',
    link: '/servicios/endocrinologia'
  },
  {
    id: 'obstetricia',
    titulo: 'Obstetricia',
    icono: <FaUserNurse />,
    descripcion: 'Cuidado y monitoreo integral de la mujer durante el embarazo, parto, posparto y control de la salud reproductiva.',
    link: '/servicios/obstetricia'
  },
  {
    id: 'neurologia',
    titulo: 'Neurología',
    icono: <FaBrain />,
    descripcion: 'Evaluación médica experta para trastornos del sistema nervioso, dolores de cabeza, migrañas y afecciones cerebrales.',
    link: '/servicios/neurologia'
  },
  {
    id: 'fisioterapia',
    titulo: 'Fisioterapia',
    icono: <FaRunning />,
    descripcion: 'Rehabilitación física personalizada, recuperación muscular, alivio de dolores articulares y lesiones físicas.',
    link: '/servicios/fisioterapia'
  },
  {
    id: 'podologia',
    titulo: 'Podología',
    icono: <GiFootprint />,
    descripcion: 'Atención especializada en el cuidado integral de los pies, tratamiento de uñas encarnadas, micosis y pie diabético.',
    link: '/servicios/podologia'
  },
  {
    id: 'laboratorio',
    titulo: 'Laboratorio Clínico',
    icono: <FaFlask />,
    descripcion: 'Análisis de sangre, orina y muestras clínicas con tecnología de punta para resultados rápidos, confiables y precisos.',
    link: '/servicios/laboratorio'
  }
];

export default function ServiciosPage() {
  return (
    <section id="servicios" className="services-section" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Capa Oscura de Contraste */}
      <div className="services-overlay"></div>

      <div className="services-content">
        {/* Encabezado */}
        <div style={styles.headerContainer}>
          <h2 className="glow-text-cyan hero-stroke-text" style={styles.mainTitle}>
            SERVICIOS
          </h2>
          <p style={styles.subtitle}>
            "Ofrecemos atención médica integral y análisis clínicos de alta precisión al alcance de tu economía."
          </p>
        </div>

        {/* Tarjetas de Servicios */}
        <div className="services-grid">
          {serviciosData.map((item) => (
            <div key={item.id} className="service-card">
              <div className="service-card-body">
                <div className="service-icon-wrapper">
                  {item.icono}
                </div>
                <h3 className="service-title">{item.titulo}</h3>
                <p className="service-description">{item.descripcion}</p>
              </div>
              <Link to={item.link} className="service-info-btn">
                INFORMACIÓN
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  headerContainer: {
    textAlign: 'left',
    maxWidth: '900px',
    marginBottom: '10px',
  },
  mainTitle: {
    fontSize: 'clamp(36px, 5vw, 65px)',
    fontWeight: '900',
    letterSpacing: '2px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 'clamp(16px, 2vw, 22px)',
    fontWeight: '600',
    lineHeight: '1.4',
    textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
  },
};