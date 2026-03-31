export interface TableColumn<T> {
  key: keyof T | string; // Propiedad del objeto o clave identificadora
  header: string; // Título de la tabla
  type?: 'text' | 'date' | 'currency' | 'badge' | 'action_cobrar'; // Para renderizado condicional con pipes pro
  cssClass?: string;
}
