import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss'
})
export class UsersEditComponent implements OnInit {
  user: any = {
    f_name: '',
    role: '',
  }

  userId: number | null = null;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.loadUser();
      }
    });
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
            this.router.navigate(['/admin/users/table']);
          },
          error: (error) => {
            console.error('Error updating user', error);
          }
        });
    }
  }
}
