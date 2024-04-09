'use client';
import { useCreateAProductCoordinate } from '@/query/query/productcoordinate';
import React from 'react';
import styles from '../../page.module.css';

export default function CreateProductCoordinateButton({ row }: any) {
  const payload = {
    productId: row.original.productId,
    coordinateId: row.original.id,
  };
  const { mutate: createAProductCoordinate } =
    useCreateAProductCoordinate(payload);

  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <button
        type="button"
        className={styles.cellButton}
        onClick={() => {
          if (row.original.isChecked) {
            return alert('이미 선택된 좌표입니다');
          }
          createAProductCoordinate();
        }}
      >
        좌표 선택
      </button>
    </div>
  );
}
