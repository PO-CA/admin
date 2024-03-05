export interface CreateCartItemDTO {
  userId: number | null;
  productId: number;
  price: number;
  qty: number;
}
