import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  Pregunta,
  TipoPregunta,
  Dificultad,
} from '../../../interfaces/pregunta.interface';

@Component({
  selector: 'app-pregunta-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './pregunta-modal.component.html',
  styleUrl: './pregunta-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreguntaModalComponent implements OnInit {
  form: FormGroup;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  modoEdicion = false;
  preguntaId: string | null = null;
  fotoUriOriginal: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PreguntaModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { idTema: string; idPregunta?: string; pregunta?: Pregunta }
  ) {
    this.form = this.fb.group({
      enunciado: ['', [Validators.required, Validators.maxLength(300)]],
      estado: ['Activo', Validators.required],
      foto: [null],
    });
  }

  ngOnInit(): void {
    if ((this.data as any).pregunta) {
      const pregunta = (this.data as any).pregunta;
      this.modoEdicion = true;
      this.preguntaId = pregunta._id || null;
      this.form.patchValue({
        enunciado: pregunta.enunciado || '',
        estado: pregunta.estado || 'Activo',
      });
      if (pregunta.fotoUri) {
        this.imagePreview = pregunta.fotoUri;
        this.fotoUriOriginal = pregunta.fotoUri;
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  eliminarImagen(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.form.get('foto')?.setValue(null);
    if (this.modoEdicion) {
      this.fotoUriOriginal = '';
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const formData = new FormData();
      formData.append('enunciado', formValue.enunciado);
      formData.append('estado', formValue.estado);
      // Asegura que idTema sea string (por si viene como objeto)
      let idTema = this.data.idTema;
      if (idTema && typeof idTema === 'object' && '_id' in idTema) {
        idTema = (idTema as any)._id;
      }
      formData.append('idTema', idTema);
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      } else if (this.modoEdicion && this.fotoUriOriginal !== null) {
        formData.append('fotoUri', this.fotoUriOriginal);
      }
      if (this.modoEdicion && this.preguntaId) {
        formData.append('_id', this.preguntaId);
      }
      this.dialogRef.close({
        formData,
        modoEdicion: this.modoEdicion,
        id: this.preguntaId,
      });
    }
  }
}
