'use client';

import { useGetAllproducts } from '@/query/query/products';
import TanTable from '@/components/table';

import styles from './page.module.css';
import { productColumns } from './(components)/tableColumns/productColumns';

export default function Products() {
  const {
    data: productData,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
  } = useGetAllproducts();
  console.log('productData', productData);
  if (isProductLoading) return <div>loading</div>;
  if (!isProductSuccess) return <div>error</div>;
  return (
    <main className={styles.productsContainer}>
      <div>상품-목록</div>
      <TanTable data={productData} columns={productColumns} />
    </main>
  );
}
