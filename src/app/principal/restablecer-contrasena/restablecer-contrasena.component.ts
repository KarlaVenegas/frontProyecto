import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.css'],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class RestablecerContrasenaComponent implements OnInit {
  passwordForm!: FormGroup;
  token: string | null = null;
  mensaje: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    this.passwordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;"\'<>,.?/~`]).+$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.passwordForm.valid && this.token) {
      const nuevaContrasena = this.passwordForm.get('password')?.value;

      this.http.post('https://backend-o9xo.onrender.com/apiComprador/comprador/restablecer', {
        token: this.token,
        nuevaContrasena: nuevaContrasena
      }).subscribe({
        next: () => {
          this.mensaje = 'Contraseña actualizada con éxito.';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al restablecer la contraseña.';
        }
      });
    }
  }
}
