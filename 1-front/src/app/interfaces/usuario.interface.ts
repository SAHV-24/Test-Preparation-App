export interface Usuario {
  _id?: string;
  nombreUsuario: string;
  contrasena?: string; // Solo para creación
  nombreCompleto: string;
  expira: string; // ISO date
  rol: 'Admin' | 'Colaborador';
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}
