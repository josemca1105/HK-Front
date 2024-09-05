import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CaptacionesService } from '../../services/captaciones.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-captaciones-admin-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './captaciones-admin-table.component.html',
  styleUrl: './captaciones-admin-table.component.scss'
})
export class CaptacionesAdminTableComponent {
  captaciones: any[] = [];

  constructor(private captacionesService: CaptacionesService, private router: Router) {}

  ngOnInit() {
    this.loadCaptaciones();
  }

  loadCaptaciones() {
    this.captacionesService.getCaptaciones()
      .subscribe({
        next: (response) => {
          console.log('Captaciones fetched successfully', response);
          this.captaciones = response;
        },
        error: (error) => {
          console.error('Error getting captaciones', error);
        }
      });
  }

  editCaptacion(id: number) {
    this.router.navigate(['/captaciones-admin-edit', id]);
  }

  deleteCaptacion(id: number) {
    this.captacionesService.deleteCaptacion(id)
      .subscribe({
        next: (response) => {
          console.log('Captacion deleted successfully', response);
          this.loadCaptaciones();
        },
        error: (error) => {
          console.error('Error deleting captacion', error);
        }
      })
  }

  capitalizeFirstLetter(f_name: string): string {
    if (!f_name) return '';
    return f_name.charAt(0).toUpperCase() + f_name.slice(1).toLowerCase();
  }
}
