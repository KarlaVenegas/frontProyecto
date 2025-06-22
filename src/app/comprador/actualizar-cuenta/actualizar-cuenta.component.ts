import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-cuenta.component.html',
  styleUrl: './actualizar-cuenta.component.css'
})
export class ActualizarCuentaComponent {

  constructor(private router: Router) {}


  nuevoCorreo: string = '';
  nuevaClave: string = '';
  irA(){
    this.router.navigate(['/comprador/miCuenta']);
  }

  guardar() {
    console.log('Guardar cambios:', this.nuevoCorreo, this.nuevaClave);
    this.router.navigate(['/comprador/miCuenta']);
    // backend
  }

}
