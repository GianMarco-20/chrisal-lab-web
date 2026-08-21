import { Link } from 'react-router-dom';
import { 
  FaTint, 
  FaVial, 
  FaMicroscope, 
  FaLungs, 
  FaCube, 
  FaHeartbeat, 
  FaNotesMedical, 
  FaProcedures, 
  FaBacteria, 
  FaBaby, 
  FaDna, 
  FaRibbon, 
  FaShieldVirus,
  FaChartLine
} from 'react-icons/fa';
import heroBg from '../assets/hero-bg.jpg';

const laboratorioData = [
  {
    id: 'sangre',
    titulo: 'Sangre',
    icono: <FaTint />,
    descripcion: 'Evaluación de muestras de sangre para control general y descarte de patologías.',
    link: '/laboratorio/sangre'
  },
  {
    id: 'orina',
    titulo: 'Orina',
    icono: <FaVial />,
    descripcion: 'Análisis de muestras de orina para evaluar la función renal y vías urinarias.',
    link: '/laboratorio/orina'
  },
  {
    id: 'heces',
    titulo: 'Heces',
    icono: <FaMicroscope />,
    descripcion: 'Estudios coprológicos para descartar infecciones y parásitos digestivos.',
    link: '/laboratorio/heces'
  },
  {
    id: 'secreciones',
    titulo: 'Secreciones',
    icono: <FaLungs />,
    descripcion: 'Análisis microbiológico de secreciones en distintas áreas corporales.',
    link: '/laboratorio/secreciones'
  },
  {
    id: 'glucosa',
    titulo: 'Glucosa',
    icono: <FaCube />,
    descripcion: 'Control y descarte de diabetes midiendo los niveles de glucosa en sangre.',
    link: '/laboratorio/glucosa'
  },
  {
    id: 'colesterol',
    titulo: 'Colesterol',
    icono: <FaHeartbeat />,
    descripcion: 'Medición de niveles de colesterol total, HDL y LDL para control cardiovascular.',
    link: '/laboratorio/colesterol'
  },
  {
    id: 'trigliceridos',
    titulo: 'Triglicéridos',
    icono: <FaChartLine />,
    descripcion: 'Evaluación de niveles de triglicéridos para prevenirlos riesgos metabólicos.',
    link: '/laboratorio/trigliceridos'
  },
  {
    id: 'hemograma',
    titulo: 'Hemograma',
    icono: <FaNotesMedical />,
    descripcion: 'Conteo completo de glóbulos rojos, blancos y plaquetas para detectar anemia e infecciones.',
    link: '/laboratorio/hemograma'
  },
  {
    id: 'examen-completo-orina',
    titulo: 'Examen Completo de Orina',
    icono: <FaProcedures />,
    descripcion: 'Evaluación física, química y microscópica detallada de la muestra de orina.',
    link: '/laboratorio/examen-completo-orina'
  },
  {
    id: 'urocultivo',
    titulo: 'Urocultivo',
    icono: <FaBacteria />,
    descripcion: 'Prueba microbiológica para identificar gérmenes urinarios y su tratamiento idóneo.',
    link: '/laboratorio/urocultivo'
  },
  {
    id: 'prueba-embarazo',
    titulo: 'Prueba de Embarazo',
    icono: <FaBaby />,
    descripcion: 'Pruebas rápidas y cuantitativas en sangre u orina para confirmación de embarazo.',
    link: '/laboratorio/prueba-embarazo'
  },
  {
    id: 'hormonas',
    titulo: 'Hormonas',
    icono: <FaDna />,
    descripcion: 'Perfil tiroideo, prolactina, testosterona y estudios hormonales integrales.',
    link: '/laboratorio/hormonas'
  },
  {
    id: 'vih',
    titulo: 'VIH (SIDA)',
    icono: <FaRibbon />,
    descripcion: 'Prueba rápida de descarte serológico, confidencial y rápida.',
    link: '/laboratorio/vih'
  },
  {
    id: 'hepatitis',
    titulo: 'Hepatitis: "A" "B" "C"',
    icono: <FaShieldVirus />,
    descripcion: 'Descarte serológico para infecciones virales de Hepatitis tipos A, B y C.',
    link: '/laboratorio/hepatitis'
  }
];

export default function Laboratorio() {
  return (
    <section id="laboratorio" className="services-section" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Capa Oscura de Contraste */}
      <div className="services-overlay"></div>

      <div className="services-content">
        {/* Encabezado */}
        <div style={styles.headerContainer}>
          <h2 className="glow-text-cyan hero-stroke-text" style={styles.mainTitle}>
            LABORATORIO CLÍNICO
          </h2>
          <p style={styles.subtitle}>
            "Análisis clínicos a precios populares con resultados rápidos, confiables y precisos."
          </p>
        </div>

        {/* Las 14 Tarjetas de Laboratorio */}
        <div className="services-grid">
          {laboratorioData.map((item) => (
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