import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PreguntasCarouselComponent } from '../preguntas-carousel/preguntas-carousel.component';

@Component({
  selector: 'app-preguntas-by-tema-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PreguntasCarouselComponent],
  templateUrl: './preguntas-by-tema-page.component.html',
  styleUrl: './preguntas-by-tema-page.component.scss',
})
export class PreguntasByTemaPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);

  tema: any = null;
  preguntas: any[] = [];
  respuestasPorPregunta: { [preguntaId: string]: any[] } = {};
  currentIndex = 0;

  ngOnInit() {
    const temaId = this.route.snapshot.paramMap.get('temaId');
    this.localStorageService.getDatos().subscribe(cache => {
      this.tema = cache.temas.find(t => t._id === temaId);
      if (!this.tema) {
        this.router.navigate(['/temas']);
        return;
      }
      this.preguntas = cache.preguntas.filter(p => p.idTema === temaId);
      this.preguntas.forEach(p => {
        this.respuestasPorPregunta[p._id] = cache.respuestas.filter(r => r.idPregunta === p._id);
      });
      if (this.preguntas.length === 0) {
        this.currentIndex = -1;
      }
    });
  }

  prevPregunta() {
    if (this.currentIndex > 0) this.currentIndex--;
  }
  nextPregunta() {
    if (this.currentIndex < this.preguntas.length - 1) this.currentIndex++;
  }
}
