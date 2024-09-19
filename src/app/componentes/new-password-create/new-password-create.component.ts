import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-password-create',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './new-password-create.component.html',
  styleUrls: ['./new-password-create.component.scss'],
})
export class NewPasswordCreateComponent implements OnInit {
  password = '';
  confirmPassword = '';
  errorMessage = '';
  uidb64: string = '';
  token: string = '';
  resetForm: FormGroup;
  focus = false;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  isLoading = false;
  showAlert = false;
  alertFadeOut = false;
  public showError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password2: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.uidb64 = this.route.snapshot.params['uidb64'];
    this.token = this.route.snapshot.params['token'];
    console.log('Token:', this.token);
    console.log('Uidb64:', this.uidb64);
  }

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

  async createNewPassword() {
    console.log('Password:', this.password);
    console.log('Confirm Password:', this.confirmPassword);

    // Validaciones previas
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

    try {
      const resetData = {
        uidb64: this.uidb64,
        token: this.token,
        password: this.password // Asegúrate de que el campo password está presente y tiene un valor
      };
      console.log('Datos enviados:', resetData); // Verifica los datos enviados

      const response = await this.authService.setNewPassword(this.uidb64, this.token, this.password);
      console.log('Response:', response);
      this.isLoading = false;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (error: any) {
      this.isLoading = false;
      if (error.response && error.response.status === 401) {
        // Token is not valid, show an error message to the user
        this.errorMessage = 'Token is not valid, please request a new one';
      } else {
        // Handle other errors
        this.errorMessage = 'An error occurred, please try again later';
      }
      this.showError = true;
      this.showAlert = true;
    }
    // this.authService.setNewPassword(this.password, this.uidb64, this.token)
    //   .subscribe({
    //     next: () => {
    //       this.isLoading = false;
    //       this.router.navigate(['/login']);
    //     },
    //     error: (error) => {
    //       if (error.status === 401) {
    //         // Token is not valid, show an error message to the user
    //         this.errorMessage = 'Token is not valid, please request a new one';
    //         this.showError = true;
    //         this.showAlert = true;
    //       } else {
    //         // Handle other errors
    //         this.errorMessage = 'An error occurred, please try again later';
    //         this.showError = true;
    //         this.showAlert = true;
    //       }
    //     }
    //   });
  }

  dismissError() {
    this.alertFadeOut = true;
    setTimeout(() => {
      this.showAlert = false;
      this.alertFadeOut = false;
    }, 300);
  }
}
