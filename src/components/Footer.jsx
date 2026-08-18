import { FaWhatsapp, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="footer-top-padding" style={styles.topSection}>
        <div className="footer-container-grid" style={styles.container}>
          
          {/* Columna 1: Marca (Fila Completa en Móvil) */}
          <div className="footer-col-item" style={styles.column}>
            <h3 style={styles.brandTitle}>CHRISAL-LAB</h3>
            <p style={styles.brandSubtitle}>POLICLÍNICO & LABORATORIO</p>
            <div className="social-grid-container" style={styles.socialGrid}>
              <a href="https://wa.me/51978162605" target="_blank" rel="noreferrer" className="social-icon-btn"><FaWhatsapp /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn"><FaInstagram /></a>
            </div>
          </div>

          {/* Columna 2: Ubicación */}
          <div className="footer-col-item" style={styles.column}>
            <h4 className="footer-col-title" style={styles.colTitle}><FaMapMarkerAlt /> Ubícanos</h4>
            <p className="footer-text-mobile footer-hover-item" style={styles.text}>Jr. Real 424, Pasaje Plaza de Armas</p>
            <p className="footer-subtext-mobile footer-hover-item" style={styles.subText}>(Espalda de la Iglesia San Pedro) - Mala</p>
          </div>

          {/* Columna 3: Contacto */}
          <div className="footer-col-item" style={styles.column}>
            <h4 className="footer-col-title" style={styles.colTitle}><FaPhoneAlt /> Contacto</h4>
            <p className="footer-text-mobile footer-hover-item" style={styles.text}>+51 978 162 605</p>
            <p className="footer-text-mobile footer-hover-item" style={styles.text}>+51 994 776 304</p>
            <p className="footer-subtext-mobile footer-hover-item" style={styles.subText}><FaEnvelope /> policlinico.chrisallab@gmail.com</p>
          </div>

          {/* Columna 4: Horario */}
          <div className="footer-col-item" style={styles.column}>
            <h4 className="footer-col-title" style={styles.colTitle}><FaClock /> Horario</h4>
            <p className="footer-text-mobile" style={styles.text}>Lun - Sáb: 7:00 AM - 7:00 PM</p>
            <p className="footer-text-mobile" style={styles.text}>Dom: 8:00 AM - 1:00 PM</p>
          </div>

        </div>
      </div>

      <div style={styles.bottomBar}>
        <p>© 2026 Policlínico Chrisal-Lab S.A.C. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    width: '100%',
    backgroundColor: '#0c525a',
    color: '#ffffff',
  },
  topSection: {
    padding: '35px 20px',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '25px',
    maxWidth: '1250px',
    margin: '0 auto',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  brandTitle: {
    fontSize: '20px',
    fontWeight: '900',
    color: '#ffffff',
  },
  brandSubtitle: {
    fontSize: '11px',
    color: '#7be0e8',
    fontWeight: '700',
    marginBottom: '8px',
  },
  colTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#7be0e8',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '4px',
  },
  text: {
    fontSize: '13px',
    color: '#ffffff',
  },
  subText: {
    fontSize: '11px',
    color: '#b2dfdb',
    wordBreak: 'break-word',
  },
  socialGrid: {
    display: 'flex',
    gap: '12px',
    marginTop: '4px',
  },
  bottomBar: {
    backgroundColor: '#07363b',
    padding: '12px 20px',
    textAlign: 'center',
    fontSize: '11px',
    color: '#80cbc4',
  },
};