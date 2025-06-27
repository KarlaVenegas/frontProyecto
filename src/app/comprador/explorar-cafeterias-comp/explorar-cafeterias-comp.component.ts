import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cafeteria } from '../../models/cafeteria';
import { CafeteriaService } from '../../services/cafeteria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explorar-cafeterias-comp',
  templateUrl: './explorar-cafeterias-comp.component.html',
  imports: [CommonModule],
  styleUrls: ['./explorar-cafeterias-comp.component.css']
})
export class ExplorarCafeteriasCompComponent implements OnInit {
  cafeterias: Cafeteria[] = [];

  constructor(private router: Router, private cafeteriaService: CafeteriaService) {}

  ngOnInit() {
    this.cafeteriaService.getCafeterias().subscribe(
      (data: Cafeteria[]) => {
        this.cafeterias = data;
      },
      (error: any) => {
        console.error('Error fetching cafeterias:', error);
      }
    );
  }

  irAlMenu(id: number) {
    this.router.navigate(['/comprador/menuCafe', { id: id }]);
  }
}
