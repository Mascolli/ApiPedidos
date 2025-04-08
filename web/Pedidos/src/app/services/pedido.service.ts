import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { PedidoListar } from '../models/Pedido';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  ApiUrl = environment.UrlApi;

  constructor(private http : HttpClient) { }

  GetPedidos(): Observable<Response<PedidoListar[]>>{
    return this.http.get<Response<PedidoListar[]>>(this.ApiUrl);

  }
}
