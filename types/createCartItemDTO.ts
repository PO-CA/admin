export interface CreateCartItemDTO {
  userId: number | null;
  productId: number;
  price: number;
  qty: number;
  versionId?: number; // optional (신보 전용)
}
