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
    codigo: '',
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
      codigo,
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
      !codigo ||
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

    if (this.selectedFiles) {
      this.captacionesService
        .uploadImages(this.captacion.codigo, this.selectedFiles)
        .then((urls: string[]) => {
          // Asignar las URLs de las imágenes a la captación
          this.captacion.imagenes = urls;
          console.log('Imágenes subidas:', urls);
          this.createCaptacion();
        })
        .catch((error) => {
          console.error('Error al subir imágenes', error);
        });
    } else {
      console.error('Por favor selecciona al menos una imagen.');
    }
  }

  createCaptacion(): void {
    this.captacionesService.createCaptacion(this.captacion).subscribe({
      next: (response) => {
        console.log('Captacion creada', response);
        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        console.error('Error al crear la captacion', error);
      },
    });
  }
}
