import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(private cookieService: CookieService) {
    this.axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/', // Replace with your API base URL
      withCredentials: true, // This is important for cookie authentication
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Agregar interceptor para incluir el token JWT en las solicitudes
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // No necesitamos establecer manualmente el token en el encabezado
        // ya que estamos usando cookies HttpOnly
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
          console.log('Unauthorized access. Redirecting to login...');
          // Implement your logout or redirect logic here
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // POST request
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // PATCH request
  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Error handling method
  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      // You can add more specific error handling here
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
