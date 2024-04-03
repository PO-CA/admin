'use client';
import { useGetAProduct, useUpdateAProduct } from '@/query/query/products';
import styles from './page.module.css';
import useInput from '@/hooks/useInput';
import { useEffect } from 'react';
import ProductInput from '@/components/productInput';
import CategorySelect from '../../addproduct/(components)/addCategory/CategorySelect';
import DeleteCategory from '../../addproduct/(components)/addCategory/DeleteCategory';
import AddCategory from '../../addproduct/(components)/addCategory/AddCategory';
import CoordinateSelect from '../../addproduct/(components)/addCoordinate/CoordinateSelect';
import AddCoordinate from '../../addproduct/(components)/addCoordinate/AddCoordinate';
import { updateCoordinatesColumns } from '../(components)/tableColumns/updateCoordinatesColumns';
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

  const { mutateAsync: updateProduct } = useUpdateAProduct();

  const {
    value: productInputData,
    setValue,
    onChange,
    reset,
  } = useInput<UpdateProductData>({
    productId: 0,
    logiCategoryId: '',
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
        productId: productData.id || 0,
        logiCategoryId: productData.logiCategory.id || '',
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (productInputData.logiCategoryId === '')
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

    updateProduct(productInputData).then(() => {
      reset();
    });
  };

  if (isProductLoading) return <div>loading</div>;

  if (!isProductSuccess) return <div>fail</div>;

  return (
    <main className={styles.productDetailContainer}>
      <div>상품-상세</div>
      <form onSubmit={onSubmit}>
        <div>
          <label>상품번호</label>
          <input value={productInputData?.productId} disabled />
        </div>
        <ProductInput addProductData={productInputData} onChange={onChange} />

        <CategorySelect onChange={onChange} />
        <DeleteCategory categoryId={Number(productData.categoryId)} />
        <AddCategory />

        <CoordinateSelect
          productData={productData}
          coordinatesColumns={updateCoordinatesColumns}
        />
        <AddCoordinate />
        <button type="submit">상품수정</button>
      </form>
    </main>
  );
}
