import { FaChevronRight } from 'react-icons/fa';
import heroBg from '../assets/hero-bg.jpg';

export default function Hero() {
  return (
    <section style={styles.heroSection}>
      {/* Fondo con animación de Zoom lento */}
      <div 
        className="hero-bg-animated" 
        style={{
          ...styles.bgImage,
          backgroundImage: `url(${heroBg})`
        }}
      />

      {/* Capa de contraste */}
      <div style={styles.overlay}></div>

      {/* Contenido con Entradas Animadas */}
      <div style={styles.content}>
        
        {/* Título Principal con animación de brillo y entrada */}
        <h1 className="animate-fade-1" style={styles.mainTitle}>
          <span style={styles.textWhiteStroke}>POLICLINICO</span>{' '}
          <span className="text-shimmer-cyan" style={styles.textCyanStroke}>CHRISAL-LAB</span>
        </h1>

        {/* Subtítulo animado */}
        <h2 className="animate-fade-2" style={styles.subtitle}>
          ANALISIS CLINICOS A PRECIOS POPULARES
        </h2>

        {/* Descripción animada */}
        <p className="animate-fade-3" style={styles.description}>
          "En Policlínico Chrisal-Lab cuidamos tu salud y la de tu familia. Te ofrecemos análisis clínicos de alta precisión, atención médica especializada y resultados confiables a precios accesibles, garantizando la rapidez y calidad que mereces en un solo lugar."
        </p>

        {/* Botones animados */}
        <div className="animate-fade-4" style={styles.buttonContainer}>
          <a href="#servicios" className="hero-btn hero-btn-white">
            <span className="circle-icon"><FaChevronRight /></span> SERVICIOS
          </a>
          <a href="#analisis" className="hero-btn hero-btn-cyan">
            <span className="circle-icon"><FaChevronRight /></span> ANALISIS
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
    padding: '70px 40px',
    color: '#ffffff',
  },
  mainTitle: {
    fontSize: 'clamp(48px, 6.5vw, 85px)',
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
    textShadow: '-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, 0 6px 12px rgba(0,0,0,0.9)',
  },
  subtitle: {
    fontSize: 'clamp(22px, 3vw, 34px)',
    fontWeight: '800',
    letterSpacing: '1.5px',
    marginBottom: '25px',
    textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
  },
  description: {
    fontSize: 'clamp(18px, 2vw, 24px)',
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
};