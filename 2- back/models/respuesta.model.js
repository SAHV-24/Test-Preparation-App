const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  idPregunta: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: true },
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  textoRespuesta: { type: String, required: true },
  fotoUrl: { type: String },
  esLaCorrecta: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Respuesta', respuestaSchema);
