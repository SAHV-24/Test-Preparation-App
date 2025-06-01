const express = require("express");
const router = express.Router();
const temaController = require("../controllers/tema.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  isAdmin,
  isColaboradorOrAdmin,
} = require("../middlewares/role.middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * tags:
 *   name: Temas
 *   description: Gestión de temas (Admin y Colaborador)
 */

/**
 * @swagger
 * /api/temas:
 *   get:
 *     summary: Obtener todos los temas
 *     tags: [Temas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de temas
 *   post:
 *     summary: Crear un nuevo tema (Admin o Colaborador)
 *     tags: [Temas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *               periodo:
 *                 type: string
 *                 enum: [1, 2, 3]
 *               fotoFormulasUrl:
 *                 type: string
 *                 format: binary
 *               linkPresentacionUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tema creado
 *       400:
 *         description: Error de validación
 *
 * /api/temas/{id}:
 *   get:
 *     summary: Obtener tema por ID
 *     tags: [Temas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tema
 *     responses:
 *       200:
 *         description: Tema encontrado
 *       404:
 *         description: Tema no encontrado
 *   put:
 *     summary: Actualizar tema (Admin o Colaborador)
 *     tags: [Temas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tema
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
  *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *               periodo:
 *                 type: string
 *                 enum: [1, 2, 3]
 *               fotoFormulasUrl:
 *                 type: string
 *                 format: binary
 *               linkPresentacionUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tema actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Tema no encontrado
 *   delete:
 *     summary: Eliminar tema (Admin o Colaborador)
 *     tags: [Temas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tema
 *     responses:
 *       200:
 *         description: Tema eliminado
 *       404:
 *         description: Tema no encontrado
 *
 * components:
 *   schemas:
 *     Tema:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *         - estado
 *         - periodo
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         estado:
 *           type: string
 *           enum: [activo, inactivo]
 *         periodo:
 *           type: string
 *         fotoFormulasUrl:
 *           type: string
 *         linkPresentacionUrl:
 *           type: string
 *         idUsuario:
 *           type: string
 *           description: ID del usuario creador
 *       example:
 *         nombre: "Álgebra"
 *         descripcion: "Tema de álgebra básica"
 *         estado: "activo"
 *         periodo: "2024-1"
 *         fotoFormulasUrl: "https://..."
 *         linkPresentacionUrl: "https://..."
 *         idUsuario: "665f1b..."
 */

// Todas las rutas protegidas por autenticación
router.use(authMiddleware);

// CRUD de temas (Admin o Colaborador)
router.get("/", temaController.getTemas);
router.get("/:id", temaController.getTemaById);
router.post(
  "/",
  isColaboradorOrAdmin,
  upload.single("fotoFormulasUrl"),
  temaController.createTema
);
router.put(
  "/:id",
  isColaboradorOrAdmin,
  upload.single("fotoFormulasUrl"),
  temaController.updateTema
);
router.delete("/:id", isColaboradorOrAdmin, temaController.deleteTema);

module.exports = router;
