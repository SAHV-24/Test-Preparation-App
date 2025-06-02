import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-respuesta-modal',
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
  templateUrl: './respuesta-modal.component.html',
  styleUrl: './respuesta-modal.component.scss',
})
export class RespuestaModalComponent {
  form: FormGroup;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RespuestaModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { idPregunta: string; respuesta?: any }
  ) {
    this.form = this.fb.group({
      textoRespuesta: ['', [Validators.required, Validators.maxLength(200)]],
      esLaCorrecta: [false, Validators.required],
      foto: [null],
    });
    if (data.respuesta) {
      this.form.patchValue({
        textoRespuesta: data.respuesta.textoRespuesta,
        esLaCorrecta: data.respuesta.esLaCorrecta,
      });
      if (data.respuesta.fotoUri) {
        this.imagePreview = data.respuesta.fotoUri;
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
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const formData = new FormData();
      formData.append('textoRespuesta', formValue.textoRespuesta);
      formData.append('esLaCorrecta', formValue.esLaCorrecta);
      // Asegura que idPregunta sea string
      let idPregunta = this.data.idPregunta;
      formData.append('idPregunta', idPregunta);
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }
      this.dialogRef.close(formData);
    }
  }
}
