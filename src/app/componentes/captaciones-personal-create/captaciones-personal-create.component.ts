import { Component } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-captaciones-personal-create',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './captaciones-personal-create.component.html',
  styleUrl: './captaciones-personal-create.component.scss',
})
export class CaptacionesPersonalCreateComponent {
  captacion: any = {
    asesor: {},
    titulo: '',
    descripcion: '',
    direccion: '',
    estado: '',
    ciudad: '',
    precio: '',
    tipo: '',
    n_banos: '',
    n_habitaciones: '',
    disponibilidad: 'disponible',
    status: 'activo',
    imagenes: [],
    codigo: '',
  };

  selectedFiles: FileList | null = null;

  constructor(
    private captacionesService: CaptacionesService,
    private router: Router
  ) {}

  // Manejar la selección de archivos
  onFilesSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // Validar que los campos obligatorios no estén vacíos
  isFormValid(): boolean {
    const {
      titulo,
      descripcion,
      direccion,
      estado,
      ciudad,
      precio,
      tipo,
      n_banos,
      n_habitaciones,
    } = this.captacion;
    if (
      !titulo ||
      !descripcion ||
      !direccion ||
      !estado ||
      !ciudad ||
      !precio ||
      !tipo ||
      !n_banos ||
      !n_habitaciones
    ) {
      console.error('Error: Todos los campos son obligatorios');
      return false;
    }
    return true;
  }

  onSubmit(): void {
    // Validar el formulario antes de subir imágenes o crear la captación
    if (!this.isFormValid()) {
      return; // Si la validación falla, no continuamos
    }

    this.createCaptacion();
  }

  createCaptacion(): void {
    // Generar un código aleatorio para el grupo de imágenes
    this.captacion.codigo = this.generateUniqueCode(); // Aquí generamos el código

    // Primero sube las imágenes y espera a que se completen
    if (this.selectedFiles) {
      this.uploadImages(this.captacion.codigo) // Asegúrate de que el código se pase correctamente
        .then((urls: string[]) => {
          // Actualiza las imágenes de la captación con las URLs obtenidas
          this.captacion.imagenes = urls;

          // Ahora crea la captación con las imágenes
          return this.captacionesService.createCaptacion(this.captacion);
        })
        .then((response: any) => {
          console.log('Captación creada', response);
          this.router.navigate(['/perfil']);
        })
        .catch((error: any) => {
          console.error('Error al crear la captación', error);
        });
    } else {
      console.error('Por favor selecciona al menos una imagen.');
    }
  }

  // Metodo para generar un código aleatorio
  generateUniqueCode(): string {
    const date = new Date();
    return `${date.getTime()}`;
  }

  // Metodo para subir imagenes
  uploadImages(codigo: string): Promise<string[]> {
    return this.captacionesService.uploadImages(
      codigo,
      this.selectedFiles as FileList
    );
  }
}
