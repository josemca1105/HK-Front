import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-delete-modal.component.html',
  styleUrls: ['./users-delete-modal.component.scss']
})
export class UsersDeleteModalComponent {
  @Input() userId: number | null = null;  // Recibe el ID del usuario a eliminar
  @Output() close = new EventEmitter<void>();  // Emitimos un evento para cerrar el modal
  @Output() userDeleted = new EventEmitter<void>();  // Emitimos un evento para recargar la lista de usuarios

  constructor(private usersService: UsersService) {}

  confirmDelete(): void {
    if (this.userId) {
      this.usersService.deleteUser(this.userId).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.userDeleted.emit();  // Emitimos el evento para recargar la lista de usuarios
          this.close.emit();  // Emitimos el evento para cerrar el modal
        },
        error: (error) => {
          console.error('Error deleting user', error);
        }
      });
    }
  }

  cancel() {
    this.close.emit();  // Emitimos el evento para cerrar el modal
  }
}
