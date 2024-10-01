import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CaptacionesService } from './../../services/captaciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-captaciones-edit-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './captaciones-edit-modal.component.html',
  styleUrl: './captaciones-edit-modal.component.scss',
})
export class CaptacionesEditModalComponent implements OnInit {
  captacion: any = {
    disponibilidad: '',
    status: '',
    asesor: {},
  };

  @Input() captacionId: number | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private captacionesService: CaptacionesService) {}

  ngOnInit(): void {
    if (this.captacionId !== null) {
      this.loadCaptacion();
    }
  }

  loadCaptacion(): void {
    if (this.captacionId !== null) {
      this.captacionesService.getCaptacion(this.captacionId).subscribe({
        next: (response) => {
          console.log('Captacion', response.data);
          this.captacion = response.data;
        },
      });
    }
  }

  onSubmit(): void {
    if (this.captacionId !== null) {
      this.captacionesService
        .updateCaptacion(this.captacion, this.captacionId)
        .subscribe({
          next: (response) => {
            console.log('captacion updated', response);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error', error);
          },
        });
    }
  }

  closeModal(): void {
    this.close.emit(); // Emitimos el evento para notificar al componente padre
  }
}
