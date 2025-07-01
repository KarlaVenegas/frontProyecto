import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cafeteria } from '../../models/cafeteria';
import { CafeteriaService } from '../../services/cafeteria.service';

@Component({
  selector: 'app-explorar-cafeterias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorar-cafeterias.component.html',
  styleUrls: ['./explorar-cafeterias.component.css']
})
export class ExplorarCafeteriasComponent implements OnInit {
  cafeterias: Cafeteria[] = [];

  constructor(
    private router: Router,
    private cafeteriaService: CafeteriaService
  ) {}

  ngOnInit(): void {
    this.cafeteriaService.getCafeterias().subscribe(data => {
      this.cafeterias = data.sort((a, b) =>
        a.hora_inicio.localeCompare(b.hora_inicio)
      );
    });
  }

  irAlMenu(idCafeteria: number): void {
    this.router.navigate(['/menuCafeIni', idCafeteria]);
  }
}
