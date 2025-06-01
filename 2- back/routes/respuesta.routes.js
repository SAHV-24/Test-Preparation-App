const express = require('express');
const router = express.Router();
const respuestaController = require('../controllers/respuesta.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { isColaboradorOrAdmin, checkPreguntaActiva } = require('../middlewares/role.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: Respuestas
 *   description: Gestión de respuestas (Admin y Colaborador)
 */

/**
 * @swagger
 * /api/respuestas/pregunta/{idPregunta}:
 *   get:
 *     summary: Obtener todas las respuestas de una pregunta
 *     tags: [Respuestas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPregunta
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Lista de respuestas
 *
 * /api/respuestas/{id}:
 *   get:
 *     summary: Obtener respuesta por ID
 *     tags: [Respuestas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la respuesta
 *     responses:
 *       200:
 *         description: Respuesta encontrada
 *       404:
 *         description: Respuesta no encontrada
 *   put:
 *     summary: Actualizar respuesta (Admin o Colaborador)
 *     tags: [Respuestas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la respuesta
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               textoRespuesta:
 *                 type: string
 *               esLaCorrecta:
 *                 type: boolean
 *               fotoUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Respuesta actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Respuesta no encontrada
 *   delete:
 *     summary: Eliminar respuesta (Admin o Colaborador)
 *     tags: [Respuestas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la respuesta
 *     responses:
 *       200:
 *         description: Respuesta eliminada
 *       404:
 *         description: Respuesta no encontrada
 *
 * /api/respuestas:
 *   post:
 *     summary: Crear una nueva respuesta (Admin o Colaborador)
 *     tags: [Respuestas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               idPregunta:
 *                 type: string
 *               textoRespuesta:
 *                 type: string
 *               esLaCorrecta:
 *                 type: boolean
 *               fotoUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Respuesta creada
 *       400:
 *         description: Error de validación
 *
 * components:
 *   schemas:
 *     Respuesta:
 *       type: object
 *       required:
 *         - idPregunta
 *         - textoRespuesta
 *         - esLaCorrecta
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         idPregunta:
 *           type: string
 *         idUsuario:
 *           type: string
 *         textoRespuesta:
 *           type: string
 *         fotoUrl:
 *           type: string
 *         esLaCorrecta:
 *           type: boolean
 *       example:
 *         idPregunta: "665f1b..."
 *         idUsuario: "665f1b..."
 *         textoRespuesta: "París"
 *         fotoUrl: "https://..."
 *         esLaCorrecta: true
 */

router.use(authMiddleware);

router.get('/pregunta/:idPregunta', respuestaController.getRespuestasByPregunta);
router.get('/:id', respuestaController.getRespuestaById);
router.post('/', isColaboradorOrAdmin, checkPreguntaActiva, upload.single('fotoUrl'), respuestaController.createRespuesta);
router.put('/:id', isColaboradorOrAdmin, async (req, res, next) => {
  // Busca la respuesta y verifica si la pregunta está activa
  const Respuesta = require('../models/respuesta.model');
  const respuesta = await Respuesta.findById(req.params.id);
  if (!respuesta) return res.status(404).json({ message: 'Respuesta no encontrada' });
  req.body.idPregunta = respuesta.idPregunta;
  return require('../middlewares/role.middleware').checkPreguntaActiva(req, res, next);
}, upload.single('fotoUrl'), respuestaController.updateRespuesta);
router.delete('/:id', isColaboradorOrAdmin, respuestaController.deleteRespuesta);

module.exports = router;
