import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                e.target.src = "https://placehold.co/100x100/1695a0/ffffff?text=C-L";
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
          <a href="#quienes-somos" className="nav-item-btn" onClick={closeMenu}>Quienes Somos</a>
          
          <Link to="/servicios" className="nav-item-btn" onClick={closeMenu}>Servicios</Link>
          <Link to="/laboratorio" className="nav-item-btn" onClick={closeMenu}>Laboratorio</Link>
          
          <Link to="/atencion-a-domicilio" className="nav-item-btn" onClick={closeMenu}>Atención Domicilio</Link>
          <a href="#sedes" className="nav-item-btn" onClick={closeMenu}>Sedes</a>
          <a href="#contacto" className="nav-item-btn" onClick={closeMenu}>Contacto</a>
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
    fontSize: '20px',
    fontWeight: '900',
    letterSpacing: '1px',
    lineHeight: '1.1',
  },
  brandSub: {
    color: '#e0f7fa',
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