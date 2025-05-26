# 📊 Examen de Formulación

Una aplicación web interactiva de práctica para matemáticas financieras desarrollada con Angular 19. Permite a los usuarios practicar ejercicios de diferentes temas, realizar un seguimiento de su progreso y recibir felicitaciones animadas al completar ejercicios.

## ✨ Características Principales

### 🎯 Sistema de Ejercicios Interactivos
- **Ejercicios aleatorios** por tema con múltiples opciones de respuesta
- **Feedback inmediato** con explicaciones detalladas
- **Soluciones paso a paso** para reforzar el aprendizaje
- **Validación en tiempo real** de respuestas

### 📈 Seguimiento de Progreso
- **Progreso persistente** guardado en localStorage
- **Seguimiento por tema** con barras de progreso visuales
- **Estadísticas detalladas** de ejercicios completados
- **Función de reinicio** para comenzar de nuevo

### 🎉 Experiencia de Usuario Mejorada
- **Efectos de confetti** al completar ejercicios
- **Animaciones suaves** y transiciones
- **Diseño moderno** con gradientes y sombras
- **Interfaz responsiva** para diferentes dispositivos

### 📚 Contenido Académico
- **Tema 1**: Interés Simple y Compuesto
- **Tema 2**: Valor Presente, Final y Amortizaciones
- **Tema 3**: Criterios de Decisión
- **36+ ejercicios** distribuidos en los tres temas

## 🚀 Instalación y Configuración

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Angular CLI](https://angular.io/cli) (versión 19.0.6)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd "Examen Formulación"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar dependencias adicionales**
   ```bash
   npm install canvas-confetti
   npm install --save-dev @types/canvas-confetti
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   ng serve --port 4201
   ```

5. **Abrir en el navegador**
   Navegar a `http://localhost:4201/`

## 🎮 Uso de la Aplicación

### Pantalla Principal
- **Selección de Tema**: Elige entre los tres temas disponibles
- **Visualización de Progreso**: Ve tu progreso en cada tema con barras de progreso
- **Botón de Reinicio**: Resetea todo el progreso guardado

### Durante un Ejercicio
1. **Lee el enunciado** del ejercicio cuidadosamente
2. **Selecciona una respuesta** de las opciones múltiples
3. **Confirma tu selección** haciendo clic en "Responder"
4. **Recibe feedback** inmediato con la explicación
5. **Disfruta de la celebración** con confetti si es correcto

### Navegación
- **Siguiente Ejercicio**: Botón para continuar al siguiente ejercicio
- **Volver al Menú**: Regresa a la pantalla principal
- **Progreso Automático**: El progreso se guarda automáticamente

## 🛠️ Estructura del Proyecto

```
src/
├── app/
│   ├── app.component.ts          # Componente principal con navegación
│   ├── app.component.html        # Template principal con diseño moderno
│   ├── app.component.css         # Estilos principales con gradientes
│   ├── exercise.component.ts     # Componente de ejercicios con confetti
│   ├── exercise.component.html   # Template de ejercicios con overlay
│   ├── exercise.component.css    # Estilos de ejercicios y animaciones
│   └── exercise.service.ts       # Servicio de datos y progreso
├── types/
│   └── ejercicios.ts            # Definiciones de tipos y ejercicios
└── styles.css                   # Estilos globales
```

## 💾 Gestión de Datos

### LocalStorage
La aplicación utiliza localStorage para persistir:
- **Progreso por tema**: Ejercicios completados de cada tema
- **Estado de la sesión**: Último ejercicio visitado
- **Configuraciones**: Preferencias del usuario

### Estructura de Datos
```typescript
interface Ejercicio {
  id: number;
  tema: number;
  enunciado: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion: string;
}
```

## 🎨 Diseño y Estilos

### Paleta de Colores
- **Gradiente Principal**: Azul a púrpura (`#667eea` → `#764ba2`)
- **Tema 1**: Verde (`#56ab2f` → `#a8e6cf`)
- **Tema 2**: Naranja (`#f093fb` → `#f5576c`)
- **Tema 3**: Azul (`#4facfe` → `#00f2fe`)

### Animaciones
- **Entrada**: `fadeInScale` para elementos principales
- **Celebración**: `bounceIn` y `pulse` para overlay
- **Hover**: Transformaciones suaves en botones y tarjetas

## 📦 Dependencias Principales

### Dependencias de Producción
```json
{
  "@angular/animations": "^19.0.0",
  "@angular/common": "^19.0.0",
  "@angular/core": "^19.0.0",
  "canvas-confetti": "^1.9.3"
}
```

### Dependencias de Desarrollo
```json
{
  "@angular/cli": "^19.0.6",
  "@types/canvas-confetti": "^1.6.4",
  "typescript": "~5.6.0"
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
ng serve --port 4201        # Servidor de desarrollo en puerto 4201
ng build                    # Construcción para producción
ng test                     # Ejecutar pruebas unitarias
ng lint                     # Análisis de código

# Instalación de dependencias
npm install                 # Instalar todas las dependencias
npm install canvas-confetti # Instalar efectos de confetti
```

## 🌟 Características Técnicas

### Funcionalidades Avanzadas
- **Componente de ejercicios reutilizable** con lógica separada
- **Servicio de datos centralizado** para gestión de estado
- **Efectos visuales con canvas-confetti** para mejor UX
- **Animaciones CSS personalizadas** para transiciones suaves
- **Diseño responsivo** que se adapta a diferentes pantallas

### Optimizaciones
- **Lazy loading** de componentes (preparado para expansión)
- **LocalStorage eficiente** para persistencia de datos
- **Componentes ligeros** sin dependencias innecesarias
- **CSS optimizado** con selectores específicos

## 🔮 Roadmap y Mejoras Futuras

### Características Planificadas
- [ ] **Sistema de puntuación** con ranking de usuarios
- [ ] **Modo examen** con tiempo limitado
- [ ] **Estadísticas avanzadas** con gráficos
- [ ] **Exportación de resultados** en PDF
- [ ] **Modo oscuro** para mejor experiencia nocturna
- [ ] **Ejercicios con imágenes** y gráficos interactivos

### Mejoras Técnicas
- [ ] **PWA (Progressive Web App)** para uso offline
- [ ] **Internacionalización** (i18n) para múltiples idiomas
- [ ] **Backend con API REST** para sincronización en la nube
- [ ] **Autenticación de usuarios** con diferentes perfiles
- [ ] **Tests unitarios** y e2e completos

## 🤝 Contribuciones

### Cómo Contribuir
1. **Fork** el repositorio
2. **Crea una rama** para tu característica (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Directrices
- Mantén el código limpio y documentado
- Sigue las convenciones de Angular
- Añade pruebas para nuevas funcionalidades
- Actualiza la documentación según sea necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Desarrollador

Desarrollado con ❤️ usando Angular 19, TypeScript y mucha pasión por la educación matemática.

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Angular**: 19.0.6  
**Node.js**: 18+

