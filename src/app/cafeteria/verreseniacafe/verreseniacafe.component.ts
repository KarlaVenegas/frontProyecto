import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verreseniacafe',
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './verreseniacafe.component.html',
  styleUrl: './verreseniacafe.component.css'
})
export class VerreseniacafeComponent {

  opcionSeleccionada: string ='Filtrar';
  /*AGREGUE ESTOS PARA VER COMO FUNCIONABA EL FRONT, PUEDEN QUITARLOS */
  resenias = [
    {
      id: 1367,
      fecha: '14/06/2025',
      productos: ['Capuchino grande x1', 'Pan de elote x2'],
      resena: '“Muy rico”',
      calificacion: 5
    },
    {
      id: 1578,
      fecha: '18/06/2025',
      productos: ['Café americano grande x1', 'Galletas oreo x2'],
      resena: '“Estaba medio tibio el café, no caliente',
      calificacion: 3
    },
    {
      id: 2909,
      fecha: '28/06/2025',
      productos: ['Chocolate grande x1', 'Galletas emperador x2'],
      resena: '“Bueno',
      calificacion: 4
    },
  ]

}
