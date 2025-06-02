const Respuesta = require("../models/respuesta.model");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
const fs = require("fs");

exports.getRespuestasPublicas = async (req, res) => {
  try {
    const respuestas = await Respuesta.find()
    res.json(respuestas);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

// Obtener todas las respuestas de una pregunta
exports.getRespuestasByPregunta = async (req, res) => {
  try {
    const respuestas = await Respuesta.find({
      idPregunta: req.params.idPregunta,
    })
      .populate("idPregunta")
      .populate("idUsuario");

    res.json(respuestas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener respuesta por ID
exports.getRespuestaById = async (req, res) => {
  try {
    const respuesta = await Respuesta.findById(req.params.id)
      .populate("idPregunta")
      .populate("idUsuario");
    if (!respuesta)
      return res.status(404).json({ message: "Respuesta no encontrada" });
    res.json(respuesta);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear respuesta
exports.createRespuesta = async (req, res) => {
  try {
    let { idPregunta, textoRespuesta, esLaCorrecta } = req.body;
    // Normaliza esLaCorrecta a booleano real
    if (typeof esLaCorrecta === "string") {
      esLaCorrecta = esLaCorrecta.toLowerCase() === "true";
    }
    let fotoUrl = req.body.fotoUrl || "";
    if (req.file) {
      fotoUrl = await uploadImageToCloudinary(req.file.path, "respuestas");
      fs.unlinkSync(req.file.path);
    }
    // Validación: TrueFalse solo puede tener 2 respuestas
    const pregunta = await require("../models/pregunta.model").findById(
      idPregunta
    );
    if (!pregunta)
      return res.status(400).json({ message: "Pregunta no encontrada" });
    if (pregunta.tipoPregunta === "TrueFalse") {
      const count = await Respuesta.countDocuments({ idPregunta });
      if (count >= 2) {
        return res.status(400).json({
          message:
            "Las preguntas de tipo Verdadero/Falso solo pueden tener 2 respuestas.",
        });
      }
    }
    // Validación: Solo una respuesta correcta por pregunta
    if (esLaCorrecta) {
      const yaCorrecta = await Respuesta.findOne({
        idPregunta,
        esLaCorrecta: true,
      });
      if (yaCorrecta) {
        return res.status(400).json({
          message: "Ya existe una respuesta correcta para esta pregunta.",
        });
      }
    }
    const respuesta = new Respuesta({
      idPregunta,
      idUsuario: req.user._id,
      textoRespuesta,
      fotoUrl,
      esLaCorrecta,
    });
    await respuesta.save();
    res.status(201).json(respuesta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar respuesta
exports.updateRespuesta = async (req, res) => {
  try {
    const respuesta = await Respuesta.findById(req.params.id);
    if (!respuesta)
      return res.status(404).json({ message: "Respuesta no encontrada" });
    const { textoRespuesta, esLaCorrecta } = req.body;
    if (textoRespuesta) respuesta.textoRespuesta = textoRespuesta;
    // Validación: Solo una respuesta correcta por pregunta
    if (typeof esLaCorrecta !== "undefined") {
      if (esLaCorrecta) {
        const yaCorrecta = await Respuesta.findOne({
          idPregunta: respuesta.idPregunta,
          esLaCorrecta: true,
          _id: { $ne: respuesta._id },
        });
        if (yaCorrecta) {
          return res.status(400).json({
            message: "Ya existe otra respuesta correcta para esta pregunta.",
          });
        }
      }
      respuesta.esLaCorrecta = esLaCorrecta;
    }
    if (req.file) {
      respuesta.fotoUrl = await uploadImageToCloudinary(
        req.file.path,
        "respuestas"
      );
      fs.unlinkSync(req.file.path);
    } else if (req.body.fotoUrl) {
      respuesta.fotoUrl = req.body.fotoUrl;
    }
    await respuesta.save();
    res.json(respuesta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar respuesta
exports.deleteRespuesta = async (req, res) => {
  try {
    const respuesta = await Respuesta.findByIdAndDelete(req.params.id);
    if (!respuesta)
      return res.status(404).json({ message: "Respuesta no encontrada" });
    res.json({ message: "Respuesta eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
