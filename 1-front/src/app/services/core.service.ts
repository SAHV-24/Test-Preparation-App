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
}
