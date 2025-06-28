import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productos: { producto: Producto, cantidad: number }[] = [];

  getCarrito() {
    return this.productos;
  }

  addProducto(producto: Producto) {
    const encontrado = this.productos.find(p => p.producto.id_producto === producto.id_producto);
    if (encontrado) {
      if (encontrado.cantidad < producto.stock) {
        encontrado.cantidad++;
      }
    } else {
      this.productos.push({ producto, cantidad: 1 });
    }
  }

  clearCarrito() {
    this.productos = [];
  }
}
