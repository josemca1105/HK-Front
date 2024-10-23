import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CaptacionesService } from '../../services/captaciones.service';
import { firstValueFrom } from 'rxjs';

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
  selector: 'app-captacion-view',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './captacion-view.component.html',
  styleUrl: './captacion-view.component.scss',
})
export class CaptacionViewComponent implements OnInit {
  captacion: Captacion | null = null;
  captacionId: number | null = null;
  captacionCodigo: string | null = null;
  imagenesUrls: string[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private captacionesService: CaptacionesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.captacionId = +id;
        this.loadCaptacion();
      } else {
        this.error = 'No se pudo obtener el ID de la captación';
        this.loading = false;
      }
    });
  }

  async loadCaptacion(): Promise<void> {
    if (this.captacionId !== null) {
      try {
        const response = await firstValueFrom(
          this.captacionesService.getCaptacion(this.captacionId)
        );
        this.captacion = response.data;
        this.extractCaptacionCodigo();
        await this.loadImages();
      } catch (error) {
        this.error = 'No se pudo cargar la captación';
        console.error('Error loading captacion:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  extractCaptacionCodigo(): void {
    if (
      this.captacion &&
      this.captacion.imagenes &&
      this.captacion.imagenes.length > 0
    ) {
      const match = this.captacion.imagenes[0].match(/HK-(\d+)/);
      if (match && match[1]) {
        this.captacionCodigo = match[1];
        console.log('Captacion codigo extracted:', this.captacionCodigo);
      } else {
        console.error('No se pudo extraer el código de la URL de la imagen');
      }
    } else {
      console.error('La captación no tiene imágenes');
    }
  }

  async loadImages(): Promise<void> {
    if (this.captacionCodigo) {
      console.log('Loading images for captacionCodigo:', this.captacionCodigo);
      try {
        this.imagenesUrls = await this.captacionesService.getAllImages(
          +this.captacionCodigo
        );
        console.log('Imágenes obtenidas:', this.imagenesUrls);
      } catch (error) {
        this.error = 'No se pudieron cargar las imágenes';
        console.error('Error loading images:', error);
      }
    } else {
      console.error('captacionCodigo is null');
    }
  }
}
