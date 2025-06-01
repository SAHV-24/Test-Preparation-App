const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/pregunta.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { isAdmin, isColaboradorOrAdmin, checkPreguntaActiva } = require('../middlewares/role.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: Preguntas
 *   description: Gestión de preguntas (Admin y Colaborador)
 */

/**
 * @swagger
 * /api/preguntas:
 *   get:
 *     summary: Obtener todas las preguntas
 *     tags: [Preguntas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *   post:
 *     summary: Crear una nueva pregunta (Admin o Colaborador)
 *     tags: [Preguntas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               enunciado:
 *                 type: string
 *               idTema:
 *                 type: string
 *               dificultad:
 *                 type: string
 *                 enum: [baja, media, alta]
 *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *               tipoPregunta:
 *                 type: string
 *                 enum: [MultipleChoice, TrueFalse]
 *               fotoUri:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Pregunta creada
 *       400:
 *         description: Error de validación
 *
 * /api/preguntas/{id}:
 *   get:
 *     summary: Obtener pregunta por ID
 *     tags: [Preguntas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Pregunta encontrada
 *       404:
 *         description: Pregunta no encontrada
 *   put:
 *     summary: Actualizar pregunta (Admin o Colaborador)
 *     tags: [Preguntas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               enunciado:
 *                 type: string
 *               idTema:
 *                 type: string
 *               dificultad:
 *                 type: string
 *                 enum: [baja, media, alta]
 *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *               tipoPregunta:
 *                 type: string
 *                 enum: [MultipleChoice, TrueFalse]
 *               fotoUri:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Pregunta actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Pregunta no encontrada
 *   delete:
 *     summary: Eliminar pregunta (Admin o Colaborador)
 *     tags: [Preguntas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Pregunta eliminada
 *       404:
 *         description: Pregunta no encontrada
 *
 * /api/preguntas/public/random/{idTema}:
 *   get:
 *     summary: Obtener una pregunta aleatoria de un tema (público, incluye respuestas)
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: idTema
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tema
 *       - in: query
 *         name: exclude
 *         schema:
 *           type: string
 *         required: false
 *         description: IDs de preguntas a excluir, separados por coma
 *     responses:
 *       200:
 *         description: Pregunta aleatoria con respuestas
 *
 * components:
 *   schemas:
 *     Pregunta:
 *       type: object
 *       required:
 *         - enunciado
 *         - idTema
 *         - dificultad
 *         - estado
 *         - tipoPregunta
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         enunciado:
 *           type: string
 *         idTema:
 *           type: string
 *           description: ID del tema relacionado
 *         dificultad:
 *           type: string
 *           enum: [baja, media, alta]
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *         tipoPregunta:
 *           type: string
 *           enum: [MultipleChoice, TrueFalse]
 *         fotoUri:
 *           type: string
 *         idUsuario:
 *           type: string
 *           description: ID del usuario creador
 *       example:
 *         enunciado: "¿Cuál es la capital de Francia?"
 *         idTema: "665f1b..."
 *         dificultad: "baja"
 *         estado: "Activo"
 *         tipoPregunta: "MultipleChoice"
 *         fotoUri: "https://..."
 *         idUsuario: "665f1b..."
 */

// Todas las rutas protegidas por autenticación
router.use(authMiddleware);

// CRUD de preguntas (Admin o Colaborador)
router.get('/', preguntaController.getPreguntas);
router.get('/:id', preguntaController.getPreguntaById);
router.post('/', isColaboradorOrAdmin, checkPreguntaActiva, upload.single('fotoUri'), preguntaController.createPregunta);
router.put('/:id', isColaboradorOrAdmin, checkPreguntaActiva, upload.single('fotoUri'), preguntaController.updatePregunta);
router.delete('/:id', isColaboradorOrAdmin, preguntaController.deletePregunta);

// Endpoint público para preguntas aleatorias de un tema (con respuestas)
router.get('/public/random/:idTema', async (req, res) => {
  try {
    const { idTema } = req.params;
    let { exclude } = req.query;
    let excludeIds = [];
    if (exclude) {
      excludeIds = exclude.split(',');
    }
    const match = { idTema };
    if (excludeIds.length > 0) {
      match._id = { $nin: excludeIds };
    }
    // Agregación: pregunta aleatoria + respuestas asociadas
    const result = await require('../models/pregunta.model').aggregate([
      { $match: match },
      { $sample: { size: 1 } },
      {
        $lookup: {
          from: 'respuestas',
          localField: '_id',
          foreignField: 'idPregunta',
          as: 'respuestas'
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
