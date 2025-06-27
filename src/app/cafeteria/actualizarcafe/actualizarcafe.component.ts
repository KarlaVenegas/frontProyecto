import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizarcafe',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './actualizarcafe.component.html',
  styleUrl: './actualizarcafe.component.css'
})
export class ActualizarcafeComponent {
  form: FormGroup;

  constructor(private router: Router,
    private location: Location,
    private fb: FormBuilder) {
      this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      horaApertura: ['', Validators.required],
      horaCierre: ['', Validators.required]
    });
    }

  goBack(): void {
      this.location.back();
  }

  irA(){
    this.router.navigate(['/cafeteria/miCuentaCafe']);
  }

  guardar() {
    if (this.form.valid) {
      console.log('Guardar cambios:', this.form.value);
      this.router.navigate(['/cafeteria/miCuentaCafe']);
      // backend
    } else {
      console.log('Formulario inválido');
      this.form.markAllAsTouched();
    }
  }

}
