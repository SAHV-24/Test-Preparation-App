// Interfaces para CoreService y estadísticas locales

/**
 * Representa una pregunta respondida por el usuario
 */
export interface PreguntaResuelta {
  preguntaId: string;
  respuestaId: string;
  esCorrecta: boolean;
  fecha: string; // ISO
}

/**
 * Respuesta para estadísticas por periodo para ngxCharts
 */
export interface EstadisticaPeriodoChart {
  name: string; // Ej: 'Período 1'
  series: { name: 'Correctas' | 'Incorrectas'; value: number }[];
}

/**
 * Respuesta para trazabilidad de usuario
 */
export interface TrazabilidadUsuario {
  name: string; // fecha ISO
  value: number; // 1 (correcta) | 0 (incorrecta)
  preguntaId: string;
}

/**
 * Respuesta para preguntas incorrectas por tema
 */
export interface PreguntaIncorrectaPorTema {
  preguntaId: string;
}

/**
 * Respuesta para progreso por tema
 */
export interface ProgresoPorTema {
  temaId: string;
  total: number;
  respondidas: number;
  porcentaje: number;
}
