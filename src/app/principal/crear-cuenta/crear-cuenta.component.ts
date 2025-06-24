import { Component } from '@angular/core';
  import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import { ViewEncapsulation } from '@angular/core';


  @Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-crear-cuenta',
    imports: [
      ReactiveFormsModule,
      NgIf,
      NgClass
    ],
    templateUrl: './crear-cuenta.component.html',
    styleUrls: ['./crear-cuenta.component.css']
  })
  export class CrearCuentaComponent {
    tipo: 'cafeteria' | 'comprador' | null = null;
    form: FormGroup | null = null;

    constructor(private fb: FormBuilder) {}

    seleccionar(tipo: 'cafeteria' | 'comprador') {
      this.tipo = null; // Fuerza el reinicio del *ngIf
      setTimeout(() => {
        this.tipo = tipo;
        if (tipo === 'cafeteria') {
          this.form = this.fb.group({
            nombreCafeteria: ['', Validators.required],
            ubicacion: ['', Validators.required],
            horarioApertura: ['', Validators.required],
            horarioCierre: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            contrasena: ['', Validators.required]
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
      });
    }

    enviar() {
      if (this.form && this.form.valid) {
        console.log(this.form.value);
      }
    }
  }
