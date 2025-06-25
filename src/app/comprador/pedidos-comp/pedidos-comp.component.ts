import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos-comp',
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './pedidos-comp.component.html',
  styleUrl: './pedidos-comp.component.css'
})
export class PedidosCompComponent {
  opcionSeleccionada: string ='Filtrar';
  /*AGREGUE ESTOS PARA VER COMO FUNCIONABA EL FRONT, PUEDEN QUITARLOS */
  pedidos = [
    {
      id: 1367,
      fecha: '14/06/2025',
      cafeteria: 'Mylsa',
      ubicacion: 'Edificio 2 ESIME Zacatenco',
      productos: ['Capuchino grande x1', 'Pan de elote x2'],
      total: 85,
      puntos: 10,
      resena: '4.5/5 “Muy rico”'
    },
    {
      id: 1578,
      fecha: '18/06/2025',
      cafeteria: 'Gestión',
      ubicacion: 'ESCOM Cerca de palapas',
      productos: ['Café americano grande x1', 'Galletas oreo x2'],
      total: 50,
      puntos: 15,
      resena: '5/5 “Rico y caliente'
    },
    {
      id: 2909,
      fecha: '18/06/2025',
      cafeteria: 'Gestión',
      ubicacion: 'ESCOM Cerca de palapas',
      productos: ['Café americano grande x1', 'Galletas oreo x2'],
      total: 50,
      puntos: 15,
      resena: '5/5 “Rico y caliente'
    },
  ]
}
