import { Routes } from '@angular/router';
import { CriarPedidoComponent } from './pages/criar-pedido/criar-pedido.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { CriarItemPedidoComponent } from './pages/criar-item-pedido/criar-item-pedido.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'criar-pedido', component: CriarPedidoComponent},
    {path:'cadastro-cliente', component: CadastroClienteComponent},
    {path:'criar-item-pedido', component: CriarItemPedidoComponent},
];
