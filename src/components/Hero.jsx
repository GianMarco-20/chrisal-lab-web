import { FaChevronRight } from 'react-icons/fa';
import heroBg from '../assets/hero-bg.jpg'; // Importando tu imagen de fondo local

export default function Hero() {
  return (
    <section style={{ ...styles.heroSection, backgroundImage: `url(${heroBg})` }}>
      {/* Tinte oscuro equilibrado para destacar los textos gigantes */}
      <div style={styles.overlay}></div>

      <div style={styles.content}>
        <h1 style={styles.mainTitle}>
          <span style={styles.textWhiteStroke}>POLICLINICO</span>{' '}
          <span style={styles.textCyanStroke}>CHRISAL-LAB</span>
        </h1>

        <h2 style={styles.subtitle}>ANALISIS CLINICOS A PRECIOS POPULARES</h2>

        <p style={styles.description}>
          "En Policlínico Chrisal-Lab cuidamos tu salud y la de tu familia. Te ofrecemos análisis clínicos de alta precisión, atención médica especializada y resultados confiables a precios accesibles, garantizando la rapidez y calidad que mereces en un solo lugar."
        </p>

        <div style={styles.buttonContainer}>
          <a href="#servicios" style={styles.btnWhite}>
            <span style={styles.circleIcon}><FaChevronRight /></span> SERVICIOS
          </a>
          <a href="#analisis" style={styles.btnCyan}>
            <span style={styles.circleIcon}><FaChevronRight /></span> ANALISIS
          </a>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    position: 'relative',
    width: '100%',
    minHeight: '86vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(10, 30, 50, 0.55)', // Transparencia que deja ver bien tu imagen de fondo
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '1350px',
    margin: '0 auto',
    padding: '70px 40px',
    color: '#ffffff',
  },
  mainTitle: {
    fontSize: 'clamp(48px, 6.5vw, 85px)', // Texto significativamente más grande
    fontWeight: '900',
    letterSpacing: '2px',
    marginBottom: '15px',
    lineHeight: '1.05',
  },
  textWhiteStroke: {
    color: '#ffffff',
    textShadow: '-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, 0 6px 12px rgba(0,0,0,0.9)',
  },
  textCyanStroke: {
    color: '#1695a0',
    textShadow: '-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, 0 6px 12px rgba(0,0,0,0.9)',
  },
  subtitle: {
    fontSize: 'clamp(22px, 3vw, 34px)', // Subtítulo agrandado
    fontWeight: '800',
    letterSpacing: '1.5px',
    marginBottom: '25px',
    textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
  },
  description: {
    fontSize: 'clamp(18px, 2vw, 24px)', // Descripción más legible
    lineHeight: '1.6',
    maxWidth: '980px',
    marginBottom: '40px',
    fontWeight: '500',
    textShadow: '2px 2px 4px rgba(0,0,0,0.95)',
  },
  buttonContainer: {
    display: 'flex',
    gap: '25px',
  },
  btnWhite: {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '16px 36px',
    fontWeight: '900',
    fontSize: '22px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '4px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
  },
  btnCyan: {
    backgroundColor: '#1695a0',
    color: '#ffffff',
    border: '3px solid #ffffff',
    padding: '16px 36px',
    fontWeight: '900',
    fontSize: '22px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '4px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
  },
  circleIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '2px solid currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
};