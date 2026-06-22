const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /v1/auth/login - Generar un JWT firmado con RS256
router.post('/login', authController.login);

module.exports = router;
