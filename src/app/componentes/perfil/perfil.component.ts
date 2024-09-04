import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  userId: number | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (response) => {
        // Verifica si 'id' está presente en la respuesta
        if (response && response.id) {
          this.userId = response.id;
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
      this.router.navigate(['/perfil-edit', this.userId]);
    } else {
      console.error('User ID is not available');
    }
  }
}
