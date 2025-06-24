import { Routes } from '@angular/router';
//Flujo principal
import { NavBarPrincipalComponent } from './NavBars/nav-bar-principal/nav-bar-principal.component';
import {LoginComponent} from './principal/login/login.component';
import {CrearCuentaComponent} from './principal/crear-cuenta/crear-cuenta.component';
import {CambiarContrasenaComponent} from './principal/cambiar-contrasena/cambiar-contrasena.component';


//Comprador flujo
import { NavBarCompradorComponent } from './NavBars/nav-bar-comprador/nav-bar-comprador.component';
import { ExplorarCafeteriasCompComponent } from './comprador/explorar-cafeterias-comp/explorar-cafeterias-comp.component';
import { PedidosCompComponent } from './comprador/pedidos-comp/pedidos-comp.component';
import { RecompensasCompComponent } from './comprador/recompensas-comp/recompensas-comp.component';
import { MiCuentaCompComponent } from './comprador/mi-cuenta-comp/mi-cuenta-comp.component';
import { TuCarritoCompComponent } from './comprador/tu-carrito-comp/tu-carrito-comp.component';
import { MenuComComponent } from './comprador/menu-com/menu-com.component';
//Cafeteria flujo
import { NavBarCafeteriasComponent } from './NavBars/nav-bar-cafeterias/nav-bar-cafeterias.component';
import { ActualizarCuentaComponent } from './comprador/actualizar-cuenta/actualizar-cuenta.component';

export const routes: Routes = [
  {
    path: 'principal',
    component : NavBarPrincipalComponent,
    children:[
      { path: 'login', component: LoginComponent },
      { path: 'crearCuenta', component: CrearCuentaComponent },
      {path: 'cambiarContrasena', component: CambiarContrasenaComponent}
    ]
  },
  {
    path:'comprador',
    component: NavBarCompradorComponent,
    children:[
      { path: '', redirectTo: 'expCafeterias', pathMatch: 'full'},
      { path: 'expCafeterias', component: ExplorarCafeteriasCompComponent },
      { path: 'pedidos', component: PedidosCompComponent },
      { path: 'recompensas', component: RecompensasCompComponent },
      { path: 'miCuenta', component: MiCuentaCompComponent },
      { path: 'tuCarrito', component: TuCarritoCompComponent },
      { path: 'menuCafe', component: MenuComComponent },
      { path: 'actualizarCuenta', component: ActualizarCuentaComponent }
    ]
  },
  {
    path: 'cafeterias',
    component : NavBarCafeteriasComponent,
    children:[
      //aqui van las rutas del flujo cafeterias
    ]
  }
];
