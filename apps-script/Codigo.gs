/**
 * RSVP boda Antonio & Noémie — receptor de Google Apps Script.
 *
 * Recibe los envíos del formulario de boda_antonio_noemie.html y los añade
 * como una fila en la hoja de cálculo.
 *
 * Consulta apps-script/README.md para las instrucciones de despliegue: un
 * despliegue mal configurado es la causa habitual de que el formulario falle.
 */

// Deja SHEET_ID vacío si el script está vinculado a la hoja (Extensiones >
// Apps Script desde el propio Sheet). Rellénalo solo si el script es
// independiente, con el id que aparece en la URL de la hoja:
// https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
const SHEET_ID = '';
const SHEET_NAME = 'RSVP';

const CABECERAS = [
  'Fecha',
  'Nombre',
  'Email',
  'Asistencia',
  'Nº acompañantes',
  'Acompañantes',
  'Alergias',
  'Transporte',
  'Comentarios',
  'Idioma'
];

/**
 * Permite comprobar desde el navegador que el despliegue está activo.
 * Abre la URL /exec en una pestaña: debe responder un JSON con status "ok".
 */
function doGet() {
  return jsonResponse({ status: 'ok', mensaje: 'Receptor RSVP activo' });
}

function doPost(e) {
  // El bloqueo evita que dos envíos simultáneos escriban en la misma fila.
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: 'error', mensaje: 'Petición sin cuerpo' });
    }

    const datos = JSON.parse(e.postData.contents);
    const hoja = obtenerHoja();

    hoja.appendRow([
      datos.timestamp || new Date().toLocaleString('es-ES'),
      datos.nombre || '',
      datos.email || '',
      datos.asistencia === 'si' ? 'Sí' : 'No',
      datos.numAcompanantes || 0,
      formatearAcompanantes(datos.acompanantes),
      datos.alergias || '',
      datos.transporte === 'si' ? 'Sí' : 'No',
      datos.comentarios || '',
      datos.idioma || ''
    ]);

    return jsonResponse({ status: 'ok' });
  } catch (error) {
    console.error('Error procesando RSVP:', error);
    return jsonResponse({ status: 'error', mensaje: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function obtenerHoja() {
  const libro = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  let hoja = libro.getSheetByName(SHEET_NAME);

  if (!hoja) {
    hoja = libro.insertSheet(SHEET_NAME);
  }

  if (hoja.getLastRow() === 0) {
    hoja.appendRow(CABECERAS);
    hoja.getRange(1, 1, 1, CABECERAS.length).setFontWeight('bold');
    hoja.setFrozenRows(1);
  }

  return hoja;
}

function formatearAcompanantes(acompanantes) {
  if (!acompanantes || !acompanantes.length) return '';
  return acompanantes.map(a => a.nombre).join(', ');
}

function jsonResponse(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
