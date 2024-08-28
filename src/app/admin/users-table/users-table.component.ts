import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { error } from 'console';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
