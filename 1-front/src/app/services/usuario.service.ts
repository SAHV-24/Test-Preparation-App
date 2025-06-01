import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({ providedIn: 'root' })
export class UsuarioService extends CRUDService<Usuario> {
  protected baseUrl = '/api/usuarios';
  constructor(protected override http: HttpClient) {
    super(http);
  }
}
