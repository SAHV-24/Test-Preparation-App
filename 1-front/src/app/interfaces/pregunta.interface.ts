import { Tema } from './tema.interface';
import { Usuario } from './usuario.interface';

export type TipoPregunta = 'MultipleChoice' | 'TrueFalse';
export type Dificultad = 'baja' | 'media' | 'alta';

export interface Pregunta {
  _id?: string;
  createdAt?: string;
  enunciado: string;
  estado: 'Activo' | 'Inactivo';
  fotoUri?: string;
  idTema: string | Tema;
  idUsuario: string | Usuario;
  updatedAt?: string;
}
