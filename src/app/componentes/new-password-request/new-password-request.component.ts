import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-password-request',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterLink],
  templateUrl: './new-password-request.component.html',
  styleUrl: './new-password-request.component.scss',
})
export class NewPasswordRequestComponent {
  email = '';
  focus = false;
  public showError: boolean = false;
  isLoading = false;
  showErrorAlert = false; // Estado para mostrar/ocultar alerta de error
  showSuccessAlert = false; // Estado para mostrar/ocultar alerta de éxito
  alertFadeOut = false; // Estado para manejar la animación de salida
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  requestPassword() {
    if (!this.email) {
      this.errorMessage =
        'Por favor, ingrese su correo electrónico para proceder.';
      this.showError = true;
      this.showErrorAlert = true; // Mostrar alerta de error
      this.showSuccessAlert = false; // Ocultar alerta de éxito
      return;
    }

    this.showErrorAlert = false;
    this.showSuccessAlert = false; // Limpiar cualquier mensaje de error previo
    this.isLoading = true; // Mostrar el loader

    // Simulación de respuesta exitosa o fallida después de 2 segundos
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; // Simulación aleatoria de éxito o fallo

      if (isSuccess) {
        console.log('Exito');
        this.successMessage = 'Éxito: Se ha enviado el enlace de recuperación.';
        this.showSuccessAlert = true; // Mostrar alerta de éxito
        this.showErrorAlert = false; // Ocultar alerta de error
      } else {
        this.errorMessage =
          'Error: No se pudo enviar el enlace. Inténtelo de nuevo.';
        this.showError = true;
        this.showErrorAlert = true; // Mostrar alerta de error
        this.showSuccessAlert = false; // Ocultar alerta de éxito
      }

      this.isLoading = false; // Ocultar el loader
    }, 2000);
  }

  dismissError() {
    this.alertFadeOut = true; // Activar animación de salida
    setTimeout(() => {
      this.showErrorAlert = false; // Ocultar alerta después de la animación
      this.alertFadeOut = false; // Resetear estado de animación
    }, 300); // Tiempo de duración de la animación de salida
  }

  dismissSuccess() {
    this.alertFadeOut = true; // Activar animación de salida
    setTimeout(() => {
      this.showSuccessAlert = false; // Ocultar alerta después de la animación
      this.alertFadeOut = false; // Resetear estado de animación
    }, 300); // Tiempo de duración de la animación de salida
  }
}
