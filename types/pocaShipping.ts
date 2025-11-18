export type PocaShippingStatus = 'READY' | 'IN_PROGRESS' | 'COMPLETED';

export interface PocaShippingItem {
  id: number;
  orderId?: number | null;
  productId?: number | null;
  eventName?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PocaShipping {
  id: number;
  userId: number;
  userEmail: string;
  addressName?: string | null;
  receiverName?: string | null;
  receiverPhoneNumber?: string | null;
  memo?: string | null;
  shippingFee?: number | null;
  totalProductPrice?: number | null;
  totalOrderCount?: number | null;
  shippingStatus: PocaShippingStatus;
  createdAt?: string;
  shippedAt?: string | null;
  items: PocaShippingItem[];
}
