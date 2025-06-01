import { Component, Input } from '@angular/core';
import { ExerciseService } from './exercise.service';
import { Ejercicio } from '../types/ejercicio';
import { NgIf } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [NgIf],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  ejercicio: Ejercicio | null = null;
  mostrarRespuesta = false;
  mostrarFelicitacion = false;
  constructor(private exerciseService: ExerciseService) {
    this.exerciseService.getEjercicioActual().subscribe(ej => {
      this.ejercicio = ej;
      this.mostrarRespuesta = false;
      this.mostrarFelicitacion = false;
    });
  }
  completarEjercicio() {
    if (this.ejercicio) {
      // Lanzar confetti cuando se completa un ejercicio
      this.lanzarConfetti();
      
      // Marcar como completado en el servicio
      this.exerciseService.marcarCompletado(this.ejercicio.id);
    }
  }

  private lanzarConfetti() {
    // Confetti desde diferentes ángulos para un efecto más espectacular
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    // Lanzar confetti en múltiples ráfagas con diferentes colores y ángulos
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#4f46e5', '#7c3aed', '#ec4899']
    });

    fire(0.2, {
      spread: 60,
      colors: ['#10b981', '#f59e0b', '#ef4444']
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#06b6d4', '#8b5cf6', '#f97316']
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#84cc16', '#f43f5e', '#3b82f6']
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#eab308', '#d946ef', '#06b6d4']
    });
  }
  nuevoEjercicio() {
    this.exerciseService.buscarEjercicioAleatorio();
  }

  toggleRespuesta() {
    this.mostrarRespuesta = !this.mostrarRespuesta;
  }
}
