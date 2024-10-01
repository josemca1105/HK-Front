import { Component } from '@angular/core';
import { CaptacionesComponent } from '../../componentes/captaciones/captaciones.component';

@Component({
  selector: 'app-captaciones-page',
  standalone: true,
  imports: [CaptacionesComponent],
  templateUrl: './captaciones-page.component.html',
  styleUrl: './captaciones-page.component.scss',
})
export class CaptacionesPageComponent {}
