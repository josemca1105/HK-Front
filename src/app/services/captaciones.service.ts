import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from '@angular/fire/storage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaptacionesService {
  private apiUrl = `${environment.api.baseUrl}/inmuebles`;

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
    const uploadPromises: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Generar la ruta en el formato Imagenes/HK/{codigo}/{nombre de la imagen}
      const imgRef = ref(this.storage, `Imagenes/HK-${codigo}/${file.name}`); // Aquí añadimos solo un "HK-"

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

  // Obtener la primera imagen de una captación en Firebase Storage usando el ID
  async getFirstImage(id: number): Promise<string | null> {
    // Supongamos que la ruta de almacenamiento sigue un patrón relacionado con el ID
    const folderRef = ref(this.storage, `Imagenes/HK-${id}/`); // Asegúrate de que esta ruta sea correcta

    try {
      const result = await listAll(folderRef);
      console.log('Resultados de listAll:', result); // Debugging

      if (result.items.length > 0) {
        const firstImageRef = result.items[0];
        const imageUrl = await getDownloadURL(firstImageRef);
        console.log('URL de la primera imagen:', imageUrl); // Debugging
        return imageUrl;
      } else {
        console.log('No hay imágenes disponibles en esta carpeta'); // Debugging
        return null;
      }
    } catch (error) {
      console.error('Error fetching images from folder:', error);
      return null; // Manejar el error devolviendo null
    }
  }

  // Metodo para eliminar una imagen de Firebase Storage
  deleteImages(imageUrls: string[]): Promise<void[]> {
    const deletePromises: Promise<void>[] = imageUrls.map((url) => {
      const imgRef = ref(this.storage, url);
      return deleteObject(imgRef)
        .then(() => console.log(`Imagen eliminada: ${url}`))
        .catch((error) => {
          console.error('Error eliminando imagen:', error);
          throw error;
        });
    });

    return Promise.all(deletePromises); // Devolver una promesa cuando todas las imágenes sean eliminadas
  }
}
