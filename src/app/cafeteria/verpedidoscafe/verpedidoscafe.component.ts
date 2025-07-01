import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Importa tu servicio de pedidos
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2'; // <-- Importa SweetAlert2

@Component({
  selector: 'app-verpedidoscafe',
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './verpedidoscafe.component.html',
  styleUrl: './verpedidoscafe.component.css'
})
export class VerpedidoscafeComponent implements OnInit {
  opcionSeleccionada: string = 'Filtrar';
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    const idCafeteria = perfil.idCafeteria;

    if (idCafeteria) {
      Swal.fire({
        title: 'Procesando pedido...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.pedidoService.obtenerPedidosPorCafeteria(idCafeteria).subscribe({
        next: (data) => {
          this.pedidos = data.sort((a: any, b: any) => {
            return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
          });
          console.log('Pedidos recibidos:', this.pedidos);
          Swal.close();
        },
        error: (err) => {
          console.error('Error al obtener pedidos:', err);
          this.pedidos = [];
          Swal.fire('Error', 'No se pudieron cargar los pedidos', 'error');
        }
      });
    }
  }
}
