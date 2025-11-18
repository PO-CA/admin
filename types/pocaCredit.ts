export type PocaCreditType =
  | 'CHARGE'
  | 'MANUAL_DEBIT'
  | 'SHIPPING_DEBIT'
  | 'REFUND';

export interface PocaCreditLedger {
  id: number;
  userId: number;
  changeAmount: number;
  balanceAfter: number;
  creditType: PocaCreditType;
  description: string;
  shippingId?: number | null;
  orderId?: number | null;
  createdAt: string;
}
