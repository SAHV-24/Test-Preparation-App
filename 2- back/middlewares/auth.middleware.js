const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) return res.status(401).json({ message: 'Usuario no encontrado' });

    // Validar expiración
    if (usuario.expira && new Date(usuario.expira) < new Date()) {
      if (usuario.activo) {
        usuario.activo = false;
        await usuario.save();
      }
      return res.status(403).json({ message: 'Usuario expirado. Contacte al administrador.' });
    }

    if (!usuario.activo) {
      return res.status(403).json({ message: 'Usuario inactivo. Contacte al administrador.' });
    }

    req.user = usuario;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;