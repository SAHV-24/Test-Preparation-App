const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  nombreCompleto: { type: String, required: true },
  expira: { type: Date, required: true },
  rol: { type: String, enum: ['Admin', 'Colaborador'], required: true },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
