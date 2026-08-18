import { FaWhatsapp, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.topSection}>
        <div style={styles.container}>
          
          {/* Columna 1 */}
          <div style={styles.column}>
            <h3 style={styles.brandTitle}>CHRISAL-LAB</h3>
            <p style={styles.brandSubtitle}>POLICLÍNICO & LABORATORIO</p>
            <div style={styles.socialGrid}>
              <a href="https://wa.me/51978162605" target="_blank" rel="noreferrer" style={styles.socialBtn}><FaWhatsapp /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialBtn}><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialBtn}><FaInstagram /></a>
            </div>
          </div>

          {/* Columna 2 */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}><FaMapMarkerAlt /> Ubícanos</h4>
            <p style={styles.text}>Jr. Real 424, Pasaje Plaza de Armas</p>
            <p style={styles.subText}>(Espalda de la Iglesia San Pedro) - Mala</p>
          </div>

          {/* Columna 3 */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}><FaPhoneAlt /> Contacto</h4>
            <p style={styles.text}>+51 978 162 605 / +51 994 776 304</p>
            <p style={styles.subText}><FaEnvelope /> policlinico.chrisallab@gmail.com</p>
          </div>

          {/* Columna 4 */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}><FaClock /> Horario</h4>
            <p style={styles.text}>Lun - Sáb: 7:00 AM - 7:00 PM</p>
            <p style={styles.text}>Dom: 8:00 AM - 1:00 PM</p>
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
    padding: '28px 20px', // Reducido para que ocupe menos espacio
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
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
    marginBottom: '6px',
  },
  colTitle: {
    fontSize: '16px',
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
    fontSize: '12px',
    color: '#b2dfdb',
  },
  socialGrid: {
    display: 'flex',
    gap: '10px',
  },
  socialBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#1695a0',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontSize: '15px',
  },
  bottomBar: {
    backgroundColor: '#07363b',
    padding: '10px 20px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#80cbc4',
  },
};