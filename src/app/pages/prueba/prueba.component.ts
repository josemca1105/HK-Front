import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [NgIf],
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
  // animations: [ esto es por si quieres efectos en las animaciones y asi
  //   trigger('fadeInOut', [
  //     state('in', style({ opacity: 1 })),
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate(600)
  //     ]),
  //     transition(':leave',
  //       animate(600, style({ opacity: 0 })))
  //   ])
  // ]
  animations: [
    // Animación para desvanecer y deslizar el modal desde arriba
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-100px)' })),
      ]),
    ])
  ]
})
export class PruebaComponent implements OnInit {
  showModal = false; // Controla la visibilidad del modal

  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
