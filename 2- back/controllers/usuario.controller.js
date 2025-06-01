const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear usuario (solo Admin)
exports.createUsuario = async (req, res) => {
  try {
    const { nombreUsuario, contrasena, nombreCompleto, rol, activo } = req.body;
    // Calcular fecha de expiración según la fecha de creación
    const now = new Date();
    const year = now.getFullYear();
    let expira;
    if (now.getMonth() < 6) { // Enero (0) a Junio (5)
      expira = new Date(year, 5, 30, 23, 59, 59, 999); // 30 de Junio
    } else {
      expira = new Date(year, 11, 31, 23, 59, 59, 999); // 31 de Diciembre
    }
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const usuario = new Usuario({
      nombreUsuario,
      contrasena: hashedPassword,
      nombreCompleto,
      expira,
      rol,
      activo: activo !== undefined ? activo : true
    });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { nombreUsuario, contrasena, nombreCompleto, expira, rol, activo } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    if (nombreUsuario) usuario.nombreUsuario = nombreUsuario;
    if (contrasena) usuario.contrasena = await bcrypt.hash(contrasena, 10);
    if (nombreCompleto) usuario.nombreCompleto = nombreCompleto;
    if (expira) usuario.expira = expira;
    if (rol) usuario.rol = rol;
    if (activo !== undefined) usuario.activo = activo;
    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
