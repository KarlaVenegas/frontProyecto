import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Cafeteria } from '../../models/cafeteria';

@Component({
  selector: 'app-menu-com',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-com.component.html',
  styleUrls: ['./menu-com.component.css']
})
export class MenuComComponent implements OnInit {
  cafeteriaId!: number;
  productos: Producto[] = [];
  cafeteriaNombre: string = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private cafeteriaService: CafeteriaService
  ) {}

  ngOnInit(): void {
    this.cafeteriaId = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos.filter(
        p => p.cafeteria.idCafeteria === this.cafeteriaId
      );
      if (this.productos.length > 0) {
        this.cafeteriaNombre = this.productos[0].cafeteria.nombre;
      } else {
        this.cafeteriaService.getCafeteriaById(this.cafeteriaId).subscribe((cafeteria: Cafeteria) => {
          this.cafeteriaNombre = cafeteria.nombre;
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }


}
