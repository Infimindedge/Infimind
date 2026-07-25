const SHEET_NAME = 'Enquiries';
const MAX_REQUESTS_PER_EMAIL_PER_HOUR = 5;
const SPREADSHEET_ID = '14KZbZNGHtj4ZTJeDj1PFPQRPB62i_IBbwuheCSPA1uM';

function doGet() {
  return jsonResponse({ ok: true, service: 'Infimind enquiries' });
}

function doPost(event) {
  try {
    if (!event || !event.postData || !event.postData.contents) {
      throw new Error('Invalid request.');
    }

    const payload = JSON.parse(event.postData.contents);
    validatePayload(payload);
    enforceRateLimit(payload.email);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
      ensureHeader(sheet);
      sheet.appendRow([
        new Date(),
        safeCell(payload.source),
        safeCell(payload.name),
        safeCell(payload.studentName || ''),
        safeCell(payload.email.toLowerCase()),
        safeCell(payload.phone),
        safeCell(payload.country),
        safeCell(payload.program),
        safeCell(payload.message),
        false,
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'Unable to record the enquiry.' });
  }
}

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid payload.');
  if (payload.website) throw new Error('Spam rejected.');
  if (!isText(payload.name, 1, 120)) throw new Error('Invalid name.');
  if (!isText(payload.email, 3, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error('Invalid email.');
  }
  if (!isText(payload.phone, 7, 32) || !/^[+0-9][0-9\s-]*$/.test(payload.phone)) {
    throw new Error('Invalid phone.');
  }
  if (!isText(payload.country, 1, 100)) throw new Error('Invalid country.');
  if (!['school', 'sat', 'undecided'].includes(payload.program)) throw new Error('Invalid programme.');
  if (!['consultation', 'contact'].includes(payload.source)) throw new Error('Invalid source.');
  if (!isText(payload.message, 10, 3000)) throw new Error('Invalid message.');
  if (payload.studentName && !isText(payload.studentName, 1, 120)) throw new Error('Invalid student name.');
}

function enforceRateLimit(email) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(email).trim().toLowerCase(),
    Utilities.Charset.UTF_8
  );
  const key = 'rate_' + Utilities.base64EncodeWebSafe(digest).slice(0, 32);
  const cache = CacheService.getScriptCache();
  const count = Number(cache.get(key) || 0);
  if (count >= MAX_REQUESTS_PER_EMAIL_PER_HOUR) throw new Error('Rate limit exceeded.');
  cache.put(key, String(count + 1), 3600);
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    'Received At',
    'Source',
    'Parent / Guardian',
    'Student',
    'Email',
    'Phone / WhatsApp',
    'Country',
    'Programme',
    'Message',
    'Contacted',
  ]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
}

function safeCell(value) {
  const text = String(value == null ? '' : value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function isText(value, min, max) {
  return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
