export type PocaOrderStatus = 'PENDING' | 'SHIPPING' | 'SHIPPED' | 'CANCELLED';

export interface PocaOrder {
  id: number;
  productId: number;
  eventName?: string;
  artist?: string;
  member?: string;
  thumbNailUrl?: string;
  quantity: number;
  unitPrice: number;
  discountedUnitPrice: number;
  appliedDiscountRate?: number;
  totalPrice: number;
  status: PocaOrderStatus;
  shippingId?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PocaOrderUserSummary {
  userId: number;
  userEmail: string;
  nickname?: string;
  pendingOrderCount?: number;
  totalOrderCount?: number;
  totalOrderQuantity?: number;
  totalAmount?: number;
  pocaCreditBalance?: number;
  pocaDiscountRate?: number;
}
