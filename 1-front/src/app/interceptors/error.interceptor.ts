import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; // o cualquier notificación que uses

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let mensaje = 'Error inesperado';

        if (error.error?.message) {
          mensaje = error.error.message;
        } else if (error.status === 0) {
          mensaje = 'No se pudo conectar con el servidor';
        }

        this.snackBar.open(mensaje, 'Cerrar', { duration: 6000 });
        return throwError(() => error); // Propaga el error si otro lo necesita
      })
    );
  }
}
