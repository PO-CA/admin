export interface CreatePocaShippingDTO {
  userId: number;
  orderIds: number[];
  addressId?: number;
  receiverName?: string;
  receiverPhoneNumber?: string;
  memo?: string;
  shippingFee?: number;
}
