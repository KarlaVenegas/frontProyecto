import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-nav-bar-comprador',
  standalone: true,
  imports: [RouterModule, CommonModule],  // 👈 IMPORTANTE
  templateUrl: './nav-bar-comprador.component.html',
  styleUrl: './nav-bar-comprador.component.css'
})
export class NavBarCompradorComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }
}
