import { Link } from 'react-router-dom';
import { FaStethoscope, FaFlask, FaHome, FaWhatsapp } from 'react-icons/fa';

export default function QuickAccessBar() {
  const numeroTelefono = '51978162605';
  const mensaje = encodeURIComponent('Hola, quisiera más información sobre sus servicios en Policlínico Chrisal-Lab.');

  return (
    <div className="quick-access-wrapper">
      <div className="quick-access-bar">
        <Link to="/servicios" className="quick-access-item">
          <span className="quick-access-icon"><FaStethoscope /></span>
          <span>
            <span className="quick-access-text-title">Especialidades</span>
            <span className="quick-access-text-sub">9 áreas médicas</span>
          </span>
        </Link>

        <Link to="/laboratorio" className="quick-access-item">
          <span className="quick-access-icon"><FaFlask /></span>
          <span>
            <span className="quick-access-text-title">Laboratorio</span>
            <span className="quick-access-text-sub">Análisis clínicos</span>
          </span>
        </Link>

        <Link to="/atencion-a-domicilio" className="quick-access-item">
          <span className="quick-access-icon"><FaHome /></span>
          <span>
            <span className="quick-access-text-title">A Domicilio</span>
            <span className="quick-access-text-sub">Mala y alrededores</span>
          </span>
        </Link>

        <a
          href={`https://wa.me/${numeroTelefono}?text=${mensaje}`}
          target="_blank"
          rel="noopener noreferrer"
          className="quick-access-item is-cta"
        >
          <span className="quick-access-icon"><FaWhatsapp /></span>
          <span>
            <span className="quick-access-text-title">Agendar Cita</span>
            <span className="quick-access-text-sub">Respuesta rápida</span>
          </span>
        </a>
      </div>
    </div>
  );
}
