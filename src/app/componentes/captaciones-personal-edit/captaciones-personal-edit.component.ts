import { Component, OnInit } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-captaciones-personal-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './captaciones-personal-edit.component.html',
  styleUrl: './captaciones-personal-edit.component.scss'
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
    tipo: '',
    disponibilidad: '',
    status: '',
  }

  captacionId: number | null = null;

  constructor(
    private captacionesService: CaptacionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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
        }
      });
    }
  }

  onSubmit(): void {
    if (this.captacionId !== null) {
      this.captacionesService.updateCaptacion(this.captacion, this.captacionId)
        .subscribe({
          next: (response) => {
            console.log('Captacion updated', response);
            this.router.navigate(['/perfil']);
          },
          error: (error) => {
            console.error('Error updating captacion', error);
          }
        });
      }
  }
}
