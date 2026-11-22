/* =========================================================
   DESCARGAR EL INFORME DE RESULTADOS COMO PDF

   La hoja (HojaResultadosLab) está oculta en pantalla. Para descargarla se
   muestra un momento fuera de la vista, se fotografía tal como la dibuja el
   navegador (html-to-image) y la imagen se parte en páginas A4 dentro de un PDF
   (jsPDF). Es un PDF de imagen: se ve igual que la impresión, pero el texto no
   se puede seleccionar. Las dos librerías se cargan solo al descargar.
========================================================= */

const A4_ANCHO_MM = 210;
const A4_ALTO_MM = 297;
// Resolución de la captura: 2 = el doble de píxeles que la pantalla (texto nítido).
const ESCALA = 2;

/** Nombre de archivo seguro: sin tildes, espacios ni símbolos. */
export function nombreArchivoPdf(...partes: string[]): string {
  const limpio = partes
    .join('-')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${limpio || 'resultado'}.pdf`;
}

/** Descarga como PDF la hoja marcada con data-hoja="<clave>". */
export async function descargarHojaPdf(clave: string, nombreArchivo: string): Promise<void> {
  const contenedor = document.querySelector<HTMLElement>(`.hoja-impresion[data-hoja="${clave}"]`);
  const hoja = contenedor?.querySelector<HTMLElement>('.res-hoja');
  if (!contenedor || !hoja) {
    throw new Error('No se encontró la hoja de resultados para descargar.');
  }

  const [{ toJpeg }, { jsPDF }] = await Promise.all([import('html-to-image'), import('jspdf')]);

  // La hoja existe pero con display:none: se muestra fuera de la pantalla para poder medirla.
  const estiloAnterior = contenedor.getAttribute('style');
  contenedor.style.cssText = 'display:block;position:fixed;left:-10000px;top:0;';
  try {
    await document.fonts.ready;
    // Imágenes (logo, firma) ya cargadas: si no, la captura saldría sin ellas.
    await Promise.all(
      [...hoja.querySelectorAll('img')].map((img) => (img.complete ? null : img.decode().catch(() => undefined))),
    );

    const ancho = hoja.offsetWidth;
    const alto = hoja.scrollHeight;
    const imagen = await toJpeg(hoja, {
      width: ancho,
      height: alto,
      pixelRatio: ESCALA,
      quality: 0.95,
      backgroundColor: '#ffffff',
    });

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const altoImagenMm = (A4_ANCHO_MM * alto) / ancho;
    const paginas = Math.max(1, Math.ceil(altoImagenMm / A4_ALTO_MM - 0.01));
    // La misma imagen en cada página, corrida hacia arriba: jsPDF recorta lo que sale de la hoja.
    for (let pagina = 0; pagina < paginas; pagina++) {
      if (pagina > 0) pdf.addPage();
      pdf.addImage(imagen, 'JPEG', 0, -pagina * A4_ALTO_MM, A4_ANCHO_MM, altoImagenMm);
    }
    pdf.save(nombreArchivo);
  } finally {
    if (estiloAnterior === null) contenedor.removeAttribute('style');
    else contenedor.setAttribute('style', estiloAnterior);
  }
}
