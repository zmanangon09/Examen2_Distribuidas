// SIMULACIÓN DE UNA BASE DE DATOS EN MEMORIA (Estado global/local)
const usersDb = [
  { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
  { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
];

/**
 * Servicio de Validación Financiera (SRP)
 * Responsabilidad única: buscar cuentas y validar reglas de negocio.
 */

/**
 * Busca una cuenta en la base de datos en memoria por su ID.
 * @param {string} accountId - ID de la cuenta a buscar.
 * @returns {Object|null} El objeto de usuario o null si no existe.
 */
function findAccount(accountId) {
  return usersDb.find(u => u.accountAlpha === accountId) || null;
}

/**
 * Valida las precondiciones de una transferencia bancaria.
 * @param {string} fromAccountId - ID de la cuenta origen.
 * @param {string} toAccountId - ID de la cuenta destino.
 * @param {number} amount - Monto a transferir.
 * @returns {{ sender: Object, receiver: Object }} Par de cuentas validadas.
 * @throws {Error} Si alguna validación falla.
 */
function validateTransfer(fromAccountId, toAccountId, amount) {
  const sender = findAccount(fromAccountId);
  if (!sender) {
    throw new Error(`Error de validación: La cuenta origen '${fromAccountId}' no existe en la base de datos.`);
  }

  const receiver = findAccount(toAccountId);
  if (!receiver) {
    throw new Error(`Error de validación: La cuenta destino '${toAccountId}' no existe en la base de datos.`);
  }

  if (amount <= 0) {
    throw new Error('Error de validación: El monto a transferir debe ser mayor a cero.');
  }

  if (sender.balance < amount) {
    throw new Error(`Saldo insuficiente: La cuenta '${fromAccountId}' tiene $${sender.balance}, requiere $${amount}.`);
  }

  return { sender, receiver };
}

module.exports = {
  findAccount,
  validateTransfer,
  usersDb
};
