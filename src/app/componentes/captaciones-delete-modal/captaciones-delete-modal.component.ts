import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CaptacionesService } from '../../services/captaciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-captaciones-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './captaciones-delete-modal.component.html',
  styleUrl: './captaciones-delete-modal.component.scss',
})
export class CaptacionesDeleteModalComponent {
  @Input() captacionId: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() captacionDeleted = new EventEmitter<void>();

  constructor(private captacionesService: CaptacionesService) {}

  confirmDelete(): void {
    if (this.captacionId !== null) {
      this.captacionesService.deleteCaptacion(this.captacionId).subscribe({
        next: () => {
          console.log('Catpacion deleted successfully');
          this.captacionDeleted.emit();
          this.close.emit();
        },
        error: (error) => {
          console.log('Error deleting captacion', error);
        },
      });
    }
  }

  cancel() {
    this.close.emit();
  }
}
