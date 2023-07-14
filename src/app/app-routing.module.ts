import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorNoEncontradoComponent } from './components/error-no-encontrado/error-no-encontrado.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { ListaFrutasComponent } from './components/lista-frutas/lista-frutas.component';
import { ListadoPedidosComponent } from './components/listado-pedidos/listado-pedidos.component';
import { TercerosComponent } from './components/terceros/terceros.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'tercero', component: TercerosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'lista-frutas', component: ListaFrutasComponent },
  { path: 'lista-pedidos', component: ListadoPedidosComponent },
  { path: '', redirectTo: 'iniciar-sesion', pathMatch: 'full' },
  { path: '**', component: ErrorNoEncontradoComponent }, //Sitio Web No Encontrado 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
