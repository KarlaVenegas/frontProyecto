import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

      if (this.idCafeteria) {
        this.cargarProductos();
      } else {
        console.error('ID de cafetería inválido');
      }
    } else {
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
      },
      error: (err) => console.error('Error al cargar productos:', err)
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
      // Imagen vacía: obligatorio mandar el campo
      formData.append('imagen', new Blob(), '');
    }



    if (this.productoEditando) {
      // ACTUALIZACIÓN
      this.productoService.actualizarProducto(this.productoEditando.id_producto, formData).subscribe({
        next: () => {
          this.modal.hide();
          this.productoEditando = null;
          this.cargarProductos();
        },
        error: (err) => console.error('Error al actualizar producto:', err)
      });
    } else {
      // CREACIÓN
      this.productoService.crearProducto(formData).subscribe({
        next: () => {
          this.modal.hide();
          this.cargarProductos();
        },
        error: (err) => console.error('Error al guardar producto:', err)
      });
    }
  }


  eliminarProducto(id: number): void {
    if (!id) {
      console.error('ID inválido para eliminación');
      return;
    }

    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al eliminar producto:', err)
      });
    }
  }

}
