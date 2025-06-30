import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CompradorService } from '../../services/comprador.service';

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
        alert('Datos actualizados correctamente');
        this.router.navigate(['/comprador/miCuenta']);
      },
      error: () => {
        alert('Error al actualizar los datos');
      }
    });
}
}
