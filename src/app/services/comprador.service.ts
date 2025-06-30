import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {
  private apiUrl = 'https://backend-1-p4sl.onrender.com/apiComprador/compradores';

  constructor(private http: HttpClient) { }

  registrarComprador(comprador: any): Observable<any> {
    return this.http.post(this.apiUrl, comprador, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  actualizarComprador(id: number, datos: any) {
  return this.http.put(`${this.apiUrl}/${id}`, datos);
}

  obtenerCompradorPorId(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

  private handleError(error: HttpErrorResponse) {
    console.error('Error en el servicio Comprador:', error);

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
}
