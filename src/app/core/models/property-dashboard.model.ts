import { IRecibo } from './recibo.model';

export interface IPropertyDashboardItem {
  unidadId: string;
  nombreUnidad: string;
  reciboActual: IRecibo | null;
  ultimoPago: Date | null;
}
