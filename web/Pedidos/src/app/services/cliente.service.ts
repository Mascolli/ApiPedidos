import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClienteListar } from '../models/Cliente';
import { environment } from '../../environments/environment.development';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  ApiUrl = environment.UrlApi;

  constructor( private http : HttpClient) { }

  getClientePorId(clienteId: number): Observable<ClienteListar>{
    return this.http.get<{ dados: ClienteListar }>(`${this.ApiUrl}api/Cliente/ListarClientes/${clienteId}`).pipe(
      map(response => response.dados)
    );
  }
  listarClientes(): Observable<Response<ClienteListar[]>> {
    return this.http.get<Response<ClienteListar[]>>(`${this.ApiUrl}api/Cliente/ListarClientes`);
  }
  cadastrarCliente(cliente: ClienteListar): Observable<Response<ClienteListar>> {
    return this.http.post<Response<ClienteListar>>(`${this.ApiUrl}api/Cliente/CadastrarCliente`, cliente);
  }


}
