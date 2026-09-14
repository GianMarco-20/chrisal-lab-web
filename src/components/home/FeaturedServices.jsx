import { Link } from 'react-router-dom';
import medicinaImg from '../../assets/medicina-general-doctor.jpg';
import laboratorioImg from '../../assets/hero-bg.jpg';
import domicilioImg from '../../assets/atencion-domicilio-2.jpg';

const items = [
  {
    id: 'medicina-general',
    img: medicinaImg,
    label: 'Consulta Médica',
    titulo: 'Medicina General',
    descripcion: 'Evaluación integral y diagnóstico para toda la familia.',
    link: '/servicios/medicina-general'
  },
  {
    id: 'laboratorio',
    img: laboratorioImg,
    label: 'Laboratorio',
    titulo: 'Análisis Clínicos',
    descripcion: 'Resultados rápidos, confiables y a precios accesibles.',
    link: '/laboratorio'
  },
  {
    id: 'domicilio',
    img: domicilioImg,
    label: 'A Domicilio',
    titulo: 'Atención a Domicilio',
    descripcion: 'Consultas y toma de muestras sin salir de tu casa.',
    link: '/atencion-a-domicilio'
  }
];

export default function FeaturedServices() {
  return (
    <section className="featured-section">
      <div className="featured-inner">
        <span className="section-eyebrow">Servicios Destacados</span>
        <h2 className="section-heading" style={{ marginBottom: 0 }}>
          Lo que más buscan nuestros pacientes
        </h2>

        <div className="featured-grid">
          {items.map((item) => (
            <Link key={item.id} to={item.link} className="featured-card">
              <div className="featured-image-wrap">
                <img src={item.img} alt={item.titulo} />
                <span className="featured-label">{item.label}</span>
              </div>
              <div className="featured-body">
                <h3 className="featured-title">{item.titulo}</h3>
                <p className="featured-desc">{item.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
