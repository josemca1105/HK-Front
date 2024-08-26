import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AxiosService } from './axios.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private axiosService: AxiosService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  async register(f_name: string, email: string, password: string) {
    const registerData = {
      f_name: f_name,
      email: email,
      password: password
    };
    const response = await this.axiosService.post('register', registerData);

    const accessToken = response.data.token;

    if (accessToken) {
      this.storeAccessToken(accessToken);
      this.router.navigate(['/login']);
    }

    return response.data;
  }

  async login(email: string, password: string) {
    const loginData = {
      email: email,
      password: password
    };
    console.log(loginData);

    const response = await this.axiosService.post('login', loginData);

    const accessToken = response.data.jwt;

    if (accessToken) {
      this.storeAccessToken(accessToken);
      this.router.navigate(['/']);
    }

    return response.data;
  }

  async getUser() {
    const response = await this.axiosService.get('auth');
    console.log(response.data);
    return response.data;
  }

  async logout() {
    const response = await this.axiosService.post('logout', {});
    this.cookieService.delete('accessToken');
    this.router.navigate(['/login']);
    return response.data;

  }

  private storeAccessToken(token: string): void {
    this.cookieService.set('accessToken', token, undefined, '/');
  }

  private getAccessToken(): string | null {
    return this.cookieService.get('accessToken');
  }

  public getToken(): string | null {
    return this.getAccessToken();
  }

  isUserLoggedIn(): boolean {
    const accessToken = this.getAccessToken();
    console.log(!!accessToken);
    return !!accessToken;
  }
}
