import { FaChevronRight } from 'react-icons/fa';

export default function Hero() {
  return (
    <section style={styles.heroSection}>
      <div style={styles.overlay}></div>

      {/* Bloque de texto principal */}
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

      {/* Franja de Información en la base */}
      <div style={styles.infoBar}>
        <div style={styles.infoContainer}>
          <div style={styles.infoCol}>
            <p>• <strong>Teléfono principal:</strong> +51 987 654 321</p>
            <p>• <strong>Correo Electrónico:</strong> policlinico.chrisallab@gmail.com</p>
          </div>
          <div style={styles.infoCol}>
            <p>• <strong>Horario de Atención:</strong> Lunes a Sábado: 7:00 am - 7:00 pm</p>
            <p style={{ paddingLeft: '18px' }}>Domingos: 8:00 am - 1:00 pm</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    position: 'relative',
    width: '100%',
    minHeight: 'calc(100vh - 70px)',
    backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(10, 35, 60, 0.85)', // 15% de visibilidad del fondo
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px 40px 20px',
    color: '#ffffff',
  },
  mainTitle: {
    fontSize: ' clamp(36px, 6vw, 68px)',
    fontWeight: '900',
    letterSpacing: '2px',
    marginBottom: '10px',
  },
  // Borde/Contorno negro para las letras
  textWhiteStroke: {
    color: '#ffffff',
    textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)',
  },
  textCyanStroke: {
    color: '#1695a0',
    textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)',
  },
  subtitle: {
    fontSize: 'clamp(18px, 2.5vw, 26px)',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '20px',
    textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
  },
  description: {
    fontSize: 'clamp(15px, 1.8vw, 20px)',
    lineHeight: '1.6',
    maxWidth: '850px',
    marginBottom: '35px',
    textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
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
    gap: '12px',
    borderRadius: '4px',
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
    gap: '12px',
    borderRadius: '4px',
  },
  circleIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },
  infoBar: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: '#1695a0',
    width: '100%',
    padding: '18px 20px',
    borderTop: '2px solid rgba(255,255,255,0.2)',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    flexWrap: 'wrap',
    gap: '15px',
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
};