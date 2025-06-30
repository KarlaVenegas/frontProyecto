import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {
  tipo: 'cafeteria' | 'comprador' | null = null;
  form: FormGroup | null = null;
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cafeteriaService: CafeteriaService,
    private router: Router
  ) {}

  seleccionar(tipo: 'cafeteria' | 'comprador') {
    this.tipo = tipo;
    this.errorMessage = null;

    if (tipo === 'cafeteria') {
      this.form = this.fb.group({
        nombreCafeteria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        horarioApertura: ['08:00', Validators.required],
        horarioCierre: ['18:00', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]]
      });
    } else {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', Validators.required]
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.errorMessage = null;
  }

  enviar() {
    if (this.tipo === 'cafeteria' && this.form && this.form.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const formData = new FormData();
      const horaApertura = this.form.get('horarioApertura')?.value || '08:00';
      const horaCierre = this.form.get('horarioCierre')?.value || '18:00';

      formData.append('nombre', this.form.get('nombreCafeteria')?.value);
      formData.append('ubicacion', this.form.get('ubicacion')?.value);
      formData.append('horaInicio', `${horaApertura}:00`);
      formData.append('horaFin', `${horaCierre}:00`);
      formData.append('correo', this.form.get('correo')?.value);
      formData.append('contrasenia', this.form.get('contrasena')?.value);

      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile);
      }

      this.cafeteriaService.registrarCafeteria(formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.status === 201 || response.body?.includes('éxito')) {
            alert('¡Registro exitoso! Serás redirigido al login.');
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error en el registro:', err);

          if (err.status === 201 || err.message?.includes('201')) {
            alert('¡Registro exitoso! Serás redirigido al login.');
            this.router.navigate(['/login']);
            return;
          }

          if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else if (err.message) {
            this.errorMessage = err.message;
          } else {
            this.errorMessage = 'Error desconocido al registrar la cafetería';
          }
        }
      });
    }
  }
}
