import { Component, OnInit } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-captaciones-personal-edit',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './captaciones-personal-edit.component.html',
  styleUrl: './captaciones-personal-edit.component.scss',
})
export class CaptacionesPersonalEditComponent implements OnInit {
  captacion: any = {
    codigo: '',
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
          // Aquí accedemos a response.data para obtener el objeto del usuario
          console.log('Captacion', response.data);
          this.captacion = response.data;
        },
        error: (error) => {
          console.error('Error', error);
        },
      });
    }
  }

  // Método para manejar la selección de imágenes
  onImagesSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(): void {
    if (this.captacionId !== null) {
      // Si se seleccionan nuevas imágenes, eliminar las anteriores y luego subir las nuevas
      if (this.selectedFiles) {
        // Primero eliminamos las imágenes antiguas
        if (this.captacion.imagenes && this.captacion.imagenes.length > 0) {
          this.captacionesService
            .deleteImages(this.captacion.imagenes)
            .then(() => {
              console.log('Imágenes anteriores eliminadas');
              // Subir las nuevas imágenes después de eliminar las anteriores
              return this.selectedFiles
                ? this.captacionesService.uploadImages(
                    this.captacion.codigo,
                    this.selectedFiles
                  )
                : Promise.reject('No files selected');
            })
            .then((imageUrls) => {
              // Actualizar las URLs de las nuevas imágenes en la captación
              this.captacion.imagenes = imageUrls;
              this.updateCaptacion(); // Actualizamos la captación con las nuevas imágenes
            })
            .catch((error) => {
              console.error('Error al eliminar/subir imágenes', error);
            });
        } else {
          // Si no hay imágenes anteriores, simplemente subimos las nuevas
          this.captacionesService
            .uploadImages(this.captacion.codigo, this.selectedFiles)
            .then((imageUrls) => {
              this.captacion.imagenes = imageUrls;
              this.updateCaptacion();
            })
            .catch((error) => {
              console.error('Error al subir imágenes', error);
            });
        }
      } else {
        // Si no se han seleccionado imágenes nuevas, simplemente actualizar la captación
        this.updateCaptacion();
      }
    }
  }

  updateCaptacion(): void {
    this.captacionesService
      .updateCaptacion(this.captacion, this.captacionId!)
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
