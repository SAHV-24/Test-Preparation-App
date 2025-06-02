import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RespuestaService } from '../../../services/respuesta.service';
import { Respuesta } from '../../../interfaces/respuesta.interface';
import { RespuestaModalComponent } from '../respuestas/respuesta-modal/respuesta-modal.component';
import { ConfirmDialogComponent } from '../../../shared/confirmDialog/confirm-dialog.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-respuestas-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './respuestas-list.component.html',
  styleUrl: './respuestas-list.component.scss',
})
export class RespuestasListComponent implements OnInit {
  @Input() idPregunta!: string | undefined;
  respuestas: Respuesta[] = [];

  constructor(
    private respuestaService: RespuestaService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarRespuestas();
  }

  cargarRespuestas() {
    if (this.idPregunta)
      this.respuestaService
        .getByPregunta(this.idPregunta)
        .subscribe((res) => {
          this.respuestas = res;
        });
  }

  agregarRespuesta() {
    const dialogRef = this.dialog.open(RespuestaModalComponent, {
      width: '500px',
      data: { idPregunta: this.idPregunta },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.respuestaService
          .create(formData)
          .subscribe(() => this.cargarRespuestas());
      }
    });
  }

  editarRespuesta(respuesta: Respuesta) {
    const dialogRef = this.dialog.open(RespuestaModalComponent, {
      width: '500px',
      data: { idPregunta: this.idPregunta, respuesta },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData && respuesta._id) {
        this.respuestaService
          .update(respuesta._id, formData)
          .subscribe(() => this.cargarRespuestas());
      }
    });
  }

  eliminarRespuesta(respuesta: Respuesta) {
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
        this.respuestaService
          .delete(respuesta._id)
          .subscribe(() => this.cargarRespuestas());
      }
    });
  }
}
