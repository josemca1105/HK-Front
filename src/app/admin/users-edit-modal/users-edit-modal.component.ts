import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-edit-modal',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './users-edit-modal.component.html',
  styleUrl: './users-edit-modal.component.scss',
})
export class UsersEditModalComponent implements OnInit {
  user: any = {
    f_name: '',
    role: '',
  };

  @Input() userId: number | null = null;
  @Output() close = new EventEmitter<void>();

  // Propiedades para el manejo de errores y alertas
  public showError: boolean = false;
  public errorMessage: string = '';
  public showAlert: boolean = false;
  public alertFadeOut: boolean = false;
  public isLoading: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    if (this.userId !== null) {
      this.loadUser();
    }
  }

  loadUser(): void {
    if (this.userId !== null) {
      this.usersService.getUser(this.userId).subscribe({
        next: (response) => {
          // Aquí accedemos a response.data para obtener el objeto del usuario
          console.log('User', response.data);
          this.user = response.data;
        },
        error: (error) => {
          console.error('Error', error);
        },
      });
    }
  }

  onSubmit(): void {
    // Validación para campos vacíos
    if (!this.user.f_name) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
      this.showError = true;
      this.showAlert = true; // Mostrar alerta
      return;
    }

    if (this.userId !== null) {
      this.usersService.updateUser(this.user, this.userId).subscribe({
        next: (response) => {
          console.log('User updated', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error', error);
          this.errorMessage = 'Error al editar usuario. Inténtelo de nuevo.';
          this.showError = true;
          this.showAlert = true; // Mostrar alerta
          this.isLoading = false; // Ocultar el loader si falla
        },
      });
    }
    // Si no hay errores, ocultar mensaje y proceder con la creación
    this.showError = false;
    this.isLoading = true; // Mostrar el loader mientras se crea el usuario
  }

  closeModal(): void {
    this.close.emit(); // Emitimos el evento para notificar al componente padre
  }

  // Método para ocultar el error
  dismissError() {
    this.alertFadeOut = true; // Activar animación de salida
    setTimeout(() => {
      this.showAlert = false; // Ocultar alerta después de la animación
      this.alertFadeOut = false; // Resetear estado de animación
    }, 300); // Tiempo de duración de la animación de salida
  }
}
