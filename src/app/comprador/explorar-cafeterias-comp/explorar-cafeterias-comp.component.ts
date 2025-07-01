import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Cafeteria } from '../../models/cafeteria';

@Component({
  selector: 'app-explorar-cafeterias-comp',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './explorar-cafeterias-comp.component.html',
  styleUrl: './explorar-cafeterias-comp.component.css'
})
export class ExplorarCafeteriasCompComponent implements OnInit {
  cafeterias: Cafeteria[] = [];
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private cafeteriaService: CafeteriaService
  ) {}

  ngOnInit(): void {
    // Obtener nombre del localStorage
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    this.nombreUsuario = perfil.nombre || 'Usuario';

    this.cafeteriaService.getCafeterias().subscribe(data => {
      this.cafeterias = data.sort((a, b) => {
        // Si hora_inicio es string tipo "08:00", conviértelo a número para comparar
        const horaA = a.hora_inicio;
        const horaB = b.hora_inicio;
        return horaA.localeCompare(horaB);
      });
    });
  }

  irAlMenu(id: number) {
    this.router.navigate(['/comprador/menuCafe', id]);
  }
}
