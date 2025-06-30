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
}
