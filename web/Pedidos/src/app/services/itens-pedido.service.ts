import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/Response';
import { ItensListar } from '../models/Itens';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  ApiUrl = environment.UrlApi;

  constructor(private http : HttpClient) { }

  listarItens(): Observable<Response<ItensListar[]>>{
    return this.http.get<Response<ItensListar[]>>(`${this.ApiUrl}api/ItensPedido/ListarItensPedidos`)
  }
  cadastrarItens(itens: ItensListar): Observable<Response<ItensListar>>{
    return this.http.post<Response<ItensListar>>(`${this.ApiUrl}api/ItensPedido/CriarItensPedido`, itens)
  }
  deletarItens(id: number): Observable<Response<ItensListar[]>>{
    return this.http.delete<Response<ItensListar[]>>(`${this.ApiUrl}api/ItensPedido/ExcluirItensPedido?id=${id}`)

  }
}
