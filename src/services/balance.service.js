/**
 * Servicio de Gestión de Saldos (SRP)
 * Responsabilidad única: deducir y acreditar saldos entre cuentas.
 */

/**
 * Realiza la deducción del saldo de la cuenta origen y la acreditación en la cuenta destino.
 * @param {Object} sender - Objeto de la cuenta origen.
 * @param {Object} receiver - Objeto de la cuenta destino.
 * @param {number} amount - Monto a transferir.
 * @returns {{ senderBalance: number, receiverBalance: number }} Saldos actualizados.
 */
function deductBalance(sender, receiver, amount) {
  sender.balance -= amount;
  receiver.balance += amount;

  return {
    senderBalance: sender.balance,
    receiverBalance: receiver.balance
  };
}

module.exports = {
  deductBalance
};
