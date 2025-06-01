const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreUsuario
 *               - contrasena
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT y datos del usuario
 *       401:
 *         description: Usuario o contraseña incorrectos
 *       403:
 *         description: Usuario inactivo o expirado
 */
router.post('/login', authController.login);

module.exports = router;
