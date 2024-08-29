import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        console.log('Got user', user);
      },
      error: (error) => {
        console.error('Failed to get user', error);
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        this.user = null;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }
}
