const jwtService = require('../services/jwt.service');

/**
 * Middleware de Autenticación para proteger las rutas de la Fintech.
 * 
 * Intercepta las peticiones HTTP, extrae el Bearer Token de la cabecera
 * Authorization y verifica la autenticidad del JWT usando la clave pública RS256.
 * 
 * Errores lógicos (token expirado/inválido) se manejan con respuestas 401/403
 * controladas SIN reportar a Sentry.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Falta la cabecera Authorization en la petición.'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Formato de cabecera de autenticación debe ser Bearer <token>.'
    });
  }

  const token = parts[1];

  try {
    // Verificar el token JWT con la clave pública RS256
    const decoded = jwtService.verifyToken(token);

    // Adjuntar el payload del usuario al objeto request
    req.user = decoded;

    console.log(`[AUTH MIDDLEWARE] Token válido para usuario: ${decoded.sub} (${decoded.name})`);
    next();
  } catch (error) {
    // Errores lógicos de autenticación: NO se reportan a Sentry
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'El token JWT ha expirado. Genere uno nuevo en POST /v1/auth/login.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        error: 'Token inválido',
        message: 'El token JWT proporcionado es inválido o está malformado.'
      });
    }

    return res.status(401).json({
      error: 'Error de autenticación',
      message: error.message
    });
  }
}

module.exports = authMiddleware;
