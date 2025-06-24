import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-nav-bar-principal',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './nav-bar-principal.component.html',
  styleUrl: './nav-bar-principal.component.css'
})
export class NavBarPrincipalComponent {

}
