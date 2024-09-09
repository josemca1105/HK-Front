import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: any = null;
  dropdownOpen: boolean = false; // Controla la visibilidad del dropdown
  menuOpen: boolean = false; // Controla la visibilidad del menú de hamburguesa

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        console.log('Got user', user);
      },
      error: (error) => {
        console.error('Failed to get user', error);
      },
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen; // Alterna el estado del dropdown
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna el estado del menú de hamburguesa
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        this.user = null;
        this.dropdownOpen = false;
        this.menuOpen = false; // Cierra el menú al cerrar sesión
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
