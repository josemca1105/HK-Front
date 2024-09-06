import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-create-modal',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './users-create-modal.component.html',
  styleUrl: './users-create-modal.component.scss'
})
export class UsersCreateModalComponent {
  user: any = {
    f_name: '',
    l_name: '',
    email: '',
    password: '',
    phone: '',
  };

  @Output() close = new EventEmitter<void>();

  constructor(private usersService: UsersService) {}

  onSubmit(): void {
    this.usersService.createUser(this.user)
      .subscribe({
        next: (response) => {
          console.log('User created', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating user', error);
        }
      });
  }

  closeModal(): void {
    this.close.emit(); // Emitimos el evento para notificar al componente padre
  }
}
