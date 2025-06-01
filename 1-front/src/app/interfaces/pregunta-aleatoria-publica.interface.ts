import { Pregunta } from './pregunta.interface';
import { Respuesta } from './respuesta.interface';
import { Usuario } from './usuario.interface';

export interface PreguntaAleatoriaPublica extends Omit<Pregunta, 'idUsuario'> {
  idUsuario: Pick<Usuario, '_id' | 'nombreUsuario' | 'nombreCompleto'>;
  respuestas: (Omit<Respuesta, 'idUsuario'> & { idUsuario: Pick<Usuario, '_id' | 'nombreUsuario'> })[];
}
