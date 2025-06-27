import { Injectable } from '@angular/core';
import { Cafeteria } from '../models/cafeteria';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CafeteriaService {
  private apiUrl = 'https://backend-1-vqnu.onrender.com/apiCafeteria/cafeterias';

  constructor(private http: HttpClient) { }

  getCafeterias(): Observable<Cafeteria[]> {
    return this.http.get<Cafeteria[]>(this.apiUrl);
  }

  getCafeteriaById(id: number): Observable<Cafeteria> {
    return this.http.get<Cafeteria>(`${this.apiUrl}/${id}`);
  }

  createCafeteria(cafeteria: Cafeteria): Observable<Cafeteria> {
    return this.http.post<Cafeteria>(this.apiUrl, cafeteria);
  }

  updateCafeteria(cafeteria: Cafeteria): Observable<Cafeteria> {
    return this.http.put<Cafeteria>(`${this.apiUrl}/${cafeteria.idCafeteria}`, cafeteria);
  }

  deleteCafeteria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
