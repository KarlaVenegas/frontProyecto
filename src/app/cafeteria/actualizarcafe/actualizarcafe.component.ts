import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizarcafe',
  standalone: true,
  templateUrl: './actualizarcafe.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
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
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      horaApertura: ['', Validators.required],
      horaCierre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const perfilStr = localStorage.getItem('perfil');
    if (perfilStr) {
      try {
        const perfil = JSON.parse(perfilStr);
        this.idCafeteria = perfil.idCafeteria || 0;
        this.nombreCafeteria = perfil.nombre || 'Cafetería';
        this.ubicacion = perfil.ubicacion || '';

        if (this.idCafeteria) {
          this.cargarDatosCafeteria();
        }
      } catch (e) {
        console.error('Error parsing perfil from localStorage', e);
      }
    }
  }

  private cargarDatosCafeteria(): void {
    this.authService.getCafeteriaById(this.idCafeteria).subscribe({
      next: (cafeteria) => {
        this.form.patchValue({
          horaApertura: cafeteria.hora_inicio || '',
          horaCierre: cafeteria.hora_fin || '',
          correo: cafeteria.correo || ''
        });
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        Swal.fire('Error', 'No se pudieron cargar los datos de la cafetería', 'error');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  guardar(): void {
    if (this.form.valid) {
      Swal.fire({
        title: 'Actualizando datos...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const datosActualizados = {
        horaInicio: this.form.value.horaApertura,
        horaFin: this.form.value.horaCierre,
        correo: this.form.value.correo,
        contrasenia: this.form.value.contrasena
      };

      this.authService.actualizarCafeteria(this.idCafeteria, datosActualizados).subscribe({
        next: (response) => {
          this.actualizarPerfilLocalStorage(response);
          Swal.fire({
            icon: 'success',
            title: 'Datos actualizados',
            timer: 2000
          });
          this.router.navigate(['/cafeteria/miCuentaCafe']);
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudieron actualizar los datos', 'error');
          console.error(err);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private actualizarPerfilLocalStorage(response: any): void {
    try {
      const perfilStr = localStorage.getItem('perfil');
      if (perfilStr) {
        const perfil = JSON.parse(perfilStr);
        const perfilActualizado = {
          ...perfil,
          correo: response.correo || perfil.correo
        };
        localStorage.setItem('perfil', JSON.stringify(perfilActualizado));
      }
    } catch (e) {
      console.error('Error updating localStorage', e);
    }
  }
}
