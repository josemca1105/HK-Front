import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(private cookieService: CookieService) {
    this.axiosInstance = axios.create({
      baseURL: `${environment.api.baseUrl}`,
      withCredentials: true,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access. Redirecting to login...');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // POST request
  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // PATCH request
  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config
      );
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
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
