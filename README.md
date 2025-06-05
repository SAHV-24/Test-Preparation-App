# Aplicación para Preparación de Exámenes (orientado a Formulación y Evaluación de Proyectos)

## 🎯 Propósito
Aplicación web para gestionar temas, preguntas y respuestas con roles diferenciados (Admin, Colaborador) y un modo de juego para visitantes.

## 👥 Audiencia
Desarrolladores, diseñadores, testers y stakeholders.

## 🌐 Alcance
- Gestión educativa de contenido (Temas, Preguntas, Respuestas)
- Modo juego de preguntas aleatorias
- Autenticación y control de acceso
- Dashboard administrativo

## 🧱 Tecnologías
- **Frontend:** Angular
- **Backend:** RESTful (Node)
- **DB:** MongoDB (Mongo Atlas)

## 🔐 Roles y Funciones
### Admin
- CRUD de Colaboradores, Temas, Preguntas y Respuestas
- Activar/desactivar colaboradores
- Ver estadísticas generales

### Colaborador
- CRUD de Temas, Preguntas y Respuestas
- Ver estadísticas de contenido

### Visitante
- Juego de preguntas aleatorias (sin login)
- Datos guardados en `localStorage`
- Acceso limitado y cacheado a API (máx. 3 consultas cada 2 días)

## 🔄 Flujo Visitante
1. Consulta cache y contador en `localStorage`
2. Si es válido, usa datos locales
3. Si no, consulta API (si no ha superado el límite)
4. Se bloquea si supera el límite hasta 3 días después

## 📊 Métricas Locales para Visitantes
- Estadísticas de respuestas
- Aciertos/errores por tema
- Todo gestionado en el navegador (con ngxCharts opcional)

## ✅ Funcionalidades Clave
- Autenticación con JWT
- CRUD para Temas, Preguntas, Respuestas, Colaboradores
- Rondas de preguntas aleatorias
- Dashboard con métricas
- Restricciones y control local para visitantes

## ⚠️ Seguridad
- Lógica de visitantes solo en frontend (manipulable)
- Rutas públicas con validación JWT específica
