import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-tu-carrito-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tu-carrito-comp.component.html',
  styleUrls: ['./tu-carrito-comp.component.css']
})
export class TuCarritoCompComponent {
  productosCarrito: { producto: Producto, cantidad: number }[] = [];

  constructor(private carritoService: CarritoService,
    private pedidoService: PedidoService
  ) {
    this.productosCarrito = this.carritoService.getCarrito();
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
  const pedido = {
    descripcion_producto: this.productosCarrito.map(item => `${item.cantidad} ${item.producto.nombreProducto}`).join(' y '),
    pago_final: this.calcularTotal(),
    comprador: { id_Comprador: 1 }, // Cambiado a id_Comprador
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
      // Limpia el carrito si quieres
    },
    error: (err) => {
      alert('Error al realizar el pedido');
    }
  });
}
}

