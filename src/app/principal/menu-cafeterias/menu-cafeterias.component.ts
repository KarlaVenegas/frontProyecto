import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-cafeterias',
  imports: [],
  templateUrl: './menu-cafeterias.component.html',
  styleUrl: './menu-cafeterias.component.css'
})
export class MenuCafeteriasComponent {
  constructor (private location: Location){}
  goBack(): void {
      this.location.back();
  }

}
