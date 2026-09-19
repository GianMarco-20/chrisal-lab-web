import { Link } from 'react-router-dom';
import { FaArrowRight, FaWhatsapp, FaStethoscope } from 'react-icons/fa';
import heroImg from '../assets/atencion-domicilio-1.jpg';
import logoImg from '../assets/logo.png';

export default function Hero() {
  const numeroTelefono = '51978162605';
  const mensaje = encodeURIComponent('Hola, quisiera agendar una cita en Policlínico Chrisal-Lab.');

  return (
    <section className="hero-modern">
      <div className="hero-image-bleed">
        <FaStethoscope className="hero-image-watermark" aria-hidden="true" />
        <img src={heroImg} alt="Atención médica en Policlínico Chrisal-Lab" />
        <div className="hero-image-badge">
          <img src={logoImg} alt="Chrisal-Lab" />
          <span>CHRISAL-LAB<br />POLICLÍNICO</span>
        </div>
      </div>

      <div className="hero-modern-inner">
        <div className="hero-text-col">
          <span className="anim-badge hero-eyebrow-pill">
            📍 Atención médica de confianza en Mala
          </span>

          <h1 className="anim-title hero-modern-title">
            Cuidamos tu salud y la de <span className="hero-accent">tu familia</span>
          </h1>

          <p className="anim-subtitle hero-modern-tagline">
            ANALISIS CLINICOS A PRECIOS POPULARES
          </p>

          <p className="anim-desc hero-modern-desc">
            En Policlínico Chrisal-Lab te ofrecemos análisis clínicos de alta precisión, atención
            médica especializada y resultados confiables a precios accesibles, garantizando la
            rapidez y calidad que mereces en un solo lugar.
          </p>

          <div className="anim-buttons hero-modern-actions">
            <Link to="/servicios" className="pill-btn-primary">
              Ver Servicios <FaArrowRight />
            </Link>
            <a
              href={`https://wa.me/${numeroTelefono}?text=${mensaje}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn-outline"
            >
              <FaWhatsapp /> Agendar Cita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
