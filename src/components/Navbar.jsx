import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        
        {/* Logo en Círculo + Nombre al lado */}
        <Link to="/" style={styles.brandLink}>
          <div style={styles.logoCircle}>
            <img 
              src={logoImg} 
              alt="Chrisal-Lab Logo" 
              style={styles.logoImg}
              onError={(e) => {
                e.target.src = "https://placehold.co/100x100/1695a0/ffffff?text=C-L";
              }}
            />
          </div>
          <div style={styles.brandText}>
            <span style={styles.brandMain}>CHRISAL-LAB</span>
            <span style={styles.brandSub}>POLICLÍNICO & LABORATORIO</span>
          </div>
        </Link>

        {/* Menú de Navegación con Hover y "Servicios" */}
        <nav style={styles.nav}>
          <Link to="/" style={styles.navItem}>Inicio</Link>
          <a href="#quienes-somos" style={styles.navItem}>Quienes Somos</a>
          <a href="#servicios" style={styles.navItem}>Servicios</a>
          <a href="#analisis" style={styles.navItem}>Analisis</a>
          <a href="#atencion-domicilio" style={styles.navItem}>Atencion Domicilio</a>
          <a href="#sedes" style={styles.navItem}>Sedes</a>
          <a href="#contacto" style={styles.navItem}>Contacto</a>
        </nav>

      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#1695a0',
    padding: '10px 4%',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1450px',
    margin: '0 auto',
  },
  brandLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    textDecoration: 'none',
  },
  logoCircle: {
    width: '58px',
    height: '58px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    border: '2px solid #ffffff',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '50%',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandMain: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '900',
    letterSpacing: '1px',
    lineHeight: '1.1',
    textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
  },
  brandSub: {
    color: '#e0f7fa',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.8px',
  },
  nav: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  navItem: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '16px',
    padding: '8px 14px',
    borderRadius: '6px',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
  },
};