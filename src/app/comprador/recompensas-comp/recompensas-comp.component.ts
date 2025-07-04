import { Component } from '@angular/core';
import { PuntosService } from '../../services/puntos.service';
import { CompradorService } from '../../services/comprador.service'; // <-- Importa el servicio
import Swal from 'sweetalert2';

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
    private compradorService: CompradorService
  ) {}

  ngOnInit() {
  Swal.fire({
    title: 'Cargando puntos de tu cuenta...',
    text: 'Por favor espera',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  let compradorListo = false;
  let puntosListos = false;

  // Obtén el id del comprador desde el perfil guardado en localStorage
  const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
  const idComprador = perfil.id_Comprador;

  this.compradorService.obtenerCompradorPorId(idComprador).subscribe(data => {
    this.comprador = data;
    compradorListo = true;
    if (compradorListo && puntosListos) Swal.close();
  });

  this.puntosService.obtenerTodosQR().subscribe(qrs => {
    this.puntosDisponibles = qrs
      .filter(qr => qr.comprador && qr.comprador.id_Comprador === idComprador)
      .reduce((acc, qr) => acc + qr.cantidadPuntos, 0);
    puntosListos = true;
    if (compradorListo && puntosListos) Swal.close();
  });
}
}
