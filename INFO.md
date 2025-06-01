# 📊 Examen de Formulación - Información Técnica

## 📐 Diagrama de Arquitectura

_Agrega aquí tu diagrama de base de datos o arquitectura general (puedes insertar una imagen o un enlace)._

---

## 🏗️ Stack Tecnológico

- **Frontend:** Angular 19 (SPA, Angular Material recomendado)
- **Backend:** Node.js + Express
- **Base de Datos:** MongoDB (modelo no relacional)
- **Autenticación:** JWT + CAPTCHA
- **Almacenamiento de Imágenes:** Cloudinary (o similar, gratuito)
- **Estadísticas y Presentaciones:** Integración en backend y frontend

---

## 🗂️ Estructura General del Proyecto

```
/
├── backend/
│   └── ... (Node.js, Express, modelos, controladores, rutas)
├── frontend/
│   └── ... (Angular, componentes, servicios, assets)
└── README.md
```

---

## 🧩 Modelado de Datos (MongoDB)

### Usuario

- \_id: ObjectId
- nombreUsuario: string
- contraseña: string (hash)
- nombreCompleto: string
- expira: date
- rol: enum('Admin', 'Colaborador')

### Tema

- \_id: ObjectId
- idUsuario: ObjectId (FK)
- estado: enum('Activo', 'Inactivo')
- periodo: enum(1,2,3)
- nombre: string
- descripcion: string

### Pregunta

- \_id: ObjectId
- idUsuario: ObjectId (FK)
- estado: enum('Activo', 'Inactivo')
- enunciado: string
- fotoUrl: string (opcional)

### Respuesta

- \_id: ObjectId
- idPregunta: ObjectId (FK)
- idUsuario: ObjectId (FK)
- respuesta: string
- fotoUrl: string (opcional)
- esLaCorrecta: boolean

---

## 🔒 Seguridad

- Autenticación con JWT
- Protección de rutas por rol (Admin/Colaborador)
- CAPTCHA en login para evitar ataques automatizados

---

## ☁️ Subida de Imágenes

- Servicio gratuito (Cloudinary recomendado)
- Almacenamiento de imágenes de fórmulas y respuestas

---

## 📊 Estadísticas

- Seguimiento de preguntas/respuestas por usuario, tema y periodo
- Visualización de estadísticas en el panel de administración

---

## 📂 Repositorio de Presentaciones

- Subida y gestión de archivos (PDF, imágenes, enlaces externos)

---

## 🚦 Roadmap

- [ ] Autenticación y roles
- [ ] CRUD de temas, preguntas y respuestas
- [ ] Subida de imágenes a la nube
- [ ] Rondas de preguntas aleatorias
- [ ] Estadísticas y reportes
- [ ] Repositorio de presentaciones
