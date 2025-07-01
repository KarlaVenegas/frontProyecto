import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CafeteriaService } from '../../services/cafeteria.service';
import { CompradorService } from '../../services/comprador.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

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
    private compradorService: CompradorService,
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
        apellidoMaterno: [''],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.errorMessage = null;
  }

  enviar() {
  if (this.form && this.form.valid) {
    this.isLoading = true;
    this.errorMessage = null;

    Swal.fire({
      title: 'Registrando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    if (this.tipo === 'cafeteria') {
      this.registrarCafeteria();
    } else {
      this.registrarComprador();
    }
  }
}

  private registrarCafeteria() {
    const formData = new FormData();
    const horaApertura = this.form?.get('horarioApertura')?.value || '08:00';
    const horaCierre = this.form?.get('horarioCierre')?.value || '18:00';

    formData.append('nombre', this.form?.get('nombreCafeteria')?.value);
    formData.append('ubicacion', this.form?.get('ubicacion')?.value);
    formData.append('horaInicio', `${horaApertura}:00`);
    formData.append('horaFin', `${horaCierre}:00`);
    formData.append('correo', this.form?.get('correo')?.value);
    formData.append('contrasenia', this.form?.get('contrasena')?.value);

    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    this.cafeteriaService.registrarCafeteria(formData).subscribe({
      next: (response: any) => this.handleSuccess(response),
      error: (err) => this.handleError(err)
    });
  }

  private registrarComprador() {
    const compradorData = {
      nombre: this.form?.get('nombre')?.value,
      apellidoPaterno: this.form?.get('apellidoPaterno')?.value,
      apellidoMaterno: this.form?.get('apellidoMaterno')?.value || null,
      correo: this.form?.get('correo')?.value,
      contrasenia: this.form?.get('contrasena')?.value
    };

    this.compradorService.registrarComprador(compradorData).subscribe({
      next: (response: any) => this.handleSuccess(response),
      error: (err) => this.handleError(err)
    });
  }

  private handleSuccess(response: any) {
  this.isLoading = false;
  Swal.close();
  Swal.fire({
    icon: 'success',
    title: '¡Registro exitoso!',
    text: 'Serás redirigido al login.',
    confirmButtonText: 'Aceptar',
    customClass: {
      confirmButton: 'btn-anadir'
    },
    buttonsStyling: false,
    iconColor: '#E6BC50',
    timer: 2000,
    timerProgressBar: true
  }).then(() => {
    this.router.navigate(['/login']);
  });
}

  private handleError(err: any) {
  this.isLoading = false;
  Swal.close();
  console.error('Error en el registro:', err);

  if (err.error?.message) {
    this.errorMessage = err.error.message;
  } else if (err.message) {
    this.errorMessage = err.message;
  } else {
    this.errorMessage = 'Error desconocido al registrar';
  }

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: String(this.errorMessage), 
    confirmButtonText: 'Aceptar',
    customClass: {
      confirmButton: 'btn-anadir'
    },
    buttonsStyling: false,
    iconColor: '#E74C3C'
  });
}
}
