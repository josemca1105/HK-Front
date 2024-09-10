import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CaptacionesService } from '../../services/captaciones.service';
import { NgFor, NgIf } from '@angular/common';
import { PerfilEditModalComponent } from '../perfil-edit-modal/perfil-edit-modal.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, PerfilEditModalComponent, NgIf],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  userId: number | null = null;
  captaciones: any[] = [];
  isEditModalOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private captacionesService: CaptacionesService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (response) => {
        // Verifica si 'id' está presente en la respuesta
        if (response && response.id) {
          this.userId = response.id;
          this.loadCaptaciones();
        } else {
          console.error('User ID not found in response');
        }
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });
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
  loadCaptaciones(): void {
    if (this.userId !== null) {
      this.captacionesService.getCaptacionesByUser()
        .subscribe({
          next: (response) => {
            console.log('User captaciones fetched successfully', response);
            this.captaciones = response;
          },
          error: (error) => {
            console.error('Error getting captaciones', error);
          }
        });
    } else {
      console.error('User ID is not available');
    }
  }

  // Metodo para editar una captacion
  editCaptacion(id: number) {
    this.router.navigate(['/captaciones/edit', id]);
  }

  // Metodo para eliminar una captacion
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
