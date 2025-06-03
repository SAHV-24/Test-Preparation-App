import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PreguntasCarouselComponent } from '../preguntas-carousel/preguntas-carousel.component';
import { CoreService } from '../../../services/core.service';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preguntas-by-tema-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    ReactiveFormsModule,
    PreguntasCarouselComponent,
  ],
  templateUrl: './preguntas-by-tema-page.component.html',
  styleUrl: './preguntas-by-tema-page.component.scss',
})
export class PreguntasByTemaPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);
  coreService = inject(CoreService);
  snackBar = inject(MatSnackBar);

  tema: any = null;
  preguntas: any[] = [];
  respuestasPorPregunta: { [preguntaId: string]: any[] } = {};
  currentIndex = 0;
  preguntasBien: any[] = [];
  preguntasMal: any[] = [];

  ngOnInit() {
    const temaId = this.route.snapshot.paramMap.get('temaId');
    this.localStorageService.getDatos().subscribe((cache) => {
      this.tema = cache.temas.find((t) => t._id === temaId);
      if (!this.tema) {
        this.router.navigate(['/temas']);
        return;
      }
      this.preguntas = cache.preguntas.filter((p) => p.idTema === temaId);
      this.preguntas.forEach((p) => {
        this.respuestasPorPregunta[p._id] = cache.respuestas.filter(
          (r) => r.idPregunta === p._id
        );
      });
      if (this.preguntas.length === 0) {
        this.currentIndex = -1;
      }
      this.actualizarListasYFeedback();
    });
  }

  // Llama esto cada vez que se responde una pregunta
  actualizarListasYFeedback() {
    const resueltas = this.coreService.getPreguntasResueltas();
    this.preguntasBien = this.preguntas.filter((q) => {
      const correcta = resueltas.find(
        (r) =>
          r.preguntaId === q._id &&
          r.esCorrecta !== undefined &&
          r.esCorrecta === true
      );
      return !!correcta;
    });
    this.preguntasMal = this.preguntas.filter((q) => {
      const incorrecta = resueltas.find(
        (r) =>
          r.preguntaId === q._id &&
          r.esCorrecta !== undefined &&
          r.esCorrecta === false
      );
      return !!incorrecta;
    });
    // Feedback al usuario
    if (
      this.preguntas.length > 0 &&
      this.preguntasBien.length + this.preguntasMal.length ===
        this.preguntas.length
    ) {
      if (this.preguntasMal.length === 0) {
        this.snackBar.open(
          '¡Muy bien! Has completado al 100% esto!',
          'Cerrar',
          { duration: 4000 }
        );
      } else {
        this.snackBar.open(
          'Puedes mejorar en tus errores, intenta rehacer las preguntas.',
          'Cerrar',
          { duration: 4000 }
        );
      }
    }
  }

  // Llama esto desde el carousel cuando se responde una pregunta
  onPreguntaRespondida() {
    this.actualizarListasYFeedback();
  }

  async nextPregunta() {
    if (this.currentIndex < this.preguntas.length - 1) {
      await this.delay(350); // Espera 350ms antes de pasar
      this.currentIndex++;
      this.actualizarListasYFeedback();
    }
  }

  async prevPregunta() {
    if (this.currentIndex > 0) {
      await this.delay(350);
      this.currentIndex--;
      this.actualizarListasYFeedback();
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getRespuestaCorrecta(preguntaId: string): string {
    const respuestas = this.respuestasPorPregunta[preguntaId] || [];
    const correcta = respuestas.find((r) => !!r.esLaCorrecta);
    return correcta ? correcta.textoRespuesta : '';
  }

  reintentarPregunta(preguntaId: string) {
    this.coreService.resetearCalificacionPregunta(preguntaId);
    this.actualizarListasYFeedback();
  }

  resetearModulo() {
    if (!this.tema) return;
    this.coreService.resetearCalificacionesPorTema(
      this.tema._id,
      this.preguntas
    );
    this.actualizarListasYFeedback();
  }
}
