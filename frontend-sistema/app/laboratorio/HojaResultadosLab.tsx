'use client';

import { createPortal } from 'react-dom';
import type { DetalleOrden, OrdenExamen } from '../../lib/api';
import { prepararExamen, referenciaConUnidad } from './formatos/impresion';
// Reglas base de impresión (.hoja-impresion: oculta el resto de la pantalla).
import '../citas/estados/hoja-diagnostico.css';
import './hoja-resultados.css';

/* =========================================================
   HOJA IMPRIMIBLE: RESULTADO DE ANÁLISIS (laboratorio)

   Sigue el formato del laboratorio: logo, "RESULTADO DE ANÁLISIS", nombre del
   examen, tabla con los datos del paciente, una sección por examen
   (PARÁMETRO / RESULTADO / VALOR DE REFERENCIA) y un recuadro de observaciones.
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

  const impresos = examenes.map((ex) => ({
    ex,
    impreso: prepararExamen(ex.examen, ex.resultado, ex.examen.detalle?.muestra),
  }));
  // Una sola hoja de un examen lleva su nombre bajo el título; en un informe con
  // varios, cada examen lleva el suyo encima de su sección.
  const unSoloExamen = impresos.length === 1;
  // Muestras distintas de los exámenes impresos ("Suero", "Suero, Orina").
  const muestra = [...new Set(impresos.map(({ impreso }) => impreso.muestra).filter(Boolean))].join(', ');

  const datos: [string, string, string, string][] = [
    ['Paciente', `${paciente.nombres} ${paciente.apellidos}`, 'Edad', edad],
    ['Médico', MEDICO, 'DNI', paciente.dni],
    ['Fecha', fecha, 'Sexo', sexo],
    // N° de registro = número de la orden de laboratorio.
    ['Muestra', muestra, 'N° Registro', String(orden.id)],
  ];

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
        {unSoloExamen && <p className="res-subtitulo">{impresos[0].impreso.titulo}</p>}

        <table className="res-datos">
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '41%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '29%' }} />
          </colgroup>
          <tbody>
            {datos.map(([e1, v1, e2, v2]) => (
              <tr key={e1}>
                <th>{e1}</th>
                <td>{v1}</td>
                <th>{e2}</th>
                <td>{v2}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {impresos.map(({ ex, impreso }) => (
          <section key={ex.id} className="res-examen">
            {!unSoloExamen && <p className="res-subtitulo res-subtitulo-bloque">{impreso.titulo}</p>}
            <table className="res-tabla">
              <colgroup>
                <col style={{ width: '33%' }} />
                <col style={{ width: '32%' }} />
                <col style={{ width: '35%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan={3} className="res-banda">
                    {ex.examen.categoria?.nombre ?? impreso.titulo}
                  </th>
                </tr>
                <tr className="res-columnas">
                  <th>Parámetro</th>
                  <th>Resultado</th>
                  <th>Valor de referencia</th>
                </tr>
              </thead>
              <tbody>
                {impreso.filas.map((fila) => (
                  <tr key={fila.nombre}>
                    <td className="res-celda-nombre">{fila.nombre}</td>
                    <td className="res-celda-resultado">{ex.resultado ? fila.resultado : '—'}</td>
                    <td className="res-celda-referencia">
                      {referenciaConUnidad(fila).map((linea) => (
                        <span key={linea}>{linea}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}

        <div className="res-obs">
          <div className="res-obs-titulo">Observaciones</div>
          <div className="res-obs-cuerpo">
            {impresos
              .filter(({ impreso }) => impreso.observaciones)
              .map(({ ex, impreso }) => (
                <p key={ex.id}>
                  {!unSoloExamen && <strong>{impreso.titulo}: </strong>}
                  {impreso.observaciones}
                </p>
              ))}
          </div>
        </div>

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
