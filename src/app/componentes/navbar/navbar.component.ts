import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  user: any = {};
  dropdownOpen: boolean = false; // Controla la visibilidad del dropdown
  menuOpen: boolean = false; // Controla la visibilidad del menú de hamburguesa

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    try {
      this.user = await this.authService.getUser();
      console.log('Got user', this.user);
    } catch (error) {
      console.error('Failed to get user', error);
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen; // Alterna el estado del dropdown
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna el estado del menú de hamburguesa
  }

  async logout() {
    try {
      const response = await this.authService.logout();
      console.log('Logout successful', response);
      this.user = null;
      this.dropdownOpen = false;
      this.menuOpen = false;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  closeDropdown() {
    setTimeout(() => {
      this.dropdownOpen = false; // Cierra el dropdown después de un breve retraso
    }, 500);
  }

  closeMenu(): void {
    this.menuOpen = false; // Cierra el menú al hacer clic en un enlace
  }
}
