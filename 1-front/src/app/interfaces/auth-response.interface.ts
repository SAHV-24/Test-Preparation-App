import { UsuarioAuth } from './usuario-auth.interface';

export interface AuthResponse {
  token: string;
  usuario: UsuarioAuth;
}
