/**
 * Servicio Orquestador de Transacciones (DIP - Inversión de Dependencias)
 * 
 * Este servicio reemplaza al monolito original. Recibe sus dependencias
 * inyectadas por constructor, cumpliendo con el Principio de Inversión
 * de Dependencias (DIP) y el Principio de Responsabilidad Única (SRP).
 */
class TransactionService {
  /**
   * @param {Object} dependencies - Servicios de bajo nivel inyectados.
   * @param {Object} dependencies.validationService - Servicio de validación financiera.
   * @param {Object} dependencies.balanceService - Servicio de gestión de saldos.
   * @param {Object} dependencies.transactionLogService - Servicio de registro de transacciones.
   * @param {Object} dependencies.notificationService - Servicio de notificaciones.
   */
  constructor({ validationService, balanceService, transactionLogService, notificationService }) {
    this.validationService = validationService;
    this.balanceService = balanceService;
    this.transactionLogService = transactionLogService;
    this.notificationService = notificationService;
  }

  /**
   * Ejecuta una transferencia bancaria orquestando los servicios inyectados.
   * @param {string} fromAccountId - ID de la cuenta origen.
   * @param {string} toAccountId - ID de la cuenta destino.
   * @param {number} amount - Monto a transferir.
   * @returns {Object} Resultado de la transferencia.
   */
  executeTransfer(fromAccountId, toAccountId, amount) {
    // 1. Validar reglas de negocio (delegado al servicio de validación)
    const { sender, receiver } = this.validationService.validateTransfer(fromAccountId, toAccountId, amount);

    // 2. Ejecutar la deducción de saldo (delegado al servicio de balance)
    this.balanceService.deductBalance(sender, receiver, amount);

    // 3. Registrar la transacción en el historial (delegado al servicio de log)
    const transaction = this.transactionLogService.logTransaction(fromAccountId, toAccountId, amount);

    // 4. Notificar a las partes involucradas (delegado al servicio de notificaciones)
    this.notificationService.notifyTransfer(sender, receiver, amount);

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction,
      balanceRestante: sender.balance
    };
  }

  /**
   * Obtiene el saldo actual de una cuenta.
   * @param {string} accountId - ID de la cuenta.
   * @returns {Object} Información de la cuenta.
   */
  getAccountBalance(accountId) {
    const account = this.validationService.findAccount(accountId);
    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }
    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }
}

module.exports = TransactionService;
