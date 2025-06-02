const express = require('express');
const router = express.Router();
const temaController = require('../controllers/tema.controller');
const preguntaController = require('../controllers/pregunta.controller');
const respuestaController = require('../controllers/respuesta.controller');
const publicMiddleware = require('../middlewares/public.middleware');

// Rutas públicas para visitantes (solo GET, solo datos activos)
router.get('/temas', publicMiddleware, temaController.getTemasPublicos);
router.get('/preguntas', publicMiddleware, preguntaController.getPreguntasPublicas);
router.get('/respuestas', publicMiddleware, respuestaController.getRespuestasPublicas);

module.exports = router;
