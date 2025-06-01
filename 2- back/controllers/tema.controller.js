const Tema = require('../models/tema.model');
const { uploadImageToCloudinary } = require('../utils/cloudinary');
const fs = require('fs');

// Obtener todos los temas
exports.getTemas = async (req, res) => {
  try {
    const temas = await Tema.find();
    res.json(temas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener tema por ID
exports.getTemaById = async (req, res) => {
  try {
    const tema = await Tema.findById(req.params.id);
    if (!tema) return res.status(404).json({ message: 'Tema no encontrado' });
    res.json(tema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear tema
exports.createTema = async (req, res) => {
  try {
    const { nombre, descripcion, estado, periodo, fotoFormulasUrl, linkPresentacionUrl } = req.body;
    let fotoUrl = fotoFormulasUrl || "";
    // Si se recibe un archivo (por ejemplo, desde un form-data)
    if (req.file) {
      fotoUrl = await uploadImageToCloudinary(req.file.path, 'temas');
      fs.unlinkSync(req.file.path); // Borra el archivo temporal
    }
    const tema = new Tema({
      nombre,
      descripcion,
      estado,
      periodo,
      fotoFormulasUrl: fotoUrl,
      linkPresentacionUrl,
      idUsuario: req.user._id
    });
    await tema.save();
    res.status(201).json(tema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar tema
exports.updateTema = async (req, res) => {
  try {
    const tema = await Tema.findById(req.params.id);
    if (!tema) return res.status(404).json({ message: 'Tema no encontrado' });
    const { nombre, descripcion, estado, periodo, fotoFormulasUrl, linkPresentacionUrl } = req.body;
    if (nombre) tema.nombre = nombre;
    if (descripcion) tema.descripcion = descripcion;
    if (estado) tema.estado = estado;
    if (periodo) tema.periodo = periodo;
    if (linkPresentacionUrl) tema.linkPresentacionUrl = linkPresentacionUrl;
    // Si se recibe un archivo nuevo
    if (req.file) {
      tema.fotoFormulasUrl = await uploadImageToCloudinary(req.file.path, 'temas');
      fs.unlinkSync(req.file.path);
    } else if (fotoFormulasUrl) {
      tema.fotoFormulasUrl = fotoFormulasUrl;
    }
    await tema.save();
    res.json(tema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar tema
exports.deleteTema = async (req, res) => {
  try {
    const tema = await Tema.findByIdAndDelete(req.params.id);
    if (!tema) return res.status(404).json({ message: 'Tema no encontrado' });
    res.json({ message: 'Tema eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
