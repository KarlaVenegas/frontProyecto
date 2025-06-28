import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verpedidoscafe',
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './verpedidoscafe.component.html',
  styleUrl: './verpedidoscafe.component.css'
})
export class VerpedidoscafeComponent {
  opcionSeleccionada: string ='Filtrar';
  /*AGREGUE ESTOS PARA VER COMO FUNCIONABA EL FRONT, PUEDEN QUITARLOS */
  pedidos = [
    {
      id: 1367,
      fecha: '14/06/2025',
      productos: ['Capuchino grande x1', 'Pan de elote x2'],
      total: 85,
      puntos: 10,
      resena: '4.5/5 “Muy rico”'
    },
    {
      id: 1578,
      fecha: '18/06/2025',
      productos: ['Café americano grande x1', 'Galletas oreo x2'],
      total: 50,
      puntos: 15,
      resena: '5/5 “Rico y caliente'
    },
    {
      id: 2909,
      fecha: '28/06/2025',
      productos: ['Chocolate grande x1', 'Galletas emperador x2'],
      total: 50,
      puntos: 15,
      resena: '5/5 “Rico y caliente'
    },
  ]

}
