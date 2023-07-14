import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private URL_BASE: string;

  constructor(
    private configuration: ConfigurationService,
    private http: HttpClient
  ) {
    this.URL_BASE = this.configuration.getUrlBase();
  }

  crearPedido(data: any): Observable<any> {
    return this.http.post<any>(this.URL_BASE + 'pedido', data);
  }

  obtenerPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.URL_BASE + 'pedido');
  }


}
