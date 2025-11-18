export interface UpdateProductData {
  productId: number;
  logiCategoryId: number;
  sku: string;
  title: string;
  thumbNailUrl: string;
  descriptionUrl: string;
  artist: string;
  ent: string;
  company: string;
  member: string;
  stock: number;
  price: number;
  purchase: number;
  weight: number;
  x: number;
  y: number;
  z: number;
  barcode: string;
  catId?: string;
  releaseDate: string | number;
  deadlineDate: string | number;
}
