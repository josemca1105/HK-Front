import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-password-create',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterLink],
  templateUrl: './new-password-create.component.html',
  styleUrls: ['./new-password-create.component.scss'],
})
export class NewPasswordCreateComponent {
  password = '';
  confirmPassword = '';
  errorMessage = '';
  focus = false;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  isLoading = false;
  showAlert = false;
  alertFadeOut = false;

  constructor(private router: Router) {}

  setFocus(hasFocus: boolean) {
    this.focus = hasFocus;
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType =
        this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }

  public showError: boolean = false;

  private validatePassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      this.errorMessage = `La contraseña debe tener al menos ${minLength} caracteres.`;
      return false;
    }
    if (!hasUpperCase) {
      this.errorMessage =
        'La contraseña debe contener al menos una letra mayúscula.';
      return false;
    }
    if (!hasLowerCase) {
      this.errorMessage =
        'La contraseña debe contener al menos una letra minúscula.';
      return false;
    }
    if (!hasNumbers) {
      this.errorMessage = 'La contraseña debe contener al menos un número.';
      return false;
    }
    if (!hasSpecialChar) {
      this.errorMessage =
        'La contraseña debe contener al menos un carácter especial.';
      return false;
    }
    return true;
  }

  createNewPassword() {
    if (!this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, rellene todos los campos.';
      this.showError = true;
      this.showAlert = true;
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.showError = true;
      this.showAlert = true;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.showError = true;
      this.showAlert = true;
      return;
    }

    this.showError = false;
    this.isLoading = true;
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        console.log('Éxito');
        this.showAlert = false;
        this.router.navigate(['/login']);
      } else {
        this.errorMessage =
          'Error al crear nueva contraseña. Inténtelo de nuevo.';
        this.showError = true;
        this.showAlert = true;
      }

      this.isLoading = false;
    }, 2000);
  }

  dismissError() {
    this.alertFadeOut = true;
    setTimeout(() => {
      this.showAlert = false;
      this.alertFadeOut = false;
    }, 300);
  }
}
