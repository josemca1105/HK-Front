import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-edit-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users-edit-modal.component.html',
  styleUrl: './users-edit-modal.component.scss'
})
export class UsersEditModalComponent implements OnInit {
  user: any = {
    f_name: '',
    role: '',
  }

  @Input() userId: number | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    if (this.userId !== null) {
      this.loadUser();
    }
  }

  loadUser(): void {
    if (this.userId !== null) {
      this.usersService.getUser(this.userId).subscribe({
        next: (response) => {
          // Aquí accedemos a response.data para obtener el objeto del usuario
          console.log('User', response.data);
          this.user = response.data;
        },
        error: (error) => {
          console.error('Error', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.userId !== null) {
      this.usersService.updateUser(this.user, this.userId)
        .subscribe({
          next: (response) => {
            console.log('User updated', response);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error', error);
          }
        });
    }
  }

  closeModal(): void {
    this.close.emit(); // Emitimos el evento para notificar al componente padre
  }
}
