import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatToolbarModule,    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './usuarios-page.component.html',
  styleUrl: './usuarios-page.component.scss'
})
export class UsuariosPageComponent implements OnInit {
  usuarios: Usuario[] = [];  displayedColumns: string[] = ['nombreCompleto', 'nombreUsuario', 'rol', 'expira', 'activo', 'acciones'];
  isLoading = false;
  showForm = false;
  editingUser: Usuario | null = null;
  hidePassword = true;
  
  userForm: FormGroup;
  roles = ['Admin', 'Colaborador'];

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {    this.userForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      nombreCompleto: ['', [Validators.required]],
      rol: ['Colaborador', [Validators.required]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.isLoading = true;
    this.usuarioService.getAll().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('Error al cargar usuarios', 'error');
        this.isLoading = false;
      }
    });
  }

  openForm(user?: Usuario): void {
    this.editingUser = user || null;
    this.showForm = true;
      if (user) {
      this.userForm.patchValue({
        nombreUsuario: user.nombreUsuario,
        nombreCompleto: user.nombreCompleto,
        rol: user.rol,
        activo: user.activo
      });
      // Remover validación de contraseña para edición
      this.userForm.get('contrasena')?.clearValidators();
    } else {
      this.userForm.reset();
      this.userForm.patchValue({ rol: 'Colaborador', activo: true });
      // Agregar validación de contraseña para creación
      this.userForm.get('contrasena')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
    this.userForm.get('contrasena')?.updateValueAndValidity();
  }

  closeForm(): void {
    this.showForm = false;
    this.editingUser = null;
    this.userForm.reset();
  }

  saveUser(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const userData = { ...this.userForm.value };
      
      // Si es edición y no se cambió la contraseña, no incluirla
      if (this.editingUser && !userData.contrasena) {
        delete userData.contrasena;
      }

      const operation = this.editingUser 
        ? this.usuarioService.update(this.editingUser._id!, userData)
        : this.usuarioService.create(userData);

      operation.subscribe({
        next: () => {
          this.showMessage(
            this.editingUser ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente',
            'success'
          );
          this.loadUsuarios();
          this.closeForm();
          this.isLoading = false;
        },
        error: (error) => {
          this.showMessage('Error al guardar usuario', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  deleteUser(user: Usuario): void {
    if (confirm(`¿Está seguro de eliminar al usuario ${user.nombreCompleto}?`)) {
      this.isLoading = true;
      this.usuarioService.delete(user._id!).subscribe({
        next: () => {
          this.showMessage('Usuario eliminado exitosamente', 'success');
          this.loadUsuarios();
          this.isLoading = false;
        },
        error: (error) => {
          this.showMessage('Error al eliminar usuario', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  toggleUserStatus(user: Usuario): void {
    const updatedUser = { ...user, activo: !user.activo };
    this.usuarioService.update(user._id!, updatedUser).subscribe({
      next: () => {
        this.showMessage(
          `Usuario ${updatedUser.activo ? 'activado' : 'desactivado'} exitosamente`,
          'success'
        );
        this.loadUsuarios();
      },
      error: (error) => {
        this.showMessage('Error al cambiar estado del usuario', 'error');
      }
    });
  }
  isExpired(expira: string): boolean {
    return new Date(expira) < new Date();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }
}
