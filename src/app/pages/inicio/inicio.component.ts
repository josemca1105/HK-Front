import { Component } from '@angular/core';
import { CaptacionesPageComponent } from '../captaciones-page/captaciones-page.component';
import { CaptacionesComponent } from '../../componentes/captaciones/captaciones.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CaptacionesPageComponent, CaptacionesComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {}
