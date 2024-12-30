import { Component } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

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
    pozo: false,
    planta: false,
    documentos: false,
    observaciones: 'Sin observaciones',
    imagenes: [],
    codigo: '',
  };

  public isLoading: boolean = false;

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
  // isFormValid(): boolean {
  //   const {
  //     titulo,
  //     descripcion,
  //     direccion,
  //     estado,
  //     ciudad,
  //     precio,
  //     tipo,
  //     n_banos,
  //     n_habitaciones,
  //   } = this.captacion;
  //   if (
  //     !titulo ||
  //     !descripcion ||
  //     !direccion ||
  //     !estado ||
  //     !ciudad ||
  //     !precio ||
  //     !tipo ||
  //     !n_banos ||
  //     !n_habitaciones
  //   ) {
  //     console.error('Error: Todos los campos son obligatorios');
  //     return false;
  //   }
  //   return true;
  // }

  onSubmit(): void {
    // Validar el formulario antes de subir imágenes o crear la captación
    if (!this.isFormValid()) {
      return; // Si la validación falla, no continuamos
    }

    this.createCaptacion();
  }

  async createCaptacion(): Promise<void> {
    try {
      // Validar el formulario antes de continuar
      if (!this.isFormValid()) {
        console.error('El formulario no es válido');
        return;
      }

      // Generar un código aleatorio para el grupo de imágenes
      this.captacion.codigo = this.generateUniqueCode();

      // Verificar si se han seleccionado archivos
      if (!this.selectedFiles || this.selectedFiles.length === 0) {
        throw new Error('Por favor selecciona al menos una imagen.');
      }

      // Subir imágenes
      const urls = await this.uploadImages(this.captacion.codigo);
      this.captacion.imagenes = urls;

      // Crear la captación con las imágenes
      const response = await firstValueFrom(
        this.captacionesService.createCaptacion(this.captacion)
      );

      console.log('Captación creada', response);
      this.router.navigate(['/perfil']);
    } catch (error) {
      console.error('Error al crear la captación', error);
      this.isLoading = false;
      // Aquí puedes agregar un manejo de errores más detallado, como mostrar un mensaje al usuario
      // this.showErrorMessage(error.message);
    }
    this.isLoading = true;
  }

  // Método auxiliar para validar el formulario
  private isFormValid(): boolean {
    const requiredFields = [
      'titulo',
      'descripcion',
      'direccion',
      'estado',
      'ciudad',
      'precio',
      'tipo',
      'n_banos',
      'n_habitaciones',
      'pozo',
      'planta',
      'documentos',
      // 'imagenes',
    ];
    for (const field of requiredFields) {
      if (!this.captacion[field]) {
        console.error(`El campo ${field} es obligatorio`);
        return false;
      }
    }
    return true;
  }

  // Método auxiliar para subir imágenes
  private async uploadImages(codigo: string): Promise<string[]> {
    if (!this.selectedFiles) {
      throw new Error('No se han seleccionado archivos');
    }
    return await this.captacionesService.uploadImages(
      codigo,
      this.selectedFiles
    );
  }

  // Método auxiliar para mostrar mensajes de error (implementar según tus necesidades)
  private showErrorMessage(message: string): void {
    // Implementa la lógica para mostrar el mensaje de error al usuario
    // Por ejemplo, podrías usar un servicio de notificaciones o un componente de alerta
    console.error(message);
  }

  // Metodo para generar un código aleatorio
  generateUniqueCode(): string {
    const date = new Date();
    return `${date.getTime()}`;
  }
}
