import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { ResenaService } from '../../services/resena.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verreseniacafe',
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './verreseniacafe.component.html',
  styleUrl: './verreseniacafe.component.css'
})
export class VerreseniacafeComponent implements OnInit {

  opcionSeleccionada: string = 'Filtrar';
  resenias: any[] = [];

  constructor(
    private pedidoService: PedidoService,
    private resenaService: ResenaService
  ) {}

  ngOnInit() {
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    const idCafeteria = perfil.idCafeteria;

    if (idCafeteria) {
      Swal.fire({
        title: 'Cargando reseñas...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.pedidoService.obtenerPedidosPorCafeteria(idCafeteria).subscribe({
        next: (pedidos) => {
          this.resenaService.obtenerTodasResenas().subscribe({
            next: (resenas) => {
            const resenasArray = Array.isArray(resenas) ? resenas : [];
            this.resenias = resenasArray
              .filter((resena: any) =>
                pedidos.some((pedido: any) =>
                  pedido.no_orden === resena.pedido?.no_orden
                )
              )
              .map((resena: any) => {
                const pedido = pedidos.find((p: any) => p.no_orden === resena.pedido?.no_orden);
                return {
                  ...resena,
                  productos: pedido?.descripcion_producto,
                  fecha: pedido?.fechaCreacion,
                  total: pedido?.pago_final
                };
              });
            Swal.close();
          },
            error: () => {
              this.resenias = [];
              Swal.close();
              Swal.fire('Error', 'No se pudieron cargar las reseñas', 'error');
            }
          });
        },
        error: () => {
          Swal.close();
          Swal.fire('Error', 'No se pudieron cargar los pedidos', 'error');
        }
      });
    }
  }
}
