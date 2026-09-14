import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export default function CtaBand() {
  const numeroTelefono = '51978162605';
  const mensaje = encodeURIComponent('Hola, quisiera agendar una cita en Policlínico Chrisal-Lab.');

  return (
    <section id="contacto" className="cta-band">
      <div className="cta-band-content">
        <h2 className="cta-band-title">¿Necesitas atención médica hoy?</h2>
        <p className="cta-band-text">
          Escríbenos por WhatsApp y coordinamos tu cita el mismo día, en el policlínico o en tu domicilio.
        </p>
        <div className="cta-band-actions">
          <a
            href={`https://wa.me/${numeroTelefono}?text=${mensaje}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-whatsapp-btn"
          >
            <FaWhatsapp style={{ fontSize: '22px' }} /> Escríbenos por WhatsApp
          </a>
          <a href={`tel:+${numeroTelefono}`} className="cta-band-phone">
            <FaPhoneAlt style={{ marginRight: '6px' }} /> +51 978 162 605
          </a>
        </div>
      </div>
    </section>
  );
}
