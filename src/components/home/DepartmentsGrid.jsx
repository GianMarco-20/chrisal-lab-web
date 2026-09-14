import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { serviciosData } from '../../pages/Servicios';

export default function DepartmentsGrid() {
  return (
    <section className="dept-section">
      <div className="dept-section-header">
        <div>
          <span className="section-eyebrow">Nuestras Especialidades</span>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>
            Atención médica integral
          </h2>
        </div>
        <Link to="/servicios" className="section-link">
          Ver todos los servicios <FaArrowRight />
        </Link>
      </div>

      <div className="dept-grid">
        {serviciosData.map((item) => (
          <Link key={item.id} to={item.link} className="dept-card">
            <span className="dept-icon-box">{item.icono}</span>
            <h3 className="dept-card-title">{item.titulo}</h3>
            <p className="dept-card-desc">{item.descripcion}</p>
            <span className="dept-card-arrow"><FaArrowRight /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
