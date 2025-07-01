import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';
import { PedidoService } from '../../services/pedido.service';
import { PuntosService } from '../../services/puntos.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
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
idComprador = 0;
  constructor(private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private puntosService: PuntosService
  ) {
    this.productosCarrito = this.carritoService.getCarrito();
    // Obtén el id del comprador desde el perfil guardado en localStorage
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    this.idComprador = perfil.id_Comprador || 0;
  }

  ngOnInit() {
  this.puntosService.obtenerTodosQR().subscribe(qrs => {
    const qrsComprador = qrs.filter(qr => qr.comprador && qr.comprador.id_Comprador === this.idComprador);
    if (qrsComprador.length > 0) {
      this.puntosDisponibles = qrsComprador.reduce((acc, qr) => acc + qr.cantidadPuntos, 0);
    } else {
      // Mostrar loader mientras se crea el QR
      Swal.fire({
        title: 'Creando QR de puntos...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Si no existe QR, crea uno con 0 puntos y el comprador como objeto
      const nuevoQR = {
        cantidadPuntos: 0,
        idComprador: this.idComprador,
        caducidad: "2025-12-31"
        
      };
      this.puntosService.crearQR(nuevoQR).subscribe(() => {
        this.puntosDisponibles = 0;
        Swal.close();
      }, () => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el QR de puntos.',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn-anadir'
          },
          buttonsStyling: false,
          iconColor: '#E74C3C'
        });
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
  Swal.fire({
    title: 'Procesando pedido...',
    text: 'Por favor espera',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

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
  const puntosAGanar = this.calcularTotalPuntos();
  this.puntosService.obtenerTodosQR().subscribe(qrs => {
    let qr = qrs.find(qr => qr.comprador && qr.comprador.id_Comprador === this.idComprador);
    if (qr) {
      qr.cantidadPuntos += puntosAGanar;
      this.puntosService.actualizarQR(qr).subscribe(() => {
        this.finalizarPedido();
      });
    } else {
      const nuevoQR = {
        cantidadPuntos: puntosAGanar,
        caducidad: "2025-12-31",
        comprador: { id_Comprador: this.idComprador }
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
      Swal.close(); // Cierra el de cargando
      Swal.fire({
        icon: 'success',
        title: '¡Pedido realizado!',
        text: 'Tu pedido fue registrado correctamente.',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn-anadir'
        },
        buttonsStyling: false,
        iconColor: '#E6BC50',
        timer: 2000,
        timerProgressBar: true
      });
      this.productosCarrito = [];
      this.carritoService.limpiarCarrito?.();
      this.puntosService.obtenerTodosQR().subscribe(qrs => {
        this.puntosDisponibles = qrs
          .filter(qr => qr.comprador && qr.comprador.id_Comprador === this.idComprador)
          .reduce((acc, qr) => acc + qr.cantidadPuntos, 0);
      });
      this.puntosUsados = 0;
    },
    error: (err) => {
      Swal.close(); // Cierra el de cargando
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al realizar el pedido',
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
}

