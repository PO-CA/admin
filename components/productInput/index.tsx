'use client';
import React from 'react';
import styles from './index.module.css';
import { ProductData } from '@/types/productData';

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
    keyName: 'artist',
  },
  {
    inputType: 'text',
    labelName: '소속사 이름',
    keyName: 'ent',
  },
  {
    inputType: 'text',
    labelName: '음반사 이름',
    keyName: 'company',
  },
  {
    inputType: 'number',
    labelName: '수량',
    keyName: 'stock',
  },
  {
    inputType: 'number',
    labelName: '가격',
    keyName: 'price',
  },
  {
    inputType: 'number',
    labelName: '매입가',
    keyName: 'purchase',
  },
  {
    inputType: 'number',
    labelName: '무게',
    keyName: 'weight',
  },
  {
    inputType: 'number',
    labelName: '가로',
    keyName: 'x',
  },
  {
    inputType: 'number',
    labelName: '세로',
    keyName: 'y',
  },
  {
    inputType: 'number',
    labelName: '높이',
    keyName: 'z',
  },
  {
    inputType: 'text',
    labelName: '바코드',
    keyName: 'barcode',
  },
  {
    inputType: 'number',
    labelName: '출시일',
    keyName: 'releaseDate',
  },
  {
    inputType: 'number',
    labelName: '주문마감일',
    keyName: 'deadlineDate',
  },
];
export default function ProductInput({
  addProductData,
  onChange,
}: {
  addProductData: ProductData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      {addProductData &&
        addProductColumns.map(({ inputType, labelName, keyName }) => (
          <div className={styles.inputContainer} key={keyName}>
            <label className={styles.inputLabel}>{labelName}</label>
            <input
              className={styles.inputCell}
              type={inputType}
              id={keyName}
              value={addProductData[`${keyName}` as keyof ProductData]}
              onChange={onChange}
            />
          </div>
        ))}
    </>
  );
}
