import { useEffect, useMemo, useState } from 'react';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

// En producción se define VITE_API_URL en el .env del despliegue.
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
const TODAS = 'Todas';

function formatearDia(fecha) {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const texto = new Date(anio, mes - 1, dia).toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function DoctorSchedules() {
  const [horarios, setHorarios] = useState([]);
  const [estado, setEstado] = useState('cargando'); // cargando | listo | error
  const [especialidad, setEspecialidad] = useState(TODAS);

  useEffect(() => {
    const controlador = new AbortController();
    fetch(`${API_URL}/publico/horarios-medicos`, { signal: controlador.signal })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('No se pudo cargar');
        return respuesta.json();
      })
      .then((datos) => {
        setHorarios(datos);
        setEstado('listo');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setEstado('error');
      });
    return () => controlador.abort();
  }, []);

  const especialidades = useMemo(
    () => [TODAS, ...new Set(horarios.map((h) => h.especialidad).filter(Boolean))],
    [horarios],
  );

  const porDia = useMemo(() => {
    const filtrados = horarios.filter(
      (h) => especialidad === TODAS || h.especialidad === especialidad,
    );
    const grupos = new Map();
    filtrados.forEach((h) => {
      if (!grupos.has(h.fecha)) grupos.set(h.fecha, []);
      grupos.get(h.fecha).push(h);
    });
    return [...grupos.entries()];
  }, [horarios, especialidad]);

  return (
    <section className="schedule-section" id="horarios">
      <span className="section-eyebrow">Horarios de atención</span>
      <h2 className="section-heading">Nuestros médicos esta quincena</h2>

      {estado === 'cargando' && <p className="schedule-msg">Cargando horarios…</p>}
      {estado === 'error' && (
        <p className="schedule-msg">
          No pudimos cargar los horarios en este momento. Escríbenos por WhatsApp y te ayudamos.
        </p>
      )}
      {estado === 'listo' && horarios.length === 0 && (
        <p className="schedule-msg">
          Aún no hay horarios publicados para los próximos días. Consúltanos por WhatsApp.
        </p>
      )}

      {estado === 'listo' && horarios.length > 0 && (
        <>
          <div className="schedule-filters" role="group" aria-label="Filtrar por especialidad">
            {especialidades.map((item) => (
              <button
                key={item}
                type="button"
                className={`schedule-chip${item === especialidad ? ' is-active' : ''}`}
                onClick={() => setEspecialidad(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {porDia.map(([fecha, items]) => (
            <div key={fecha} className="schedule-day">
              <h3 className="schedule-day-title">{formatearDia(fecha)}</h3>
              <div className="schedule-grid">
                {items.map((h) => (
                  <article key={`${fecha}-${h.medico}-${h.horaInicio}`} className="schedule-card">
                    <h4 className="schedule-doctor">{h.medico}</h4>
                    <span className="schedule-specialty">{h.especialidad ?? 'Medicina'}</span>
                    <p className="schedule-line">
                      <FaClock /> {h.horaInicio} – {h.horaFin}
                      <span className="schedule-turn">{h.turno}</span>
                    </p>
                    <p className="schedule-line">
                      <FaMapMarkerAlt /> {h.consultorio}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
