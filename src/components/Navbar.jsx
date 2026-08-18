import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoContainer}>
          {/* Si ya subiste la imagen del logo en public/logo.png puedes usar "/logo.png" */}
          <div style={styles.logoBadge}>
            <span style={{ color: '#1695a0', fontWeight: '900', fontSize: '20px' }}>CHRISAL-LAB</span>
            <span style={{ fontSize: '10px', color: '#666', display: 'block' }}>POLICLINICO - LABORATORIO</span>
          </div>
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
    padding: '12px 5%',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
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
    textDecoration: 'none',
  },
  logoBadge: {
    backgroundColor: '#ffffff',
    padding: '6px 16px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  nav: {
    display: 'flex',
    gap: '30px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '16px',
    transition: 'opacity 0.2s',
  },
};