const Pregunta = require('../models/pregunta.model');
const { uploadImageToCloudinary } = require('../utils/cloudinary');
const fs = require('fs');

// Obtener todas las preguntas
exports.getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find()
      .populate('idTema')
      .populate('idUsuario');
    res.json(preguntas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener pregunta por ID
exports.getPreguntaById = async (req, res) => {
  try {
    const pregunta = await Pregunta.findById(req.params.id)
      .populate('idTema')
      .populate('idUsuario');
    if (!pregunta) return res.status(404).json({ message: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear pregunta
exports.createPregunta = async (req, res) => {
  try {
    const { enunciado, idTema, dificultad, estado, fotoUri } = req.body;
    let fotoUrl = fotoUri || "";
    if (req.file) {
      fotoUrl = await uploadImageToCloudinary(req.file.path, 'preguntas');
      fs.unlinkSync(req.file.path);
    }
    const pregunta = new Pregunta({
      enunciado,
      idTema,
      dificultad,
      estado,
      fotoUri: fotoUrl,
      idUsuario: req.user._id
    });
    await pregunta.save();
    res.status(201).json(pregunta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar pregunta
exports.updatePregunta = async (req, res) => {
  try {
    const pregunta = await Pregunta.findById(req.params.id);
    if (!pregunta) return res.status(404).json({ message: 'Pregunta no encontrada' });
    const { enunciado, idTema, dificultad, estado, fotoUri } = req.body;
    if (enunciado) pregunta.enunciado = enunciado;
    if (idTema) pregunta.idTema = idTema;
    if (dificultad) pregunta.dificultad = dificultad;
    if (estado) pregunta.estado = estado;
    if (req.file) {
      pregunta.fotoUri = await uploadImageToCloudinary(req.file.path, 'preguntas');
      fs.unlinkSync(req.file.path);
    } else if (fotoUri) {
      pregunta.fotoUri = fotoUri;
    }
    await pregunta.save();
    res.json(pregunta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar pregunta
exports.deletePregunta = async (req, res) => {
  try {
    const pregunta = await Pregunta.findByIdAndDelete(req.params.id);
    if (!pregunta) return res.status(404).json({ message: 'Pregunta no encontrada' });
    // Elimina todas las respuestas asociadas a la pregunta
    await require('../models/respuesta.model').deleteMany({ idPregunta: req.params.id });
    res.json({ message: 'Pregunta y sus respuestas eliminadas' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
