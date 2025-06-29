import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorar-cafeterias-comp',
  imports: [],
  templateUrl: './explorar-cafeterias-comp.component.html',
  styleUrl: './explorar-cafeterias-comp.component.css'
})
export class ExplorarCafeteriasCompComponent {

  constructor(private router: Router) {}

  irAlMenu(id: number) {
    this.router.navigate(['/comprador/menuCafe']);
  }

}
