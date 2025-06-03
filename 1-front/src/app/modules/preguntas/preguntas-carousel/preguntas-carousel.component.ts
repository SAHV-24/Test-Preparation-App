import { CommonModule } from '@angular/common';
import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CoreService } from '../../../services/core.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'pregunta-carousel',
  templateUrl: './preguntas-carousel.component.html',
  imports: [MatIcon, CommonModule, MatProgressBarModule],
  styleUrls: ['./preguntas-carousel.component.scss'],
  standalone: true,
})
export class PreguntasCarouselComponent {
  @Input() preguntas: any[] = [];
  @Input() respuestasPorPregunta: { [preguntaId: string]: any[] } = {};
  @Input() tema: any = null;
  currentIndex = 0;

  @Output() preguntaRespondida = new EventEmitter<void>();

  coreService = inject(CoreService);

  get preguntasNoResueltas() {
    const resueltas = this.coreService.getPreguntasResueltas();
    return this.preguntas.filter(
      (q) => !resueltas.some((r) => r.preguntaId === q._id)
    );
  }

  // Para saber si ya fue respondida y cuál fue la respuesta
  get resultadoActual() {
    if (!this.preguntasNoResueltas.length) return undefined;
    return this.coreService.getResultadoPregunta(
      this.preguntasNoResueltas[this.currentIndex]._id
    );
  }

  seleccionarRespuesta(respuesta: any) {
    if (this.resultadoActual) return; // No permitir cambiar respuesta
    const pregunta = this.preguntasNoResueltas[this.currentIndex];
    const esCorrecta = !!respuesta.esLaCorrecta;
    this.coreService.registrarRespuesta(
      pregunta._id,
      respuesta._id,
      esCorrecta
    );
    this.preguntaRespondida.emit();
  }

  prevPregunta() {
    if (this.currentIndex > 0) this.currentIndex--;
  }
  nextPregunta() {
    if (this.currentIndex < this.preguntasNoResueltas.length - 1)
      this.currentIndex++;
  }

  get progresoTema() {
    return this.coreService.getProgresoPorTema(this.tema?._id, this.preguntas);
  }
}
