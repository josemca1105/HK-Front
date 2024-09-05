import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaptacionesService {
  private apiUrl = 'http://localhost:8000/api/inmuebles';

  constructor(private http: HttpClient) { }

  // Obtener todas las captaciones
  getCaptaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }

  // Obtener una captacion
  getCaptacion(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Crear una captacion
  createCaptacion(captacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}-create`, captacion, { withCredentials: true });
  }

  // Actualizar una captacion
  updateCaptacion(captacion: any, id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}-update/${id}`, captacion, { withCredentials: true });
  }

  // Eliminar una captacion
  deleteCaptacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}-delete/${id}`, { withCredentials: true });
  }
}
