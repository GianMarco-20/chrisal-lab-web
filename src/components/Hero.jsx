import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import heroBg from '../assets/hero-bg.jpg';

export default function Hero() {
  return (
    <section style={styles.heroSection}>
      <div 
        className="hero-bg-animated" 
        style={{
          ...styles.bgImage,
          backgroundImage: `url(${heroBg})`
        }}
      />

      <div style={styles.overlay}></div>

      <div style={styles.content}>
        
        <h1 className="anim-title hero-stroke-text" style={styles.mainTitle}>
          <span style={{ color: '#ffffff' }}>POLICLINICO</span>{' '}
          <span className="glow-text-cyan">CHRISAL-LAB</span>
        </h1>

        <h2 className="anim-subtitle" style={styles.subtitle}>
          ANALISIS CLINICOS A PRECIOS POPULARES
        </h2>

        <p className="anim-desc" style={styles.description}>
          "En Policlínico Chrisal-Lab cuidamos tu salud y la de tu familia. Te ofrecemos análisis clínicos de alta precisión, atención médica especializada y resultados confiables a precios accesibles, garantizando la rapidez y calidad que mereces en un solo lugar."
        </p>

        {/* Contenedor Adaptable de Botones */}
        <div className="anim-buttons hero-buttons-container" style={styles.buttonContainer}>
          <Link to="/servicios" className="hero-btn hero-btn-white">
            <span className="circle-icon"><FaChevronRight /></span> SERVICIOS
          </Link>
          <Link to="/analisis" className="hero-btn hero-btn-cyan">
            <span className="circle-icon"><FaChevronRight /></span> ANALISIS
          </Link>
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
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(10, 30, 50, 0.58)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '1350px',
    margin: '0 auto',
    padding: '60px 24px',
    color: '#ffffff',
  },
  mainTitle: {
    fontSize: 'clamp(36px, 6vw, 85px)',
    fontWeight: '900',
    letterSpacing: '1px',
    marginBottom: '15px',
    lineHeight: '1.1',
  },
  subtitle: {
    fontSize: 'clamp(18px, 2.8vw, 34px)',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '20px',
    textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
  },
  description: {
    fontSize: 'clamp(15px, 1.8vw, 22px)',
    lineHeight: '1.6',
    maxWidth: '980px',
    marginBottom: '35px',
    fontWeight: '500',
    textShadow: '2px 2px 4px rgba(0,0,0,0.95)',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
};