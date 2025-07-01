import { Routes } from '@angular/router';
//Flujo principal
import { NavBarPrincipalComponent } from './NavBars/nav-bar-principal/nav-bar-principal.component';
import { InicioComponent } from './principal/inicio/inicio.component';
import { ExplorarCafeteriasComponent } from './principal/explorar-cafeterias/explorar-cafeterias.component';
import { LoginComponent } from './principal/login/login.component';
import { CrearCuentaComponent } from './principal/crear-cuenta/crear-cuenta.component';
import { CambiarContrasenaComponent } from './principal/cambiar-contrasena/cambiar-contrasena.component';
import { MenuCafeteriasComponent } from './principal/menu-cafeterias/menu-cafeterias.component';
import { CompradorGuard } from './guards/comprador.guard';
import { CafeteriaGuard } from './guards/cafeteria.guard';

//Comprador flujo
import { NavBarCompradorComponent } from './NavBars/nav-bar-comprador/nav-bar-comprador.component';
import { ExplorarCafeteriasCompComponent } from './comprador/explorar-cafeterias-comp/explorar-cafeterias-comp.component';
import { PedidosCompComponent } from './comprador/pedidos-comp/pedidos-comp.component';
import { RecompensasCompComponent } from './comprador/recompensas-comp/recompensas-comp.component';
import { MiCuentaCompComponent } from './comprador/mi-cuenta-comp/mi-cuenta-comp.component';
import { TuCarritoCompComponent } from './comprador/tu-carrito-comp/tu-carrito-comp.component';
import { MenuComComponent } from './comprador/menu-com/menu-com.component';
import { ActualizarCuentaComponent } from './comprador/actualizar-cuenta/actualizar-cuenta.component';

//Cafeteria flujo
import { NavBarCafeteriasComponent } from './NavBars/nav-bar-cafeterias/nav-bar-cafeterias.component';
import { PrincipalcafeComponent } from './cafeteria/principalcafe/principalcafe.component';
import { ActualizarcafeComponent } from './cafeteria/actualizarcafe/actualizarcafe.component';
import { AgregarproductoComponent } from './cafeteria/agregarproducto/agregarproducto.component';
import { GestionarproductoscafeComponent } from './cafeteria/gestionarproductoscafe/gestionarproductoscafe.component';
import { MicuentacafeComponent } from './cafeteria/micuentacafe/micuentacafe.component';
import { VerpedidoscafeComponent } from './cafeteria/verpedidoscafe/verpedidoscafe.component';
import { VerreseniacafeComponent } from './cafeteria/verreseniacafe/verreseniacafe.component';

export const routes: Routes = [
  {
    path: '',
    component: NavBarPrincipalComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'explorarCafeterias', component: ExplorarCafeteriasCompComponent },
      { path: 'login', component: LoginComponent },
      { path: 'crearCuenta', component: CrearCuentaComponent },
      { path: 'cambiarContrasena', component: CambiarContrasenaComponent },
      { path: 'menuCafeIni', component: MenuCafeteriasComponent },
      { path: 'menuCafeIni/:id', component: MenuCafeteriasComponent }
    ]
  },
  {
    path: 'comprador',
    component: NavBarCompradorComponent,
    canActivate: [CompradorGuard],  // 🔒 Protección aquí
    children: [
      { path: '', redirectTo: 'expCafeterias', pathMatch: 'full' },
      { path: 'expCafeterias', component: ExplorarCafeteriasCompComponent },
      { path: 'pedidos', component: PedidosCompComponent },
      { path: 'recompensas', component: RecompensasCompComponent },
      { path: 'miCuenta', component: MiCuentaCompComponent },
      { path: 'tuCarrito', component: TuCarritoCompComponent },
      { path: 'menuCafe/:id', component: MenuComComponent },
      { path: 'actualizarCuenta', component: ActualizarCuentaComponent }
    ]
  },
  {
    path: 'cafeteria',
    component: NavBarCafeteriasComponent,
    canActivate: [CafeteriaGuard],  // 🔒 Protección aquí
    children: [
      { path: '', redirectTo: 'principalCafe', pathMatch: 'full' },
      { path: 'principalCafe', component: PrincipalcafeComponent },
      { path: 'actualizarCafe', component: ActualizarcafeComponent },
      { path: 'gestProductos', component: GestionarproductoscafeComponent },
      { path: 'miCuentaCafe', component: MicuentacafeComponent },
      { path: 'verPedidos', component: VerpedidoscafeComponent },
      { path: 'verResenia', component: VerreseniacafeComponent },
      { path: 'agregarProductos', component: AgregarproductoComponent }
    ]
  }
];
