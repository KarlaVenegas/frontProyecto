export interface Producto {
  id_producto: number;
  nombreProducto: string;
  precio: number;
  stock: number;
  cafeteria: {
    idCafeteria: number;
    nombre: string;
    ubicacion: string;
    hora_inicio: string;
    hora_fin: string;
  };
}
