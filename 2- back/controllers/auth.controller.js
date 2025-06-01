const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { nombreUsuario, contrasena } = req.body;
    const usuario = await Usuario.findOne({ nombreUsuario });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
    if (!usuario.activo) {
      return res.status(403).json({ message: 'Usuario inactivo o expirado' });
    }
    // Verificar expiración
    if (usuario.expira && new Date(usuario.expira) < new Date()) {
      usuario.activo = false;
      await usuario.save();
      return res.status(403).json({ message: 'Usuario expirado' });
    }
    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validPassword) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const token = jwt.sign(
      { id: usuario._id, nombreUsuario: usuario.nombreUsuario, rol: usuario.rol },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '8h' }
    );
    res.json({ token, usuario: { id: usuario._id, nombreUsuario: usuario.nombreUsuario, rol: usuario.rol } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
