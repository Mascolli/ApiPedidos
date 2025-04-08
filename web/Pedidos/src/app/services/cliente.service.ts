import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClienteListar } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly ApiUrlClientes = 'https://localhost:7271/api/Cliente/ListarClientes';

  constructor( private http : HttpClient) { }

  GetCliente(clienteId: number): Observable<ClienteListar>{
    return this.http.get<{ dados: ClienteListar }>(`${this.ApiUrlClientes}/${clienteId}`).pipe(
      map(response => response.dados)
    );
  }
}
