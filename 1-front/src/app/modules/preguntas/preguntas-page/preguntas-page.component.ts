import { Component, inject } from '@angular/core';
import { CoreService } from '../../../services/core.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preguntas-page',
  imports: [CommonModule, MatExpansionModule, MatCheckboxModule, FormsModule],
  templateUrl: './preguntas-page.component.html',
  styleUrl: './preguntas-page.component.scss'
})
export class PreguntasPageComponent {
  coreService = inject(CoreService);
  localStorageService = inject(LocalStorageService);
  preguntaActual: any = null;
  respuestasActuales: any[] = [];
  preguntas: any[] = [];
  respuestas: any[] = [];
  temas: any[] = [];
  temasSeleccionados: Set<string> = new Set();
  periodos: number[] = [1, 2, 3];
  preguntasDisponibles = 0;
  soloNoRespondidas = false;
  historialPreguntas: any[] = [];
  mostrarConfetti = false;

  constructor() {
    this.localStorageService.getDatos().subscribe(cache => {
      this.preguntas = cache.preguntas;
      this.respuestas = cache.respuestas;
      this.temas = cache.temas;
    });
  }

  limpiarSeleccionTemas() {
    this.temasSeleccionados.clear();
    this.actualizarPreguntasDisponibles();
  }

  toggleTemaSeleccionado(idTema: string, checked: boolean) {
    if (checked) {
      this.temasSeleccionados.add(idTema);
    } else {
      this.temasSeleccionados.delete(idTema);
    }
    this.actualizarPreguntasDisponibles();
  }

  actualizarPreguntasDisponibles() {
    let preguntasFiltradas = this.preguntas;
    if (this.temasSeleccionados.size > 0) {
      preguntasFiltradas = preguntasFiltradas.filter(p => this.temasSeleccionados.has(p.idTema));
    }
    if (this.soloNoRespondidas) {
      const resueltas = this.coreService.getPreguntasResueltas();
      preguntasFiltradas = preguntasFiltradas.filter(p => !resueltas.some(r => r.preguntaId === p._id));
    }
    this.preguntasDisponibles = preguntasFiltradas.length;
  }

  mostrarPreguntaAleatoria() {
    let preguntasFiltradas = this.preguntas;
    if (this.temasSeleccionados.size > 0) {
      preguntasFiltradas = preguntasFiltradas.filter(p => this.temasSeleccionados.has(p.idTema));
    }
    if (this.soloNoRespondidas) {
      const resueltas = this.coreService.getPreguntasResueltas();
      preguntasFiltradas = preguntasFiltradas.filter(p => !resueltas.some(r => r.preguntaId === p._id));
    }
    this.preguntasDisponibles = preguntasFiltradas.length;
    if (!preguntasFiltradas.length) {
      this.preguntaActual = null;
      this.respuestasActuales = [];
      return;
    }
    const randomIndex = Math.floor(Math.random() * preguntasFiltradas.length);
    const pregunta = preguntasFiltradas[randomIndex];
    this.preguntaActual = {
      ...pregunta,
      temaNombre: this.temas.find(t => t._id === pregunta.idTema)?.nombre || '',
      periodo: this.temas.find(t => t._id === pregunta.idTema)?.periodo || ''
    };
    this.respuestasActuales = this.respuestas.filter(r => r.idPregunta === pregunta._id);
    this.historialPreguntas.push(this.preguntaActual);
    // Confetti si acierta 5 seguidas o completa todas
    if (this.historialPreguntas.length > 0 && this.preguntasDisponibles === 1) {
      this.mostrarConfetti = true;
      setTimeout(() => this.mostrarConfetti = false, 2000);
    }
  }

  temasPorPeriodo(periodo: number) {
    return this.temas.filter(t => t.periodo === periodo);
  }

  abrirFormulaUrl(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
