import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaHeadset, FaEye, FaEyeSlash } from 'react-icons/fa';
import logoImg from '../assets/logo.png';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [recordar, setRecordar] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const numeroTelefono = '51978162605';
  const mensajeSoporte = encodeURIComponent('Hola, necesito soporte para acceder al portal de Policlínico Chrisal-Lab.');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="login-section">
      <div className="login-card">
        <img src={logoImg} alt="Chrisal-Lab" className="login-logo" />

        {submitted ? (
          <div className="login-note-box">
            <p>
              Estamos preparando esta función. Muy pronto podrás iniciar sesión para ver tus
              resultados y citas. Mientras tanto, escríbenos por WhatsApp y te ayudamos directamente.
            </p>
            <a
              href={`https://wa.me/${numeroTelefono}?text=${mensajeSoporte}`}
              target="_blank"
              rel="noopener noreferrer"
              className="login-whatsapp-btn"
            >
              <FaWhatsapp /> Escríbenos por WhatsApp
            </a>
          </div>
        ) : (
          <>
            <h1 className="login-title">Bienvenido</h1>
            <div className="login-subtitle-row">
              <span className="login-accent-dash" />
              <span className="login-subtitle">Inicia sesión para gestionar tus resultados y citas</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="login-user">Nombre de usuario</label>
                <input
                  id="login-user"
                  type="text"
                  className="contact-input"
                  placeholder="Ingrese su usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="login-password">Contraseña</label>
                <div className="login-password-wrap">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className="contact-input"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="login-eye-btn"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="login-options-row">
                <label className="login-checkbox-label">
                  <input
                    type="checkbox"
                    checked={recordar}
                    onChange={(e) => setRecordar(e.target.checked)}
                  />
                  Recordar sesión
                </label>

                <a
                  href={`https://wa.me/${numeroTelefono}?text=${mensajeSoporte}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="login-support-link"
                >
                  <FaHeadset /> Soporte
                </a>
              </div>

              <button type="submit" className="login-submit-btn">Iniciar Sesión</button>
            </form>
          </>
        )}

        <div className="login-footer">
          <Link to="/" className="login-back-link">← Volver al inicio</Link>
          <p className="login-footer-note">© 2026 Policlínico Chrisal-Lab S.A.C.</p>
        </div>
      </div>
    </section>
  );
}
