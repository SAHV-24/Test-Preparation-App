const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  idTema: { type: mongoose.Schema.Types.ObjectId, ref: 'Tema', required: true },
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], required: true },
  enunciado: { type: String, required: true },
  fotoUri: { type: String },
  tipoPregunta: { type: String, enum: ['MultipleChoice', 'TrueFalse'], required: true },
  dificultad: { type: String, enum: ['baja', 'media', 'alta'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pregunta', preguntaSchema);
