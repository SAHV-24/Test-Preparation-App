const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  enunciado: { type: String, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], required: true },
  fotoUri: { type: String },
  idTema: { type: mongoose.Schema.Types.ObjectId, ref: 'Tema', required: true },
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pregunta', preguntaSchema);
