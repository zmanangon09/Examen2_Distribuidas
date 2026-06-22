const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

/**
 * Genera un Token JWT firmado con clave privada asimétrica (RS256).
 * 
 * Carga la clave privada desde 'private.pem' y firma el payload con claims seguros:
 * - sub: identificador del usuario
 * - name: nombre/email del usuario
 * - exp: expiración automática configurada a 2 minutos
 * 
 * @param {Object} user - Objeto con la información del usuario a firmar.
 * @returns {string} JWT Token firmado con RS256.
 */
function signToken(user) {
  const privateKey = fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8');

  const payload = {
    sub: user.id,
    name: user.email
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '2m'
  });
}

/**
 * Verifica un Token JWT utilizando la clave pública asimétrica (RS256).
 * 
 * Carga la clave pública desde 'public.pem' y valida/decodifica el token
 * forzando el algoritmo RS256.
 * 
 * @param {string} token - Token JWT a verificar.
 * @returns {Object} Payload decodificado si es válido.
 */
function verifyToken(token) {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../public.pem'), 'utf8');
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}

module.exports = {
  signToken,
  verifyToken
};
