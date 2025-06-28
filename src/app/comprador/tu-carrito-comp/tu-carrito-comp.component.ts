import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-tu-carrito-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tu-carrito-comp.component.html',
  styleUrls: ['./tu-carrito-comp.component.css']
})
export class TuCarritoCompComponent {
  productosCarrito: { producto: Producto, cantidad: number }[] = [];

  constructor(private carritoService: CarritoService) {
    this.productosCarrito = this.carritoService.getCarrito();
  }

  sumarCantidad(i: number): void {
    const item = this.productosCarrito[i];
    if (item.cantidad < item.producto.stock) {
      item.cantidad++;
    }
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
    // Aquí va la lógica para enviar el pedido al backend
    alert('Pedido realizado (simulado)');
  }
}

