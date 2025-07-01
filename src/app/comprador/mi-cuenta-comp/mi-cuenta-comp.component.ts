import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta-comp',
  templateUrl: './mi-cuenta-comp.component.html',
  styleUrls: ['./mi-cuenta-comp.component.css']
})
export class MiCuentaCompComponent implements OnInit {

  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  correo: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const perfil = localStorage.getItem('perfil');
    if (perfil) {
      const datos = JSON.parse(perfil);
      this.nombre = datos.nombre;
      this.apellidoPaterno = datos.apellidoPaterno;
      this.apellidoMaterno = datos.apellidoMaterno;
      this.correo = datos.correo;
    }
  }

  irActualizar(): void {
    this.router.navigate(['/comprador/actualizarCuenta']);
  }
}
