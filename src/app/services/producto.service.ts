import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://backend-o9xo.onrender.com/apiMenu/productos';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Crear un nuevo producto con imagen (FormData)
  crearProducto(producto: FormData): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  // Eliminar producto por ID
  eliminarProducto(idProducto: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idProducto}`);
  }

  // Actualizar un producto existente por ID usando FormData (incluye imagen)
  actualizarProducto(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, formData);
  }




  // Obtener imagen de un producto (opcional)
  obtenerImagen(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/imagen`, { responseType: 'blob' });
  }

  // Obtener un producto específico por ID (opcional)
  getProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
}
