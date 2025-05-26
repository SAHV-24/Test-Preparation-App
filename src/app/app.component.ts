import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TEMAS } from '../types/temas';
import { Tema } from '../types/tema';
import { CommonModule, NgFor } from '@angular/common';
import { ExerciseComponent } from './exercise.component';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, ExerciseComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formulacion-test';
  temas: Tema[] = TEMAS;
  temaSeleccionado: Tema | null = null;
  mobileMenuOpen = false;
  formulasModalOpen = false;

  constructor(private exerciseService: ExerciseService) {
    // Suscribirse al tema seleccionado para actualizar la UI
    this.exerciseService.getTemaSeleccionado().subscribe(tema => {
      this.temaSeleccionado = tema;
    });
  }  seleccionarTema(tema: Tema) {
    console.log('🎯 Seleccionando tema:', tema.nombre, tema.id);
    this.temaSeleccionado = tema;
    this.exerciseService.seleccionarTema(tema);
    // Cerrar el menú móvil si está abierto
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Método adicional para manejar eventos táctiles
  onTemaClick(event: Event, tema: Tema) {
    event.preventDefault();
    event.stopPropagation();
    this.seleccionarTema(tema);
  }
  getProgresoPorTema(temaId: string) {
    return this.exerciseService.getProgresoPorTema(temaId);
  }

  reiniciarTodo() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
      this.exerciseService.reiniciarProgreso();
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Prevenir scroll del body cuando el menú está abierto
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  // Método específico para el overlay
  onOverlayClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.closeMobileMenu();
  }

  // Cerrar menú móvil con la tecla Escape
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
  // Cerrar menú móvil al cambiar el tamaño de ventana a desktop
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const window = event.target as Window;
    if (window.innerWidth > 768 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Funcionalidad para el modal de fórmulas
  openFormulasModal() {
    this.formulasModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeFormulasModal() {
    this.formulasModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  getFormulaImagePath(): string {
    if (this.temaSeleccionado) {
      return `assets/tema_${this.temaSeleccionado.id}.png`;
    }
    return '';
  }
  // Cerrar modal con escape
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeyModal(event: KeyboardEvent) {
    if (this.formulasModalOpen) {
      this.closeFormulasModal();
    } else if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
  // Método para el overlay del modal
  onFormulasOverlayClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.closeFormulasModal();
  }

  // Manejar error de carga de imagen
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkbDs3JtdWxhcyBwYXJhIGVzdGUgdGVtYTwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjY1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+KENhcmdhciBpbWFnZW4gZW4gYXNzZXRzKTwvdGV4dD4KPC9zdmc+';
    }
  }
}
