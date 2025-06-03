const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/pregunta.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { isAdmin, isColaboradorOrAdmin, checkPreguntaActiva } = require('../middlewares/role.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Todas las rutas protegidas por autenticación
router.use(authMiddleware);

// CRUD de preguntas (Admin o Colaborador)
router.get('/', preguntaController.getPreguntas);
router.get('/:id', preguntaController.getPreguntaById);
router.post('/', isColaboradorOrAdmin, upload.single('foto'), preguntaController.createPregunta);
router.put('/:id', isColaboradorOrAdmin, checkPreguntaActiva, upload.single('foto'), preguntaController.updatePregunta);
router.delete('/:id', isColaboradorOrAdmin, preguntaController.deletePregunta);

// Obtener preguntas por idTema
router.get('/tema/:idTema', preguntaController.getPreguntasPorTema);

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
