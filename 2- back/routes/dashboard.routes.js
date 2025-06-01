const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const Usuario = require('../models/usuario.model');
const Tema = require('../models/tema.model');
const Pregunta = require('../models/pregunta.model');
const Respuesta = require('../models/respuesta.model');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints para métricas y preguntas aleatorias
 */

/**
 * @swagger
 * /api/dashboard/usuarios/colaboradores/count:
 *   get:
 *     summary: Total de colaboradores
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de colaboradores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalColaboradores:
 *                   type: integer
 *
 * /api/dashboard/temas/count:
 *   get:
 *     summary: Total de temas
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de temas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTemas:
 *                   type: integer
 *
 * /api/dashboard/preguntas/count:
 *   get:
 *     summary: Total de preguntas
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de preguntas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPreguntas:
 *                   type: integer
 *
 * /api/dashboard/respuestas/count:
 *   get:
 *     summary: Total de respuestas
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de respuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRespuestas:
 *                   type: integer
 */

/** Protege todos los endpoints */
router.use(authMiddleware);

// Total de colaboradores
router.get('/usuarios/colaboradores/count', async (req, res) => {
  try {
    const count = await Usuario.countDocuments({ rol: 'Colaborador' });
    res.json({ totalColaboradores: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Total de temas
router.get('/temas/count', async (req, res) => {
  try {
    const count = await Tema.countDocuments();
    res.json({ totalTemas: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Total de preguntas
router.get('/preguntas/count', async (req, res) => {
  try {
    const count = await Pregunta.countDocuments();
    res.json({ totalPreguntas: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Total de respuestas
router.get('/respuestas/count', async (req, res) => {
  try {
    const count = await Respuesta.countDocuments();
    res.json({ totalRespuestas: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
