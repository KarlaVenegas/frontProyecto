import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-com',
  imports: [],
  templateUrl: './menu-com.component.html',
  styleUrl: './menu-com.component.css'
})
export class MenuComComponent {

  constructor (private location: Location){}
  goBack(): void {
      this.location.back();
    }
}
