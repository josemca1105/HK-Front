import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = ''
  focus = false;

  constructor(private authService: AuthService, private router: Router) {}

  setFocus(hasFocus: boolean) {
    this.focus = hasFocus;
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      try {
        const response = await this.authService.login(this.email, this.password);
        console.log('Login successful', response);
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Login error', error);
        // @ts-ignore
        if (error.response && error.response.data && error.response.data.detail === 'User not found') {
          this.errorMessage = 'Usuario no encontrado. Por favor, verifica tu correo electrónico y contraseña.';
        } else {
          this.errorMessage = 'Error en el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
