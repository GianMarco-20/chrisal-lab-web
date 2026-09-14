import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const numeroTelefono = '51978162605';
  const mensaje = encodeURIComponent('Hola, quisiera agendar una cita en Policlínico Chrisal-Lab.');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        
        {/* Logo */}
        <Link to="/" style={styles.brandLink} onClick={closeMenu}>
          <div className="logo-circle-container" style={styles.logoCircle}>
            <img 
              src={logoImg} 
              alt="Chrisal-Lab Logo" 
              style={styles.logoImg}
              onError={(e) => {
                e.target.src = "https://placehold.co/100x100/0e7c86/ffffff?text=C-L";
              }}
            />
          </div>
          <div style={styles.brandText}>
            <span style={styles.brandMain}>CHRISAL-LAB</span>
            <span style={styles.brandSub}>POLICLÍNICO & LABORATORIO</span>
          </div>
        </Link>

        {/* Botón Hamburguesa para Mobile */}
        <button 
          className="menu-mobile-btn" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links del Menú (Responsive) */}
        <nav 
          className={`nav-menu-container ${isMenuOpen ? 'mobile-open' : ''}`} 
          style={styles.nav}
        >
          <Link to="/" className="nav-item-btn" onClick={closeMenu}>Inicio</Link>
          <Link to="/servicios" className="nav-item-btn" onClick={closeMenu}>Servicios</Link>
          <Link to="/laboratorio" className="nav-item-btn" onClick={closeMenu}>Laboratorio</Link>
          <Link to="/paquetes" className="nav-item-btn" onClick={closeMenu}>Paquetes</Link>

          <Link to="/atencion-a-domicilio" className="nav-item-btn" onClick={closeMenu}>Atención Domicilio</Link>
          <a href="#sedes" className="nav-item-btn" onClick={closeMenu}>Sedes</a>
          <a href="#contacto" className="nav-item-btn" onClick={closeMenu}>Contacto</a>

          <a
            href={`https://wa.me/${numeroTelefono}?text=${mensaje}`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn"
            onClick={closeMenu}
          >
            <FaWhatsapp /> Agendar Cita
          </a>
        </nav>

      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: 'rgba(247, 250, 249, 0.82)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    padding: '10px 4%',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 1px 0 rgba(15, 61, 66, 0.08)',
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
    gap: '12px',
    textDecoration: 'none',
  },
  logoCircle: {
    width: '54px',
    height: '54px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3px',
    boxShadow: '0 2px 10px rgba(15, 61, 66, 0.15)',
    border: '2px solid #e1ecea',
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
    color: '#1f3a3e',
    fontSize: '20px',
    fontWeight: '900',
    letterSpacing: '1px',
    lineHeight: '1.1',
  },
  brandSub: {
    color: '#55706f',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.8px',
  },
  nav: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
};