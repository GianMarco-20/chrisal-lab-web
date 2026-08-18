import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png'; // Ruta a tu logo oficial

export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoContainer}>
          <img 
            src={logoImg} 
            alt="Chrisal-Lab Logo" 
            style={styles.logo} 
            onError={(e) => {
              // Si aún no has subido logo.png, muestra este respaldo
              e.target.src = "https://placehold.co/180x60/1695a0/ffffff?text=CHRISAL-LAB";
            }}
          />
        </Link>

        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Inicio</Link>
          <a href="#quienes-somos" style={styles.link}>Quienes Somos</a>
          <a href="#analisis" style={styles.link}>Analisis</a>
          <a href="#atencion-domicilio" style={styles.link}>Atencion Domicilio</a>
          <a href="#sedes" style={styles.link}>Sedes</a>
          <a href="#contacto" style={styles.link}>Contacto</a>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#1695a0',
    padding: '8px 5%',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    height: '55px',
    objectFit: 'contain',
    borderRadius: '4px',
  },
  nav: {
    display: 'flex',
    gap: '25px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '15px',
  },
};