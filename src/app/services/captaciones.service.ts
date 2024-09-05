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
}
