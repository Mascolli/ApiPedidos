import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { PedidoListar } from '../../models/Pedido';
import { CommonModule, DatePipe } from '@angular/common';
import { ClienteListar } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PedidoStatus } from '../../enums/pedido-status';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule,
    FormsModule,
    CommonModule,
    ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('statusModal') statusModal!: ModalComponent;

  pedidos: PedidoListar[] = [];
  pedidosGeral: PedidoListar[] = [];
  pedidosComNome: { pedido: PedidoListar; nomeCliente: string }[] = [];
  filtroStatus: number | null = null;


  pedidoStatusOptions = Object.keys(PedidoStatus)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ key, value: PedidoStatus[key as keyof typeof PedidoStatus] }));

  pedidoSelecionado: PedidoListar | null = null;

  constructor(
    private servicePedidos: PedidoService,
    private serviceCliente: ClienteService
  ) { }

  ngOnInit(): void {
    this.servicePedidos.getPedidos().subscribe(response => {
      const pedidos = response.dados;
      this.pedidos = pedidos;
      this.pedidosGeral = pedidos;

      const clienteObservables: Observable<{ pedido: PedidoListar; cliente: ClienteListar }>[] = [];

      pedidos.forEach(pedido => {
        const clienteObservable = this.serviceCliente.getClientePorId(pedido.clienteId).pipe(
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

  abrirModal() {
    this.statusModal.open();
  }

  alterarStatus(novoStatusSelect: HTMLSelectElement): void {
    if (this.pedidoSelecionado && novoStatusSelect.value) {
      const novoStatus = parseInt(novoStatusSelect.value, 10);
      if (!isNaN(novoStatus) && Object.values(PedidoStatus).includes(novoStatus)) {
        this.servicePedidos.atualizarStatusPedido(this.pedidoSelecionado.id!, novoStatus).subscribe({
          next: (response) => {
            console.log('Status do pedido atualizado com sucesso', response);
            this.carregarPedidosComNome();
            this.statusModal.hide();
          },
          error: (error) => {
            console.error('Erro ao atualizar o status do pedido', error);
          }
        });
      } else {
        console.error('Status selecionado inválido');
      }
    }
  }

  carregarPedidosComNome(): void {
    this.servicePedidos.getPedidos().subscribe(response => {
      const pedidos = response.dados;
      this.pedidosGeral = pedidos;
      const clienteObservables: Observable<{ pedido: PedidoListar; cliente: ClienteListar }>[] = [];

      pedidos.forEach(pedido => {
        const clienteObservable = this.serviceCliente.getClientePorId(pedido.clienteId).pipe(
          map(cliente => ({ pedido, cliente }))
        );
        clienteObservables.push(clienteObservable);
      });

      forkJoin(clienteObservables).subscribe(resultados => {
        this.pedidosComNome = resultados.map(resultado => ({
          pedido: resultado.pedido,
          nomeCliente: resultado.cliente ? resultado.cliente.nome : 'Nome não encontrado'
        }));
        this.filtrarPedidos();
      });
    });
  }

  filterStatus(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filtroStatus = selectedValue === '' ? null : parseInt(selectedValue, 10);
    this.filtrarPedidos();
  }

  filtrarPedidos(): void {
    if (this.filtroStatus === null) {
      this.pedidosComNome = this.pedidosComNome.map(item => ({ ...item }));
    } else {
      this.pedidosComNome = this.pedidosComNome.filter(item => item.pedido.status === this.filtroStatus);
    }
  }

  getStatusNome(status: number): string {
    return PedidoStatus[status] || 'Status Desconhecido';
  }

  filtrarPedidosPorStatus(): { pedido: PedidoListar; nomeCliente: string }[] {
    if (this.filtroStatus === null) {
      return this.pedidosComNome;
    }
    return this.pedidosComNome.filter(item => item.pedido.status === this.filtroStatus);
  }

  deletar(id: number) {
    this.servicePedidos.deletarPedido(id).subscribe(response => {
      window.location.reload();
    })
  }
}
