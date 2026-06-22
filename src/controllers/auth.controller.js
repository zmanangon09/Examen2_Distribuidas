const jwtService = require('../services/jwt.service');
const validationService = require('../services/validation.service');

/**
 * Endpoint para autenticación y generación de JWT.
 * POST /v1/auth/login
 * 
 * Recibe un userId en el body y genera un token JWT firmado con RS256.
 * Espera un cuerpo JSON con: { userId }
 */
function login(req, res) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'El campo userId es requerido en el cuerpo de la petición.'
      });
    }

    // Buscar el usuario en la base de datos en memoria
    const user = validationService.usersDb.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: `No se encontró un usuario con ID '${userId}'.`
      });
    }

    // Generar el token JWT firmado con clave privada RS256
    const token = jwtService.signToken(user);

    return res.status(200).json({
      success: true,
      message: 'Token generado exitosamente (expira en 2 minutos)',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Error al generar token',
      message: error.message
    });
  }
}

module.exports = {
  login
};
