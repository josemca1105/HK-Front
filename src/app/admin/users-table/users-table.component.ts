import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers()
      .subscribe({
        next: (response) => {
          console.log('Users fetched successfully', response);
          this.users = response;
        },
        error: (error) => {
          console.error('Error getting users', error);
        }
      });
  }

  editUser(id: number) {
    this.router.navigate(['/users-edit', id]);
  }

  deleteuser(id: number) {
    this.usersService.deleteUser(id)
      .subscribe({
        next: (response) => {
          console.log('User deleted successfully', response);
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user', error);
        }
      });
  }

  capitalizeFirstLetter(f_name: string): string {
    if (!f_name) return '';
    return f_name.charAt(0).toUpperCase() + f_name.slice(1).toLowerCase();
  }
}
