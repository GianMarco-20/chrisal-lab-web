'use client';

import { createPortal } from 'react-dom';
import type { DetalleOrden, OrdenExamen } from '../../lib/api';
import { prepararExamen } from './formatos/impresion';
// Reglas base de impresión (.hoja-impresion: oculta el resto de la pantalla).
import '../citas/estados/hoja-diagnostico.css';
import './hoja-resultados.css';

/* =========================================================
   HOJA IMPRIMIBLE: RESULTADO DE ANÁLISIS (laboratorio)

   Sigue el formato del laboratorio: logo, "RESULTADO DE ANÁLISIS", datos del
   paciente y tabla EXAMEN / RESULTADOS / UNIDAD / VALORES DE REFERENCIA.
   Se dibuja en un portal de <body>, oculta en pantalla; al imprimir
   (window.print, también "Guardar como PDF") es lo único que se ve.
   No incluye precios, tubos ni condiciones (son de uso interno).
   La unidad y los rangos de cada examen vienen de la base de datos
   (examen_parametros); ver formatos/impresion.ts.
========================================================= */

interface Props {
  detalle: DetalleOrden;
  /** Exámenes a imprimir; sin esto se imprimen todos los de la orden. */
  examenes?: OrdenExamen[];
  /** Identifica la hoja ('completa' o 'examen-<id>') para imprimir solo esa. */
  clave?: string;
}

// Datos fijos del laboratorio. REVISAR con la clínica: se transcribieron de un
// resultado impreso (la foto no se leía del todo bien).
const SEDES = 'Mala Sedes: Jr. Real N°424 Cel: 961353994 · Psje. Plaza de Armas (Espaldas de la Iglesia San Pedro) Cel: 978162605';
const HORARIO = 'Horario de atención: Lunes a Viernes 7:00 am – 7:00 pm / Sábados y Domingos 8:00 am – 1:00 pm';
// Las órdenes de laboratorio no registran médico solicitante.
const MEDICO = 'PERSONAL';

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="res-dato">
      <span className="res-dato-etiqueta">{etiqueta}</span>
      <span>:</span>
      <span className="res-dato-valor">{valor || '—'}</span>
    </div>
  );
}

function fechaCorta(iso: string | null | undefined) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function HojaResultadosLab({ detalle, examenes: soloEstos, clave = 'completa' }: Props) {
  const { orden } = detalle;
  const examenes = soloEstos ?? detalle.examenes;
  const paciente = orden.paciente;
  const sexo = paciente.sexo === 'M' ? 'Masculino' : paciente.sexo === 'F' ? 'Femenino' : '';
  const edad = paciente.edad != null ? `${paciente.edad} ${paciente.edad === 1 ? 'año' : 'años'}` : '';
  // Un examen suelto lleva la fecha en que se registró su resultado; el informe
  // completo, la de resultados completos de la orden.
  const fecha = fechaCorta(
    soloEstos?.length === 1 && soloEstos[0].resultado
      ? soloEstos[0].resultado.fechaRegistro
      : (orden.fechaResultado ?? orden.fechaMuestra),
  );
  const emitido = new Date().toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' });

  return createPortal(
    <div className="hoja-impresion" data-hoja={clave} aria-hidden="true">
      <div className="res-hoja">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="res-marca-agua" />

        {/* Cabecera: icono del logo + nombre, como en el resultado impreso */}
        <header className="res-cabecera">
          <div className="res-icono">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" />
          </div>
          <div className="res-nombre">
            <p className="res-nombre-lab">CHRISAL-LAB</p>
            <p className="res-nombre-sub">LABORATORIO CLINICO</p>
          </div>
          <p className="res-nombre-sac">CHRISAL-LAB S.A.C</p>
        </header>
        <div className="res-linea" />

        <h1 className="res-titulo">RESULTADO DE ANÁLISIS</h1>

        <section className="res-paciente">
          <Dato etiqueta="Paciente" valor={`${paciente.nombres} ${paciente.apellidos}`} />
          <Dato etiqueta="Edad" valor={edad} />
          <Dato etiqueta="Médico" valor={MEDICO} />
          <Dato etiqueta="DNI" valor={paciente.dni} />
          <Dato etiqueta="Fecha" valor={fecha} />
          <Dato etiqueta="Sexo" valor={sexo} />
        </section>
        <div className="res-linea" />

        <div className="res-tabla-cabecera">
          <span>Examen</span>
          <span>Resultados</span>
          <span>Unidad</span>
          <span>Valores de referencia</span>
        </div>

        {examenes.map((ex) => {
          const impreso = prepararExamen(ex.examen, ex.resultado, ex.examen.detalle?.muestra);
          return (
            <section key={ex.id} className="res-examen">
              {!impreso.simple && <p className="res-examen-titulo">{impreso.titulo}</p>}
              {!impreso.simple && impreso.muestra && (
                <p className="res-examen-muestra">Muestra: {impreso.muestra}</p>
              )}
              {impreso.filas.map((fila) => (
                <div key={fila.nombre} className="res-fila">
                  <span className="res-fila-nombre">{fila.nombre}</span>
                  <span className="res-fila-resultado">{ex.resultado ? fila.resultado : '—'}</span>
                  <span>{fila.unidad}</span>
                  <span className="res-fila-referencia">
                    {fila.referencia.map((linea) => (
                      <span key={linea} style={{ display: 'block' }}>
                        {linea}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
              {impreso.simple && impreso.muestra && (
                <p className="res-examen-muestra" style={{ paddingTop: '1mm' }}>
                  Muestra: {impreso.muestra}
                </p>
              )}
            </section>
          );
        })}

        {/* Firma y sello del tecnólogo médico (imagen escaneada en public/) */}
        <div className="res-firma">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tecnologo.jpeg" alt="Firma y sello del tecnólogo médico" className="res-sello" />
        </div>

        <footer className="res-pie">
          <div>{SEDES}</div>
          <div>{HORARIO}</div>
          <div className="res-pie-emision">Emitido: {emitido}</div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
