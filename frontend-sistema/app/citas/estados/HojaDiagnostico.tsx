'use client';

import { createPortal } from 'react-dom';
import {
  type CitaModal,
  type DiagnosticoModal,
  formatFecha,
  formatHora,
} from './ModalBase';
import './hoja-diagnostico.css';

/* =========================================================
   HOJA IMPRIMIBLE: INFORME DE ATENCIÓN / DIAGNÓSTICO

   Se dibuja en un portal colgado de <body> y se mantiene oculta en
   pantalla; los estilos (.hoja-*) y @media print están en
   hoja-diagnostico.css. Al imprimir solo se ve esta hoja (A4), con la
   identidad del sobre institucional: franja verde y azul marino, logo,
   marca de agua, teléfono y dirección. Solo lleva lo que decide el
   médico: diagnóstico, indicaciones y exámenes (sin signos vitales,
   motivo de consulta ni síntomas). Se imprime con window.print(): el navegador
   permite también guardarla como PDF.
========================================================= */

interface Props {
  cita: CitaModal;
  diagnostico: DiagnosticoModal;
  examenes: string[];
}

const TELEFONO = '978 162 605';
const DIRECCION =
  'Psje. Plaza De Armas (Espalda de la iglesia San Pedro A 1/2 cdra. de la Demuna) · Mala';

function Dato({ etiqueta, valor }: { etiqueta: string; valor?: string }) {
  return (
    <div className="hoja-dato">
      <span className="hoja-dato-etiqueta">{etiqueta}</span>
      <span className="hoja-dato-valor">{valor?.trim() ? valor : '—'}</span>
    </div>
  );
}

function Bloque({ titulo, texto }: { titulo: string; texto?: string }) {
  return (
    <section className="hoja-bloque">
      <h3 className="hoja-bloque-titulo">{titulo}</h3>
      <p className="hoja-bloque-texto">{texto?.trim() ? texto : 'Sin registro.'}</p>
    </section>
  );
}

export default function HojaDiagnostico({ cita, diagnostico, examenes }: Props) {
  const medicoAsignado =
    cita.medico && cita.medico.toLowerCase() !== 'por asignar' ? cita.medico : '';
  const emitido = new Date().toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' });

  return createPortal(
    <div className="hoja-impresion" aria-hidden="true">
      <div className="hoja">
        {/* Marca de agua: logo grande y tenue en el centro de la hoja */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" className="hoja-marca-agua" />

        {/* Franja decorativa (esquina superior derecha), como en el sobre */}
        <svg className="hoja-curva" viewBox="0 0 200 200" preserveAspectRatio="none">
          <path d="M60 0 H200 V200 C190 120 130 40 60 0 Z" fill="#2b3658" />
          <path d="M30 0 H62 C132 42 192 122 200 200 C186 118 118 30 30 0 Z" fill="#279a38" />
        </svg>

        <header className="hoja-encabezado">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="hoja-logo" />
          <div>
            <p className="hoja-marca">POLICLÍNICO CHRISAL</p>
            <p className="hoja-submarca">Chrisal-Lab · Laboratorio Clínico S.A.C.</p>
          </div>
        </header>

        <h1 className="hoja-titulo">Informe de atención médica</h1>

        <section className="hoja-grilla hoja-paciente">
          <Dato etiqueta="Paciente" valor={cita.paciente} />
          <Dato etiqueta="DNI" valor={cita.dni} />
          <Dato etiqueta="Historia clínica" valor={cita.hc} />
          <Dato etiqueta="Sexo" valor={cita.sexo} />
          <Dato
            etiqueta="Fecha de atención"
            valor={`${formatFecha(cita.fecha)} · ${formatHora(cita.hora)}`}
          />
          <Dato etiqueta="Especialidad" valor={cita.especialidad} />
        </section>

        <Bloque titulo="Diagnóstico" texto={diagnostico.diagnostico} />
        <Bloque titulo="Indicaciones y tratamiento" texto={diagnostico.indicaciones} />

        {examenes.length > 0 && (
          <section className="hoja-bloque">
            <h3 className="hoja-bloque-titulo">Exámenes de laboratorio solicitados</h3>
            <ul className="hoja-lista">
              {examenes.map((nombre) => (
                <li key={nombre}>{nombre}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="hoja-firma">
          <div className="hoja-firma-linea" />
          <p className="hoja-firma-nombre">{medicoAsignado || 'Médico tratante'}</p>
          <p className="hoja-firma-detalle">{cita.especialidad}</p>
        </div>

        <footer className="hoja-pie">
          <span className="hoja-pie-telefono">{TELEFONO}</span>
          <span className="hoja-pie-direccion">{DIRECCION}</span>
          <span className="hoja-pie-emision">Emitido: {emitido}</span>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
