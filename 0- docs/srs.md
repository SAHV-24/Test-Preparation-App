# Especificación de Requisitos de Software (SRS)

## 1. Introducción

### 1.1 Propósito

El propósito de este documento es detallar los requisitos funcionales y no funcionales para la aplicación web que permitirá la gestión de temas, preguntas y respuestas, con roles de usuario diferenciados (Administrador y Colaborador) y un modo de juego para "Visitantes". La aplicación busca ser una herramienta intuitiva y sencilla, adaptable a diferentes dispositivos.

### 1.2 Audiencia

Este documento está dirigido al equipo de desarrollo, diseñadores UI/UX, testers y cualquier stakeholder involucrado en el proyecto para asegurar un entendimiento común de los requisitos del software.

### 1.3 Ámbito del Proyecto

La aplicación se centrará en la gestión de contenido educativo (Temas, Preguntas, Respuestas) y la provisión de una experiencia de aprendizaje a través de rondas de preguntas aleatorias. Incluirá autenticación de usuarios, gestión de roles y un dashboard para visualizar y administrar el contenido.

## 2. Descripción General

### 2.1 Perspectiva del Producto

La aplicación será una solución web independiente, con un backend RESTful y un frontend basado en Angular. Se integrará con una base de datos MongoDB (Mongo Atlas) para el almacenamiento de datos.

### 2.2 Funcionalidades Principales

* Autenticación de usuarios (JWT)
* Gestión de roles (Admin, Colaborador)
* CRUD de Colaboradores (solo Admin)
* CRUD de Temas (Admin y Colaborador)
* CRUD de Preguntas (Admin y Colaborador)
* CRUD de Respuestas (asociadas a Preguntas) (Admin y Colaborador)
* Configuración de preguntas de opción múltiple o verdadero/falso.
* Ronda de preguntas aleatorias de un tema seleccionado.
* Dashboard para Admin y Colaborador.
* Gestión de expiración de colaboradores.
* Funcionalidad para activar/desactivar colaboradores.

### 2.3 Roles de Usuario

* **Administrador (Admin):**
    * Gestiona usuarios Colaboradores (CRUD).
    * Gestiona Temas (CRUD).
    * Gestiona Preguntas (CRUD).
    * Gestiona Respuestas (CRUD).
    * Visualiza métricas generales (número total de Colaboradores, Temas, Preguntas).
    * Inicia sesión con usuario y contraseña.
* **Colaborador:**
    * Gestiona Temas (CRUD).
    * Gestiona Preguntas (CRUD).
    * Gestiona Respuestas (CRUD).
    * Visualiza métricas generales (número total de Temas, Preguntas).
    * Inicia sesión con usuario y contraseña.
* **Visitante (No autenticado):**
    * Participa en rondas de preguntas aleatorias de un tema seleccionado.
    * Las respuestas a las preguntas se guardan en el `localStorage` del navegador para evitar que la misma pregunta se muestre nuevamente (por `id`).
    * No tiene acceso a la gestión de contenido.

## 3. Requisitos Funcionales

### 3.1 Autenticación y Autorización

* **RF1.1:** El sistema debe permitir el inicio de sesión para usuarios con rol 'Admin' y 'Colaborador' utilizando usuario y contraseña.
* **RF1.2:** El sistema debe generar un Token JWT al iniciar sesión exitosamente.
* **RF1.3:** Todas las rutas protegidas del API deben requerir un Token JWT válido para su acceso.
* **RF1.4:** El sistema debe diferenciar el acceso a funcionalidades basándose en el rol del usuario (Admin vs. Colaborador).

### 3.2 Gestión de Colaboradores (Solo Admin)

* **RF2.1:** El Administrador debe poder crear nuevos usuarios Colaboradores.
    * Debe incluir campos para `nombreUsuario`, `contraseña`, `nombreCompleto`.
    * Debe asignar automáticamente la fecha de expiración basada en la fecha de creación:
        * Si creado entre Enero y Junio: expira el 30 de Junio del mismo año.
        * Si creado entre Julio y Diciembre: expira el 31 de Diciembre del mismo año.
* **RF2.2:** El Administrador debe poder actualizar la información de los usuarios Colaboradores.
* **RF2.3:** El Administrador debe poder eliminar usuarios Colaboradores.
* **RF2.4:** El Administrador debe poder activar o desactivar manualmente un colaborador. Un colaborador desactivado no podrá iniciar sesión.
* **RF2.5:** El sistema debe desactivar automáticamente a un colaborador cuya fecha de expiración ha llegado.

### 3.3 Gestión de Temas (Admin y Colaborador)

* **RF3.1:** El sistema debe permitir crear un nuevo Tema.
    * Debe incluir un `nombre` (obligatorio).
    * Puede incluir una `descripción`.
    * Puede incluir `fotoFormulasUrl` y `linkPresentacionUrl` si el tema requiere fórmulas.
    * Debe estar asociado al `idUsuario` del creador.
* **RF3.2:** El sistema debe permitir actualizar un Tema existente.
* **RF3.3:** El sistema debe permitir eliminar un Tema.
* **RF3.4:** El sistema debe mostrar el número total de Temas en el dashboard.
* **RF3.5:** El sistema debe permitir listar todos los Temas.

### 3.4 Gestión de Preguntas (Admin y Colaborador)

* **RF4.1:** El sistema debe permitir crear una nueva Pregunta.
    * Debe incluir un `enunciado`.
    * Debe permitir asociarla a un `idTema` existente.
    * Debe estar asociada al `idUsuario` del creador.
    * Debe permitir especificar si es de "Opción Múltiple" o "Verdadero/Falso".
    * Puede incluir `fotoUri` (opcional).
* **RF4.2:** El sistema debe permitir actualizar una Pregunta existente.
* **RF4.3:** El sistema debe permitir eliminar una Pregunta.
* **RF4.4:** El sistema debe mostrar el número total de Preguntas en el dashboard.
* **RF4.5:** El sistema debe permitir listar todas las Preguntas.

### 3.5 Gestión de Respuestas (Admin y Colaborador)

* **RF5.1:** El sistema debe permitir crear nuevas Respuestas asociadas a una Pregunta.
    * Debe incluir `textoRespuesta`.
    * Debe incluir `esLaCorrecta` (booleano).
    * Puede incluir `fotoUri` (opcional).
    * Debe estar asociada al `idPregunta` y al `idUsuario` (del creador de la respuesta).
* **RF5.2:** Cada Pregunta debe tener un mínimo de 2 y un máximo de 6 Respuestas válidas.
* **RF5.3:** Si la pregunta es de "Verdadero/Falso", solo debe haber dos opciones de respuesta.
* **RF5.4:** El sistema debe permitir actualizar una Respuesta existente.
* **RF5.5:** El sistema debe permitir eliminar una Respuesta.
* **RF5.6:** Durante la creación o edición de una Pregunta, el sistema debe permitir gestionar las Respuestas asociadas (CRUD anidado).

### 3.6 Ronda de Preguntas Aleatorias (Visitante)

* **RF6.1:** El sistema debe permitir a un Visitante seleccionar un Tema para iniciar una ronda de preguntas.
* **RF6.2:** El sistema debe mostrar Preguntas aleatorias del Tema seleccionado.
* **RF6.3:** Una vez que el Visitante responde una pregunta, su ID de pregunta debe guardarse en el `localStorage` del navegador.
* **RF6.4:** Las preguntas cuyo ID ya está en el `localStorage` del Visitante no deben mostrarse nuevamente en la ronda actual.
* **RF6.5:** El sistema debe manejar la lógica para limpiar el `localStorage` o reiniciar la ronda si se desea volver a empezar. (A definir cómo se reinicia la ronda o se limpia el storage).

### 3.7 Dashboards

* **RF7.1 (Admin Dashboard):** Mostrar el número total de Colaboradores y proporcionar acceso directo al CRUD de Colaboradores.
* **RF7.2 (Admin & Colaborador Dashboard):** Mostrar el número total de Temas y proporcionar acceso directo al CRUD de Temas.
* **RF7.3 (Admin & Colaborador Dashboard):** Mostrar el número total de Preguntas y proporcionar acceso directo al CRUD de Preguntas.

## 4. Requisitos No Funcionales

### 4.1 Usabilidad (UI/UX)

* **RNF1.1:** La interfaz de usuario debe ser "MUY SENCILLA" e intuitiva, minimizando la necesidad de inferencia por parte del usuario.
* **RNF1.2:** Se deben utilizar iconos claros y universalmente reconocidos para mejorar la usabilidad.
* **RNF1.3:** La aplicación debe ser completamente responsive y adaptable a diferentes tamaños de pantalla (móvil, tablet, escritorio) tanto para usuarios autenticados como para Visitantes.

### 4.2 Rendimiento

* **RNF2.1:** Los tiempos de respuesta de las operaciones CRUD no deben exceder los 2 segundos en condiciones de red normales.
* **RNF2.2:** La carga inicial de la aplicación debe ser rápida y optimizada.

### 4.3 Seguridad

* **RNF3.1:** La autenticación de usuarios debe realizarse mediante tokens JWT, transmitidos de forma segura.
* **RNF3.2:** Las contraseñas de los usuarios deben almacenarse de forma hasheada en la base de datos.
* **RNF3.3:** El acceso a los recursos del API debe estar protegido por roles, asegurando que solo los usuarios autorizados puedan realizar ciertas operaciones.
* **RNF3.4:** La aplicación debe ser resistente a inyecciones SQL (aunque se usa NoSQL, se refiere a la protección de datos de entrada), XSS y CSRF.

### 4.4 Confiabilidad

* **RNF4.1:** El sistema debe manejar errores de forma elegante y proporcionar mensajes informativos al usuario.
* **RNF4.2:** Se deben implementar mecanismos para asegurar la consistencia de los datos en la base de datos.

### 4.5 Mantenibilidad

* **RNF5.1:** El código fuente debe estar bien estructurado, modularizado y documentado.
* **RNF5.2:** Se deben seguir las mejores prácticas de desarrollo para Angular, Express y Mongoose.

### 4.6 Despliegue

* **RNF6.1 (Backend):** El backend debe ser desplegable en Docker y subido a Render.com.
* **RNF6.2 (Frontend):** El frontend debe ser desplegable en Netlify.
* **RNF6.3 (Base de Datos):** La base de datos debe ser MongoDB Atlas.

## 5. Arquitectura del Sistema (Visión General)

* **Frontend:** Aplicación Angular con Angular Material y RxJS para la gestión de estados y flujos de datos.
* **Backend:** API RESTful construida con Node.js y Express.js, utilizando Mongoose para la interacción con la base de datos.
* **Base de Datos:** MongoDB (Mongo Atlas). Puedes ver el modelo aquí:
![Modelo Base de Datos](bd_model.png "Modelo BD en MongoDB")
* **Autenticación:** JSON Web Tokens (JWT).

## 6. Modelo de Datos (Extensión del Diagrama Relacional/No Relacional)

Basado en el diagrama provisto y las aclaraciones:

* **USUARIO:**
    * `_id`: ObjectId (autogenerado por MongoDB)
    * `nombreUsuario`: String (UNIQUE)
    * `contrasena`: String (hash)
    * `nombreCompleto`: String
    * `expira`: Date (Fecha de expiración: Si el usuario es creado entre Enero y Junio, su fecha de expiración será el 30 de Junio del mismo año y si es creado entre Julio y DIciembre, su fecha de expiración será 31 de Diciembre del mismo año)
    * `rol`: ENUM('Admin', 'Colaborador')
    * `activo`: Boolean (Nuevo campo: para activar/desactivar manualmente y por expiración)
* **TEMA:**
    * `_id`: ObjectId (autogenerado por MongoDB)
    * `idUsuario`: ObjectId (FK a USUARIO)
    * `estado`: ENUM('Activo', 'Inactivo') (A definir cuándo se usa "inactivo")
    * `periodo`: ENUM(1,2,3) (A definir qué representa "periodo")
    * `nombre`: String (UNIQUE)
    * `descripcion`: String
    * `fotoFormulasUrl`: String (URL)
    * `linkPresentacionUrl`: String (URL)
* **PREGUNTA:**
    * `_id`: ObjectId (autogenerado por MongoDB)
    * `idTema`: ObjectId (FK a TEMA)
    * `idUsuario`: ObjectId (FK a USUARIO)
    * `estado`: ENUM('Activo', 'Inactivo') (A definir cuándo se usa "inactivo")
    * `enunciado`: String
    * `fotoUri`: String (URL)
    * `tipoPregunta`: ENUM('MultipleChoice', 'TrueFalse') (Nuevo campo para diferenciar el tipo de pregunta)
* **RESPUESTA:**
    * `_id`: ObjectId (autogenerado por MongoDB)
    * `idPregunta`: ObjectId (FK a PREGUNTA)
    * `idUsuario`: ObjectId (FK a USUARIO)
    * `textoRespuesta`: String
    * `fotoUri`: String (URL)
    * `esLaCorrecta`: Boolean

## 7. Requerimientos Futuros (Opcionales)

* Dashboard más avanzado con gráficos y estadísticas de uso (ej. preguntas más respondidas, temas populares).
* Sistema de reporte de preguntas/respuestas erróneas.
* Funcionalidad para que los visitantes puedan guardar su progreso o resultados de las rondas de preguntas.
* Historial de rondas de preguntas para usuarios autenticados.
* Notificaciones a los administradores sobre colaboradores próximos a expirar.