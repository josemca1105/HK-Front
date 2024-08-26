import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private httpClient: AxiosInstance;

  constructor(cookieService: CookieService) {
    this.httpClient = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    this.httpClient.interceptors.request.use(function (config) {
      const token = cookieService.get('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  get(url: string) {
    return this.httpClient.get(url);
  }

  post(url: string, data: any) {
    return this.httpClient.post(url, data);
  }

  patch(url: string, data: any) {
    return this.httpClient.patch(url, data);
  }

  delete(url: string) {
    return this.httpClient.delete(url)
  }
}
