import { Component } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-captaciones-personal-create',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './captaciones-personal-create.component.html',
  styleUrl: './captaciones-personal-create.component.scss'
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
    disponibilidad: 'disponible',
    status: 'activo',
  }

  constructor(private captacionesService: CaptacionesService, private router: Router) {}

  onSubmit(): void {
    this.captacionesService.createCaptacion(this.captacion)
      .subscribe({
        next: (response) => {
          console.log('Captacion created', response);
          this.router.navigate(['/perfil']);
        },
        error: (error) => {
          console.error('Error creating captacion', error);
        }
      })
  }
}
