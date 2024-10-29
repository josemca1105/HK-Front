import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.api.baseUrl}`;

  constructor(
    private axiosService: AxiosService,
    private cookieService: CookieService
  ) {}

  // Method to login
  async login(credentials: { email: string; password: string }): Promise<any> {
    const response = await this.axiosService.post(
      `${this.apiUrl}/login`,
      credentials
    );
    // No necesitamos establecer manualmente la cookie, el backend lo hace
    return response;
  }

  // Method to get authenticated user data
  async getUser(): Promise<any> {
    return this.axiosService.get(`${this.apiUrl}/auth`);
  }

  // Method to logout
  async logout(): Promise<any> {
    const response = await this.axiosService.post(`${this.apiUrl}/logout`, {});
    this.cookieService.delete('jwt', '/');
    return response;
  }

  // Method to request password reset
  async requestPasswordReset(email: string): Promise<any> {
    return this.axiosService.post(`${this.apiUrl}/request-reset-email`, {
      email,
    });
  }

  // Method to check password reset token
  async checkPasswordResetToken(uidb64: string, token: string): Promise<any> {
    return this.axiosService.get(
      `${this.apiUrl}/password-reset/${uidb64}/${token}`
    );
  }

  // Method to set new password
  async setNewPassword(
    uidb64: string,
    token: string,
    password: string
  ): Promise<any> {
    const resetData = {
      uidb64: uidb64,
      token: token,
      password: password,
    };

    return this.axiosService.patch(
      `${this.apiUrl}/password-reset-complete`,
      resetData
    );
  }

  // Metodo para verificar si el usuario esta autenticado
  isAuthenticated(): Promise<boolean> {
    // No podemos leer directamente la cookie HttpOnly, así que hacemos una petición al backend
    return this.axiosService
      .get(`${this.apiUrl}/auth`)
      .then(() => true)
      .catch(() => false);
  }
}
