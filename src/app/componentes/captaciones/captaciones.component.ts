import { Component } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';

@Component({
  selector: 'app-captaciones',
  standalone: true,
  imports: [],
  templateUrl: './captaciones.component.html',
  styleUrl: './captaciones.component.scss'
})
export class CaptacionesComponent {
  captaciones: any[] = [];

  constructor(private captacionesService: CaptacionesService) { }

  ngOnInit() {
    this.loadCaptaciones();
  }

  loadCaptaciones() {
    this.captacionesService.getCaptaciones()
      .subscribe({
        next: (response) => {
          console.log('Captaciones fetched successfully', response);
          this.captaciones = response;
        },
        error: (error) => {
          console.error('Error getting captaciones', error);
        }
      });
  }

}
