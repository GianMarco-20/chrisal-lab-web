import { Link } from 'react-router-dom';
import { 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaUserNurse, 
  FaUserMd, 
  FaFlask, 
  FaHeartbeat, 
  FaCheckCircle, 
  FaClock, 
  FaShieldAlt,
  FaSyringe,
  FaBandAid,
  FaNotesMedical
} from 'react-icons/fa';

import heroBg from '../assets/hero-bg.jpg';
import docAtencionImg from '../assets/atencion-domicilio-1.jpg'; 
import muestraImg from '../assets/atencion-domicilio-2.jpg'; 

export default function AtencionDomicilio() {
  const numeroTelefono = "51978162605";
  const mensajePredeterminado = encodeURIComponent(
    "Hola, me gustaría solicitar información y agendar una cita para Atención a Domicilio. Por favor, ayúdenme con los requisitos y disponibilidad."
  );

  const coberturaDistritos = [
    "Mala (Sede Central)",
    "San Antonio",
    "Chilca",
    "Calango",
    "Asia (Pueblo y Playas)",
    "Santa Cruz de Flores",
    "Cerro Azul / San Luis"
  ];

  const serviciosDomicilio = [
    {
      titulo: "Consulta Médica General",
      desc: "Evaluación clínica integral sin salir de la comodidad de tu hogar.",
      icono: <FaUserMd />
    },
    {
      titulo: "Enfermería & Inyectables",
      desc: "Colocación de inyectables, sueros, vías, sondas y curaciones.",
      icono: <FaSyringe />
    },
    {
      titulo: "Toma de Muestras",
      desc: "Extracción para análisis de laboratorio con la misma precisión del policlínico.",
      icono: <FaFlask />
    },
    {
      titulo: "Monitoreo Adulto Mayor",
      desc: "Control especializado de funciones vitales y seguimiento a pacientes crónicos.",
      icono: <FaHeartbeat />
    },
    {
      titulo: "Curación de Heridas",
      desc: "Tratamiento de úlceras, retiro de puntos y curaciones quirúrgicas simples.",
      icono: <FaBandAid />
    },
    {
      titulo: "Chequeo Preventivo",
      desc: "Evaluación básica de salud preventiva y toma de presión / glucosa.",
      icono: <FaNotesMedical />
    }
  ];

  return (
    <section id="atencion-domicilio" className="services-section" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="services-overlay"></div>

      <div className="services-content" style={styles.container}>
        
        {/* Encabezado Principal */}
        <div style={styles.headerContainer}>
          <h1 className="glow-text-cyan hero-stroke-text" style={styles.mainTitle}>
            ATENCIÓN A DOMICILIO
          </h1>
          <p style={styles.subtitle}>
            Llevamos la experiencia, seguridad y calidez de Policlínico Chrisal-Lab directamente a la puerta de tu hogar.
          </p>
        </div>

        {/* Bloque Principal (Layout 2 Columnas) */}
        <div style={styles.gridTwoColumns}>
          
          {/* Tarjeta de Información e Impacto */}
          <div style={styles.infoCard}>
            <div style={styles.cardHeader}>
              <FaUserNurse style={styles.titleIcon} />
              <h2 style={styles.sectionTitle}>Salud Cerca de Ti</h2>
            </div>
            
            <p style={styles.paragraph}>
              Evita esperas, viajes agotadores o exponer a personas vulnerables. Nuestro equipo médico especializado acude a tu residencia equipado con todos los protocolos de bioseguridad.
            </p>

            <div style={styles.highlightsContainer}>
              <div style={styles.highlightBox}>
                <FaClock style={styles.benefitIcon} />
                <div>
                  <strong style={styles.highlightTitle}>Ahorro de Tiempo</strong>
                  <span style={styles.highlightSub}>Atención programada</span>
                </div>
              </div>
              <div style={styles.highlightBox}>
                <FaShieldAlt style={styles.benefitIcon} />
                <div>
                  <strong style={styles.highlightTitle}>100% Seguro</strong>
                  <span style={styles.highlightSub}>Especialistas equipados</span>
                </div>
              </div>
            </div>

            <a 
              href={`https://wa.me/${numeroTelefono}?text=${mensajePredeterminado}`}
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.btnWhatsapp}
            >
              <FaWhatsapp style={{ fontSize: '26px', marginRight: '10px' }} />
              Solicitar Visita por WhatsApp
            </a>
          </div>

          {/* Galería Visual con Imágenes Integradas */}
          <div style={styles.imageGallery}>
            <div style={styles.imageWrapperMain}>
              <img 
                src={docAtencionImg} 
                alt="Atención médica a domicilio en Mala" 
                style={styles.mainImage}
                onError={(e) => { e.target.src = "https://placehold.co/600x400/1695a0/ffffff?text=Atencion+Medica+en+Casa"; }}
              />
              <span style={styles.imageLabel}>Atención Médica Personalizada</span>
            </div>
            
            <div style={styles.imageWrapperSub}>
              <img 
                src={muestraImg} 
                alt="Toma de muestras a domicilio" 
                style={styles.subImage}
                onError={(e) => { e.target.src = "https://placehold.co/600x300/071527/00f2fe?text=Toma+de+Muestras+a+Domicilio"; }}
              />
              <span style={styles.imageLabel}>Toma de Muestras Rápidas</span>
            </div>
          </div>

        </div>

        {/* Grilla de Servicios Equilibrada */}
        <div style={{ marginTop: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <h2 style={{ color: '#00f2fe', fontSize: '32px', fontWeight: '800', margin: 0 }}>
              ¿Qué Procedimientos Realizamos en Casa?
            </h2>
            <p style={{ color: '#ffffff', opacity: 0.9, marginTop: '8px' }}>
              Servicios adaptados a las necesidades del paciente y su familia.
            </p>
          </div>

          <div style={styles.balancedGrid}>
            {serviciosDomicilio.map((item, index) => (
              <div key={index} className="service-card" style={styles.customCard}>
                <div className="service-card-body" style={styles.cardBodyFix}>
                  <div className="service-icon-wrapper" style={{ marginBottom: '15px' }}>
                    {item.icono}
                  </div>
                  <h3 className="service-title" style={styles.cardTitle}>{item.titulo}</h3>
                  <p className="service-description" style={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zona de Cobertura */}
        <div style={styles.coberturaBox}>
          <div style={styles.coberturaTopBar}>
            <div style={styles.coberturaHeader}>
              <div style={styles.iconPulseWrapper}>
                <FaMapMarkerAlt style={{ color: '#00f2fe', fontSize: '28px' }} />
              </div>
              <div>
                <h2 style={{ color: '#ffffff', margin: 0, fontSize: '26px', fontWeight: '800' }}>
                  Zonas de Cobertura & Alcance
                </h2>
                <span style={{ color: '#a0e0e0', fontSize: '14px' }}>
                  Desplazamiento médico rápido en Mala y distritos aledaños
                </span>
              </div>
            </div>
          </div>

          <div style={styles.distritosGrid}>
            {coberturaDistritos.map((distrito, index) => (
              <div key={index} style={styles.distritoCard}>
                <div style={styles.distritoHeader}>
                  <FaCheckCircle style={{ color: '#00f2fe', fontSize: '18px', flexShrink: 0 }} />
                  <strong style={styles.distritoNombre}>{distrito}</strong>
                </div>
                <span style={styles.distritoMeta}>
                  {distrito.includes('Mala') ? 'Zona Central • Respuesta Rápida' : 'Previa Coordinación'}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.coberturaFooterNote}>
            <p style={{ margin: 0, color: '#e0f7fa', fontSize: '13px', lineHeight: '1.5' }}>
              📍 <strong>¿Tu zona no aparece en la lista?</strong> Consúltanos por WhatsApp. Llegamos a playas, condominios y zonas rurales del valle previa confirmación de ruta.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

const styles = {
  container: {
    maxWidth: '1250px',
    margin: '0 auto',
    paddingBottom: '40px'
  },
  headerContainer: {
    textAlign: 'left',
    maxWidth: '900px',
    marginBottom: '35px',
  },
  mainTitle: {
    fontSize: 'clamp(36px, 5vw, 65px)',
    fontWeight: '900',
    letterSpacing: '2px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 'clamp(16px, 2vw, 20px)',
    fontWeight: '500',
    lineHeight: '1.4',
    textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
  },
  gridTwoColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '35px',
    alignItems: 'stretch',
    marginBottom: '40px'
  },
  infoCard: {
    backgroundColor: 'rgba(7, 21, 39, 0.85)',
    padding: '35px',
    borderRadius: '20px',
    border: '1px solid rgba(0, 242, 254, 0.3)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '15px'
  },
  titleIcon: {
    color: '#00f2fe',
    fontSize: '28px'
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '26px',
    fontWeight: '800',
    margin: 0
  },
  paragraph: {
    color: '#d0e0e3',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '25px'
  },
  highlightsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '30px'
  },
  highlightBox: {
    backgroundColor: 'rgba(22, 149, 160, 0.2)',
    padding: '12px 15px',
    borderRadius: '12px',
    border: '1px solid rgba(22, 149, 160, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  benefitIcon: {
    color: '#00f2fe',
    fontSize: '22px'
  },
  highlightTitle: {
    display: 'block',
    color: '#ffffff',
    fontSize: '14px'
  },
  highlightSub: {
    display: 'block',
    color: '#a0e0e0',
    fontSize: '11px'
  },
  imageGallery: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  imageWrapperMain: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '2px solid #1695a0',
    boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
    height: '240px'
  },
  imageWrapperSub: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '2px solid #1695a0',
    boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
    height: '180px'
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  subImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  imageLabel: {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    backgroundColor: 'rgba(7, 21, 39, 0.85)',
    color: '#00f2fe',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    border: '1px solid rgba(0,242,254,0.3)'
  },
  btnWhatsapp: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    color: '#ffffff',
    padding: '16px 24px',
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: '16px',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
    width: '100%',
    boxSizing: 'border-box'
  },
  /* --- Grilla de Servicios Mejorada (Simétrica) --- */
  balancedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    justifyContent: 'center'
  },
  customCard: {
    margin: 0,
    width: '100%',
    boxSizing: 'border-box'
  },
  cardBodyFix: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '25px 20px',
    height: '100%',
    boxSizing: 'border-box'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '10px'
  },
  cardDesc: {
    fontSize: '14px',
    lineHeight: '1.5',
    textAlign: 'center',
    margin: 0
  },
  /* --- Cobertura Limpia --- */
  coberturaBox: {
    backgroundColor: 'rgba(7, 21, 39, 0.92)',
    border: '1px solid rgba(0, 242, 254, 0.4)',
    borderRadius: '24px',
    padding: '35px',
    marginTop: '60px',
    boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
    backdropFilter: 'blur(8px)'
  },
  coberturaTopBar: {
    marginBottom: '30px',
    borderBottom: '1px solid rgba(22, 149, 160, 0.3)',
    paddingBottom: '20px'
  },
  coberturaHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  iconPulseWrapper: {
    width: '50px',
    height: '50px',
    backgroundColor: 'rgba(22, 149, 160, 0.25)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0, 242, 254, 0.3)'
  },
  distritosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px'
  },
  distritoCard: {
    backgroundColor: 'rgba(16, 37, 66, 0.6)',
    border: '1px solid rgba(22, 149, 160, 0.3)',
    borderRadius: '14px',
    padding: '16px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  distritoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  distritoNombre: {
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700'
  },
  distritoMeta: {
    color: '#82b3b8',
    fontSize: '12px',
    paddingLeft: '28px'
  },
  coberturaFooterNote: {
    marginTop: '25px',
    backgroundColor: 'rgba(22, 149, 160, 0.15)',
    borderLeft: '4px solid #00f2fe',
    padding: '12px 18px',
    borderRadius: '0 10px 10px 0'
  }
};