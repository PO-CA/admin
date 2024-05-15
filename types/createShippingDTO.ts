export interface CreateShippingDTO {
  usersEmail: string;
  orderItemsIds: number[];
  shippingType: '택배' | '퀵' | '기타';
  shippingFee: number;
  addressId: number | null;
  memo?: string;
  trackingNumber?: string;
}
