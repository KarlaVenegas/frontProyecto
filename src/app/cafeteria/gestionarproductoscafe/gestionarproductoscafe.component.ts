import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-gestionarproductoscafe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './gestionarproductoscafe.component.html',
  styleUrls: ['./gestionarproductoscafe.component.css']
})
export class GestionarproductoscafeComponent implements OnInit {
  modal: any;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productoForm!: FormGroup;
  formBuscador!: FormGroup;
  idCafeteria: number | null = null;
  productoEditando: Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  const perfil = localStorage.getItem('perfil');
  if (perfil) {
    const parsedPerfil = JSON.parse(perfil);
    this.idCafeteria = parsedPerfil.idCafeteria;

    Swal.fire({
      title: 'Cargando productos...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    if (this.idCafeteria) {
      this.cargarProductos();
    } else {
      Swal.close();
      console.error('ID de cafetería inválido');
    }
  } else {
    Swal.close();
    console.error('Perfil no encontrado en localStorage');
  }

  const modalElement = document.getElementById('productoModal');
  if (modalElement) this.modal = new bootstrap.Modal(modalElement);

  this.productoForm = this.fb.group({
    nombre: ['', Validators.required],
    precio: [0, Validators.required],
    stock: [0, Validators.required],
    imagen: [null]
  });

  this.formBuscador = this.fb.group({
    nombreCafeteria: ['']
  });

  this.formBuscador.get('nombreCafeteria')?.valueChanges.subscribe((valor: string) => {
    this.filtrarProductos(valor);
  });
}

  cargarProductos(): void {
  if (!this.idCafeteria) return;

  this.productoService.getProductos().subscribe({
    next: (data) => {
      this.productos = data.filter(p => p.cafeteria?.idCafeteria === this.idCafeteria);
      this.productosFiltrados = [...this.productos];
      Swal.close(); // <-- CIERRA EL SWEETALERT AQUÍ
    },
    error: (err) => {
      Swal.close(); // <-- Y TAMBIÉN AQUÍ
      console.error('Error al cargar productos:', err);
    }
  });
}

  filtrarProductos(valor: string): void {
    const filtro = valor.toLowerCase();
    this.productosFiltrados = this.productos.filter(p =>
      p.nombreProducto.toLowerCase().includes(filtro)
    );
  }

  abrirModal(producto?: Producto): void {
    this.productoForm.reset();
    this.productoEditando = producto || null;

    if (producto) {
      this.productoForm.patchValue({
        nombre: producto.nombreProducto,
        precio: producto.precio,
        stock: producto.stock
      });
    }

    this.modal.show();
  }

  guardarProducto(): void {
  if (!this.idCafeteria) return;

  const formData = new FormData();
  formData.append('nombreProducto', this.productoForm.value.nombre);
  formData.append('precio', this.productoForm.value.precio.toString());
  formData.append('precioPuntos', '0');
  formData.append('stock', this.productoForm.value.stock.toString());
  formData.append('idCafeteria', this.idCafeteria.toString());

  const fileInput = document.getElementById('formFile') as HTMLInputElement;
  if (fileInput?.files?.length) {
    formData.append('imagen', fileInput.files[0]);
  } else {
    formData.append('imagen', new Blob(), '');
  }

  if (this.productoEditando) {
    this.productoService.actualizarProducto(this.productoEditando.id_producto, formData).subscribe({
      next: () => {
        this.modal.hide();
        this.productoForm.reset();
        this.productoEditando = null;
        this.cargarProductos();
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'Datos actualizados correctamente.',
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn-anadir'
            },
            buttonsStyling: false,
            iconColor: '#E6BC50'
          });
        }, 300);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar los datos.',
          confirmButtonText: 'Intentar de nuevo',
          customClass: {
            confirmButton: 'btn-anadir'
          },
          buttonsStyling: false,
          iconColor: '#E6BC50'
        });
      }
    });
  } else {
    this.productoService.crearProducto(formData).subscribe({
      next: () => {
        this.modal.hide();
        this.productoForm.reset();
        this.cargarProductos(); // <-- Recarga productos después de agregar
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'Producto guardado correctamente.',
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn-anadir'
            },
            buttonsStyling: false,
            iconColor: '#E6BC50'
          });
        }, 300);
      },
      error: () => {
        this.modal.hide();
        this.productoForm.reset();
        this.cargarProductos(); // <-- Recarga productos también en caso de error
        // Ya no se muestra ningún alert de error al agregar producto
      }
    });
  }
}


  eliminarProducto(id: number): void {
  if (!id) {
    console.error('ID inválido para eliminación');
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el producto de forma permanente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'btn-anadir',
      cancelButton: 'btn-cancelar'
    },
    buttonsStyling: false,
    iconColor: '#E6BC50'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Procesando...',
        text: 'Eliminando producto, por favor espera',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.cargarProductos();
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'Producto eliminado correctamente.',
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn-anadir'
            },
            buttonsStyling: false,
            iconColor: '#E6BC50'
          });
        },
        error: () => {
          this.cargarProductos();
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al eliminar el producto.',
            confirmButtonText: 'Intentar de nuevo',
            customClass: {
              confirmButton: 'btn-anadir'
            },
            buttonsStyling: false,
            iconColor: '#E6BC50'
          });
        }
      });
    }
  });
}

}
