import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaptacionesService } from '../../services/captaciones.service';
import { CaptacionesEditModalComponent } from '../captaciones-edit-modal/captaciones-edit-modal.component';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-captaciones-admin-table',
  standalone: true,
  imports: [NgIf, NgFor, NgxPaginationModule, CaptacionesEditModalComponent],
  templateUrl: './captaciones-admin-table.component.html',
  styleUrl: './captaciones-admin-table.component.scss',
})
export class CaptacionesAdminTableComponent implements OnInit {
  captaciones: any[] = [];
  isCreateModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedCaptacionId: number | null = null;
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
    private captacionesService: CaptacionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCaptaciones();
  }

  loadCaptaciones() {
    this.captacionesService.getCaptaciones().subscribe({
      next: (response) => {
        console.log('Captaciones fetched successfully', response);
        this.captaciones = response;
      },
      error: (error) => {
        console.error('Error getting captaciones', error);
      },
    });
  }

  editCaptacion(id: number) {
    this.selectedCaptacionId = id;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.loadCaptaciones();
  }

  deleteCaptacion(id: number) {
    this.captacionesService.deleteCaptacion(id).subscribe({
      next: (response) => {
        console.log('Captacion deleted successfully', response);
        this.loadCaptaciones();
      },
      error: (error) => {
        console.error('Error deleting captacion', error);
      },
    });
  }

  capitalizeFirstLetter(f_letter: string): string {
    if (!f_letter) return '';
    return f_letter.charAt(0).toUpperCase() + f_letter.slice(1).toLowerCase();
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
