import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tema } from '../../../interfaces/tema.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tema-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './tema-modal.component.html',
  styleUrls: ['./tema-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemaModalComponent implements OnInit {
  form!: FormGroup;
  originalTema!: Tema;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TemaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tema: Tema }
  ) {}

  ngOnInit(): void {
    this.originalTema = { ...this.data.tema };
    this.form = this.fb.group({
      nombre: [this.data.tema.nombre, [Validators.required, Validators.maxLength(100)]],
      descripcion: [this.data.tema.descripcion],
      estado: [this.data.tema.estado, Validators.required],
      periodo: [this.data.tema.periodo, Validators.required],
      fotoFormulasUrl: [
        { value: this.data.tema.fotoFormulasUrl, disabled: !!this.selectedFile },
      ],
      linkPresentacionUrl: [this.data.tema.linkPresentacionUrl]
    });
    this.imagePreview = this.data.tema.fotoFormulasUrl || null;
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
      // Deshabilita el campo de URL si se sube una imagen
      this.form.get('fotoFormulasUrl')?.disable({ emitEvent: false });
      this.form.get('fotoFormulasUrl')?.setValue('');
    }
  }

  onUrlInput(): void {
    // Si el usuario escribe un URL, quitamos el archivo seleccionado
    this.selectedFile = null;
    this.imagePreview = this.form.get('fotoFormulasUrl')?.value || null;
    // Habilita el campo de URL si no hay archivo
    this.form.get('fotoFormulasUrl')?.enable({ emitEvent: false });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.form.valid) {
      const cambios = this.form.dirty || this.selectedFile;
      if (cambios) {
        if (confirm('¿Está seguro de guardar los cambios realizados en el tema?')) {
          if (this.selectedFile) {
            const formData = new FormData();
            formData.append('nombre', this.form.get('nombre')?.value ?? '');
            formData.append('descripcion', this.form.get('descripcion')?.value ?? '');
            formData.append('estado', this.form.get('estado')?.value ?? '');
            formData.append('periodo', String(this.form.get('periodo')?.value ?? ''));
            formData.append('linkPresentacionUrl', this.form.get('linkPresentacionUrl')?.value ?? '');
            formData.append('fotoFormulasUrl', this.selectedFile);
            // No enviar fotoFormulasUrl si hay archivo
            this.dialogRef.close(formData);
          } else {
            // Si hay URL, asegúrate de enviar string (no null/undefined)
            const value = { ...this.form.value };
            value.fotoFormulasUrl = value.fotoFormulasUrl ?? '';
            this.dialogRef.close(value);
          }
        }
      } else {
        this.dialogRef.close();
      }
    }
  }
}
