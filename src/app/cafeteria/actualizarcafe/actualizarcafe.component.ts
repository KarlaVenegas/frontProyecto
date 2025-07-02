import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizarcafe',
  standalone: true,
  templateUrl: './actualizarcafe.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./actualizarcafe.component.css']
})
export class ActualizarcafeComponent implements OnInit {
  form: FormGroup;
  idCafeteria: number = 0;
  nombreCafeteria: string = '';
  ubicacion: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    this.form = this.fb.group({
      horaApertura: ['', Validators.required],
      horaCierre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const perfil = this.obtenerPerfilLocalStorage();
    if (perfil) {
      this.idCafeteria = perfil.idCafeteria;
      this.nombreCafeteria = perfil.nombre;
      this.ubicacion = perfil.ubicacion;
      this.cargarDatosCafeteria();
    }
  }

  private obtenerPerfilLocalStorage(): any {
    try {
      const perfilStr = localStorage.getItem('perfil');
      return perfilStr ? JSON.parse(perfilStr) : null;
    } catch (e) {
      console.error('Error al parsear perfil', e);
      return null;
    }
  }

  private cargarDatosCafeteria(): void {
    this.authService.getCafeteriaById(this.idCafeteria).subscribe({
      next: (cafeteria) => {
        this.form.patchValue({
          horaApertura: this.formatTimeForInput(cafeteria.hora_inicio),
          horaCierre: this.formatTimeForInput(cafeteria.hora_fin),
          correo: cafeteria.correo
        });
      },
      error: (err) => {
        console.error('Error:', err);
        Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
      }
    });
  }

  private formatTimeForInput(timeString: string): string {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  }

  goBack(): void {
    this.location.back();
  }

  guardar(): void {
  if (this.form.valid) {
    Swal.fire({
      title: 'Actualizando datos...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
      customClass: {
        confirmButton: 'btn-anadir'
      },
      buttonsStyling: false,
      iconColor: '#E6BC50'
    });

    const datosActualizados = {
      nombre: this.nombreCafeteria,
      ubicacion: this.ubicacion,
      hora_inicio: this.form.value.horaApertura,
      hora_fin: this.form.value.horaCierre,
      correo: this.form.value.correo,
      contrasenia: this.form.value.contrasena
    };

    this.authService.actualizarCafeteria(this.idCafeteria, datosActualizados).subscribe({
      next: (response) => {
        this.actualizarPerfilLocalStorage(response);
        Swal.fire({
          icon: 'success',
          title: '¡Datos actualizados!',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn-anadir'
          },
          buttonsStyling: false,
          iconColor: '#E6BC50',
          timer: 2000
        }).then(() => {
          this.router.navigate(['/cafeteria/miCuentaCafe']);
        });
      },
      error: (err) => {
        console.error('Error completo:', err);
        let errorMessage = 'Error al actualizar los datos';
        if (err.error) {
          errorMessage += `: ${err.error.message || err.error.error || JSON.stringify(err.error)}`;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          footer: `Código: ${err.status}`,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn-anadir'
          },
          buttonsStyling: false,
          iconColor: '#E6BC50'
        });
      }
    });
  } else {
    this.form.markAllAsTouched();
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor completa todos los campos requeridos',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn-anadir'
      },
      buttonsStyling: false,
      iconColor: '#E6BC50'
    });
  }
}

  private actualizarPerfilLocalStorage(response: any): void {
    try {
      const perfilActual = this.obtenerPerfilLocalStorage();
      if (perfilActual) {
        const perfilActualizado = {
          ...perfilActual,
          correo: response.correo || this.form.value.correo,
          hora_inicio: response.hora_inicio || this.form.value.horaApertura + ':00',
          hora_fin: response.hora_fin || this.form.value.horaCierre + ':00'
        };
        localStorage.setItem('perfil', JSON.stringify(perfilActualizado));
      }
    } catch (e) {
      console.error('Error actualizando localStorage:', e);
    }
  }
}
