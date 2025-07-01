import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta-comp',
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta-comp.component.html',
  styleUrl: './mi-cuenta-comp.component.css'
})
export class MiCuentaCompComponent {
  constructor(private router: Router) {}

irActualizar() {
  this.router.navigate(['/comprador/actualizarCuenta']);

  }

}
