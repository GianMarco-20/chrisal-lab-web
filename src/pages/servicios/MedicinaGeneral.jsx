import { Link } from 'react-router-dom';
import { FaWhatsapp, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

import heroBg from '../../assets/hero-bg.jpg'; 
import doctorImg from '../../assets/medicina-general-doctor.jpg'; 

export default function MedicinaGeneral() {
  const numeroTelefono = "51978162605"; 
  const mensajePredeterminado = encodeURIComponent("Hola, quisiera reservar una cita para Medicina General en Policlínico Chrisal-Lab.");

  const serviciosLista = [
    "Consultas y atención a: niños, adolescentes, adultos, adultos mayores",
    "Evaluación, diagnóstico y tratamiento de enfermedades",
    "Solicitud e interpretación de laboratorios",
    "Administración de sueros",
    "Curaciones en general",
    "Extensión de certificados médicos",
    "Colocación y retiro de sondas",
    "Administración de inyectables",
    "Atención a domicilio",
    "Suturas de heridas"
  ];

  return (
    <section style={styles.sectionContainer}>
      {/* Fondo transparente para apreciar la imagen traslucida de atras */}
      <div 
        style={{
          ...styles.bgOverlay,
          backgroundImage: `url(${heroBg})`
        }} 
      />

      <div style={styles.contentWrapper}>
        
        {/* Enlace Volver a Servicios */}
        <Link to="/servicios" style={styles.backLink}>
          <FaArrowLeft style={{ marginRight: '8px' }} /> Volver a Servicios
        </Link>

        {/* Contenedor transparente sin cuadro azul */}
        <div style={styles.cardContainer}>
          
          {/* Columna Izquierda: Imagen del Medico */}
          <div style={styles.imageColumn}>
            <img 
              src={doctorImg} 
              alt="Medicina General - Chrisal Lab" 
              style={styles.image}
            />
          </div>

          {/* Columna Derecha: Sin cuadro de fondo */}
          <div style={styles.infoColumn}>
            
            <h1 className="glow-text-cyan hero-stroke-text" style={styles.title}>
              MEDICINA GENERAL
            </h1>
            
            <p style={styles.subtitle}>
              Especialistas en atención médica integral para toda la familia
            </p>

            <ul style={styles.checkList}>
              {serviciosLista.map((item, index) => (
                <li key={index} style={styles.checkItem}>
                  <FaCheckCircle style={styles.checkIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a 
              href={`https://wa.me/${numeroTelefono}?text=${mensajePredeterminado}`}
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.btnWhatsapp}
            >
              <FaWhatsapp style={{ fontSize: '24px', marginRight: '10px' }} />
              Quiero reservar cita en Medicina General
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

const styles = {
  sectionContainer: {
    position: 'relative',
    minHeight: '85vh',
    padding: '40px 20px',
    backgroundColor: '#071527',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.15,
    zIndex: 1
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    width: '100%'
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#00f2fe',
    fontWeight: '700',
    fontSize: '16px',
    textDecoration: 'none',
    marginBottom: '25px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'transparent', // Sin fondo
    alignItems: 'center',
  },
  imageColumn: {
    flex: '1 1 400px',
    minHeight: '350px',
    maxHeight: '550px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  infoColumn: {
    flex: '1 1 500px',
    padding: '20px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: 'clamp(28px, 4vw, 44px)',
    fontWeight: '900',
    letterSpacing: '1px',
    margin: '0 0 10px 0',
    color: '#00f2fe'
  },
  subtitle: {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
  },
  checkList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 25px 0'
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: '15px',
    marginBottom: '10px',
    lineHeight: '1.4',
    textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
  },
  checkIcon: {
    color: '#00f2fe',
    fontSize: '18px',
    marginRight: '12px',
    flexShrink: 0
  },
  btnWhatsapp: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    color: '#ffffff',
    padding: '14px 24px',
    borderRadius: '10px',
    fontWeight: '800',
    fontSize: '16px',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
    alignSelf: 'flex-start',
    marginTop: '10px'
  }
};