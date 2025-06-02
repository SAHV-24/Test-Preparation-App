import { Component } from '@angular/core';
import { StaticSelectTemaComponent } from '../../temas/static-select-tema/static-select-tema.component';
import { CommonModule } from '@angular/common';
import { TemaService } from '../../../services/tema.service';
import { Tema } from '../../../interfaces/tema.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PreguntaService } from '../../../services/pregunta.service';
import { Pregunta } from '../../../interfaces/pregunta.interface';
import { PreguntaModalComponent } from '../pregunta-modal/pregunta-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../../shared/confirmDialog/confirm-dialog.component';
import { RespuestaService } from '../../../services/respuesta.service';
import { Respuesta } from '../../../interfaces/respuesta.interface';
import { RespuestaModalComponent } from '../respuestas/respuesta-modal/respuesta-modal.component';
import { RespuestasListComponent } from '../respuestas-list/respuestas-list.component';
import { SearchPreguntaComponent } from '../search-pregunta/search-pregunta.component';

@Component({
  selector: 'app-preguntas-page',
  standalone: true,
  imports: [
    CommonModule,
    StaticSelectTemaComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RespuestasListComponent, // Importación correcta del componente hijo
    SearchPreguntaComponent
  ],
  templateUrl: './preguntas-page.component.html',
  styleUrl: './preguntas-page.component.scss',
})
export class PreguntasPageComponent {
  temas: Tema[] = [];
  selectedTema: Tema | null = null;
  isLoading = false;
  preguntas: Pregunta[] = [];
  preguntaSeleccionada: Pregunta | null = null;
  respuestasPorPregunta: Record<string, Respuesta[]> = {};
  preguntasFiltradas: Pregunta[] = []; // Nueva variable para las preguntas filtradas

  constructor(
    private temaService: TemaService,
    private preguntaService: PreguntaService,
    private dialog: MatDialog,
    private respuestaService: RespuestaService
  ) {
    this.loadTemas();
  }

  loadTemas() {
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

  onTemaSeleccionado(tema: Tema) {
    this.selectedTema = tema;
    this.loadPreguntasDeTema(tema._id!);
  }

  loadPreguntasDeTema(idTema: string) {
    this.respuestasPorPregunta = {};
    this.preguntaService.getByTema(idTema).subscribe({
      next: (preguntas) => {
        this.preguntas = preguntas;
        this.preguntasFiltradas = preguntas;
        preguntas.forEach((pregunta) => {
          const id =
            typeof pregunta._id === 'string'
              ? pregunta._id
              : String(pregunta._id);
          this.respuestaService.getByPregunta(id).subscribe((respuestas) => {
            this.respuestasPorPregunta[id] = respuestas;
          });
        });
      },
      error: () => (this.preguntas = []),
    });
  }

  abrirCrearPregunta() {
    if (!this.selectedTema) return;
    const data: any = { idTema: this.selectedTema._id };
    const dialogRef = this.dialog.open(PreguntaModalComponent, {
      width: '500px',
      data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result.modoEdicion) {
        this.preguntaService.create(result.formData).subscribe(() => {
          this.loadPreguntasDeTema(this.selectedTema!._id!);
        });
      }
    });
  }

  onPreguntaSeleccionada(pregunta: Pregunta) {
     this.preguntaSeleccionada = pregunta;
     this.preguntasFiltradas = pregunta ? [pregunta] : this.preguntas;
  }

  editarPregunta(pregunta: Pregunta) {
    const dialogRef = this.dialog.open(PreguntaModalComponent, {
      width: '500px',
      data: { idTema: pregunta.idTema, idPregunta: pregunta._id, pregunta },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.modoEdicion && result.id) {
        this.preguntaService
          .update(result.id, result.formData)
          .subscribe(() => {
            this.loadPreguntasDeTema(this.selectedTema!._id!);
          });
      }
    });
  }

  eliminarPregunta(pregunta: Pregunta) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: '¿Eliminar pregunta?',
        message:
          'Esta acción eliminará la pregunta y todas sus respuestas asociadas. ¿Estás seguro?',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.preguntaService.delete(pregunta._id!).subscribe(() => {
          this.loadPreguntasDeTema(this.selectedTema!._id!);
        });
      }
    });
  }

  abrirAgregarRespuesta(pregunta: Pregunta) {
    const id =
      typeof pregunta._id === 'string' ? pregunta._id : String(pregunta._id);
    const dialogRef = this.dialog.open(RespuestaModalComponent, {
      width: '500px',
      data: { idPregunta: id },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.respuestaService.create(formData).subscribe(() => {
          this.respuestaService.getByPregunta(id).subscribe((respuestas) => {
            this.respuestasPorPregunta[id] = respuestas;
          });
        });
      }
    });
  }

  editarRespuesta(pregunta: Pregunta, respuesta: Respuesta) {
    const id =
      typeof pregunta._id === 'string' ? pregunta._id : String(pregunta._id);
    const dialogRef = this.dialog.open(RespuestaModalComponent, {
      width: '500px',
      data: { idPregunta: id, respuesta },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData && respuesta._id) {
        this.respuestaService.update(respuesta._id, formData).subscribe(() => {
          this.respuestaService.getByPregunta(id).subscribe((respuestas) => {
            this.respuestasPorPregunta[id] = respuestas;
          });
        });
      }
    });
  }

  eliminarRespuesta(pregunta: Pregunta, respuesta: Respuesta) {
    const id =
      typeof pregunta._id === 'string' ? pregunta._id : String(pregunta._id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: '¿Eliminar respuesta?',
        message:
          'Esta acción eliminará la respuesta seleccionada. ¿Estás seguro?',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && respuesta._id) {
        this.respuestaService.delete(respuesta._id).subscribe(() => {
          this.respuestaService.getByPregunta(id).subscribe((respuestas) => {
            this.respuestasPorPregunta[id] = respuestas;
          });
        });
      }
    });
  }
}
