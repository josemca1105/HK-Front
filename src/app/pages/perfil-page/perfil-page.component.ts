import { Component } from '@angular/core';
import { PerfilComponent } from '../../componentes/perfil/perfil.component';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [PerfilComponent],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.scss',
})
export class PerfilPageComponent {}
