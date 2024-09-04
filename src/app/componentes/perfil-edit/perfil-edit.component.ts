import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.scss']
})
export class PerfilEditComponent implements OnInit {
  user: any = {
    id: null,
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el id del usuario desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(+id); // Cargar usuario por id
    } else {
      // Manejar caso cuando no se proporciona un id
      console.error('User ID is missing');
    }
  }

  loadUser(id: number): void {
    this.usersService.getUser(id).subscribe({
      next: (response) => {
        console.log('User data:', response);
        this.user = response.data; // Accede al campo `data` de la respuesta
      },
      error: (error) => {
        console.error('Error loading user data', error);
      }
    });
  }

  onSubmit(): void {
    if (this.user.id) {
      this.usersService.updateUser(this.user, this.user.id).subscribe({
        next: (response) => {
          console.log('Profile updated', response);
          this.router.navigate(['/perfil']); // Redirige a la página del perfil
        },
        error: (error) => {
          console.error('Error updating profile', error);
        }
      });
    } else {
      console.error('User ID is not available for update');
    }
  }
}
