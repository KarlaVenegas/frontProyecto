import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginRequest, LoginResponse } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],  // cambiamos el nombre
      contrasenia: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const loginData: LoginRequest = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        console.log('Respuesta login:', response); // 👈 Agregado
        localStorage.setItem('usuario', JSON.stringify(response));

        if (response.tipo === 'cafeteria') {
          this.authService.getCafeteriaById(response.id).subscribe(cafeteria => {
            console.log('Cafetería obtenida:', cafeteria); // 👈 Agregado
            localStorage.setItem('perfil', JSON.stringify(cafeteria));
            this.router.navigate(['/cafeteria/']);
          });
        } else {
          this.authService.getCompradorById(response.id).subscribe(comprador => {
            console.log('Comprador obtenido:', comprador); // 👈 Agregado
            localStorage.setItem('perfil', JSON.stringify(comprador));
            this.router.navigate(['/comprador/']);
          });
        }
      },
      error: () => {
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    });
  }


}
