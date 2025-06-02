const jwt = require('jsonwebtoken');

// Token público (puedes mover esto a env vars o config)
const PUBLIC_JWT_SECRET = process.env.PUBLIC_JWT_SECRET;
const PUBLIC_JWT_PAYLOAD = process.env.PUBLIC_JWT_PAYLOAD;

module.exports = function publicMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token público requerido' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, PUBLIC_JWT_SECRET);
    // Solo permitimos el payload esperado
    if (decoded !== PUBLIC_JWT_PAYLOAD) {
      return res.status(403).json({ error: 'Token público inválido' });
    }
    // Solo permitimos métodos GET
    if (req.method !== 'GET') {
      return res.status(403).json({ error: 'Solo se permiten peticiones GET con token público' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token público inválido' });
  }
};
