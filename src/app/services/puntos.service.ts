import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PuntosService {
  private apiUrl = 'https://backend-o9xo.onrender.com/apiQr/qr'; // Ajusta la URL a tu backend

  constructor(private http: HttpClient) {}

  obtenerTodosQR() {
  return this.http.get<any[]>(this.apiUrl);
}

  actualizarQR(qr: any) {
  return this.http.put(`${this.apiUrl}/${qr.id_QR}`, qr);
}

crearQR(qr: any) {
  return this.http.post('https://backend-o9xo.onrender.com/apiQr/qr', qr, {
    responseType: 'text' // <-- Esto evita el error de parsing
  });
}
}
