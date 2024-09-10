import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }

  // Obtener un usuario
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Crear un usuario
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}-create`, data, { withCredentials: true });
  }

  // Actualizar un usuario
  updateUser(data: any, id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}-update/${id}`, data, { withCredentials: true });
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}-delete/${id}`, { withCredentials: true });
  }
}
