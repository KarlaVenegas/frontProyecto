import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CompradorService } from '../../services/comprador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-cuenta.component.html',
  styleUrl: './actualizar-cuenta.component.css'
})
export class ActualizarCuentaComponent {

  nuevoCorreo: string = '';
  nuevaClave: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private compradorService: CompradorService // Inyecta el servicio
  ) {}

  comprador: any = {};

ngOnInit() {
  this.compradorService.obtenerCompradorPorId(1).subscribe(data => {
    this.comprador = data;
    this.nuevoCorreo = data.correo;
  });
}

  goBack(): void {
    this.location.back();
  }

  irA() {
    this.router.navigate(['/comprador/miCuenta']);
  }

  guardar() {
  const idComprador = 1; // O el id real del comprador
  const datosActualizados = {
    nombre: this.comprador.nombre,
    apellidoPaterno: this.comprador.apellidoPaterno,
    apellidoMaterno: this.comprador.apellidoMaterno,
    correo: this.nuevoCorreo,
    contrasenia: this.nuevaClave
  };

  this.compradorService.actualizarComprador(idComprador, datosActualizados)
    .subscribe({
      next: () => {
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
        }).then(() => {
          this.router.navigate(['/comprador/miCuenta']);
        });
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
          iconColor: '#E6BC50'  // <- aquí se cambia el color de la flechita
        });
      }
    });
}


}
