/**
 * Servicio de Notificaciones (SRP)
 * Responsabilidad única: enviar notificaciones simuladas por correo electrónico.
 */

/**
 * Envía notificaciones simuladas de transferencia por consola.
 * @param {Object} sender - Objeto de la cuenta origen (con email, accountAlpha, balance).
 * @param {Object} receiver - Objeto de la cuenta destino (con email, accountAlpha, balance).
 * @param {number} amount - Monto transferido.
 */
function notifyTransfer(sender, receiver, amount) {
  console.log(`\n--- [EMAIL OUTBOX] Enviando correo de confirmación ---`);
  console.log(`Para: ${sender.email}`);
  console.log(`Asunto: Débito por Transferencia Realizada - Fintech SecurePay`);
  console.log(`Mensaje: Estimado usuario, se ha debitado de su cuenta ${sender.accountAlpha} el valor de $${amount}.`);
  console.log(`Su nuevo saldo disponible es: $${sender.balance}.`);
  console.log(`------------------------------------------------------------\n`);

  console.log(`\n--- [EMAIL OUTBOX] Enviando correo de recepción ---`);
  console.log(`Para: ${receiver.email}`);
  console.log(`Asunto: Crédito por Transferencia Recibida - Fintech SecurePay`);
  console.log(`Mensaje: Estimado usuario, ha recibido una transferencia de $${amount} de la cuenta ${sender.accountAlpha}.`);
  console.log(`Su nuevo saldo disponible es: $${receiver.balance}.`);
  console.log(`------------------------------------------------------------\n`);
}

module.exports = {
  notifyTransfer
};
