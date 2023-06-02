export interface IContactArea {
  id: string;
  nombre: string;
}

export interface IContact {
  name: string;
  apellido: string;
  correo: string;
  celular: string;
  contact_area_id: string;
  mensaje: string;
}
