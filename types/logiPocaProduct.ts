export interface LogiPocaProduct {
  id: number;
  title: string;
  artist?: string;
  member?: string;
  company?: string;
  sku?: string;
  thumbNailUrl?: string;
  description?: string;
  price: number;
  stock: number;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLogiPocaProductPayload {
  title: string;
  artist?: string;
  member?: string;
  company?: string;
  sku?: string;
  thumbNailUrl?: string;
  description?: string;
  price: number;
  stock: number;
}
