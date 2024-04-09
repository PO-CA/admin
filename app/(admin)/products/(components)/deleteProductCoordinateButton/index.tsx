'use client';
import { useDeleteAProductCoordinate } from '@/query/query/productcoordinate';
import React from 'react';
import styles from '../../page.module.css';

export default function DeleteProductCoordinateButton({ row }: any) {
  const payload = {
    productId: row.original.productId,
    coordinateId: row.original.id,
  };
  const { mutate: deleteAProductCoordinate } =
    useDeleteAProductCoordinate(payload);

  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <button
        type="button"
        className={styles.cellButton}
        onClick={() => {
          if (!row.original.isChecked) {
            return alert('선택된 좌표가 없습니다');
          }
          deleteAProductCoordinate();
        }}
      >
        좌표 해제
      </button>
    </div>
  );
}
