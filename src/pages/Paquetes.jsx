import { FaHeartbeat, FaFlask, FaBaby, FaChild, FaStethoscope, FaShieldAlt, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

const paquetesData = [
  {
    id: 'perfil-lipidico',
    titulo: 'Perfil Lipídico',
    precio: 120,
    icono: <FaHeartbeat />,
    items: [
      'Consulta médica',
      'Colesterol total',
      'Colesterol HDL',
      'Colesterol LDL',
      'Colesterol VLDL',
      'Triglicéridos'
    ]
  },
  {
    id: 'perfil-hepatico',
    titulo: 'Perfil Hepático',
    precio: 160,
    icono: <FaFlask />,
    items: [
      'Consulta médica',
      'TGO / TGP',
      'Fosfatasa alcalina',
      'Proteínas totales',
      'Bilirrubinas totales y fraccionadas'
    ]
  },
  {
    id: 'paquete-obstetrico',
    titulo: 'Paquete Obstétrico',
    precio: 100,
    icono: <FaBaby />,
    items: [
      'Consulta médica',
      'Creatinina',
      'Urea',
      'Examen de orina completo'
    ]
  },
  {
    id: 'paquete-nino',
    titulo: 'Paquete Niño',
    precio: 100,
    icono: <FaChild />,
    items: [
      'Consulta médica',
      'Parasitológico simple',
      'Examen completo de orina',
      'Hemoglobina - Hematocrito'
    ]
  },
  {
    id: 'paquete-gastrico',
    titulo: 'Paquete Gástrico',
    precio: 130,
    icono: <FaStethoscope />,
    items: [
      'Consulta médica',
      'Helicobacter pylori'
    ]
  },
  {
    id: 'paquete-preventivo',
    titulo: 'Paquete Preventivo',
    precio: 140,
    icono: <FaShieldAlt />,
    items: [
      'Consulta médica',
      'Hemograma completo',
      'Glucosa',
      'Colesterol',
      'Triglicéridos',
      'Examen de orina completo'
    ]
  }
];

export default function Paquetes() {
  const numeroTelefono = '51978162605';

  return (
    <section id="paquetes" className="services-section">
      <div className="services-content">
        <div style={styles.headerContainer}>
          <h1 style={styles.mainTitle}>
            PAQUETES PREVENTIVOS
          </h1>
          <p style={styles.subtitle}>
            Medicina General + Laboratorio, combinados en un solo paquete a precio especial.
          </p>
        </div>

        <div className="package-grid">
          {paquetesData.map((paquete) => {
            const mensaje = encodeURIComponent(
              `Hola, quisiera consultar sobre el ${paquete.titulo} en Policlínico Chrisal-Lab.`
            );
            return (
              <div key={paquete.id} className="package-card">
                <div className="package-icon-wrap">
                  <span className="package-icon-glow" />
                  <span className="package-icon">{paquete.icono}</span>
                </div>

                <h3 className="package-title">{paquete.titulo}</h3>

                <ul className="package-list">
                  {paquete.items.map((item, index) => (
                    <li key={index} className="package-list-item">
                      <FaCheckCircle />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-footer">
                  <div className="package-price">
                    <span className="package-price-amount">S/ {paquete.precio}</span>
                    <span className="package-price-period">/ paquete</span>
                  </div>
                  <a
                    href={`https://wa.me/${numeroTelefono}?text=${mensaje}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="package-btn"
                  >
                    <FaWhatsapp /> Quiero este paquete
                  </a>
                </div>
              </div>
            );
          })}
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
