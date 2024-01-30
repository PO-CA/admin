'use client';
import { useState } from 'react';
import styles from './page.module.css';
import AddProductInput from './(components)/AddProductInput';
import { useGetAllCategory } from '@/query/query/category';

interface AddProductData {
  [key: string]: string;
  // other properties...
}

const addProductColumns = [
  {
    inputType: 'text',
    labelName: 'SKU',
    keyName: 'sku',
  },
  {
    inputType: 'text',
    labelName: '상품 이름',
    keyName: 'title',
  },
  {
    inputType: 'text',
    labelName: '썸네일 주소',
    keyName: 'thumbNailUrl',
  },
  {
    inputType: 'text',
    labelName: '상세페이지 주소',
    keyName: 'descriptionUrl',
  },
  {
    inputType: 'text',
    labelName: '가수 이름',
    keyName: 'Artist',
  },
  {
    inputType: 'text',
    labelName: '맴버 이름',
    keyName: 'Member',
  },
  {
    inputType: 'text',
    labelName: '소속사 이름',
    keyName: 'Ent',
  },
  {
    inputType: 'text',
    labelName: '음반사 이름',
    keyName: 'Company',
  },
  {
    inputType: 'number',
    labelName: '수량',
    keyName: 'stock',
  },
  // {
  //   inputType: 'text',
  //   labelName: '이름',
  //   keyName: 'title',
  // },

  // thumbNailUrl
  // descriptionUrl
  // Artist
  // Member
  // Ent
  // Company
  // stock
  // price
  // purchase
  // weight
  // x
  // y
  // z
  // barcode
  // releaseDate
  // deadlineDate
];

export default function AddProduct() {
  const [addProductData, setAddProductData] = useState<AddProductData>({
    sku: '',
    title: '',
  });

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isSuccess: isCategorySuccess,
  } = useGetAllCategory();
  console.log('categoryData', categoryData);
  return (
    <main className={styles.addProductContainer}>
      <div className={styles.addProductTitle}>상품-등록</div>
      <section>
        <form>
          {addProductColumns.map(({ inputType, labelName, keyName }) => (
            <AddProductInput
              key={keyName}
              inputType={inputType}
              labelName={labelName}
              keyName={keyName}
              value={addProductData[`${keyName}`]}
            />
          ))}

          <select>
            {!isCategoryLoading &&
              isCategorySuccess &&
              categoryData.map((category: any) => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))}
          </select>
        </form>
      </section>
    </main>
  );
}
