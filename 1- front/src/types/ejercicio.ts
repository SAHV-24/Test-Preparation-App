export interface Ejercicio {
  id: string;
  temaId: string;
  pregunta: string;
  respuesta: string;
  fotoUrl?: string; // URL opcional para mostrar imagen en el ejercicio
}
