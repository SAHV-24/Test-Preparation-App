const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuario.routes');
const authRoutes = require('./routes/auth.routes');
const temaRoutes = require('./routes/tema.routes');
const preguntaRoutes = require('./routes/pregunta.routes');
const respuestaRoutes = require('./routes/respuesta.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const setupSwagger = require('./swagger');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Rutas protegidas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/temas', temaRoutes);
app.use('/api/preguntas', preguntaRoutes);
app.use('/api/respuestas', respuestaRoutes);
app.use('/api/dashboard', dashboardRoutes);

setupSwagger(app);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API FyEvP funcionando');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
