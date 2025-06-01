const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios (Admin y Colaborador)
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *   post:
 *     summary: Crear un nuevo usuario (solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error de validación
 *
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     summary: Actualizar usuario (solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Usuario no encontrado
 *   delete:
 *     summary: Eliminar usuario (solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombreUsuario
 *         - contrasena
 *         - nombreCompleto
 *         - expira
 *         - rol
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         nombreUsuario:
 *           type: string
 *         contrasena:
 *           type: string
 *         nombreCompleto:
 *           type: string
 *         expira:
 *           type: string
 *           format: date
 *         rol:
 *           type: string
 *           enum: [Admin, Colaborador]
 *         activo:
 *           type: boolean
 *       example:
 *         nombreUsuario: juan123
 *         contrasena: password123
 *         nombreCompleto: Juan Pérez
 *         expira: 2025-06-30
 *         rol: Colaborador
 *         activo: true
 */

// Todas las rutas protegidas por autenticación
router.use(authMiddleware);
router.use(isAdmin); // Solo Admin puede acceder a estas rutas
// CRUD de usuarios (solo Admin puede crear/editar/eliminar colaboradores)
router.get("/", usuarioController.getUsuarios);
router.get("/:id", usuarioController.getUsuarioById);
router.post("/", usuarioController.createUsuario);
router.put("/:id", usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

module.exports = router;
