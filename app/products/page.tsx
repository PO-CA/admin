import TanTable from '@/components/table';
import styles from './page.module.css';
import { productColumns } from './(components)/tableColumns/productColumns';
import { getAllProducts } from '@/query/api/product';

export default async function Products() {
  const productsData = await getAllProducts();

  return (
    <main className={styles.productsContainer}>
      <div>상품-목록</div>
      <TanTable data={productsData} columns={productColumns} />
    </main>
  );
}
