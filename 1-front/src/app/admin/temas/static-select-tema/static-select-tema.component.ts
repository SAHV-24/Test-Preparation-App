import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Tema } from '../../../interfaces/tema.interface';

@Component({
  selector: 'app-static-select-tema',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatListModule, MatIconModule],
  templateUrl: './static-select-tema.component.html',
  styleUrl: './static-select-tema.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticSelectTemaComponent {
  @Input() temas: Tema[] = [];
  @Input() selectedTemaId: string | null = null;
  @Output() temaSeleccionado = new EventEmitter<Tema>();

  selectedTab = 0;

  getTemasPorPeriodo(periodo: number): Tema[] {
    return this.temas.filter(t => t.periodo === periodo);
  }

  onSelectTema(tema: Tema) {
    this.temaSeleccionado.emit(tema);
  }
}
