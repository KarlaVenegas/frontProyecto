import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-micuentacafe',
  imports: [],
  templateUrl: './micuentacafe.component.html',
  styleUrl: './micuentacafe.component.css'
})
export class MicuentacafeComponent {
  constructor(private router: Router) {}

  irActualizar() {
    this.router.navigate(['/cafeteria/actualizarCafe']);

  }

}
