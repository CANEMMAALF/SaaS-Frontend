import { IPropertyDashboardItem } from '../../../../core/models/property-dashboard.model';
import { PaymentStatus } from '../../../../core/models/payment-status.enum';

export const MOCK_PROPIEDADES: IPropertyDashboardItem[] = [
  {
    unidadId: '1',
    nombreUnidad: 'Torre A - 101',
    reciboActual: {
      id: 'rec-001',
      montoTotal: 5000,
      montoPagado: 5000,
      saldoRestante: 0,
      fechaGeneracion: new Date(),
      fechaVencimiento: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      estado: PaymentStatus.PAGADO
    },
    ultimoPago: new Date()
  },
  {
    unidadId: '2',
    nombreUnidad: 'Torre A - 102',
    reciboActual: {
      id: 'rec-002',
      montoTotal: 5000,
      montoPagado: 2000,
      saldoRestante: 3000,
      fechaGeneracion: new Date(),
      fechaVencimiento: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      estado: PaymentStatus.PARCIAL
    },
    ultimoPago: new Date()
  },
  {
    unidadId: '3',
    nombreUnidad: 'Torre B - 204',
    reciboActual: {
      id: 'rec-003',
      montoTotal: 5000,
      montoPagado: 0,
      saldoRestante: 5000,
      fechaGeneracion: new Date(),
      fechaVencimiento: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      estado: PaymentStatus.PENDIENTE
    },
    ultimoPago: null
  }
];
