'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Cita } from './CitasTable';

interface TicketCitaModalProps {
  cita: Cita;
  onClose: () => void;
  usuarioEmision?: string;
}

export default function TicketCitaModal({
  cita,
  onClose,
  usuarioEmision = 'RECEPCION',
}: TicketCitaModalProps) {
  // Datos oficiales de la Clínica / Policlínico Chrisal-Lab
  const [institucion, setInstitucion] = useState('POLICLÍNICO CHRISAL-LAB');
  const [subtitulo, setSubtitulo] = useState('POLICLÍNICO & LABORATORIO CLÍNICO');
  const [ruc, setRuc] = useState('20608542109');
  const [direccion, setDireccion] = useState('Jr. Real 424, Pje. Plaza de Armas - Mala');
  const [telefono, setTelefono] = useState('Central: 978 162 605 / 994 776 304');
  const [condicion, setCondicion] = useState<'PARTICULAR' | 'CONVENIO'>('PARTICULAR');
  const [cupo, setCupo] = useState<string>(
    cita.citaId ? String(cita.citaId) : cita.id.replace(/\D/g, '') || '1'
  );
  const [celularEnvio, setCelularEnvio] = useState(cita.celular || '');
  const [descargando, setDescargando] = useState(false);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const ticketRef = useRef<HTMLDivElement>(null);

  // Formatear fecha y hora
  const formatFechaTicket = (f: string) => {
    if (!f) return '';
    const partes = f.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return f;
  };

  const fechaCita = formatFechaTicket(cita.fecha);
  const horaCita = cita.hora || '08:00';

  // Determinar turno (Mañana / Tarde)
  const esTurnoTarde = () => {
    const horaNum = parseInt(horaCita.split(':')[0], 10);
    const esPM = horaCita.toLowerCase().includes('pm');
    if (esPM) return true;
    return !isNaN(horaNum) && horaNum >= 13;
  };
  const turnoTexto = esTurnoTarde()
    ? '(CONSULTA EXT - TURNO TARDE)'
    : '(CONSULTA EXT - TURNO MAÑANA)';

  // Fecha y hora de emisión actual
  const [fechaHoraActual, setFechaHoraActual] = useState({
    fechaHoraEmision: '',
    fechaHoraImpresion: '',
  });

  useEffect(() => {
    const ahora = new Date();
    const d = String(ahora.getDate()).padStart(2, '0');
    const m = String(ahora.getMonth() + 1).padStart(2, '0');
    const y = ahora.getFullYear();
    const hr = String(ahora.getHours()).padStart(2, '0');
    const min = String(ahora.getMinutes()).padStart(2, '0');
    const str = `${d}/${m}/${y} ${hr}:${min}`;
    setFechaHoraActual({
      fechaHoraEmision: str,
      fechaHoraImpresion: str,
    });
  }, []);

  const nCuenta = cita.cuentaId ? String(cita.cuentaId) : String(620000 + (cita.citaId || 1));
  const servicioTexto = `${cita.especialidad.toUpperCase()} - CE`;
  const medicoTexto = cita.medico.toLowerCase().includes('asignar')
    ? 'Por asignar'
    : `Médico: ${cita.medico}`;

  // ========================================================
  // DESCARGAR TICKET COMO IMAGEN (PNG DE ALTA DEFINICIÓN)
  // ========================================================
  const descargarImagen = () => {
    setDescargando(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const scale = 2; // Para alta resolución (Retina / HD)
      const width = 360;
      const height = 480;

      canvas.width = width * scale;
      canvas.height = height * scale;

      ctx.scale(scale, scale);

      // Fondo blanco
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#000000';
      ctx.textBaseline = 'top';

      let y = 18;

      // Header de la Clínica
      ctx.font = 'bold 13.5px "Courier New", monospace, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(institucion, width / 2, y);
      y += 16;

      ctx.font = 'bold 9.5px "Courier New", monospace, sans-serif';
      ctx.fillText(subtitulo, width / 2, y);
      y += 14;

      ctx.font = '10px "Courier New", monospace, sans-serif';
      ctx.fillText(`RUC: ${ruc}`, width / 2, y);
      y += 14;

      ctx.font = '9px "Courier New", monospace, sans-serif';
      ctx.fillText(direccion, width / 2, y);
      y += 13;

      ctx.font = '9px "Courier New", monospace, sans-serif';
      ctx.fillText(telefono, width / 2, y);
      y += 16;

      ctx.font = 'bold 14.5px "Courier New", monospace, sans-serif';
      ctx.fillText('TICKET DE CITA', width / 2, y);
      y += 22;

      // Sección Cita
      ctx.textAlign = 'left';
      const xLeft = 18;

      ctx.font = 'bold 14px "Courier New", monospace, sans-serif';
      ctx.fillText(`Cupo:   ${cupo}`, xLeft, y);
      y += 18;

      ctx.font = 'bold 13px "Courier New", monospace, sans-serif';
      ctx.fillText(`Fecha: ${fechaCita}   Hr: ${horaCita}`, xLeft, y);
      y += 17;

      ctx.font = '11px "Courier New", monospace, sans-serif';
      ctx.fillText(`Turno:    ${turnoTexto}`, xLeft, y);
      y += 16;

      ctx.fillText(`Servicio: ${servicioTexto}`, xLeft, y);
      y += 16;

      ctx.fillText(medicoTexto.length > 40 ? medicoTexto.slice(0, 38) + '...' : medicoTexto, xLeft, y);
      y += 20;

      // Línea divisoria 1
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(xLeft, y);
      ctx.lineTo(width - xLeft, y);
      ctx.stroke();
      y += 10;

      // Sección Paciente
      ctx.font = 'bold 13.5px "Courier New", monospace, sans-serif';
      ctx.fillText(`N°Historia: ${cita.hc || '---'}`, xLeft, y);
      y += 17;

      ctx.font = '11px "Courier New", monospace, sans-serif';
      ctx.fillText(`N°Cuenta:   ${nCuenta}`, xLeft, y);
      y += 17;

      ctx.font = 'bold 12.5px "Courier New", monospace, sans-serif';
      ctx.fillText('Paciente:   ' + cita.paciente.toUpperCase(), xLeft, y);
      y += 17;

      ctx.font = '11px "Courier New", monospace, sans-serif';
      ctx.fillText(`Condición:  ${condicion}`, xLeft, y);
      y += 20;

      // Línea divisoria 2
      ctx.beginPath();
      ctx.moveTo(xLeft, y);
      ctx.lineTo(width - xLeft, y);
      ctx.stroke();
      y += 10;

      // Emisión
      ctx.font = '10px "Courier New", monospace, sans-serif';
      ctx.fillText(`Fecha emisión: ${fechaHoraActual.fechaHoraEmision}   Usua: ${usuarioEmision.toUpperCase()}`, xLeft, y);
      y += 16;

      ctx.textAlign = 'center';
      ctx.font = '9px "Courier New", monospace, sans-serif';
      ctx.fillText(`Fecha y Hora de Impresión: ${fechaHoraActual.fechaHoraImpresion}`, width / 2, y);
      y += 16;

      ctx.font = 'bold 10px "Courier New", monospace, sans-serif';
      ctx.fillText('¡Gracias por confiar en Chrisal-Lab!', width / 2, y);

      // Convertir a blob y descargar
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const nombreLimpio = (cita.paciente || 'paciente').replace(/[^a-zA-Z0-9]/g, '_');
        a.download = `Ticket_Cita_${cita.hc || cita.id}_${nombreLimpio}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error('Error al generar imagen de ticket:', err);
    } finally {
      setDescargando(false);
    }
  };

  // ========================================================
  // IMPRIMIR / DESCARGAR PDF (TÉRMICA 80MM)
  // ========================================================
  const imprimirTicket = () => {
    const ventana = window.open('', '_blank', 'width=450,height=650');
    if (!ventana) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ticket de Cita - ${cita.paciente}</title>
          <style>
            @page {
              size: 80mm auto;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 12px 14px;
              font-family: 'Courier New', Courier, monospace;
              color: #000;
              background: #fff;
              font-size: 11px;
              line-height: 1.25;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .header-title { font-size: 13px; font-weight: bold; margin-bottom: 2px; }
            .header-sub { font-size: 9.5px; margin: 1px 0; }
            .ticket-title { font-size: 14.5px; font-weight: bold; margin: 10px 0 8px 0; }
            .cupo { font-size: 15px; font-weight: bold; margin: 3px 0; }
            .fecha-hr { font-size: 13px; font-weight: bold; margin: 3px 0; }
            .linea { border-top: 1px solid #000; margin: 8px 0; }
            .hc { font-size: 13.5px; font-weight: bold; margin: 3px 0; }
            .paciente { font-size: 12.5px; font-weight: bold; margin: 3px 0; }
            .impresion { font-size: 9px; text-align: center; margin-top: 6px; }
            .agradecimiento { font-size: 10px; font-weight: bold; text-align: center; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="center header-title">${institucion}</div>
          <div class="center header-sub bold">${subtitulo}</div>
          <div class="center header-sub">RUC: ${ruc}</div>
          <div class="center header-sub">${direccion}</div>
          <div class="center header-sub">${telefono}</div>
          <div class="center ticket-title">TICKET DE CITA</div>

          <div class="cupo">Cupo: &nbsp;${cupo}</div>
          <div class="fecha-hr">Fecha: ${fechaCita} &nbsp; Hr: ${horaCita}</div>
          <div>Turno: &nbsp;${turnoTexto}</div>
          <div>Servicio: ${servicioTexto}</div>
          <div>${medicoTexto}</div>

          <div class="linea"></div>

          <div class="hc">N°Historia: ${cita.hc || '---'}</div>
          <div>N°Cuenta: ${nCuenta}</div>
          <div class="paciente">Paciente: ${cita.paciente.toUpperCase()}</div>
          <div>Condición: ${condicion}</div>

          <div class="linea"></div>

          <div>Fecha emisión: ${fechaHoraActual.fechaHoraEmision} &nbsp; Usua: ${usuarioEmision.toUpperCase()}</div>
          <div class="impresion">Fecha y Hora de Impresión: ${fechaHoraActual.fechaHoraImpresion}</div>
          <div class="agradecimiento">¡Gracias por confiar en Chrisal-Lab!</div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    ventana.document.write(html);
    ventana.document.close();
  };

  // ========================================================
  // ENVIAR CONFIRMACIÓN A WHATSAPP
  // ========================================================
  const enviarWhatsApp = () => {
    const celLimpio = celularEnvio.replace(/\D/g, '');
    const num = celLimpio.startsWith('51') ? celLimpio : `51${celLimpio}`;
    const mensaje =
      `*TICKET DE CITA MÉDICA*\n` +
      `🏥 *${institucion}*\n` +
      `📍 ${direccion}\n\n` +
      `👤 *Paciente:* ${cita.paciente.toUpperCase()}\n` +
      `📄 *N° Historia:* ${cita.hc || '---'}\n` +
      `🩺 *Servicio:* ${cita.especialidad}\n` +
      `👨‍⚕️ *${medicoTexto}*\n` +
      `📅 *Fecha:* ${fechaCita}\n` +
      `⏰ *Hora:* ${horaCita}\n` +
      `🎟️ *Cupo:* ${cupo}\n\n` +
      `¡Gracias por su preferencia!`;

    const url = `https://wa.me/${num}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg max-h-[95vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-gray-100 flex flex-col">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d7a71]/10 text-[#0d7a71] font-bold text-lg">
              🎫
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Ticket de Cita - Chrisal-Lab</h3>
              <p className="text-xs text-gray-400">Descargue o imprima el comprobante para el paciente</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Toolbar de opciones rápidas */}
        <div className="px-6 py-3 border-b border-gray-100 bg-teal-50/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">Cupo:</span>
            <input
              type="text"
              value={cupo}
              onChange={(e) => setCupo(e.target.value)}
              className="w-16 h-7 px-2 rounded-md border border-gray-200 bg-white text-xs font-bold text-gray-800 text-center outline-none focus:border-[#0d7a71]"
            />
            <span className="font-semibold text-gray-600 ml-2">Condición:</span>
            <select
              value={condicion}
              onChange={(e) => setCondicion(e.target.value as any)}
              className="h-7 px-2 rounded-md border border-gray-200 bg-white text-xs font-semibold text-gray-800 outline-none focus:border-[#0d7a71]"
            >
              <option value="PARTICULAR">PARTICULAR</option>
              <option value="CONVENIO">CONVENIO</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setMostrarOpciones(!mostrarOpciones)}
            className="text-xs font-semibold text-[#0d7a71] hover:underline cursor-pointer"
          >
            {mostrarOpciones ? 'Ocultar ajustes' : '⚙️ Editar datos cabecera'}
          </button>
        </div>

        {/* Panel plegable de ajustes de cabecera */}
        {mostrarOpciones && (
          <div className="px-6 py-3.5 bg-gray-50 border-b border-gray-100 text-xs space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-0.5">Institución</label>
                <input
                  type="text"
                  value={institucion}
                  onChange={(e) => setInstitucion(e.target.value)}
                  className="w-full h-8 px-2 rounded-md border border-gray-200 bg-white text-xs text-gray-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-0.5">RUC</label>
                <input
                  type="text"
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                  className="w-full h-8 px-2 rounded-md border border-gray-200 bg-white text-xs text-gray-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-0.5">Dirección</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full h-8 px-2 rounded-md border border-gray-200 bg-white text-xs text-gray-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-0.5">Teléfono</label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full h-8 px-2 rounded-md border border-gray-200 bg-white text-xs text-gray-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* Vista previa del ticket térmico */}
        <div className="p-6 bg-slate-100 flex items-center justify-center overflow-x-auto">
          <div
            ref={ticketRef}
            className="w-[330px] bg-white p-5 shadow-lg border border-gray-200 font-mono text-[11px] leading-tight text-black select-text"
            style={{ fontFamily: '"Courier New", Courier, monospace' }}
          >
            {/* Cabecera Clínica */}
            <div className="text-center font-bold text-[13px] leading-snug">{institucion}</div>
            <div className="text-center font-bold text-[9px] text-gray-700 mt-0.5">{subtitulo}</div>
            <div className="text-center text-[9.5px] mt-0.5">RUC: {ruc}</div>
            <div className="text-center text-[9px] text-gray-700 leading-tight mt-0.5">{direccion}</div>
            <div className="text-center text-[9px] text-gray-700">{telefono}</div>

            <div className="text-center font-extrabold text-[14px] my-3 tracking-wide">
              TICKET DE CITA
            </div>

            {/* Datos Cita */}
            <div className="space-y-1">
              <div className="text-[14.5px] font-bold">Cupo:&nbsp;&nbsp;{cupo}</div>
              <div className="text-[12.5px] font-bold">Fecha: {fechaCita} &nbsp; Hr: {horaCita}</div>
              <div>Turno: &nbsp;{turnoTexto}</div>
              <div>Servicio: {servicioTexto}</div>
              <div className="break-words">{medicoTexto}</div>
            </div>

            {/* Separador */}
            <div className="my-2.5 border-t border-black" />

            {/* Datos Paciente */}
            <div className="space-y-1">
              <div className="text-[13px] font-bold">N°Historia: {cita.hc || '---'}</div>
              <div>N°Cuenta: {nCuenta}</div>
              <div className="text-[12.5px] font-bold break-words">Paciente: {cita.paciente.toUpperCase()}</div>
              <div>Condición: {condicion}</div>
            </div>

            {/* Separador */}
            <div className="my-2.5 border-t border-black" />

            {/* Datos Emisión */}
            <div className="space-y-1 text-[10px]">
              <div>Fecha emisión: {fechaHoraActual.fechaHoraEmision} &nbsp; Usua: {usuarioEmision.toUpperCase()}</div>
              <div className="text-center text-[8.5px] text-gray-600 mt-2">
                Fecha y Hora de Impresión: {fechaHoraActual.fechaHoraImpresion}
              </div>
              <div className="text-center font-bold text-[9.5px] mt-1.5">
                ¡Gracias por confiar en Chrisal-Lab!
              </div>
            </div>
          </div>
        </div>

        {/* Footer con botones de acción */}
        <div className="p-5 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Enviar WhatsApp */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="N° Celular (ej. 987654321)"
              value={celularEnvio}
              onChange={(e) => setCelularEnvio(e.target.value)}
              className="h-10 w-44 px-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-[#0d7a71]"
            />
            <button
              type="button"
              onClick={enviarWhatsApp}
              disabled={!celularEnvio.trim()}
              className="h-10 px-3.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              title="Abrir WhatsApp para enviar recordatorio"
            >
              <span>💬</span> WhatsApp
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={imprimirTicket}
              className="h-10 px-4 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center gap-1.5 shadow-xs"
            >
              <span>🖨️</span> Imprimir / PDF
            </button>

            <button
              type="button"
              onClick={descargarImagen}
              disabled={descargando}
              className="h-10 px-4 rounded-xl bg-[#0d7a71] text-xs font-bold text-white hover:bg-[#0a625b] transition flex items-center gap-1.5 shadow-sm shadow-[#0d7a71]/20 disabled:opacity-60"
            >
              <span>📥</span> {descargando ? 'Descargando...' : 'Descargar Imagen'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
