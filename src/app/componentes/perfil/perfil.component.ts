import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CaptacionesService } from '../../services/captaciones.service';
import { NgFor, NgIf } from '@angular/common';
import { PerfilEditModalComponent } from '../perfil-edit-modal/perfil-edit-modal.component';
import { firstValueFrom } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, PerfilEditModalComponent, NgIf, NgxPaginationModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  userId: number | null = null;
  captaciones: any[] = [];
  isEditModalOpen = false;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  page: number = 1;

  sortTable(column: string) {
    if (this.sortColumn === column) {
      // If the same column is clicked, reverse the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a new column is clicked, set it as the sort column and default to ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.captaciones.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private captacionesService: CaptacionesService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.authService.getUser();
      if (response && response.id) {
        this.userId = response.id;
        await this.loadCaptaciones();
      } else {
        console.error('User ID not found in response');
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }

  // Método para redirigir a la página de edición del perfil
  editProfile(): void {
    if (this.userId !== null) {
      this.userId = this.userId;
      this.isEditModalOpen = true;
    } else {
      console.error('User ID is not available');
    }
  }

  // Metodo para redirigir a la página de creacion de captaciones
  createCaptacion(): void {
    this.router.navigate(['/captaciones/create']);
  }

  // Metodo para cargar las captaciones del usuario
  async loadCaptaciones(): Promise<void> {
    if (this.userId !== null) {
      try {
        const response = await firstValueFrom(
          this.captacionesService.getCaptacionesByUser()
        );
        console.log('User captaciones fetched successfully', response);
        this.captaciones = response;
      } catch (error) {
        console.error('Error getting captaciones', error);
      }
    } else {
      console.error('User ID is not available');
    }
  }

  // Metodo para editar una captacion
  editCaptacion(id: number) {
    this.router.navigate(['/captaciones/edit', id]);
  }

  // Metodo para eliminar una captacion
  async deleteCaptacion(id: number): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.captacionesService.deleteCaptacion(id)
      );
      console.log('Captacion deleted successfully', response);
      await this.loadCaptaciones();
    } catch (error) {
      console.error('Error deleting captacion', error);
    }
  }

  // Metodo para colocar primera letra en mayúscula
  capitalizeFirstLetter(f_letter: string): string {
    if (!f_letter) return '';
    return f_letter.charAt(0).toUpperCase() + f_letter.slice(1).toLowerCase();
  }

  // Metodo para cerrar el modal de edición
  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return 'sort';
    }
    return this.sortDirection === 'asc' ? 'sort-up' : 'sort-down';
  }

  isSortedColumn(column: string): boolean {
    return this.sortColumn === column;
  }
}
