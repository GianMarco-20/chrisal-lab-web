import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

export default function LabTestLayout({ titulo, icono, imagen, descripcion, checklist }) {
  const numeroTelefono = '51978162605';
  const mensaje = encodeURIComponent(
    `Hola, quisiera consultar sobre el análisis de ${titulo} en Policlínico Chrisal-Lab.`
  );

  return (
    <section className="lab-detail-section">
      <div className="lab-detail-wrap">
        <Link to="/laboratorio" className="lab-detail-back">
          <FaArrowLeft /> Volver a Laboratorio
        </Link>

        <div className="lab-detail-grid">
          {imagen ? (
            <div className="lab-detail-image-panel">
              <img src={imagen} alt={titulo} />
            </div>
          ) : (
            <div className="lab-detail-icon-panel">
              {icono}
            </div>
          )}

          <div>
            <h1 className="lab-detail-title">{titulo}</h1>
            <p className="lab-detail-desc">{descripcion}</p>

            <ul className="lab-detail-checklist">
              {checklist.map((item, index) => (
                <li key={index} className="lab-detail-check-item">
                  <FaCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${numeroTelefono}?text=${mensaje}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lab-detail-whatsapp-btn"
            >
              <FaWhatsapp style={{ fontSize: '22px' }} /> Quiero consultar sobre {titulo}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
