import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CaptacionesService {
  private apiUrl = 'http://localhost:8000/api/inmuebles';

  constructor(private http: HttpClient, private storage: Storage) {}

  // Obtener todas las captaciones
  getCaptaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }

  // Obtener una captacion
  getCaptacion(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // Obtener las captaciones de un usuario
  getCaptacionesByUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}-personales`, {
      withCredentials: true,
    });
  }

  // Crear una captacion
  createCaptacion(captacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}-create`, captacion, {
      withCredentials: true,
    });
  }

  // Actualizar una captacion
  updateCaptacion(captacion: any, id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}-update/${id}`, captacion, {
      withCredentials: true,
    });
  }

  // Eliminar una captacion
  deleteCaptacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}-delete/${id}`, {
      withCredentials: true,
    });
  }

  // Subir imágenes a Firebase Storage
  uploadImages(codigo: string, files: FileList): Promise<string[]> {
    if (!codigo) {
      return Promise.reject('El código es obligatorio');
    }

    const uploadPromises: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imgRef = ref(this.storage, `Imagenes/HK${codigo}/${file.name}`);

      const uploadPromise = uploadBytes(imgRef, file)
        .then(() => getDownloadURL(imgRef)) // Obtener la URL después de subir la imagen
        .catch((error) => {
          console.error('Error subiendo imagen:', error);
          throw error;
        });

      uploadPromises.push(uploadPromise);
    }

    return Promise.all(uploadPromises); // Devolver todas las URLs
  }
}
