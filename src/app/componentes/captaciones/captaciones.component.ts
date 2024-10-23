import { Component } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captaciones',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './captaciones.component.html',
  styleUrl: './captaciones.component.scss',
})
export class CaptacionesComponent {
  captaciones: any[] = [];
  captacionesWithImages: any[] = [];

  constructor(
    private captacionesService: CaptacionesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCaptaciones();
  }

  loadCaptaciones() {
    this.captacionesService.getCaptaciones().subscribe({
      next: (response) => {
        console.log('Captaciones fetched successfully', response);
        this.captaciones = response;
        this.loadFirstImages(); // Llama a este método después de cargar las captaciones
      },
      error: (error) => {
        console.error('Error getting captaciones', error);
      },
    });
  }

  loadFirstImages() {
    const imagePromises = this.captaciones.map(async (captacion) => {
      const imageUrl = await this.captacionesService.getFirstImage(
        captacion.id
      ); // Usar id
      return { ...captacion, imageUrl }; // Añadir la URL de la imagen al objeto captacion
    });

    Promise.all(imagePromises)
      .then((results) => {
        this.captacionesWithImages = results;
        console.log('Captaciones con imágenes:', this.captacionesWithImages);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  }

  // Método para redirigir al detalle de la captación
  verDetalleCaptacion(id: number) {
    this.router.navigate([`/captacion/${id}`]); // Redirigir a la ruta de detalle con el ID
  }
}
