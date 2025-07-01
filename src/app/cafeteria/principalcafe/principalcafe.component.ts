import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principalcafe',
  templateUrl: './principalcafe.component.html',
  styleUrls: ['./principalcafe.component.css']
})
export class PrincipalcafeComponent implements OnInit {
  nombreCafeteria: string = '';

  ngOnInit(): void {
    const perfil = JSON.parse(localStorage.getItem('perfil') || '{}');
    this.nombreCafeteria = perfil.nombre || 'Cafetería';
  }
}
