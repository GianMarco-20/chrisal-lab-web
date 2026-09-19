import { FaFlask, FaClinicMedical, FaMapMarkerAlt, FaPhoneAlt, FaDirections } from 'react-icons/fa';
import sedeLaboratorioImg from '../assets/sede_laboratorio.jpeg';
import sedePoliclinicoImg from '../assets/sede_policlinico.jpeg';

const sedesData = [
  {
    id: 'laboratorio-sac',
    titulo: 'Chrisal S.A.C - Laboratorio Clínico',
    badge: 'Laboratorio Especializado',
    icono: <FaFlask />,
    imagen: sedeLaboratorioImg,
    direccion: 'Jirón Real 424, Mala 15608',
    telefono: '978 162 605'
  },
  {
    id: 'policlinico',
    titulo: 'Policlínico Chrisal',
    badge: 'Servicio de Salud Ocupacional & Consultorio',
    icono: <FaClinicMedical />,
    imagen: sedePoliclinicoImg,
    direccion: 'Pje. Pl. de Armas 00051, Mala 00051',
    telefono: '978 162 605'
  }
];

export default function Sedes() {
  return (
    <section id="sedes" className="services-section">
      <div className="services-content">
        <div style={styles.headerContainer}>
          <h1 style={styles.mainTitle}>
            NUESTRAS SEDES
          </h1>
          <p style={styles.subtitle}>
            Encuéntranos en nuestras dos ubicaciones estratégicas en Mala. Estamos listos para
            atenderte con la mejor tecnología y calidez humana.
          </p>
        </div>

        <div className="sedes-grid">
          {sedesData.map((sede) => (
            <div key={sede.id} className="sede-card">
              <div className="sede-visual">
                <img src={sede.imagen} alt={sede.titulo} className="sede-visual-img" />
                <span className="sede-badge">{sede.icono} {sede.badge}</span>
              </div>

              <div className="sede-body">
                <h3 className="sede-title">{sede.titulo}</h3>

                <div className="sede-info-item">
                  <FaMapMarkerAlt />
                  <span>
                    <span className="sede-info-label">Dirección</span>
                    <span className="sede-info-value">{sede.direccion}</span>
                  </span>
                </div>

                <div className="sede-info-item">
                  <FaPhoneAlt />
                  <span>
                    <span className="sede-info-label">Central / WhatsApp</span>
                    <span className="sede-info-value">{sede.telefono}</span>
                  </span>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sede.direccion + ', Mala, Perú')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sede-btn"
                >
                  <FaDirections /> Cómo Llegar (Google Maps)
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  headerContainer: {
    textAlign: 'left',
    maxWidth: '900px',
    marginBottom: '10px',
  },
  mainTitle: {
    color: '#0a5f68',
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: '900',
    letterSpacing: '0.3px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#55706f',
    fontSize: 'clamp(16px, 2vw, 20px)',
    fontWeight: '500',
    lineHeight: '1.4',
  },
};
