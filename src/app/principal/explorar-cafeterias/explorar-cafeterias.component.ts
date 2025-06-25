import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorar-cafeterias',
  imports: [],
  templateUrl: './explorar-cafeterias.component.html',
  styleUrl: './explorar-cafeterias.component.css'
})
export class ExplorarCafeteriasComponent {
  constructor(private router: Router) {}

  irAlMenu() {
    this.router.navigate(['/menuCafeIni']);
  }

}
