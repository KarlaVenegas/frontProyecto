import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explorar-cafeterias-comp',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './explorar-cafeterias-comp.component.html',
  styleUrl: './explorar-cafeterias-comp.component.css'
})
export class ExplorarCafeteriasCompComponent {
  cafeterias: any[] = [];

  constructor(private router: Router) {}

  irAlMenu(id: number) {
    this.router.navigate(['/comprador/menuCafe']);
  }

}
