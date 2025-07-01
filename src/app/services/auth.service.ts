import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

export interface Cafeteria {
  idCafeteria: number;
  nombre: string;
  ubicacion: string;
  hora_inicio: string;
  hora_fin: string;
  correo: string;
  contrasenia?: string;
}

export interface Comprador {
  id_Comprador: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  contrasenia?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = 'https://backend-o9xo.onrender.com';
  private readonly JSON_HEADERS = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // ==================== MÉTODOS DE AUTENTICACIÓN ====================
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/apiAuth/login`, data);
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('perfil');
  }

  // ==================== MÉTODOS PARA CAFETERÍA ====================
  getCafeteriaById(id: number): Observable<Cafeteria> {
    return this.http.get<Cafeteria>(`${this.BASE_URL}/apiCafeteria/cafeterias/${id}`);
  }

  actualizarCafeteria(id: number, datos: any): Observable<Cafeteria> {
    const body = {
      nombre: datos.nombre,
      ubicacion: datos.ubicacion,
      horaInicio: datos.horaInicio.includes(':00') ? datos.horaInicio : datos.horaInicio + ':00',
      horaFin: datos.horaFin.includes(':00') ? datos.horaFin : datos.horaFin + ':00',
      correo: datos.correo,
      contrasenia: datos.contrasenia
    };

    return this.http.put<Cafeteria>(
      `${this.BASE_URL}/apiCafeteria/cafeterias/${id}`,
      body,
      { headers: this.JSON_HEADERS }
    );
  }

  eliminarCafeteria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/apiCafeteria/cafeterias/${id}`);
  }

  // ==================== MÉTODOS PARA COMPRADOR ====================
  getCompradorById(id: number): Observable<Comprador> {
    return this.http.get<Comprador>(`${this.BASE_URL}/apiComprador/compradores/${id}`);
  }

  actualizarComprador(id: number, data: any): Observable<Comprador> {
    return this.http.put<Comprador>(
      `${this.BASE_URL}/apiComprador/compradores/${id}`,
      data,
      { headers: this.JSON_HEADERS }
    );
  }

  // ==================== MÉTODOS AUXILIARES ====================
  getPerfilActual(): Cafeteria | Comprador | null {
    const perfil = localStorage.getItem('perfil');
    return perfil ? JSON.parse(perfil) : null;
  }

  guardarPerfil(perfil: Cafeteria | Comprador): void {
    localStorage.setItem('perfil', JSON.stringify(perfil));
  }

  clearAuthData(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('perfil');
  }

  // ==================== MÉTODOS PRIVADOS ====================
  private sanitizeCafeteriaData(data: Partial<Cafeteria>): Partial<Cafeteria> {
    const { contrasenia, ...safeData } = data;
    return safeData;
  }

  private sanitizeCompradorData(data: Partial<Comprador>): Partial<Comprador> {
    const { contrasenia, ...safeData } = data;
    return safeData;
  }
}
