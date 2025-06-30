import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { ResenaService } from '../../services/resena.service';

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
  const idComprador = 1;
  this.pedidoService.obtenerPedidosPorComprador(idComprador).subscribe({
    next: (data) => {
      // Ordena del más antiguo al más reciente
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
      });
    },
    error: () => this.pedidos = []
  });
}

guardarResena(pedido: any, calificacion: string, comentario: string) {
  const resena = {
    fecha: new Date().toISOString().slice(0, 10),
    comentario,
    calificacion: Number(calificacion), // <-- convierte a número
    comprador: { id_Comprador: pedido.comprador?.idComprador || 1 },
    pedido: { no_orden: pedido.no_orden }
  };
  this.resenaService.crearResena(resena).subscribe({
    next: () => {
      alert('¡Reseña guardada!');
      pedido.resena = resena;
    },
    error: () => alert('Error al guardar la reseña')
  });
}

descargarComprobante(noOrden: number) {
  // Llama a tu servicio para descargar el ticket por número de orden
  this.pedidoService.descargarComprobante(noOrden).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprobante_${noOrden}.pdf`; // o el formato que sea
    a.click();
    window.URL.revokeObjectURL(url);
  });
}
}
