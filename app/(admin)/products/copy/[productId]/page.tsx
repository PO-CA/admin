'use client';
import { useCreateAProduct, useGetAProduct } from '@/query/query/products';
import styles from './page.module.css';
import useInput from '@/hooks/useInput';
import { useEffect, useState } from 'react';
import ProductInput from '@/components/productInput';
import CategorySelect from '../../../addproduct/(components)/addCategory/CategorySelect';
import DeleteCategory from '../../../addproduct/(components)/addCategory/DeleteCategory';
import AddCategory from '../../../addproduct/(components)/addCategory/AddCategory';
import CoordinateSelect from '../../../addproduct/(components)/addCoordinate/CoordinateSelect';
import AddCoordinate from '../../../addproduct/(components)/addCoordinate/AddCoordinate';
import { ProductData } from '@/types/productData';
import { coordinatesColumns } from '@/app/(admin)/addproduct/(components)/addCoordinate/coordinatesColumns';

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

  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const { mutateAsync: createAProduct } = useCreateAProduct();

  const {
    value: productInputData,
    setValue,
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
    member: '',
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
    coordinateIds: [],
  });

  useEffect(() => {
    if (productData !== undefined)
      setValue({
        categoryId: productData.logiCategory.id || '',
        sku: productData.sku || '',
        title: productData.title || '',
        thumbNailUrl: productData.thumbNailUrl || '',
        descriptionUrl: productData.descriptionUrl || '',
        artist: productData.artist || '',
        ent: productData.ent || '',
        member: productData.member || '',
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
        coordinateIds: [],
      });
  }, [productData, setValue]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    productInputData.coordinateIds = selectedRowIds;

    if (productInputData.categoryId === '')
      return alert('카테고리를 선택해주세요.');

    if (productInputData.title === '') return alert('상품명을 작성해주세요.');
    if (productInputData.sku === '') return alert('sku를 작성해주세요.');
    if (productInputData.barcode === '')
      return alert('Barcode를 작성해주세요.');

    productInputData.releaseDate = new Date(
      productInputData.releaseDate,
    ).toISOString();
    productInputData.deadlineDate = new Date(
      productInputData.deadlineDate,
    ).toISOString();

    createAProduct(productInputData).then(() => {
      setSelectedRowIds([]);
      reset();
    });
  };

  if (isProductLoading) return <div>loading</div>;

  if (!isProductSuccess) return <div>fail</div>;

  return (
    <main className={styles.productDetailContainer}>
      <div className={styles.addProductTitle}>상품-복사 등록</div>
      <form onSubmit={onSubmit}>
        <button type="submit" className={styles.addProductBtn}>
          상품 복사
        </button>
        <div style={{ marginTop: '10px' }}>
          <label style={{ marginLeft: '20px', fontSize: '25px' }}>
            상품번호
          </label>
          <input
            style={{ marginLeft: '20px', fontSize: '25px' }}
            value={productId}
            disabled
          />
        </div>
        <div className={styles.categoryContainer}>
          <div style={{ display: 'flex' }}>
            <CategorySelect onChange={onChange} />
            <DeleteCategory categoryId={Number(productData.categoryId)} />
          </div>
          <AddCategory />
        </div>

        <div className={styles.tableContainer}>
          <CoordinateSelect
            coordinatesColumns={coordinatesColumns}
            setSelectedRowIds={setSelectedRowIds}
          />
          <AddCoordinate />
        </div>

        <ProductInput addProductData={productInputData} onChange={onChange} />
      </form>
    </main>
  );
}
