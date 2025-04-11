import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoCriar, PedidoListar } from '../models/Pedido';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<Response<PedidoListar[]>> {
    return this.http.get<Response<PedidoListar[]>>(`${this.ApiUrl}api/Pedido/ListarPedidos`);
  }

  deletarPedido(id: number): Observable<Response<PedidoListar[]>> {
    return this.http.delete<Response<PedidoListar[]>>(`${this.ApiUrl}api/Pedido/ExcluirPedido?id=${id}`);
  }

  criarPedido(cliente: PedidoCriar): Observable<Response<PedidoCriar>> {
    return this.http.post<Response<PedidoCriar>>(`${this.ApiUrl}api/Pedido/CriarPedido`, cliente);
  }

  atualizarStatusPedido(pedidoId: number, novoStatus: number): Observable<Response<PedidoListar>> {
    const status = { id: pedidoId, status: novoStatus };
    return this.http.patch<Response<PedidoListar>>(`${this.ApiUrl}api/Pedido/AlterarStatusPedido`, status);
  }
}
