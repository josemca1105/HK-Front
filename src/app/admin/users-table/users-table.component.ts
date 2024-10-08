import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { UsersCreateModalComponent } from '../users-create-modal/users-create-modal.component';
import { UsersEditModalComponent } from '../users-edit-modal/users-edit-modal.component';
import { UsersDeleteModalComponent } from '../users-delete-modal/users-delete-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    NgFor,
    UsersCreateModalComponent,
    UsersEditModalComponent,
    UsersDeleteModalComponent,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];
  isCreateModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedUserId: number | null = null;
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

    this.users.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        console.log('Users fetched successfully', response);
        this.users = response;
      },
      error: (error) => {
        console.error('Error getting users', error);
      },
    });
  }

  editUser(id: number): void {
    this.selectedUserId = id; // Guardamos el ID del usuario seleccionado
    this.isEditModalOpen = true; // Abrimos el modal de edición
  }

  createUser() {
    this.isCreateModalOpen = true;
  }

  deleteuser(id: number) {
    this.selectedUserId = id; // Guardamos el ID del usuario seleccionado
    this.isDeleteModalOpen = true; // Abrimos el modal de eliminación
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.loadUsers(); // Recarga la tabla de usuarios cuando el modal se cierra
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.loadUsers(); // Recarga la tabla de usuarios cuando el modal se cierra
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.loadUsers(); // Recarga la tabla de usuarios cuando el modal se cierra
  }

  capitalizeFirstLetter(f_name: string): string {
    if (!f_name) return '';
    return f_name.charAt(0).toUpperCase() + f_name.slice(1).toLowerCase();
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
