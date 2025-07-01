import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

    this.authService.actualizarComprador(this.idComprador, dataActualizada).subscribe({
      next: (response) => {
        localStorage.setItem('perfil', JSON.stringify(response));
        alert('Datos actualizados correctamente');
        this.router.navigate(['/comprador/miCuenta']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Ocurrió un error al actualizar los datos');
      }
    });
  }
}
