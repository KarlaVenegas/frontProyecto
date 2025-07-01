import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { ResenaService } from '../../services/resena.service';
import Swal from 'sweetalert2';

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

  constructor(private pedidoService: PedidoService,
    private resenaService: ResenaService ) {}

  ngOnInit(): void {
  Swal.fire({
    title: 'Cargando pedidos...',
    text: 'Por favor espera',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Obtén el id del comprador desde el perfil guardado en localStorage
  const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
  const idComprador = perfil.id_Comprador;

  this.pedidoService.obtenerPedidosPorComprador(idComprador).subscribe({
    next: (data) => {
      this.pedidos = data.sort((a: any, b: any) =>
        new Date(a.fechaCreacion || a.fechaPedido).getTime() - new Date(b.fechaCreacion || b.fechaPedido).getTime()
      );
      this.resenaService.obtenerTodasResenas().subscribe((resenasData: any) => {
        const resenas: any[] = Array.isArray(resenasData) ? resenasData : [];
        this.pedidos.forEach(pedido => {
          const resena = resenas.find((r: any) =>
            r &&
            r.pedido &&
            r.pedido.no_orden !== undefined &&
            pedido.no_orden !== undefined &&
            String(r.pedido.no_orden) === String(pedido.no_orden)
          );
          pedido.resena = resena || null;
        });
        Swal.close();
      });
    },
    error: () => {
      this.pedidos = [];
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los pedidos.',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn-anadir'
        },
        buttonsStyling: false,
        iconColor: '#E74C3C'
      });
    }
  });
}

guardarResena(pedido: any, calificacion: string, comentario: string) {
  const resena = {
    fecha: new Date().toISOString().slice(0, 10),
    comentario,
    calificacion: Number(calificacion),
    comprador: { id_Comprador: pedido.comprador?.idComprador || 1 },
    pedido: { no_orden: pedido.no_orden }
  };
  this.resenaService.crearResena(resena).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: '¡Reseña guardada!',
        text: 'Tu reseña fue registrada correctamente.',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn-anadir'
        },
        buttonsStyling: false,
        iconColor: '#E6BC50',
        timer: 2000,
        timerProgressBar: true
      });
      pedido.resena = resena;
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar la reseña',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn-anadir'
        },
        buttonsStyling: false,
        iconColor: '#E74C3C'
      });
    }
  });
}

descargarComprobante(noOrden: number) {
  this.pedidoService.descargarComprobante(noOrden).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprobante_${noOrden}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  });
}
}
