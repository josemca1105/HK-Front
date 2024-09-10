import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil-edit-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './perfil-edit-modal.component.html',
  styleUrl: './perfil-edit-modal.component.scss'
})
export class PerfilEditModalComponent implements OnInit {
  @Input() userId: number | null = null;
  @Output() close = new EventEmitter<void>();
  user: any = {
    id: null,
    f_name: '',
    l_name: '',
    email: '',
    phone: '',
  };

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.loadUser(this.userId);
    }
  }

  loadUser(id: number): void {
    this.usersService.getUser(id).subscribe({
      next: (response) => {
        console.log('User data:', response);
        this.user = response.data;
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
          this.close.emit();
        },
        error: (error) => {
          console.error('Error updating profile', error);
        }
      });
    } else {
      console.error('User ID is not available for update');
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
