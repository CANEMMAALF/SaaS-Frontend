import { PaymentStatus } from './payment-status.enum';

export interface IRecibo {
  id: string; // UUID
  montoTotal: number;
  montoPagado: number;
  saldoRestante: number; // montoTotal - montoPagado
  fechaGeneracion: Date;
  fechaVencimiento: Date;
  estado: PaymentStatus;
}
