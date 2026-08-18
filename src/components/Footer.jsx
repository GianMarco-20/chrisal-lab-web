import { FaWhatsapp, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.topSection}>
        <div style={styles.container}>
          
          {/* Columna 1: Info Empresa */}
          <div style={styles.column}>
            <h3 style={styles.brandTitle}>CHRISAL-LAB</h3>
            <p style={styles.brandSubtitle}>POLICLÍNICO & LABORATORIO CLÍNICO</p>
            <p style={styles.text}>
              Ofrecemos atención médica de calidad, análisis clínicos de alta precisión y cuidado integral para toda tu familia.
            </p>
            <div style={styles.socialGrid}>
              <a href="https://wa.me/51978162605" target="_blank" rel="noreferrer" style={styles.socialBtn}><FaWhatsapp /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialBtn}><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialBtn}><FaInstagram /></a>
            </div>
          </div>

          {/* Columna 2: Ubicación */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}><FaMapMarkerAlt /> Ubícanos</h4>
            <p style={styles.text}><strong>Dirección:</strong> Jr. Real 424</p>
            <p style={styles.text}>Pasaje Plaza de Armas (Espalda de la Iglesia San Pedro a ½ cuadra de la DEMUNA)</p>
            <p style={styles.text}><strong>Distrito:</strong> Mala, Perú</p>
          </div>

          {/* Columna 3: Contacto */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}><FaPhoneAlt /> Contacto Directo</h4>
            <p style={styles.text}><strong>Central:</strong> +51 978 162 605</p>
            <p style={styles.text}><strong>WhatsApp:</strong> +51 994 776 304</p>
            <p style={styles.text}><FaEnvelope /> policlinico.chrisallab@gmail.com</p>
          </div>

          {/* Columna 4: Horarios */}
          <div style={styles.column}>
            <h4 style={styles.colTitle}><FaClock /> Horario</h4>
            <p style={styles.text}><strong>Lunes a Sábado:</strong></p>
            <p style={styles.textHighlight}>8:00 AM - 7:00 PM</p>
            <p style={styles.text}><strong>Domingos:</strong></p>
            <p style={styles.textHighlight}>8:00 AM - 1:00 PM</p>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div style={styles.bottomBar}>
        <p>© 2026 Policlínico Chrisal-Lab S.A.C. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    width: '100%',
    backgroundColor: '#0d5c63',
    color: '#ffffff',
  },
  topSection: {
    padding: '50px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '30px',
    maxWidth: '1300px',
    margin: '0 auto',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  brandTitle: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '1px',
  },
  brandSubtitle: {
    fontSize: '12px',
    color: '#7be0e8',
    fontWeight: '700',
  },
  colTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#7be0e8',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#e0f2f1',
  },
  textHighlight: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#ffffff',
  },
  socialGrid: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px',
  },
  socialBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#1695a0',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontSize: '18px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  bottomBar: {
    backgroundColor: '#093e43',
    padding: '18px 20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#b2dfdb',
  },
};