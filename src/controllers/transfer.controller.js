const Sentry = require('@sentry/node');
const TransactionService = require('../services/transaction.service');
const validationService = require('../services/validation.service');
const balanceService = require('../services/balance.service');
const transactionLogService = require('../services/transaction-log.service');
const notificationService = require('../services/notification.service');

// Inyección de dependencias por constructor (DIP)
const transactionService = new TransactionService({
  validationService,
  balanceService,
  transactionLogService,
  notificationService
});

/**
 * Endpoint para ejecutar una transferencia bancaria (Beta).
 * POST /v1/transfer-beta/execute
 * 
 * Espera un cuerpo JSON con: { fromAccountId, toAccountId, amount }
 * 
 * OBSERVABILIDAD: Este endpoint simula un fallo de conexión a la base de datos
 * de saldos (Error Operacional 500) que se reporta a Sentry con Tags del usuario.
 */
function executeTransfer(req, res, next) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    if (!fromAccountId || !toAccountId || amount === undefined) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
      });
    }

    // --- ERROR OPERACIONAL SIMULADO ---
    // Simula un fallo de conexión al Clúster de Datos SecurePay
    // Este error 500 DEBE alertar a Sentry con Tags del usuario afectado
    Sentry.setTag('userId', req.user.sub);
    Sentry.setTag('userName', req.user.name);
    Sentry.setUser({ id: req.user.sub, email: req.user.name });

    throw new Error('Conexión interrumpida con el Clúster de Datos SecurePay');

  } catch (error) {
    // Propagar el error al middleware de Sentry para que lo capture como Error Operacional 500
    next(error);
  }
}

module.exports = {
  executeTransfer
};
