'use client';
import styles from './page.module.css';
import AddCategory from './(components)/AddCategory';
import useInput from '@/hooks/useInput';
import CategorySelect from './(components)/CategorySelect';
import { ProductData } from '@/types/productData';
import ProductInput from '@/components/productInput';
import { useCreateAProduct } from '@/query/query/products';
import { log } from 'console';

export default function AddProduct() {
  const {
    value: addProductData,
    onChange,
    reset,
  } = useInput<ProductData>({
    categoryId: '',
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
    releaseDate: 0,
    deadlineDate: 0,
  });

  const { mutateAsync: createAProduct } = useCreateAProduct();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (addProductData.categoryId === '')
      return alert('카테고리를 선택해주세요.');
    if (addProductData.title === '') return alert('상품명을 작성해주세요.');

    addProductData.releaseDate = new Date(
      addProductData.releaseDate,
    ).toISOString();
    addProductData.deadlineDate = new Date(
      addProductData.deadlineDate,
    ).toISOString();

    createAProduct(addProductData).then(() => reset());
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
