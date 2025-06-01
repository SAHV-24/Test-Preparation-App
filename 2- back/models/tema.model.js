const mongoose = require('mongoose');

const temaSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], required: true },
  periodo: { type: Number, enum: [1, 2, 3], required: true },
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String },
  fotoFormulasUrl: { type: String },
  linkPresentacionUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Tema', temaSchema);
