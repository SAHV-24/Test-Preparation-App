import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    // Solo agrega el header si la petición es al backend (no a assets, etc.)
    const isApiUrl = req.url.startsWith(environment.API_URL);


    if (token && isApiUrl) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
