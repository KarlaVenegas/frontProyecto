import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-micuentacafe',
  templateUrl: './micuentacafe.component.html',
  styleUrls: ['./micuentacafe.component.css']
})
export class MicuentacafeComponent implements OnInit {
  nombre: string = '';
  ubicacion: string = '';
  horaApertura: string = '';
  horaCierre: string = '';
  correo: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarDatosCafeteria();
  }

  cargarDatosCafeteria(): void {
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    if (perfil.idCafeteria) {
      this.authService.getCafeteriaById(perfil.idCafeteria).subscribe({
        next: (cafeteria) => {
          this.nombre = cafeteria.nombre;
          this.ubicacion = cafeteria.ubicacion;
          this.horaApertura = this.formatearHora(cafeteria.hora_inicio);
          this.horaCierre = this.formatearHora(cafeteria.hora_fin);
          this.correo = cafeteria.correo;
        },
        error: (err) => console.error('Error al cargar datos:', err)
      });
    }
  }

  private formatearHora(hora: string): string {
    // Convierte formato 24h a 12h (07:30 -> 7:30 am)
    const [horas, minutos] = hora.split(':');
    const horaNum = parseInt(horas);
    return `${horaNum % 12 || 12}:${minutos} ${horaNum < 12 ? 'am' : 'pm'}`;
  }

  irActualizar(): void {
    this.router.navigate(['/cafeteria/actualizarCafe']);
  }

  eliminarCuenta(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E6BC50',
      cancelButtonColor: '#B48B37',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
        this.authService.eliminarCafeteria(perfil.idCafeteria).subscribe({
          next: () => {
            localStorage.clear();
            this.router.navigate(['/login']);
            Swal.fire('Cuenta eliminada', '', 'success');
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar la cuenta', 'error');
            console.error(err);
          }
        });
      }
    });
  }
}
