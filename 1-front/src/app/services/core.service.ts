/**
 * CoreService: Servicio para manipulación y trazabilidad de preguntas respondidas por el usuario (visitante o autenticado) usando localStorage.
 *
 * Funcionalidades principales:
 * - Registrar y consultar respuestas de preguntas (calificación local).
 * - Calcular progreso por tema y periodo.
 * - Obtener preguntas aleatorias por periodo.
 * - Resetear calificaciones por pregunta, tema o periodo.
 * - Listar preguntas incorrectas por tema.
 * - Obtener estadísticas para visualización (ngxCharts): correctas/incorrectas por periodo.
 * - Obtener la trazabilidad (historial) de respuestas del usuario.
 *
 * Todas las operaciones son locales y no requieren backend. Ideal para visitantes y para mostrar feedback inmediato y personalizado.
 */

import { Injectable } from '@angular/core';

export interface PreguntaResuelta {
  preguntaId: string;
  respuestaId: string;
  esCorrecta: boolean;
  fecha: string; // ISO
}

@Injectable({ providedIn: 'root' })
export class CoreService {
  private readonly KEY_PREGUNTAS_RESUELTAS = 'preguntas_resueltas';

  getPreguntasResueltas(): PreguntaResuelta[] {
    const data = localStorage.getItem(this.KEY_PREGUNTAS_RESUELTAS);
    return data ? JSON.parse(data) : [];
  }

  registrarRespuesta(preguntaId: string, respuestaId: string, esCorrecta: boolean) {
    const resueltas = this.getPreguntasResueltas();
    // Si ya existe, reemplaza (por si el usuario repite la pregunta)
    const idx = resueltas.findIndex(r => r.preguntaId === preguntaId);
    const nueva: PreguntaResuelta = {
      preguntaId,
      respuestaId,
      esCorrecta,
      fecha: new Date().toISOString()
    };
    if (idx >= 0) {
      resueltas[idx] = nueva;
    } else {
      resueltas.push(nueva);
    }
    localStorage.setItem(this.KEY_PREGUNTAS_RESUELTAS, JSON.stringify(resueltas));
  }

  getResultadoPregunta(preguntaId: string): PreguntaResuelta | undefined {
    return this.getPreguntasResueltas().find(r => r.preguntaId === preguntaId);
  }

  limpiarPreguntasResueltas() {
    localStorage.removeItem(this.KEY_PREGUNTAS_RESUELTAS);
  }

  getEstadisticas() {
    const resueltas = this.getPreguntasResueltas();
    const total = resueltas.length;
    const correctas = resueltas.filter(r => r.esCorrecta).length;
    const incorrectas = total - correctas;
    return { total, correctas, incorrectas };
  }

  getProgresoPorTema(temaId: string, preguntas: { _id: string }[]): number {
    if (!preguntas || preguntas.length === 0) return 0;
    const resueltas = this.getPreguntasResueltas();
    const respondidas = preguntas.filter(q => resueltas.some(r => r.preguntaId === q._id)).length;
    return Math.round((respondidas / preguntas.length) * 100);
  }

  /**
   * Devuelve un array de preguntas aleatorias de los temas de un periodo dado.
   * @param preguntas Todas las preguntas disponibles
   * @param temas Todos los temas disponibles
   * @param periodo Periodo a filtrar
   * @param cantidad Número de preguntas aleatorias a devolver
   */
  getPreguntasAleatoriasPorPeriodo(preguntas: { _id: string, idTema: string }[], temas: { _id: string, periodo: number }[], periodo: number, cantidad: number): { _id: string, idTema: string }[] {
    const temasPeriodo = temas.filter(t => t.periodo === periodo).map(t => t._id);
    const preguntasPeriodo = preguntas.filter(p => temasPeriodo.includes(p.idTema));
    // Mezclar y tomar 'cantidad'
    const mezcladas = preguntasPeriodo.sort(() => Math.random() - 0.5);
    return mezcladas.slice(0, cantidad);
  }

  /**
   * Elimina todas las calificaciones (respuestas) de un tema específico
   */
  resetearCalificacionesPorTema(temaId: string, preguntas: { _id: string, idTema: string }[]) {
    const idsPreguntasTema = preguntas.filter(p => p.idTema === temaId).map(p => p._id);
    let resueltas = this.getPreguntasResueltas();
    resueltas = resueltas.filter(r => !idsPreguntasTema.includes(r.preguntaId));
    localStorage.setItem(this.KEY_PREGUNTAS_RESUELTAS, JSON.stringify(resueltas));
  }

  /**
   * Elimina todas las calificaciones (respuestas) de un periodo específico
   */
  resetearCalificacionesPorPeriodo(periodo: number, preguntas: { _id: string, idTema: string }[], temas: { _id: string, periodo: number }[]) {
    const temasPeriodo = temas.filter(t => t.periodo === periodo).map(t => t._id);
    const idsPreguntasPeriodo = preguntas.filter(p => temasPeriodo.includes(p.idTema)).map(p => p._id);
    let resueltas = this.getPreguntasResueltas();
    resueltas = resueltas.filter(r => !idsPreguntasPeriodo.includes(r.preguntaId));
    localStorage.setItem(this.KEY_PREGUNTAS_RESUELTAS, JSON.stringify(resueltas));
  }

  /**
   * Elimina la calificación (respuesta) de una pregunta específica
   */
  resetearCalificacionPregunta(preguntaId: string) {
    let resueltas = this.getPreguntasResueltas();
    resueltas = resueltas.filter(r => r.preguntaId !== preguntaId);
    localStorage.setItem(this.KEY_PREGUNTAS_RESUELTAS, JSON.stringify(resueltas));
  }

  /**
   * Devuelve las preguntas respondidas incorrectamente de un tema
   */
  getPreguntasIncorrectasPorTema(temaId: string, preguntas: { _id: string, idTema: string }[]): string[] {
    const idsPreguntasTema = preguntas.filter(p => p.idTema === temaId).map(p => p._id);
    const resueltas = this.getPreguntasResueltas();
    return resueltas.filter(r => idsPreguntasTema.includes(r.preguntaId) && !r.esCorrecta).map(r => r.preguntaId);
  }

  /**
   * Estadísticas para ngxCharts: preguntas respondidas por periodo, buenas y malas
   * Devuelve un array tipo [{ name: periodo, series: [{ name: 'Correctas', value: X }, { name: 'Incorrectas', value: Y }] }]
   */
  getEstadisticasPorPeriodoParaChart(preguntas: { _id: string, idTema: string }[], temas: { _id: string, periodo: number }[]) {
    const resueltas = this.getPreguntasResueltas();
    const periodos = Array.from(new Set(temas.map(t => t.periodo)));
    return periodos.map(periodo => {
      const temasPeriodo = temas.filter(t => t.periodo === periodo).map(t => t._id);
      const preguntasPeriodo = preguntas.filter(p => temasPeriodo.includes(p.idTema)).map(p => p._id);
      const correctas = resueltas.filter(r => preguntasPeriodo.includes(r.preguntaId) && r.esCorrecta).length;
      const incorrectas = resueltas.filter(r => preguntasPeriodo.includes(r.preguntaId) && !r.esCorrecta).length;
      return {
        name: `Período ${periodo}`,
        series: [
          { name: 'Correctas', value: correctas },
          { name: 'Incorrectas', value: incorrectas }
        ]
      };
    });
  }

  /**
   * Trazabilidad: Devuelve un array ordenado por fecha con la secuencia de respuestas del usuario
   * [{ name: fecha, value: 1 (correcta) | 0 (incorrecta), preguntaId }]
   */
  getTrazabilidadUsuario(): { name: string, value: number, preguntaId: string }[] {
    return this.getPreguntasResueltas()
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .map(r => ({ name: r.fecha, value: r.esCorrecta ? 1 : 0, preguntaId: r.preguntaId }));
  }
}
