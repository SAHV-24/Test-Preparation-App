import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';
import {
  MatChip,
  MatChipListbox,
  MatChipsModule,
} from '@angular/material/chips';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-temas-page',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    RouterLink,
    NgForOf,
    MatButton,
    MatCardModule,
    MatChipsModule,
    MatIcon,
    MatSpinner,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './temas-page.component.html',
  styleUrl: './temas-page.component.scss',
})
export class TemasPageComponent implements OnInit {
  temas: any[] = [];
  temasFiltrados: any[] = [];
  periodos: number[] = [1, 2, 3];
  filtroPeriodo: number | null = null;
  nombreControl = new FormControl('');
  opcionesNombre: any[] = [];
  loading = true;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.getDatos().subscribe((cache: any) => {
      this.temas = cache.temas || [];
      this.temasFiltrados = [...this.temas];
      this.opcionesNombre = this.temas;
      this.loading = false;
    });
    this.nombreControl.valueChanges.pipe(startWith('')).subscribe((value) => {
      this.filtrarTemas();
    });
  }

  filtrarTemas() {
    let filtrados = this.temas;
    if (this.filtroPeriodo) {
      filtrados = filtrados.filter((t) => t.periodo === this.filtroPeriodo);
    }
    const nombre = this.nombreControl.value?.toLowerCase() || '';
    if (nombre) {
      filtrados = filtrados.filter((t) => t.nombre.toLowerCase().includes(nombre));
    }
    this.temasFiltrados = filtrados;
    // Opciones para autocomplete
    this.opcionesNombre = this.temas.filter((t) => {
      if (this.filtroPeriodo && t.periodo !== this.filtroPeriodo) return false;
      return t.nombre.toLowerCase().includes(nombre);
    });
  }

  onNombreSelected(nombre: string) {
    this.nombreControl.setValue(nombre);
    this.filtrarTemas();
  }
}
