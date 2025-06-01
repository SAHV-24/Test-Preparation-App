import { Pregunta } from './pregunta.interface';
import { Usuario } from './usuario.interface';

export interface Respuesta {
  _id?: string;
  idPregunta: string | Pregunta;
  idUsuario: string | Usuario;
  textoRespuesta: string;
  fotoUrl?: string;
  esLaCorrecta: boolean;
  createdAt?: string;
  updatedAt?: string;
}
