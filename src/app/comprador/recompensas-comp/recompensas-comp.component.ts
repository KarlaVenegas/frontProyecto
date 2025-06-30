import { Component } from '@angular/core';
import { PuntosService } from '../../services/puntos.service';
import { CompradorService } from '../../services/comprador.service'; // <-- Importa el servicio

@Component({
  selector: 'app-recompensas-comp',
  imports: [],
  templateUrl: './recompensas-comp.component.html',
  styleUrl: './recompensas-comp.component.css'
})
export class RecompensasCompComponent {
  comprador: any = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: ''
  };
  puntosDisponibles: number = 0;

  constructor(
    private puntosService: PuntosService,
    private compradorService: CompradorService // <-- Inyéctalo aquí
  ) {}

  ngOnInit() {
  this.compradorService.obtenerCompradorPorId(1).subscribe(data => {
    this.comprador = data;
  });

  this.puntosService.obtenerTodosQR().subscribe(qrs => {
  console.log('QRs recibidos:', qrs);
  this.puntosDisponibles = qrs
    .filter(qr => qr.comprador && qr.comprador.id_Comprador === 1)
    .reduce((acc, qr) => acc + qr.cantidadPuntos, 0);
  console.log('Puntos disponibles:', this.puntosDisponibles);
});
}
}
