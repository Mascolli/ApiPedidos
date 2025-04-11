import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Response } from '../../models/Response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClienteListar } from '../../models/Cliente';
import { ItensListar } from '../../models/Itens';
import { ItensService } from '../../services/itens-pedido.service';
import { environment } from '../../../environments/environment.development';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-criar-item-pedido',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './criar-item-pedido.component.html',
  styleUrl: './criar-item-pedido.component.scss'
})
export class CriarItemPedidoComponent implements OnInit{

  constructor(
          private http : HttpClient,
          private itensService: ItensService,
          private clienteServices: ClienteService) {}

  @Output() onSubmit = new EventEmitter<ClienteListar>;

  clientes: ClienteListar[] = [];
  clienteSelecionado: number | null = null;

  itensPedidoForm!:FormGroup;

  ApiUrl = environment.UrlApi;

  ngOnInit(){
    this.carregarClientes();
    this.itensPedidoForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl(''),
      quantidade: new FormControl(''),
      precoUnitario: new FormControl('')
    });
  }

  submit() {
    if (this.itensPedidoForm.valid) {
      const novoItensPedido: ItensListar = this.itensPedidoForm.value;
      this.itensService.cadastrarItens(novoItensPedido).subscribe({
        next: (response: Response<ItensListar>) => {
          if (response.status) {
            alert('Item cadastrado com sucesso!');
          } else {
            alert('Erro ao cadastrar item:');
          }
        }
      });
    }
  }

  listarItens(): Observable<Response<ItensListar[]>> {
    return this.http.get<Response<ItensListar[]>>(`${this.ApiUrl}api/ItensPedido/ListarItensPedidos`);
  }

  carregarClientes(): void {
    this.clienteServices.listarClientes().subscribe({
      next: (response: Response<ClienteListar[]>) => {
        if (response.status == true && response.dados) {
          this.clientes = response.dados;
        } else {
          console.error('Erro ao carregar lista de clientes:', response.mensagem);
        }
      },
      error: (error: Error) => {
        console.error('Erro ao carregar lista de clientes:', error);
      }
    });
  }

  onClienteSelecionado(clienteId: number): void {
    this.clienteSelecionado = clienteId;
  }
    
}
