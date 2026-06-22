// Instrumentación de Sentry - DEBE ser la PRIMERA importación del backend
const Sentry = require('@sentry/node');
require('dotenv').config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  // Tasa de muestreo de trazas para monitoreo de rendimiento
  tracesSampleRate: 1.0,
  release: process.env.SENTRY_RELEASE,
});

console.log('[SENTRY] SDK de observabilidad inicializado correctamente.');
