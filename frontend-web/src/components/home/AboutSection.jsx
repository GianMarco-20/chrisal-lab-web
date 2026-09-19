import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import aboutImg from '../../assets/fisioterapia-doctor.jpg';

const features = [
  'Laboratorio clínico propio',
  '9 especialidades médicas',
  'Atención a domicilio disponible',
  'Horario extendido: Lun-Sáb 7am-7pm'
];

export default function AboutSection() {
  return (
    <section id="quienes-somos" className="about-section">
      <span className="section-eyebrow">Quiénes Somos</span>
      <h2 className="section-heading">Cuidamos de ti y tu familia, cerca de casa</h2>
      <p className="section-subtext">
        Policlínico Chrisal-Lab es un centro de salud familiar ubicado en el corazón de Mala,
        que reúne consulta médica especializada y laboratorio clínico propio bajo un mismo techo.
      </p>

      <div className="about-grid">
        <div className="about-image-wrap">
          <img src={aboutImg} alt="Atención médica en Policlínico Chrisal-Lab" />
        </div>

        <div>
          <p className="section-subtext" style={{ maxWidth: 'none' }}>
            Nuestro compromiso es ofrecer atención cercana, resultados confiables y precios
            accesibles, con un equipo comprometido en cada consulta.
          </p>

          <div className="about-feature-grid">
            {features.map((f) => (
              <div key={f} className="about-feature-item">
                <FaCheckCircle />
                <span>{f}</span>
              </div>
            ))}
          </div>

          <Link to="/servicios" className="pill-btn-primary">
            Conoce Nuestros Servicios <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
