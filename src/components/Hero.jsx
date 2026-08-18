import { FaChevronRight } from 'react-icons/fa';

export default function Hero() {
  return (
    <section style={styles.heroSection}>
      {/* Capa sutil para no tapar la foto (35% de tinte oscuro para dar contraste al texto) */}
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
    minHeight: '82vh', // Le da buen espacio vertical al Hero
    backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(10, 30, 50, 0.45)', // Sombra ligera para que la imagen se vea más vívida
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
    color: '#ffffff',
  },
  mainTitle: {
    fontSize: 'clamp(38px, 5.5vw, 68px)',
    fontWeight: '900',
    letterSpacing: '2px',
    marginBottom: '10px',
  },
  textWhiteStroke: {
    color: '#ffffff',
    textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)',
  },
  textCyanStroke: {
    color: '#1695a0',
    textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)',
  },
  subtitle: {
    fontSize: 'clamp(18px, 2.2vw, 25px)',
    fontWeight: '800',
    marginBottom: '20px',
    textShadow: '1px 1px 4px rgba(0,0,0,0.9)',
  },
  description: {
    fontSize: 'clamp(15px, 1.6vw, 19px)',
    lineHeight: '1.6',
    maxWidth: '820px',
    marginBottom: '35px',
    textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  btnWhite: {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '12px 28px',
    fontWeight: '800',
    fontSize: '18px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '3px',
  },
  btnCyan: {
    backgroundColor: '#1695a0',
    color: '#ffffff',
    border: '2px solid #ffffff',
    padding: '12px 28px',
    fontWeight: '800',
    fontSize: '18px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '3px',
  },
  circleIcon: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: '2px solid currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
  },
};