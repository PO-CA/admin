export interface PreReleaseOrderSummary {
  productId: number;
  productTitle: string;
  versionId: number;
  versionName: string;
  totalQty: number;
  deadlineDate: string;
  releaseDate: string;
  barcode: string;
  catId?: string;
  artist: string;
}

export interface ReleasedOrderSummary {
  productId: number;
  productTitle: string;
  totalQty: number;
  barcode: string;
  catId?: string;
  artist: string;
}
