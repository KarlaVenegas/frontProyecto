import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CafeteriaGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario && usuario.tipo === 'cafeteria') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
