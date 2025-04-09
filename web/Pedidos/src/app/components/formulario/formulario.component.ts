import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Response } from '../../models/Response';
import { ClienteListar } from '../../models/Cliente';
import { FormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {
  
  clientes: ClienteListar[] = [];
  clienteSelecionado: number | null = null;

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void{
    this.clienteService.ListarClientes().subscribe({
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

  onClienteSelecionado(clienteId: number): void{
    this.clienteSelecionado = clienteId;
    console.log('Cliente selecionado:', this.clienteSelecionado) //apagar dps
  }
}
