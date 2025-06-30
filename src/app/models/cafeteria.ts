export interface Cafeteria {
  idCafeteria: number;
  nombre: string;
  ubicacion: string;
  hora_inicio: string;
  hora_fin: string;
  correo: string;
  contrasenia: string;
  tokenRecuperacion?: string;
  fechaExpiracionToken?: string;
  nombreImagen?: string;
  tipoImagen?: string;
  datosImagen?: string; // <-- agrega este campo (string para base64)
}
