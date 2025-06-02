import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Respuesta } from '../../../../interfaces/respuesta.interface';

@Component({
  selector: 'app-respuestas-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './respuestas-list.component.html',
})
export class RespuestasListComponent {
  @Input() respuestas: Respuesta[] = [];
  @Input() puedeEditar = false;
  @Output() editar = new EventEmitter<Respuesta>();
  @Output() eliminar = new EventEmitter<Respuesta>();
}
