import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Response } from '../../models/Response';
import { ClienteListar } from '../../models/Cliente';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItensListar } from '../../models/Itens';
import { ItensService } from '../../services/itens-pedido.service';
import { CommonModule } from '@angular/common';
import { PedidoCriar } from '../../models/Pedido';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-criar-pedido',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './criar-pedido.component.html',
  styleUrl: './criar-pedido.component.scss'
})
export class CriarPedidoComponent implements OnInit {
  
  clientes: ClienteListar[] = [];
  itensList: ItensListar[] = [];
  clienteSelecionado: number | null = null;
  itemSelecionado: number | null = null;
  itensPedido: { itemId: number; nome: string; quantidade: number; precoUnitario: number }[] = [];
  valorTotalPedido: number = 0;

  constructor(
          private clienteService: ClienteService,
          private itensService: ItensService,
          private pedidoService: PedidoService){}

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarItens();
  }

  carregarClientes(): void{
    this.clienteService.listarClientes().subscribe({
      next: (response: Response<ClienteListar[]>) =>{
        if(response.status == true && response.dados){
          this.clientes = response.dados;
        } else{
          console.error('Erro ao carregar lista de clientes:', response.mensagem)
        }
      },
      error: (error)=>{
        console.error('Erro ao carregar lista de clientes:', error)
      }
    });
  }

  carregarItens(): void {
    this.itensService.listarItens().subscribe({
      next: (response: Response<ItensListar[]>) => {
        if (response.status == true && response.dados) {
          this.itensList = response.dados;
        } else {
          console.error('Erro ao carregar lista de itens:', response.mensagem);
        }
      },
      error: (error) => {
        console.error('Erro ao carregar lista de itens:', error);
      }
    });
  }

  onClienteSelecionado(clienteId: number): void{
    this.clienteSelecionado = clienteId;
  }

  onItemSelecionado(itemId: number): void {
    this.itemSelecionado = itemId;
  }

  calcularValorTotalPedido(): void {
    this.valorTotalPedido = this.itensPedido.reduce((total, item) => total + item.precoUnitario, 0);
  }
  
  adicionarItemAoPedido(): void {
  if (this.itemSelecionado) {
    const itemParaAdicionar = this.itensList.find(item => item.id === Number(this.itemSelecionado));
    if (itemParaAdicionar) {
      const existingItem = this.itensPedido.find(item => item.itemId === itemParaAdicionar.id);
      if (existingItem) {
        existingItem.quantidade++;
      } else {
        this.itensPedido.push({ itemId: itemParaAdicionar.id, nome: itemParaAdicionar.nome, quantidade: 1, precoUnitario: itemParaAdicionar.precoUnitario });
      }
      this.calcularValorTotalPedido();
    }
    this.itemSelecionado = null;
  }
}

  salvarPedido(): void {
    if (!this.clienteSelecionado) {
      alert('Por favor, selecione um cliente.');
      return;
    }

    if (this.itensPedido.length === 0) {
      alert('Por favor, adicione pelo menos um item ao pedido.');
      return;
    }

    const pedido: PedidoCriar = {
      clienteId: this.clienteSelecionado,
      itensPedido: this.itensPedido.map(item => ({
        itemId: item.itemId,
        nome: item.nome,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario
      })),
      totalPedido: this.valorTotalPedido
    };

    this.pedidoService.criarPedido(pedido).subscribe({
      next: (response: Response<PedidoCriar>) => {
        if (response.status) {
          alert('Pedido criado com sucesso!');
        } else {
          alert(`Erro ao criar pedido: ${response.mensagem || 'Erro desconhecido'}`);
        }
      },
      error: (error) => {
        console.error('Erro ao criar pedido:', error);
        alert('Ocorreu um erro ao criar o pedido.');
      }
    });
  }
}