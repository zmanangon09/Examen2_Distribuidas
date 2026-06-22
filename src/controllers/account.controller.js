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
 * Endpoint para obtener el saldo actual de una cuenta (Alpha).
 * GET /v1/account-alpha/balance
 * 
 * Se espera recibir el parámetro 'accountId' por query string o desde el req.user (si ya está autenticado).
 */
function getBalance(req, res) {
  try {
    const accountId = req.query.accountId;
    
    if (!accountId) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Debe proporcionar un parámetro accountId por query string (ej: ?accountId=ACC-12345).'
      });
    }

    const accountInfo = transactionService.getAccountBalance(accountId);
    return res.status(200).json(accountInfo);
  } catch (error) {
    return res.status(404).json({
      error: 'Recurso no encontrado',
      message: error.message
    });
  }
}

module.exports = {
  getBalance
};
