import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.scss'
})
export class UsersCreateComponent {
  user: any = {
    f_name: '',
    l_name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  };

  constructor(private usersService: UsersService, private router: Router) {}

  onSubmit(): void {
    this.usersService.createUser(this.user)
      .subscribe({
        next: (response) => {
          // faltaria el mensaje de usuario creado
          console.log('User created', response);
          this.router.navigate(['/admin/users/table']);
        },
        error: (error) => {
          console.error('Error creating user', error);
        }
      })
  }
}
