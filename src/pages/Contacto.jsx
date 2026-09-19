import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { serviciosData } from './Servicios';

const numeroCentral = '51978162605';
const numeroAtencion2 = '51994776304';
const correo = 'policlinico.chrisallab@gmail.com';

const opcionesServicio = [
  ...serviciosData.map((s) => s.titulo),
  'Laboratorio Clínico',
  'Atención a Domicilio',
  'Paquetes Preventivos',
  'Otra consulta'
];

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servicio, setServicio] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const partes = [
      `Hola, mi nombre es ${nombre}.`,
      telefono && `Mi teléfono de contacto es ${telefono}.`,
      servicio && `Estoy interesado(a) en: ${servicio}.`,
      mensaje && `Mensaje: ${mensaje}`
    ].filter(Boolean);

    const texto = encodeURIComponent(partes.join(' '));
    window.open(`https://wa.me/${numeroCentral}?text=${texto}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto-page" className="services-section">
      <div className="services-content">
        <div style={styles.headerContainer}>
          <h1 style={styles.mainTitle}>
            CONTÁCTANOS
          </h1>
          <p style={styles.subtitle}>
            Ofrecemos atención médica integral y análisis clínicos de alta precisión al alcance de
            tu economía. Comunícate directamente por nuestros canales de atención o déjanos un
            mensaje.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-col">
            <div className="contact-card">
              <h2 className="contact-card-title">Canales de Atención Directa</h2>

              <a
                href={`https://wa.me/${numeroCentral}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-item is-whatsapp"
              >
                <span className="contact-channel-icon"><FaWhatsapp /></span>
                <span>
                  <span className="contact-channel-label">WhatsApp Central</span>
                  <span className="contact-channel-value">+51 978 162 605</span>
                </span>
              </a>

              <a
                href={`https://wa.me/${numeroAtencion2}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-item is-whatsapp"
              >
                <span className="contact-channel-icon"><FaWhatsapp /></span>
                <span>
                  <span className="contact-channel-label">WhatsApp Atención 2</span>
                  <span className="contact-channel-value">+51 994 776 304</span>
                </span>
              </a>

              <a href={`mailto:${correo}`} className="contact-channel-item is-mail">
                <span className="contact-channel-icon"><FaEnvelope /></span>
                <span>
                  <span className="contact-channel-label">Correo Electrónico</span>
                  <span className="contact-channel-value">{correo}</span>
                </span>
              </a>
            </div>

            <div className="contact-card">
              <h2 className="contact-card-title">Síguenos en Redes</h2>
              <div className="contact-social-row">
                <a
                  href="https://www.facebook.com/profile.php?id=61593202882838&locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn is-facebook"
                >
                  <FaFacebookF /> Facebook
                </a>
                <a
                  href="https://www.instagram.com/policlinico.chrisallab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn is-instagram"
                >
                  <FaInstagram /> Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h2 className="contact-card-title">Envíanos un mensaje rápido</h2>
            <p className="contact-form-note">
              Selecciona el servicio de tu interés y el mensaje se enviará directamente a nuestro
              WhatsApp.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-nombre">Nombres y Apellidos</label>
                <input
                  id="contact-nombre"
                  type="text"
                  className="contact-input"
                  placeholder="Ej. Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-telefono">Teléfono de Contacto</label>
                <input
                  id="contact-telefono"
                  type="tel"
                  className="contact-input"
                  placeholder="Ej. 987654321"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-servicio">Servicio / Especialidad</label>
                <select
                  id="contact-servicio"
                  className="contact-select"
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                >
                  <option value="">Selecciona un servicio</option>
                  {opcionesServicio.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="contact-mensaje">Mensaje o Consulta</label>
                <textarea
                  id="contact-mensaje"
                  className="contact-textarea"
                  placeholder="Escribe tu consulta o agendamiento aquí..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                <FaPaperPlane /> Enviar Mensaje por WhatsApp
              </button>
            </form>
          </div>
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
