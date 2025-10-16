export interface PreReleaseOrderSummary {
  productId: number;
  productTitle: string;
  versionId: number;
  versionName: string;
  totalQty: number;
  releaseDate: string;
  barcode: string;
  artist: string;
}

export interface ReleasedOrderSummary {
  productId: number;
  productTitle: string;
  totalQty: number;
  barcode: string;
  artist: string;
}
