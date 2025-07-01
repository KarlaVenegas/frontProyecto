import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CambiarContrasenaComponent implements OnInit {
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  token: string | null = null;
  mensaje: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    // Formulario para enviar el correo
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Formulario para cambiar la contraseña
    this.passwordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  // Validación personalizada: contraseñas iguales
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  // Enviar correo con token de recuperación
  enviarToken(): void {
    if (this.emailForm.invalid) return;

    const email = this.emailForm.value.email;

    this.http.post(`https://backend-o9xo.onrender.com/apiComprador/comprador/recuperar`, { email }, { responseType: 'text' })
      .subscribe({
        next: res => {
          this.mensaje = 'Correo de recuperación enviado. Revisa tu bandeja de entrada.';
          this.error = '';
        },
        error: err => {
          this.mensaje = '';
          this.error = 'No se encontró el correo en la base de datos.';
        }
      });
  }

  // Enviar nueva contraseña junto con el token
  restablecerContrasena(): void {
    if (this.passwordForm.invalid || !this.token) return;

    const nuevaContrasena = this.passwordForm.value.password;

    this.http.post(`https://https://backend-o9xo.onrender.com/apiComprador/actualizar-contrasena`, {
      token: this.token,
      nuevaContrasena
    }, { responseType: 'text' })
      .subscribe({
        next: res => {
          this.mensaje = 'Contraseña restablecida exitosamente.';
          this.error = '';
        },
        error: err => {
          this.mensaje = '';
          this.error = 'El enlace ha expirado o es inválido.';
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}
