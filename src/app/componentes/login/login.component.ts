import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  focus = false;
  passwordFieldType: string = 'password'; // Estado inicial para ocultar la contraseña
  isLoading = false; // Estado para el loader
  showAlert = false; // Nuevo estado para mostrar/ocultar alerta
  alertFadeOut = false; // Nuevo estado para manejar la animación de salida

  constructor(private authService: AuthService, private router: Router) {}

  setFocus(hasFocus: boolean) {
    this.focus = hasFocus;
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  public showError: boolean = false;

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, rellene todos los campos.';
      this.showError = true;
      this.showAlert = true; // Mostrar alerta
      return;
    }

    this.showError = false;
    this.isLoading = true; // Mostrar el loader
    try {
      const response = await this.authService.login({ email: this.email, password: this.password });
      console.log('Login successfull', response);
      this.isLoading = false; // Estado para el loader
      this.router.navigate(['/inicio']); // Redirigir a inicio
    } catch (error) {
      this.errorMessage = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
      this.showError = true;
      this.showAlert = true; // Mostrar alerta
    }
  }

  dismissError() {
    this.alertFadeOut = true; // Activar animación de salida
    setTimeout(() => {
      this.showAlert = false; // Ocultar alerta después de la animación
      this.alertFadeOut = false; // Resetear estado de animación
    }, 300); // Tiempo de duración de la animación de salida
  }
}
