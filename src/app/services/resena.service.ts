import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ResenaService {
  private apiUrl = 'https://backend-1-p4sl.onrender.com/apiResenias/resenia';

  constructor(private http: HttpClient) {}

  crearResena(resena: any) {
    return this.http.post(this.apiUrl, resena);
  }

  obtenerTodasResenas() {
  return this.http.get(this.apiUrl);
}
}
