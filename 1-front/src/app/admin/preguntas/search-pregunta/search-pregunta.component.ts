import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pregunta } from '../../../interfaces/pregunta.interface';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-pregunta',
  templateUrl: './search-pregunta.component.html',
  imports: [
    MatListModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  styleUrls: ['./search-pregunta.component.scss'],
})
export class SearchPreguntaComponent implements OnInit, OnChanges {
  @Input() preguntas: Pregunta[] = [];
  @Output() preguntaSeleccionada = new EventEmitter<Pregunta>();

  searchControl = new FormControl('');
  filteredPreguntas: Pregunta[] = [];

  ngOnInit() {
    this.filteredPreguntas = this.preguntas;
    this.searchControl.valueChanges.subscribe((value) => {
      const filterValue = (value || '').toLowerCase();
      this.filteredPreguntas = this.preguntas.filter((p) =>
        p.enunciado.toLowerCase().includes(filterValue)
      );
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['preguntas']) {
      this.filteredPreguntas = this.preguntas;
    }
  }

  selectPregunta(pregunta: Pregunta) {
    this.preguntaSeleccionada.emit(pregunta);
    this.searchControl.setValue(pregunta.enunciado, { emitEvent: false });
    this.filteredPreguntas = [pregunta];
  }
}
