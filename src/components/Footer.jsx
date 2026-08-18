import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.socialContainer}>
          <a
            href="https://wa.me/51987654321"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialIcon}
          >
            <FaWhatsapp size={22} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialIcon}
          >
            <FaFacebookF size={22} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialIcon}
          >
            <FaInstagram size={22} />
          </a>
        </div>
        <p style={styles.copyright}>
          © 2026 Policlínico Chrisal-Lab S.A.C. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1695a0',
    color: '#ffffff',
    padding: '20px 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  socialContainer: {
    display: 'flex',
    gap: '20px',
  },
  socialIcon: {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '10px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'background 0.3s',
  },
  copyright: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '500',
  },
};