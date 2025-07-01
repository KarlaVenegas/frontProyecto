import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  correo: string;
  contrasenia: string;
}

export interface LoginResponse {
  tipo: 'comprador' | 'cafeteria';
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://backend-1-p4sl.onrender.com/apiAuth/login';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, data);
  }

  getCafeteriaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cafeterias/${id}`);
  }

  actualizarCafeteria(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cafeterias/${id}`, datos);
  }

  eliminarCafeteria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cafeterias/${id}`);
  }

  getCompradorById(id: number): Observable<any> {
    return this.http.get<any>(`https://backend-1-p4sl.onrender.com/apiComprador/compradores/${id}`);
  }


  actualizarComprador(id: number, data: any): Observable<any> {
    return this.http.put(`https://backend-1-p4sl.onrender.com/apiComprador/compradores/${id}`, data);
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('perfil');
  }
}
