import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-create-modal',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './users-create-modal.component.html',
  styleUrl: './users-create-modal.component.scss',
})
export class UsersCreateModalComponent {
  user: any = {
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
  };

  @Output() close = new EventEmitter<void>();

  // Propiedades para el manejo de errores y alertas
  public showError: boolean = false;
  public errorMessage: string = '';
  public showAlert: boolean = false;
  public alertFadeOut: boolean = false;
  public isLoading: boolean = false;

  constructor(private usersService: UsersService) {}

  onSubmit(): void {
    // Validación para campos vacíos
    if (!this.user.email || !this.user.f_name || !this.user.l_name || !this.user.phone) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
      this.showError = true;
      this.showAlert = true; // Mostrar alerta
      return;
    }

    // Si no hay errores, ocultar mensaje y proceder con la creación
    this.showError = false;
    this.isLoading = true; // Mostrar el loader mientras se crea el usuario

    this.usersService.createUser(this.user).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente', response);
        this.closeModal();
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el usuario. Inténtelo de nuevo.';
        this.showError = true;
        this.showAlert = true; // Mostrar alerta
        this.isLoading = false; // Ocultar el loader si falla
      },
    });
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
