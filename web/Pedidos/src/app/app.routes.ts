import { Routes } from '@angular/router';
import { CriarPedidoComponent } from './pages/criar-pedido/criar-pedido.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'criar-pedido', component: CriarPedidoComponent}
];
