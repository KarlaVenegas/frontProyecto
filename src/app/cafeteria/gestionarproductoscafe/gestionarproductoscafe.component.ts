import { Component, OnInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-gestionarproductoscafe',
  imports: [],
  templateUrl: './gestionarproductoscafe.component.html',
  styleUrl: './gestionarproductoscafe.component.css'
})
export class GestionarproductoscafeComponent {
  modal: any;

  ngOnInit(): void {
    const modalElement = document.getElementById('productoModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  abrirModal(): void {
    this.modal.show();
  }
}
