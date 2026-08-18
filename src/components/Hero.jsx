import { FaChevronRight } from 'react-icons/fa';
import heroBg from '../assets/hero-bg.jpg';

export default function Hero() {
  return (
    <section style={styles.heroSection}>
      {/* Capa con opacidad del 15% sobre la imagen */}
      <div style={styles.overlay}></div>

      {/* Contenido Principal */}
      <div style={styles.content}>
        <h1 style={styles.title}>
          POLICLINICO <span style={styles.highlightTitle}>CHRISAL-LAB</span>
        </h1>
        
        <h3 style={styles.subtitle}>ANALISIS CLINICOS A PRECIOS POPULARES</h3>
        
        <p style={styles.description}>
          "En Policlínico Chrisal-Lab cuidamos tu salud y la de tu familia. Te
          ofrecemos análisis clínicos de alta precisión, atención médica
          especializada y resultados confiables a precios accesibles,
          garantizando la rapidez y calidad que mereces en un solo lugar."
        </p>

        {/* Botones de acción */}
        <div style={styles.buttonContainer}>
          <a href="#servicios" style={styles.btnWhite}>
            <FaChevronRight style={styles.icon} /> SERVICIOS
          </a>
          <a href="#analisis" style={styles.btnOutline}>
            <FaChevronRight style={styles.icon} /> ANALISIS
          </a>
        </div>
      </div>

      {/* Franja Azul Inferior con Teléfono y Horario */}
      <div style={styles.infoBar}>
        <div style={styles.infoContainer}>
          <ul style={styles.infoList}>
            <li><strong>Teléfono principal:</strong> +51 987 654 321</li>
            <li><strong>Correo Electrónico:</strong> policlinico.chrisallab@gmail.com</li>
          </ul>
          <ul style={styles.infoList}>
            <li>
              <strong>Horario de Atención:</strong> Lunes a Sábado: 7:00 am - 7:00 pm
            </li>
            <li style={{ paddingLeft: '150px' }}>
              Domingos: 8:00 am - 1:00 pm
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    position: 'relative',
    backgroundImage: `url(${heroBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#ffffff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 30, 60, 0.85)', // Da el tono oscuro dejando pasar un 15% de transparencia de la imagen
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '900px',
    padding: '60px 40px 20px 40px',
  },
  title: {
    fontSize: '52px',
    fontWeight: '900',
    letterSpacing: '2px',
    margin: '0 0 10px 0',
  },
  highlightTitle: {
    color: '#1695a0',
    WebkitTextStroke: '1px #ffffff',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '15px',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.5',
    marginBottom: '30px',
    maxWidth: '750px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  btnWhite: {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '12px 25px',
    fontWeight: 'bold',
    fontSize: '18px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '2px',
  },
  btnOutline: {
    border: '3px solid #1695a0',
    backgroundColor: 'rgba(22, 149, 160, 0.3)',
    color: '#ffffff',
    padding: '12px 25px',
    fontWeight: 'bold',
    fontSize: '18px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '2px',
  },
  icon: {
    border: '2px solid currentColor',
    borderRadius: '50%',
    padding: '2px',
    fontSize: '14px',
  },
  infoBar: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: '#1695a0',
    padding: '15px 40px',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    fontSize: '15px',
  },
  infoList: {
    listStyleType: 'disc',
    margin: 0,
    paddingLeft: '20px',
  },
};