import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CaptacionesService } from '../../services/captaciones.service';
import { NgFor, NgIf } from '@angular/common';
import { PerfilEditModalComponent } from '../perfil-edit-modal/perfil-edit-modal.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, PerfilEditModalComponent, NgIf],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  userId: number | null = null;
  captaciones: any[] = [];
  isEditModalOpen = false;

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
        const response = await firstValueFrom(this.captacionesService.getCaptacionesByUser());
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
      const response = await firstValueFrom(this.captacionesService.deleteCaptacion(id));
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
}
