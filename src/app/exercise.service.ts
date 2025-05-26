import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tema } from '../types/tema';
import { Ejercicio } from '../types/ejercicio';
import { TEMAS } from '../types/temas';
import { EJERCICIOS } from '../types/ejercicios';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private temaSeleccionado$ = new BehaviorSubject<Tema | null>(null);
  private ejercicios: Ejercicio[] = [];
  private ejercicioActual$ = new BehaviorSubject<Ejercicio | null>(null);
  private completados: Set<string> = new Set();

  constructor() {
    this.cargarCompletados();
    this.setEjercicios(EJERCICIOS);
  }

  getTemaSeleccionado() {
    return this.temaSeleccionado$.asObservable();
  }

  seleccionarTema(tema: Tema) {
    this.temaSeleccionado$.next(tema);
    this.buscarEjercicioAleatorio();
  }

  setEjercicios(ejercicios: Ejercicio[]) {
    this.ejercicios = ejercicios;
  }

  getEjercicioActual() {
    return this.ejercicioActual$.asObservable();
  }
  buscarEjercicioAleatorio() {
    const tema = this.temaSeleccionado$.value;
    if (!tema) return;
    
    const disponibles = this.ejercicios.filter(
      (e) => e.temaId === tema.id && !this.completados.has(e.id)
    );
    
    if (disponibles.length === 0) {
      this.ejercicioActual$.next(null);
      return;
    }
    
    const random = disponibles[Math.floor(Math.random() * disponibles.length)];
    this.ejercicioActual$.next(random);
  }

  marcarCompletado(ejercicioId: string) {
    this.completados.add(ejercicioId);
    this.guardarCompletados();
    this.buscarEjercicioAleatorio();
  }
  mostrarRespuesta() {
    // La UI debe mostrar la respuesta del ejercicio actual
    // Aquí solo se expone el ejercicio actual
    return this.ejercicioActual$.value?.respuesta;
  }

  getProgresoPorTema(temaId: string) {
    const ejerciciosDelTema = this.ejercicios.filter(e => e.temaId === temaId);
    const completadosDelTema = ejerciciosDelTema.filter(e => this.completados.has(e.id));
    return {
      total: ejerciciosDelTema.length,
      completados: completadosDelTema.length,
      porcentaje: ejerciciosDelTema.length > 0 ? Math.round((completadosDelTema.length / ejerciciosDelTema.length) * 100) : 0
    };
  }

  reiniciarProgreso() {
    this.completados.clear();
    localStorage.removeItem('ejerciciosCompletados');
    this.buscarEjercicioAleatorio();
  }

  private cargarCompletados() {
    const data = localStorage.getItem('ejerciciosCompletados');
    if (data) {
      this.completados = new Set(JSON.parse(data));
    }
  }

  private guardarCompletados() {
    localStorage.setItem(
      'ejerciciosCompletados',
      JSON.stringify(Array.from(this.completados))
    );
  }
}
