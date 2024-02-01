'use client';
import styles from './page.module.css';
import AddCategory from './(components)/AddCategory';
import useInput from '@/hooks/useInput';
import CategorySelect from './(components)/CategorySelect';
import { ProductData } from '@/types/productData';
import ProductInput from '@/components/productInput';

export default function AddProduct() {
  const {
    value: addProductData,
    onChange,
    reset,
  } = useInput<ProductData>({
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('sub', addProductData);
    reset();
  };

  return (
    <main className={styles.addProductContainer}>
      <div className={styles.addProductTitle}>상품-등록</div>
      <section>
        <form onSubmit={onSubmit}>
          <ProductInput addProductData={addProductData} onChange={onChange} />
          <CategorySelect onChange={onChange} />
          <AddCategory />
          <button type="submit">상품추가</button>
        </form>
      </section>
    </main>
  );
}
