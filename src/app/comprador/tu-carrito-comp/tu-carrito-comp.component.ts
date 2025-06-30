import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';
import { PedidoService } from '../../services/pedido.service';
import { PuntosService } from '../../services/puntos.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-tu-carrito-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tu-carrito-comp.component.html',
  styleUrls: ['./tu-carrito-comp.component.css']
})
export class TuCarritoCompComponent {
  productosCarrito: { producto: Producto, cantidad: number }[] = [];
puntosDisponibles = 0;
puntosUsados: number = 0;
idComprador = 1;
  constructor(private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private puntosService: PuntosService
  ) {
    this.productosCarrito = this.carritoService.getCarrito();
  }

  ngOnInit() {
  this.puntosService.obtenerTodosQR().subscribe(qrs => {
    const qrsComprador = qrs.filter(qr => qr.comprador && qr.comprador.id_Comprador === this.idComprador);
    if (qrsComprador.length > 0) {
      this.puntosDisponibles = qrsComprador.reduce((acc, qr) => acc + qr.cantidadPuntos, 0);
    } else {
      // Si no existe QR, crea uno con 0 puntos
      const nuevoQR = {
        cantidadPuntos: 0,
        idComprador: this.idComprador,
        caducidad: "2025-12-31" // O la fecha que corresponda
      };
      this.puntosService.crearQR(nuevoQR).subscribe(() => {
        this.puntosDisponibles = 0;
      });
    }
  });
}
max(a: number, b: number): number {
  return Math.max(a, b);
}

min(a: number, b: number): number {
  return Math.min(a, b);
}

usarMaximosPuntos() {
  this.puntosUsados = Math.min(this.puntosDisponibles, this.calcularTotal());
}

  sumarCantidad(i: number): void {
    const item = this.productosCarrito[i];
    if (item.cantidad < item.producto.stock) {
      item.cantidad++;
    }
  }
  calcularTotalPuntos(): number {
  return this.productosCarrito.reduce(
    (total, item) => total + (item.producto.precioPuntos * item.cantidad),
    0
  );
}



  restarCantidad(i: number): void {
  const item = this.productosCarrito[i];
  if (item.cantidad > 1) {
    item.cantidad--;
  } else {
    // Elimina el producto del carrito si la cantidad es 1 y se resta
    this.productosCarrito.splice(i, 1);
  }
}

  calcularTotal(): number {
    return this.productosCarrito.reduce(
      (total, item) => total + (item.producto.precio * item.cantidad),
      0
    );
  }

  realizarPedido(): void {
  if (this.puntosUsados > 0) {
    this.puntosService.obtenerTodosQR().subscribe(qrs => {
      let puntosRestantes = this.puntosUsados;
      const qrsComprador = qrs.filter(qr => qr.comprador && qr.comprador.id_Comprador === this.idComprador);
      const updates = [];
      for (let qr of qrsComprador) {
        if (puntosRestantes <= 0) break;
        const puntosADescontar = Math.min(qr.cantidadPuntos, puntosRestantes);
        qr.cantidadPuntos -= puntosADescontar;
        puntosRestantes -= puntosADescontar;
        updates.push(this.puntosService.actualizarQR(qr));
      }
      forkJoin(updates).subscribe(() => {
        this.finalizarPedido();
      });
    });
  } else {
    // --- ACUMULAR PUNTOS SI NO SE USARON ---
    const puntosAGanar = this.calcularTotalPuntos(); // 1 punto por peso gastado
    this.puntosService.obtenerTodosQR().subscribe(qrs => {
      let qr = qrs.find(qr => qr.comprador && qr.comprador.id_Comprador === this.idComprador);
      if (qr) {
        qr.cantidadPuntos += puntosAGanar;
        this.puntosService.actualizarQR(qr).subscribe(() => {
          this.finalizarPedido();
        });
      } else {
        // Si no existe QR, crea uno nuevo
        const nuevoQR = {
          cantidadPuntos: puntosAGanar,
          id_Comprador: this.idComprador,
          caducidad: "2025-12-31" // O la fecha que corresponda
        };
        this.puntosService.crearQR(nuevoQR).subscribe(() => {
          this.finalizarPedido();
        });
      }
    });
  }
}

finalizarPedido() {
  const pedido = {
    descripcion_producto: this.productosCarrito.map(item => `${item.cantidad} ${item.producto.nombreProducto}`).join(' y '),
    pago_final: this.calcularTotal() - this.puntosUsados,
    comprador: { id_Comprador: this.idComprador },
    cafeteria: { idCafeteria: this.productosCarrito[0].producto.cafeteria.idCafeteria },
    detalles: this.productosCarrito.map(item => ({
      producto: { id_producto: item.producto.id_producto },
      cantidad: item.cantidad,
      subtotal: item.producto.precio * item.cantidad
    }))
  };

  this.pedidoService.crearPedido(pedido).subscribe({
    next: (res) => {
      alert('¡Pedido realizado!');
      this.productosCarrito = [];
      this.carritoService.limpiarCarrito?.();
      // Vuelve a consultar los puntos para actualizar la vista
      this.puntosService.obtenerTodosQR().subscribe(qrs => {
        this.puntosDisponibles = qrs
          .filter(qr => qr.comprador && qr.comprador.id_Comprador === this.idComprador)
          .reduce((acc, qr) => acc + qr.cantidadPuntos, 0);
      });
      this.puntosUsados = 0;
    },
    error: (err) => {
      alert('Error al realizar el pedido');
    }
  });
}
}

