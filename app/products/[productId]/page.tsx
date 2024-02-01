'use client';
import { useGetAProduct } from '@/query/query/products';
import styles from './page.module.css';
import useInput from '@/hooks/useInput';
import { ProductData } from '@/types/productData';
import { useEffect } from 'react';
import ProductInput from '@/components/productInput';
import { UpdateProductData } from '@/types/updateProductData';

export default function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const {
    data: productData,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
  } = useGetAProduct(productId);

  const {
    value: productInputData,
    setValue,
    onChange,
  } = useInput<UpdateProductData>({
    id: 0,
    category: '',
    sku: '',
    title: '',
    thumbNailUrl: '',
    descriptionUrl: '',
    artist: '',
    ent: '',
    company: '',
    stock: 0,
    price: 0,
    purchase: 0,
    weight: 0,
    x: 0,
    y: 0,
    z: 0,
    barcode: '',
    releaseDate: '',
    deadlineDate: '',
  });

  useEffect(() => {
    if (productData !== undefined)
      setValue({
        id: productData.id || 0,
        category: productData.category || '',
        sku: productData.sku || '',
        title: productData.title || '',
        thumbNailUrl: productData.thumbNailUrl || '',
        descriptionUrl: productData.descriptionUrl || '',
        artist: productData.artist || '',
        ent: productData.ent || '',
        company: productData.company || '',
        stock: productData.stock || 0,
        price: productData.price || 0,
        purchase: productData.purchase || 0,
        weight: productData.weight || 0,
        x: productData.x || 0,
        y: productData.y || 0,
        z: productData.z || 0,
        barcode: productData.barcode || '',
        releaseDate: productData.releaseDate || '',
        deadlineDate: productData.deadlineDate || '',
      });
  }, [productData, setValue]);

  console.log('productInputData', productInputData);
  console.log('productData', productData);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('sub', productInputData);
  };

  if (isProductLoading) return <div>loading</div>;

  if (!isProductSuccess) return <div>fail</div>;

  return (
    <main className={styles.productDetailContainer}>
      <div>상품-상세</div>
      <form onSubmit={onSubmit}>
        <div>
          <label>상품번호</label>
          <input value={productInputData?.id} disabled />
        </div>
        <ProductInput addProductData={productInputData} onChange={onChange} />
        <button type="submit">상품수정</button>
      </form>
    </main>
  );
}
