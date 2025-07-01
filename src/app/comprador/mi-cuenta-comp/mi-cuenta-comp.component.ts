import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta-comp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta-comp.component.html',
  styleUrl: './mi-cuenta-comp.component.css'
})
export class MiCuentaCompComponent implements OnInit {
  nombre = '';
  apellidoPaterno = '';
  apellidoMaterno = '';
  correo = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const perfilString = localStorage.getItem('perfil');
    if (perfilString) {
      const perfil = JSON.parse(perfilString);
      this.nombre = perfil.nombre || '';
      this.apellidoPaterno = perfil.apellidoPaterno || '';
      this.apellidoMaterno = perfil.apellidoMaterno || '';
      this.correo = perfil.correo || '';
    }
  }

  irActualizar(): void {
    this.router.navigate(['/comprador/actualizarCuenta']);
  }
}
