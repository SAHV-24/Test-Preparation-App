function isAdmin(req, res, next) {
  if (req.user && req.user.rol === 'Admin') {
    return next();
  }
  return res.status(403).json({ message: 'Solo el rol Admin puede realizar esta acción.' });
}

function isColaboradorOrAdmin(req, res, next) {
  if (req.user && (req.user.rol === 'Admin' || req.user.rol === 'Colaborador')) {
    return next();
  }
  return res.status(403).json({ message: 'Solo Admin o Colaborador pueden realizar esta acción.' });
}

// Middleware para validar si la pregunta está activa
async function checkPreguntaActiva(req, res, next) {
  const Pregunta = require('../models/pregunta.model');
  let preguntaId = req.body.idPregunta || req.params.id || req.params.idPregunta;
  if (!preguntaId) return res.status(400).json({ message: 'ID de pregunta requerido.' });
  const pregunta = await Pregunta.findById(preguntaId);
  if (!pregunta) return res.status(404).json({ message: 'Pregunta no encontrada.' });
  if (pregunta.estado !== 'Activo') {
    return res.status(403).json({ message: 'No se pueden modificar preguntas o respuestas asociadas a una pregunta inactiva.' });
  }
  next();
}

module.exports = { isAdmin, isColaboradorOrAdmin, checkPreguntaActiva };
