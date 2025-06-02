import { Injectable } from '@angular/core';
import { TemaService } from './tema.service';
import { PreguntaService } from './pregunta.service';
import { RespuestaService } from './respuesta.service';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface CacheDatos {
  temas: any[];
  preguntas: any[];
  respuestas: any[];
  extraidoEl: string; // ISO date string
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly CACHE_KEY = 'cacheDatos';
  private readonly DIAS_VALIDOS = 2;

  // Token público generado para rutas públicas
  private readonly PUBLIC_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.cHVibGljLWFjY2Vzcw.FUvv4q_XFI_ETQMck4BoAsOi56USef2yMxpB6RYJprI';

  constructor(
    private temaService: TemaService,
    private preguntaService: PreguntaService,
    private respuestaService: RespuestaService
  ) {}

  private isCacheValid(): boolean {
    const cache = this.getCache();
    if (!cache) return false;
    const fecha = new Date(cache.extraidoEl);
    const ahora = new Date();
    const diffEnDias = (ahora.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24);
    return diffEnDias < this.DIAS_VALIDOS;
  }

  private getCache(): CacheDatos | null {
    const data = localStorage.getItem(this.CACHE_KEY);
    return data ? JSON.parse(data) : null;
  }

  getDatos(): Observable<CacheDatos> {
    if (this.isCacheValid()) {
      return of(this.getCache()!);
    }
    return this.actualizarCache();
  }

  actualizarCache(): Observable<CacheDatos> {
    return forkJoin({
      temas: this.temaService.getAllPublic(),
      preguntas: this.preguntaService.getAllPublic(),
      respuestas: this.respuestaService.getAllPublic()
    }).pipe(
      tap(result => {
        const cache: CacheDatos = {
          temas: result.temas,
          preguntas: result.preguntas,
          respuestas: result.respuestas,
          extraidoEl: new Date().toISOString()
        };
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
      }),
      map(result => ({
        temas: result.temas,
        preguntas: result.preguntas,
        respuestas: result.respuestas,
        extraidoEl: new Date().toISOString()
      })),
      catchError(() => {
        // Si alguna llamada falla, no actualiza nada
        return of(this.getCache()!);
      })
    );
  }

  getPublicToken(): string {
    return this.PUBLIC_TOKEN;
  }
}
