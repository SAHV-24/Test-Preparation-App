import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TemaService } from '../../../services/tema.service';
import { Tema } from '../../../interfaces/tema.interface';
import { TemaModalComponent } from '../tema-modal/tema-modal.component';
import { ConfirmDialogComponent } from '../../../shared/confirmDialog/confirm-dialog.component';
@Component({
  selector: 'app-temas-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './temas-page.component.html',
  styleUrl: './temas-page.component.scss',
})
export class TemasPageComponent implements OnInit {
  temas: Tema[] = [];
  isLoading = false;
  selectedTabIndex = 0;

  constructor(private temaService: TemaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTemas();
  }

  loadTemas(): void {
    this.isLoading = true;
    this.temaService.getAll().subscribe({
      next: (temas) => {
        this.temas = temas;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getTotalTemas(): number {
    return this.temas.length;
  }

  getTemasPorPeriodo(periodo: number): Tema[] {
    return this.temas.filter((t) => t.periodo === periodo);
  }

  getTemasActivosPorPeriodo(periodo: number): number {
    return this.temas.filter(
      (t) => t.periodo === periodo && t.estado === 'Activo'
    ).length;
  }

  getPeriodoIcon(periodo: number): string {
    switch (periodo) {
      case 1:
        return 'looks_one';
      case 2:
        return 'looks_two';
      case 3:
        return 'looks_3';
      default:
        return 'help';
    }
  }

  formatDate(date?: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES');
  }

  verTema(tema: Tema): void {
    // Implementar modal o navegación
  }
  editarTema(tema: Tema): void {
    const dialogRef = this.dialog.open(TemaModalComponent, {
      width: '500px',
      data: { tema },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.temaService.update(tema._id!, result).subscribe(() => {
          this.loadTemas();
        });
      }
    });
  }
  eliminarTema(tema: Tema): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: '¿Eliminar tema?',
        message:
          'Si eliminas un tema podrías causar que SE ELIMINEN varias preguntas y respuestas que los estudiantes van a ver. ¿Estás seguro?',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.temaService.delete(tema._id!).subscribe(() => {
          this.loadTemas();
        });
      }
    });
  }
  crearNuevoTema(): void {
    const dialogRef = this.dialog.open(TemaModalComponent, {
      width: '500px',
      data: {
        tema: {
          nombre: '',
          descripcion: '',
          estado: 'Activo',
          periodo: 1,
          fotoFormulasUrl: '',
          linkPresentacionUrl: '',
          idUsuario: ''
        },
        isNew: true
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.temaService.create(result).subscribe(() => {
          this.loadTemas();
        });
      }
    });
  }
  onTabChange(index: number): void {
    this.selectedTabIndex = index;
  }
}
