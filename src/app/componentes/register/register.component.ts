import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  f_name = '';
  email = '';
  password = '';
  errorMessage = ''
  focus = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const userData = {
      f_name: this.f_name,
      email: this.email,
      password: this.password
    };
    this.authService.register(userData)
      .subscribe({
        next: (response) => {
          console.log('Register successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Register failed', error);
        }
      });
  }
}
