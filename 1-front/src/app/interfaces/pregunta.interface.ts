import { Tema } from './tema.interface';
import { Usuario } from './usuario.interface';

export type TipoPregunta = 'MultipleChoice' | 'TrueFalse';
export type Dificultad = 'baja' | 'media' | 'alta';

export interface Pregunta {
  _id?: string;
  idTema: string | Tema;
  idUsuario: string | Usuario;
  estado: 'Activo' | 'Inactivo';
  enunciado: string;
  fotoUri?: string;
  tipoPregunta: TipoPregunta;
  dificultad: Dificultad;
  createdAt?: string;
  updatedAt?: string;
}
