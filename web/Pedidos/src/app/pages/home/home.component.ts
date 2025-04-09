import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { PedidoListar } from '../../models/Pedido';
import { DatePipe } from '@angular/common';
import { ClienteListar } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PedidoStatus } from '../../enums/pedido-status';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  pedidos: PedidoListar[] = [];
  pedidosGeral: PedidoListar[] = [];
  pedidosComNome: { pedido: PedidoListar; nomeCliente: string }[] = [];

  constructor(
    private servicePedidos : PedidoService,
    private serviceCliente : ClienteService
  ){}

  ngOnInit(): void {
    this.servicePedidos.GetPedidos().subscribe(response => {
      const pedidos = response.dados;
      this.pedidos = pedidos;
      this.pedidosGeral = pedidos;
      
      const clienteObservables: Observable<{ pedido: PedidoListar; cliente: ClienteListar }>[] = [];

      pedidos.forEach(pedido => {
        const clienteObservable = this.serviceCliente.GetClientePorId(pedido.clienteId).pipe(
          map(cliente => ({ pedido, cliente }))
        );
        clienteObservables.push(clienteObservable);
      });

      forkJoin(clienteObservables).subscribe(resultados => {
        this.pedidosComNome = resultados.map(resultado => ({
          pedido: resultado.pedido,
          nomeCliente: resultado.cliente ? resultado.cliente.nome : 'Nome não encontrado'
        }));
        
      });
    });
  }

  getStatusNome(status: number): string {
    return PedidoStatus[status] || 'Status Desconhecido';
  }

  search(event:Event){


  }

  deletar(id: number){
    this.servicePedidos.DeletarPedido(id).subscribe(response=>{
      window.location.reload();
    })
  }
}
