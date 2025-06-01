# Resumen de Cambios y Funcionalidad Backend FyEvP (Junio 2025)

## Estructura General
- Backend Node.js + Express + Mongoose + JWT + Cloudinary.
- Base de datos MongoDB Atlas, modelos: Usuario, Tema, Pregunta, Respuesta.
- Documentación Swagger/OpenAPI completa y actualizada.

## Rutas y Controladores
- **Usuarios:** CRUD completo, solo Admin puede crear/editar/eliminar. Expiración automática y lógica de activación/inactivación.
- **Temas:** CRUD completo, acceso para Admin y Colaborador. Soporte para subida de imagen (fotoFormulasUrl) a Cloudinary.
- **Preguntas:** CRUD completo, acceso para Admin y Colaborador. Subida de imagen (fotoUri) a Cloudinary. Al eliminar una pregunta, elimina todas sus respuestas asociadas.
- **Respuestas:** CRUD completo, acceso para Admin y Colaborador. Subida de imagen (fotoUrl) a Cloudinary. Listado por pregunta.

## Cambios recientes (Junio 2025)
- Se crearon endpoints de conteo para dashboard:
  - `/api/dashboard/usuarios/colaboradores/count` (total de colaboradores)
  - `/api/dashboard/temas/count` (total de temas)
  - `/api/dashboard/preguntas/count` (total de preguntas)
  - `/api/dashboard/respuestas/count` (total de respuestas)
- Se creó endpoint público para obtener una pregunta aleatoria de un tema (junto con sus respuestas):
  - `/api/preguntas/public/random/:idTema?exclude=...`
  - Permite excluir preguntas ya respondidas mediante el query param `exclude` (ids separados por coma).
  - Devuelve la pregunta y un array de respuestas asociadas.
- Se eliminó el endpoint de pregunta aleatoria de las rutas de dashboard para evitar duplicidad.
- Se actualizó la documentación Swagger/OpenAPI para reflejar los endpoints de dashboard y el endpoint público de pregunta aleatoria, incluyendo schemas de respuesta claros y ejemplos.
- El endpoint público de pregunta aleatoria ahora usa agregación para poblar las respuestas asociadas.

## Middlewares y Seguridad
- **authMiddleware:** Protege todas las rutas, requiere JWT válido.
- **role.middleware.js:**
  - `isAdmin`: Solo Admin.
  - `isColaboradorOrAdmin`: Admin o Colaborador.
  - `checkPreguntaActiva`: Impide crear/editar preguntas o respuestas si la pregunta está inactiva.

## Validaciones Especiales
- Preguntas tipo "TrueFalse" solo pueden tener 2 respuestas.
- Solo puede haber una respuesta correcta por pregunta.
- Al eliminar una pregunta, se eliminan todas sus respuestas.
- No se pueden crear/editar preguntas ni respuestas si la pregunta está inactiva.
- Conversión robusta de campos booleanos recibidos como string (ej: esLaCorrecta).

## Swagger/OpenAPI
- Documentación detallada para todos los endpoints (Usuarios, Temas, Preguntas, Respuestas).
- Soporte para multipart/form-data en endpoints que aceptan imágenes.
- Ejemplos y schemas actualizados según el modelo real de la base de datos.

## Otros
- Uso de multer para manejo de archivos temporales.
- Uso de Cloudinary para almacenamiento de imágenes.
- `.populate()` en los gets de Pregunta y Respuesta para poblar referencias foráneas.

**Este backend cumple con el SRS y el modelo de datos, implementando control de acceso, lógica de negocio y documentación robusta para facilitar el desarrollo frontend y la integración.**
