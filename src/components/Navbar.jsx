import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logoContainer}>
          <img src={logo} alt="Chrisal-Lab Logo" style={styles.logoImg} />
        </Link>

        {/* Menú de Navegación */}
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
    padding: '10px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    height: '55px',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    gap: '25px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
  },
};