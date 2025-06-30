import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'https://backend-1-p4sl.onrender.com/apiPedidos/pedido';

  constructor(private http: HttpClient) {}

  crearPedido(pedido: any) {
    return this.http.post(this.apiUrl, pedido);
  }

  obtenerPedidosPorComprador(idComprador: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comprador/${idComprador}`);
  }
}
