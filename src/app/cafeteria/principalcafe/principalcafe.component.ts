import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-principalcafe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './principalcafe.component.html',
  styleUrls: ['./principalcafe.component.css']
})
export class PrincipalcafeComponent implements OnInit {
  nombreCafeteria: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosCafeteria();
  }

  private cargarDatosCafeteria(): void {
    const perfilStr = localStorage.getItem('perfil');
    if (perfilStr) {
      try {
        const perfil = JSON.parse(perfilStr);
        this.nombreCafeteria = perfil.nombre || 'Cafetería';

        // Verificar si necesitamos cargar datos adicionales
        if (perfil.idCafeteria && !perfil.ubicacion) {
          this.authService.getCafeteriaById(perfil.idCafeteria).subscribe({
            next: (cafeteria) => {
              const perfilCompleto = {
                ...perfil,
                ubicacion: cafeteria.ubicacion,
                hora_inicio: cafeteria.hora_inicio,
                hora_fin: cafeteria.hora_fin
              };
              localStorage.setItem('perfil', JSON.stringify(perfilCompleto));
            },
            error: (err) => console.error('Error cargando datos cafetería:', err)
          });
        }
      } catch (e) {
        console.error('Error parseando perfil:', e);
      }
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
