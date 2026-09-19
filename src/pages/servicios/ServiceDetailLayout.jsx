import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaWhatsapp, FaShieldAlt } from 'react-icons/fa';

export default function ServiceDetailLayout({ titulo, descripcion, imagen, checklist }) {
  const numeroTelefono = '51978162605';
  const mensaje = encodeURIComponent(
    `Hola, quisiera reservar una cita para ${titulo} en Policlínico Chrisal-Lab.`
  );

  return (
    <section className="svc-detail-section">
      <div className="svc-detail-wrap">
        <Link to="/servicios" className="svc-detail-back">
          <FaArrowLeft /> Volver a Servicios
        </Link>

        <div className="svc-detail-grid">
          <div>
            <span className="hero-eyebrow-pill">● Atención Especializada</span>
            <h1 className="svc-detail-title">{titulo}</h1>
            <p className="svc-detail-desc">{descripcion}</p>

            <ul className="svc-detail-checklist">
              {checklist.map((item, index) => (
                <li key={index} className="svc-detail-check-item">
                  <FaCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${numeroTelefono}?text=${mensaje}`}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-detail-btn"
            >
              <FaWhatsapp style={{ fontSize: '20px' }} /> Reservar cita en {titulo}
            </a>
          </div>

          <div className="svc-detail-visual">
            <div className="svc-detail-image-circle">
              <img src={imagen} alt={titulo} />
            </div>
            <div className="svc-detail-trust-badge">
              <FaShieldAlt />
              <span>Atención de Confianza</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
