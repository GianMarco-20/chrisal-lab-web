import { Link } from 'react-router-dom';
import { FaWhatsapp, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

import heroBg from '../../assets/hero-bg.jpg'; 
import doctorImg from '../../assets/flebologia-doctor.jpg'; // Agrega la imagen en assets

export default function Flebologia() {
  const numeroTelefono = "51978162605"; 
  const mensajePredeterminado = encodeURIComponent("Hola, quisiera reservar una cita para Flebología en Policlínico Chrisal-Lab.");

  const serviciosLista = [
    "Tratamiento integral de várices grandes y pequeñas",
    "Escleroterapia",
    "Ecoesclerosis (tratamiento con guía ecográfica)",
    "Alivio de ardor, dolor, quemazón y calambres",
    "Tratamiento para pesadez de piernas e inflamación",
    "Cuidado y tratamiento de heridas vasculares",
    "Método seguro, ambulatorio, sin cirugía y sin dolor"
  ];

  return (
    <section style={styles.sectionContainer}>
      <div 
        style={{
          ...styles.bgOverlay,
          backgroundImage: `url(${heroBg})`
        }} 
      />

      <div style={styles.contentWrapper}>
        
        <Link to="/servicios" style={styles.backLink}>
          <FaArrowLeft style={{ marginRight: '8px' }} /> Volver a Servicios
        </Link>

        <div style={styles.cardContainer}>
          
          <div style={styles.imageColumn}>
            <img 
              src={doctorImg} 
              alt="Flebología - Chrisal Lab" 
              style={styles.image}
            />
          </div>

          <div style={styles.infoColumn}>
            
            <h1 className="glow-text-cyan hero-stroke-text" style={styles.title}>
              FLEBOLOGÍA
            </h1>
            
            <p style={styles.subtitle}>
              Tratamiento moderno e integral de várices y afecciones venosas, sin cirugía y sin dolor.
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
              Quiero reservar cita en Flebología
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
    backgroundColor: 'transparent',
    alignItems: 'stretch',
    gap: '20px'
  },
  imageColumn: {
    flex: '1 1 400px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    display: 'flex'
  },
  image: {
    width: '100%',
    height: '100%',
    minHeight: '300px',
    objectFit: 'cover',
    display: 'block'
  },
  infoColumn: {
    flex: '1 1 500px',
    padding: '10px 20px',
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