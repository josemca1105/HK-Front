import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private axiosService: AxiosService) { }

  // Method to register a new user
  async register(userData: any): Promise<any> {
    return this.axiosService.post(`${this.apiUrl}/register`, userData);
  }

  // Method to login
  async login(credentials: { email: string, password: string }): Promise<any> {
    return this.axiosService.post(`${this.apiUrl}/login`, credentials);
  }

  // Method to get authenticated user data
  async getUser(): Promise<any> {
    return this.axiosService.get(`${this.apiUrl}/auth`);
  }

  // Method to logout
  async logout(): Promise<any> {
    return this.axiosService.post(`${this.apiUrl}/logout`, {});
  }

  // Method to request password reset
  async requestPasswordReset(email: string): Promise<any> {
    return this.axiosService.post(`${this.apiUrl}/request-reset-email`, { email });
  }

  // Method to check password reset token
  async checkPasswordResetToken(uidb64: string, token: string): Promise<any> {
    return this.axiosService.get(`${this.apiUrl}/password-reset/${uidb64}/${token}`);
  }

  // Method to set new password
  async setNewPassword(password: string, uidb64: string, token: string): Promise<any> {
    return this.axiosService.patch(`${this.apiUrl}/password-reset-complete`, {
      password,
      uidb64,
      token
    });
  }
}
