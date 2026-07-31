const fs = require('fs');
const path = require('path');

const VARIATIONS_PATH = path.join(__dirname, '../forms/field-variations.json');

let variationsCache = null;

function loadVariations() {
  if (variationsCache) return variationsCache;
  const raw = JSON.parse(fs.readFileSync(VARIATIONS_PATH, 'utf8'));
  const flat = {};
  Object.entries(raw.variations).forEach(([family, familyMap]) => {
    Object.entries(familyMap).forEach(([type, meta]) => {
      flat[type] = { family, type, ...meta };
    });
  });
  variationsCache = { raw, flat };
  return variationsCache;
}

function getVariation(type) {
  return loadVariations().flat[type] || null;
}

function isVariationType(type) {
  return !!getVariation(type);
}

function parseIsoDate(value) {
  if (!value) return null;
  const s = String(value).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  const d = parseInt(m[3], 10);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return { y, mo, d };
}

function pad(n, len = 2) {
  return String(n).padStart(len, '0');
}

function formatDate(value, format) {
  const parsed = parseIsoDate(value);
  if (!parsed) return value;
  const { y, mo, d } = parsed;
  return format
    .replace(/yyyy/g, String(y))
    .replace(/MM/g, pad(mo))
    .replace(/dd/g, pad(d));
}

function formatMonthYear(value, format) {
  const parsed = parseIsoDate(value);
  if (!parsed) return value;
  const { y, mo } = parsed;
  return format
    .replace(/yyyy/g, String(y))
    .replace(/MM/g, pad(mo));
}

function formatValue(value, field) {
  const type = field && field.type;
  if (!type) return value;
  const variation = getVariation(type);
  if (!variation) return value;

  if (variation.family === 'date') {
    if (variation.format === 'iso') return value;
    if (variation.widget === 'month_input') return formatMonthYear(value, variation.format);
    return formatDate(value, variation.format);
  }

  return value;
}

function normalizeDateString(value, format) {
  if (value === null || value === undefined) return '';
  const s = String(value).trim();
  if (!s) return '';

  // Try to parse common date separator styles: / - .
  const sepMatch = s.match(/^(\d{1,4})[\/.-](\d{1,4})[\/.-](\d{1,4})$/);
  if (!sepMatch) return s;

  const parts = [sepMatch[1], sepMatch[2], sepMatch[3]];
  const fmtLower = (format || 'dd/MM/yyyy').toLowerCase();

  let d, mo, y;
  if (fmtLower.startsWith('dd')) {
    d = parseInt(parts[0], 10);
    mo = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  } else if (fmtLower.startsWith('mm')) {
    mo = parseInt(parts[0], 10);
    d = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  } else {
    // yyyy-MM-dd
    y = parseInt(parts[0], 10);
    mo = parseInt(parts[1], 10);
    d = parseInt(parts[2], 10);
  }

  if (isNaN(d) || isNaN(mo) || isNaN(y)) return s;

  const sep = format.includes('/') ? '/' : (format.includes('-') ? '-' : '.');
  if (fmtLower.startsWith('dd')) return `${pad(d)}${sep}${pad(mo)}${sep}${pad(y, 4)}`;
  if (fmtLower.startsWith('mm')) return `${pad(mo)}${sep}${pad(d)}${sep}${pad(y, 4)}`;
  return `${pad(y, 4)}${sep}${pad(mo)}${sep}${pad(d)}`;
}

function normalizeMonthYearString(value) {
  if (value === null || value === undefined) return '';
  const s = String(value).trim();
  if (!s) return '';
  const sepMatch = s.match(/^(\d{1,2})[\/.-](\d{4})$/);
  if (!sepMatch) return s;
  const mo = parseInt(sepMatch[1], 10);
  const y = parseInt(sepMatch[2], 10);
  if (isNaN(mo) || isNaN(y)) return s;
  return `${pad(mo)}/${pad(y, 4)}`;
}

function parseSubmission(value, field) {
  const type = field && field.type;
  if (!type) return value;
  const variation = getVariation(type);
  if (!variation) return value;

  if (variation.family === 'date') {
    if (variation.format === 'iso') return value;
    if (variation.widget === 'month_input') return normalizeMonthYearString(value);
    return normalizeDateString(value, variation.format);
  }

  return value;
}

module.exports = {
  loadVariations,
  getVariation,
  isVariationType,
  formatValue,
  parseSubmission,
  normalizeDateString,
  normalizeMonthYearString
};
