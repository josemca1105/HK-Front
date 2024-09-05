import { Component, OnInit } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-captaciones-admin-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './captaciones-admin-edit.component.html',
  styleUrl: './captaciones-admin-edit.component.scss'
})
export class CaptacionesAdminEditComponent implements OnInit {
  captacion: any = {
    disponibilidad: '',
    status: '',
    asesor: {},
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
          // Aquí accedemos a response.data para obtener el objeto de la captacion
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
            this.router.navigate(['/captaciones-admin-table']);
          },
          error: (error) => {
            console.error('Error updating captacion', error);
          }
        });
    }
  }
}
