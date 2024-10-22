import { Component, OnInit } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface Captacion {
  id: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  estado: string;
  ciudad: string;
  precio: string;
  n_banos: string;
  n_habitaciones: string;
  tipo: string;
  disponibilidad: string;
  status: string;
  imagenes: string[];
}

@Component({
  selector: 'app-captaciones-personal-edit',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './captaciones-personal-edit.component.html',
  styleUrl: './captaciones-personal-edit.component.scss',
})
export class CaptacionesPersonalEditComponent implements OnInit {
  captacion: Captacion = {
    id: 0,
    titulo: '',
    descripcion: '',
    direccion: '',
    estado: '',
    ciudad: '',
    precio: '',
    n_banos: '',
    n_habitaciones: '',
    tipo: '',
    disponibilidad: '',
    status: '',
    imagenes: [],
  };

  captacionId: number | null = null;
  captacionCodigo: string | null = null;
  selectedFiles: FileList | null = null;

  constructor(
    private captacionesService: CaptacionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.captacionId = +id;
        this.loadCaptacion();
      }
    });
  }

  loadCaptacion(): void {
    if (this.captacionId !== null) {
      this.captacionesService.getCaptacion(this.captacionId).subscribe({
        next: (response) => {
          console.log('Captacion', response.data);
          this.captacion = response.data;
          // Extraer el código de la primera imagen URL
          if (this.captacion.imagenes && this.captacion.imagenes.length > 0) {
            const match = this.captacion.imagenes[0].match(/HK-(\d+)/);
            if (match && match[1]) {
              this.captacionCodigo = match[1];
            } else {
              console.error(
                'No se pudo extraer el código de la URL de la imagen'
              );
            }
          } else {
            console.error('La captación no tiene imágenes');
          }
        },
        error: (error) => {
          console.error('Error', error);
        },
      });
    }
  }

  onImagesSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(): void {
    if (this.captacionId !== null) {
      if (this.selectedFiles) {
        if (this.captacion.imagenes && this.captacion.imagenes.length > 0) {
          this.captacionesService
            .deleteImages(this.captacion.imagenes)
            .then(() => {
              console.log('Imágenes anteriores eliminadas');
              return this.uploadNewImages();
            })
            .then(() => {
              this.updateCaptacion();
            })
            .catch((error) => {
              console.error('Error al eliminar/subir imágenes', error);
            });
        } else {
          this.uploadNewImages()
            .then(() => {
              this.updateCaptacion();
            })
            .catch((error) => {
              console.error('Error al subir imágenes', error);
            });
        }
      } else {
        this.updateCaptacion();
      }
    }
  }

  private uploadNewImages(): Promise<void> {
    if (this.captacionId === null || this.selectedFiles === null) {
      return Promise.reject(
        'No se puede subir imágenes sin ID o archivos seleccionados'
      );
    }
    if (!this.captacionCodigo) {
      // Si no hay código, genera uno nuevo
      this.captacionCodigo = this.generateUniqueCode();
    }
    return this.captacionesService
      .uploadImages(this.captacionCodigo, this.selectedFiles)
      .then((imageUrls) => {
        this.captacion.imagenes = imageUrls;
      });
  }

  private generateUniqueCode(): string {
    return Date.now().toString();
  }

  updateCaptacion(): void {
    if (this.captacionId === null) {
      console.error('No se puede actualizar la captación sin ID');
      return;
    }
    this.captacionesService
      .updateCaptacion(this.captacion, this.captacionId)
      .subscribe({
        next: (response) => {
          console.log('Captacion updated', response);
          this.router.navigate(['/perfil']);
        },
        error: (error) => {
          console.error('Error updating captacion', error);
        },
      });
  }
}
