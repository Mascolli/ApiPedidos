import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Response } from '../../models/Response';
import { ClienteListar } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent implements OnInit{

  constructor(private clienteServices: ClienteService) {}

  @Output() onSubmit = new EventEmitter<ClienteListar>;

  clienteForm!:FormGroup;

  ngOnInit(){
    this.clienteForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('')
    });
  }

  submit() {
    if (this.clienteForm.valid) {
      const novoCliente: ClienteListar = this.clienteForm.value;
      this.clienteServices.cadastrarCliente(novoCliente).subscribe({
        next: (response: Response<ClienteListar>) => {
          if (response.status) {
            alert('Cliente cadastrado com sucesso!');
          } else {
            alert('Erro ao cadastrar cliente:');
          }
        }
      });
    }
  }
    
}
