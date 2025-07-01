import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PuntosService {
  private apiUrl = 'https://backend-1-p4sl.onrender.com/apiQr/qr'; // Ajusta la URL a tu backend

  constructor(private http: HttpClient) {}

  obtenerTodosQR() {
  return this.http.get<any[]>(this.apiUrl);
}

  actualizarQR(qr: any) {
  return this.http.put(`${this.apiUrl}/${qr.id_QR}`, qr);
}

crearQR(qr: any) {
  return this.http.post(this.apiUrl, qr);
}
}
