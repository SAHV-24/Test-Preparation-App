# 📊 Examen de Formulación - Información Técnica Detallada

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
- **Tema 4**: Flujos de Caja y VPN
- **Tema 5**: Análisis de Sensibilidad
- **36+ ejercicios** distribuidos en los cinco temas

### 🖼️ Sistema de Fórmulas
- **Modal de fórmulas** responsivo para cada tema
- **Imágenes de referencia** cargadas desde assets
- **Fallback automático** para imágenes no encontradas
- **Optimización móvil** con controles táctiles

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
├── assets/
│   ├── tema_1.png               # Fórmulas para Tema 1
│   ├── tema_2.png               # Fórmulas para Tema 2
│   ├── tema_3.png               # Fórmulas para Tema 3
│   ├── tema_4.png               # Fórmulas para Tema 4
│   └── tema_5.png               # Fórmulas para Tema 5
├── types/
│   ├── ejercicio.ts             # Tipo Ejercicio
│   ├── ejercicios.ts            # Datos de ejercicios
│   ├── tema.ts                  # Tipo Tema
│   └── temas.ts                 # Datos de temas
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

interface Tema {
  id: string;
  nombre: string;
  descripcion: string;
}
```

## 🎨 Diseño y Estilos

### Paleta de Colores
- **Gradiente Principal**: Azul a púrpura (`#667eea` → `#764ba2`)
- **Tema 1**: Verde (`#56ab2f` → `#a8e6cf`)
- **Tema 2**: Naranja (`#f093fb` → `#f5576c`)
- **Tema 3**: Azul (`#4facfe` → `#00f2fe`)
- **Botón Fórmulas**: Verde (`#10b981` → `#059669`)

### Animaciones
- **Entrada**: `fadeInScale` para elementos principales
- **Celebración**: `bounceIn` y `pulse` para overlay
- **Hover**: Transformaciones suaves en botones y tarjetas
- **Modal**: Transiciones suaves con backdrop blur

### Diseño Responsivo
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: 480px, 768px, 1024px, 1440px, 1920px
- **Touch Optimized**: Gestos táctiles y área de toque ampliada
- **Adaptive UI**: Elementos que se adaptan según el tamaño de pantalla

## 📦 Dependencias Principales

### Dependencias de Producción
```json
{
  "@angular/animations": "^19.0.0",
  "@angular/common": "^19.0.0",
  "@angular/core": "^19.0.0",
  "@angular/platform-browser": "^19.0.0",
  "@angular/platform-browser-dynamic": "^19.0.0",
  "@angular/router": "^19.0.0",
  "canvas-confetti": "^1.9.3",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
}
```

### Dependencias de Desarrollo
```json
{
  "@angular-devkit/build-angular": "^19.0.6",
  "@angular/cli": "^19.0.6",
  "@angular/compiler-cli": "^19.0.0",
  "@types/canvas-confetti": "^1.6.4",
  "@types/jasmine": "~5.1.0",
  "@types/node": "^22.7.4",
  "jasmine-core": "~5.4.0",
  "karma": "~6.4.0",
  "karma-chrome-launcher": "~3.2.0",
  "karma-coverage": "~2.2.0",
  "karma-jasmine": "~5.1.0",
  "karma-jasmine-html-reporter": "~2.1.0",
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
- **Diseño responsivo** que se adapta a diferentes dispositivos
- **Modal de fórmulas** con sistema de imágenes dinámico
- **Gestión de eventos táctiles** optimizada para móviles

### Optimizaciones
- **Lazy loading** de componentes (preparado para expansión)
- **LocalStorage eficiente** para persistencia de datos
- **Componentes ligeros** sin dependencias innecesarias
- **CSS optimizado** con selectores específicos
- **Touch-action optimized** para mejor rendimiento en móviles
- **Z-index management** para prevenir conflictos de capas

### Accesibilidad
- **Navegación por teclado** completa
- **ARIA labels** para elementos interactivos
- **Focus management** en modales
- **Semantic HTML** para lectores de pantalla
- **Contrast ratios** optimizados para legibilidad

## 🔮 Roadmap y Mejoras Futuras

### Características Planificadas
- [ ] **Sistema de puntuación** con ranking de usuarios
- [ ] **Modo examen** con tiempo limitado
- [ ] **Estadísticas avanzadas** con gráficos
- [ ] **Exportación de resultados** en PDF
- [ ] **Modo oscuro** para mejor experiencia nocturna
- [ ] **Ejercicios con imágenes** y gráficos interactivos
- [ ] **Sistema de favoritos** para fórmulas
- [ ] **Búsqueda de fórmulas** por palabras clave

### Mejoras Técnicas
- [ ] **PWA (Progressive Web App)** para uso offline
- [ ] **Internacionalización** (i18n) para múltiples idiomas
- [ ] **Backend con API REST** para sincronización en la nube
- [ ] **Autenticación de usuarios** con diferentes perfiles
- [ ] **Tests unitarios** y e2e completos
- [ ] **Service Worker** para cache de imágenes
- [ ] **WebP support** para optimización de imágenes

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
- Mantén la responsividad en todos los cambios
- Optimiza para dispositivos táctiles

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Desarrollador

Desarrollado con ❤️ usando Angular 19, TypeScript y mucha pasión por la educación matemática.

---

**Versión**: 1.1.0  
**Última actualización**: Diciembre 2024  
**Angular**: 19.0.6  
**Node.js**: 18+
