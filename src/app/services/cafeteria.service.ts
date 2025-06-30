import { Injectable } from '@angular/core';
import { Cafeteria } from '../models/cafeteria';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CafeteriaService {
  private apiUrl = 'https://backend-1-p4sl.onrender.com/apiCafeteria/cafeterias';

  constructor(private http: HttpClient) { }

  registrarCafeteria(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post(this.apiUrl, formData, {
      headers: {
        'enctype': 'multipart/form-data'
      },
      observe: 'response',
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en el servicio Cafeteria:', error);

    if (error.status === 201) {
      return throwError(() => ({
        status: 201,
        message: 'Registro exitoso (respuesta no JSON)'
      }));
    }

    let errorMessage = 'Error desconocido en el servidor';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
      if (error.error && typeof error.error === 'string') {
        try {
          const errorObj = JSON.parse(error.error);
          errorMessage = errorObj.message || error.error;
        } catch (e) {
          errorMessage = error.error;
        }
      }
    }
    return throwError(() => new Error(errorMessage));
  }

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
