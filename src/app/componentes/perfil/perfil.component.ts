import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CaptacionesService } from '../../services/captaciones.service';
import { NgFor, NgIf } from '@angular/common';
import { PerfilEditModalComponent } from '../perfil-edit-modal/perfil-edit-modal.component';
import { firstValueFrom } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { CaptacionesDeleteModalComponent } from '../captaciones-delete-modal/captaciones-delete-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgFor,
    PerfilEditModalComponent,
    NgIf,
    NgxPaginationModule,
    CaptacionesDeleteModalComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  user: any = {};
  userId: number | null = null;
  captacionId: number | null = null;
  captaciones: any[] = [];
  filteredCaptaciones: any[] = [];
  filters = {
    titulo: '',
    direccion: '',
    tipo: '',
    precio: null,
    banos: null,
    habitaciones: null,
    pozo: '',
    planta: '',
    documentos: '',
  };
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  page: number = 1;
  isAccordionOpen: boolean = false;

  toggleAccordion(): void {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

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
      this.user = await this.authService.getUser();
      console.log('Got user', this.user);
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
        this.filteredCaptaciones = response;
      } catch (error) {
        console.error('Error getting captaciones', error);
      }
    } else {
      console.error('User ID is not available');
    }
  }

  // Metodo para aplicar los filtros
  applyFilters(): void {
    this.filteredCaptaciones = this.captaciones.filter((captacion) => {
      return (
        (!this.filters.titulo ||
          captacion.titulo
            .toLowerCase()
            .includes(this.filters.titulo.toLowerCase())) &&
        (!this.filters.direccion ||
          captacion.direccion
            .toLowerCase()
            .includes(this.filters.direccion.toLowerCase())) &&
        (!this.filters.tipo ||
          captacion.tipo
            .toLowerCase()
            .includes(this.filters.tipo.toLowerCase())) &&
        (!this.filters.pozo ||
          captacion.pozo
            .toLowerCase()
            .includes(this.filters.pozo.toLowerCase())) &&
        (!this.filters.planta ||
          captacion.planta
            .toLowerCase()
            .includes(this.filters.planta.toLowerCase())) &&
        (!this.filters.documentos ||
          captacion.documentos
            .toLowerCase()
            .includes(this.filters.documentos.toLowerCase())) &&
        (!this.filters.precio || captacion.precio <= this.filters.precio) &&
        (!this.filters.banos || captacion.n_banos == this.filters.banos) &&
        (!this.filters.habitaciones ||
          captacion.n_habitaciones == this.filters.habitaciones)
      );
    });
  }

  // Metodo para limpiar los filtros
  clearFilters(): void {
    this.filters = {
      titulo: '',
      direccion: '',
      tipo: '',
      precio: null,
      banos: null,
      habitaciones: null,
      pozo: '',
      planta: '',
      documentos: '',
    };
    this.filteredCaptaciones = this.captaciones;
  }

  // Metodo para editar una captacion
  editCaptacion(id: number) {
    this.router.navigate(['/captaciones/edit', id]);
  }

  // Metodo para eliminar una captacion
  deleteCaptacion(id: number): void {
    this.captacionId = id; // Guardamos el ID del usuario seleccionado
    this.isDeleteModalOpen = true; // Abrimos el modal de edición
  }

  // Metodo para colocar primera letra en mayúscula
  capitalizeFirstLetter(f_letter: string): string {
    if (!f_letter) return '';
    return f_letter.charAt(0).toUpperCase() + f_letter.slice(1).toLowerCase();
  }

  // Metodo para formatear el codigo
  formatCodigo(codigo: number): string {
    if (codigo > 0 && codigo <= 9) {
      return `HK00${codigo}`;
    } else if (codigo >= 10 && codigo < 100) {
      return `HK0${codigo}`;
    } else {
      return `HK${codigo}`;
    }
  }

  // Metodo para cerrar el modal de edición
  closeEditPerfilModal(): void {
    this.isEditModalOpen = false;
    this.loadCaptaciones();
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.loadCaptaciones();
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
