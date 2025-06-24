import { Component, OnInit } from '@angular/core';
  import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
    ReactiveFormsModule
} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

  @Component({
    selector: 'app-cambiar-contrasena',
    templateUrl: './cambiar-contrasena.component.html',
    imports: [
      ReactiveFormsModule,
      NgIf,
      NgClass
    ],
    styleUrls: ['./cambiar-contrasena.component.css']
  })
  export class CambiarContrasenaComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;"\'<>,.?/~`]).+$')
        ]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordsMatchValidator });
    }

    passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    }

    onSubmit(): void {
      if (this.loginForm.valid) {
        // Lógica para cambiar la contraseña
        console.log(this.loginForm.value);
      }
    }
  }
