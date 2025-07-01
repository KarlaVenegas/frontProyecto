import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar-cafeterias',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar-cafeterias.component.html',
  styleUrl: './nav-bar-cafeterias.component.css'
})
export class NavBarCafeteriasComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }
}
