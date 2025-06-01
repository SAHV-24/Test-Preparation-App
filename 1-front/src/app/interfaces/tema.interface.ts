export interface Tema {
  _id?: string;
  idUsuario: string | Usuario;
  estado: 'Activo' | 'Inactivo';
  periodo: 1 | 2 | 3;
  nombre: string;
  descripcion?: string;
  fotoFormulasUrl?: string;
  linkPresentacionUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
import { Usuario } from './usuario.interface';
