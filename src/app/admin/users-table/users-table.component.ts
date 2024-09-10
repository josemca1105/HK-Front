import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { UsersCreateModalComponent } from '../users-create-modal/users-create-modal.component';
import { UsersEditModalComponent } from '../users-edit-modal/users-edit-modal.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [NgFor, UsersCreateModalComponent, UsersEditModalComponent, NgIf],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];
  isCreateModalOpen = false;
  isEditModalOpen = false;
  selectedUserId: number | null = null;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

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

  constructor(private usersService: UsersService, private router: Router) {}

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

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.loadUsers(); // Recarga la tabla de usuarios cuando el modal se cierra
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.loadUsers(); // Recarga la tabla de usuarios cuando el modal se cierra
  }

  deleteuser(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: (response) => {
        console.log('User deleted successfully', response);
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error deleting user', error);
      },
    });
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
