import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
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
  idComprador: number = 0;
  comprador: any = {};

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    this.nuevoCorreo = perfil.correo || '';
    this.idComprador = perfil.id_Comprador || 0;
  }

  ngOnInit(): void {
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    this.comprador = perfil;
    this.nuevoCorreo = perfil.correo || '';
    this.idComprador = perfil.id_Comprador || 0;
  }

  goBack(): void {
    this.location.back();
  }

  irA(): void {
    this.router.navigate(['/comprador/miCuenta']);
  }

  guardar(): void {
  const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');

  const dataActualizada = {
    nombre: perfil.nombre,
    apellidoPaterno: perfil.apellidoPaterno,
    apellidoMaterno: perfil.apellidoMaterno,
    correo: this.nuevoCorreo,
    contrasenia: this.nuevaClave
  };

  // Mostrar loader
  Swal.fire({
    title: 'Actualizando datos...',
    text: 'Por favor espera',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  this.authService.actualizarComprador(this.idComprador, dataActualizada).subscribe({
    next: (response) => {
      const perfilMin = {
        id_Comprador: response.id_Comprador,
        nombre: response.nombre,
        apellidoPaterno: response.apellidoPaterno,
        apellidoMaterno: response.apellidoMaterno,
        correo: response.correo
      };
      localStorage.setItem('perfil', JSON.stringify(perfilMin));
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: '¡Datos actualizados!',
        text: 'Tus datos se actualizaron correctamente.',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn-anadir'
        },
        buttonsStyling: false,
        iconColor: '#E6BC50',
        timer: 2000,
        timerProgressBar: true
      });
      this.router.navigate(['/comprador/miCuenta']);
    },
    error: (error) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al actualizar los datos',
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn-anadir'
        },
        buttonsStyling: false,
        iconColor: '#E74C3C'
      });
      console.error('Error al actualizar:', error);
    }
  });
}
}
