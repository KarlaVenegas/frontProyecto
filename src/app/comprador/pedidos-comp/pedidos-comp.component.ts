import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedidos-comp',
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './pedidos-comp.component.html',
  styleUrl: './pedidos-comp.component.css',
  standalone: true
})
export class PedidosCompComponent implements OnInit {
  opcionSeleccionada: string = 'Filtrar';
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const idComprador = 1; // CAMBIAR ESTOcomprador
    this.pedidoService.obtenerPedidosPorComprador(idComprador).subscribe({
      next: (data) => this.pedidos = data,
      error: () => this.pedidos = []
    });
  }
}
