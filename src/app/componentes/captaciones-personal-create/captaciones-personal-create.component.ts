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
    // Generar un código aleatorio para el grupo de imagenes
    this.captacion.codigo = this.generateUniqueCode();

    this.captacionesService.createCaptacion(this.captacion).subscribe({
      next: (response) => {
        console.log('Captación creada', response);
        // Ahora subimos las imágenes si se seleccionaron
        if (this.selectedFiles) {
          this.uploadImages(this.captacion.codigo);
        } else {
          console.error('Por favor selecciona al menos una imagen.');
          this.router.navigate(['/perfil']);
        }
      },
      error: (error) => {
        console.error('Error al crear la captación', error);
      },
    });
  }

  // Metodo para generar un código aleatorio
  generateUniqueCode(): string {
    const date = new Date();
    return `${date.getTime()}`;
  }

  // Metodo para subir imagenes
  uploadImages(codigo: string): void {
    this.captacionesService
      .uploadImages(codigo, this.selectedFiles as FileList)
      .then((urls: string[]) => {
        // Actualizar las imágenes de la captación creada
        this.captacion.imagenes = urls;
        console.log('Imágenes subidas:', urls);
        this.router.navigate(['/perfil']);
      })
      .catch((error) => {
        console.error('Error al subir imágenes', error);
      });
  }
}
