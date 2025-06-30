import { Component, OnInit } from '@angular/core';
import { CompradorService } from '../../services/comprador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta-comp',
  templateUrl: './mi-cuenta-comp.component.html',
  styleUrls: ['./mi-cuenta-comp.component.css']
})
export class MiCuentaCompComponent implements OnInit {
  comprador: any = {};

  constructor(private compradorService: CompradorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.compradorService.obtenerCompradorPorId(1).subscribe(data => {
      this.comprador = data;
    });
  }

  irActualizar() {
    this.router.navigate(['/comprador/actualizarCuenta']);
  }
}
