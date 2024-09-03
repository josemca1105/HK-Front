import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  // Métodos para la autenticación de usuarios

  // Método para registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Método para iniciar sesión
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  // Método para obtener los datos del usuario autenticado
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth`, { withCredentials: true });
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  // Método para solicitar el restablecimiento de la contraseña
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-reset-email`, { email });
  }

  // Método para verificar el token de restablecimiento de contraseña
  checkPasswordResetToken(uidb64: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/password-reset/${uidb64}/${token}`);
  }

  // Método para establecer una nueva contraseña
  setNewPassword(password: string, uidb64: string, token: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/password-reset-complete`, {
      password,
      uidb64,
      token
    });
  }
}
