export interface LogiPocaProduct {
  id: number;
  title?: string;
  eventName?: string;
  artist?: string;
  member?: string;
  thumbNailUrl?: string;
  imageKey?: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  stock?: number;
  visible: boolean;
  vectorStatus?: string;
  vectorModel?: string;
  vectorDimension?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLogiPocaProductItem {
  eventName?: string;
  artist?: string;
  member?: string;
  thumbNailUrl?: string;
  imageKey?: string;
  imageUrl?: string;
  description?: string;
  price: number;
  stock?: number;
}

export interface BulkCreateLogiPocaProductPayload {
  items: CreateLogiPocaProductItem[];
}

export interface BulkCreateLogiPocaProductResult {
  id?: number;
  status?: string;
  message?: string;
  vectorStatus?: string;
}

export interface PresignedUpload {
  key: string;
  uploadUrl: string;
  expiresIn: number;
  publicUrl: string;
}
