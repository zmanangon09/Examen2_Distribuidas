/**
 * Servicio de Registro de Transacciones (SRP)
 * Responsabilidad única: crear y almacenar registros de transacciones en el historial.
 */

const transactionsHistory = [];

/**
 * Registra una transacción completada en el historial.
 * @param {string} from - ID de la cuenta origen.
 * @param {string} to - ID de la cuenta destino.
 * @param {number} amount - Monto transferido.
 * @returns {Object} Registro de la transacción creada.
 */
function logTransaction(from, to, amount) {
  const newTransaction = {
    transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    from,
    to,
    amount,
    status: 'COMPLETED',
    timestamp: new Date().toISOString()
  };

  transactionsHistory.push(newTransaction);
  return newTransaction;
}

module.exports = {
  logTransaction,
  transactionsHistory
};
