export interface Producto {
  id_producto: number;
  nombreProducto: string;
  precio: number;
  precioPuntos: number;
  stock: number;
  cafeteria: any;
  nombreImagen?: string;
  tipoImagen?: string;
  datosImagen?: string; // base64
}
