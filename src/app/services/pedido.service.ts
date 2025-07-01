import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'https://backend-o9xo.onrender.com/apiPedidos/pedido';

  constructor(private http: HttpClient) {}

  crearPedido(pedido: any) {
    return this.http.post(this.apiUrl, pedido);
  }

  obtenerPedidosPorComprador(idComprador: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comprador/${idComprador}`);
  }

  obtenerPedidosPorCafeteria(idCafeteria: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/cafeteria/${idCafeteria}`);
}

  descargarComprobante(noOrden: number) {
  return this.http.get(`${this.apiUrl}/${noOrden}/ticket`, { responseType: 'blob' });
}
}
