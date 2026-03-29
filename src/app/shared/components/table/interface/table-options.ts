export interface TableOptions<T> {
  label: string;
  icon?: string;
  cssClass?: string;
  condition: (item: T) => boolean; // Determina si la acción se muestra (ej. item.status === 'PENDIENTE')
  handler: (item: T) => void;     // Lo que ocurre al hacer click (manejado por el Padre)
}
