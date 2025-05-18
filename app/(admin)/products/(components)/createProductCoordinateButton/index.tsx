'use client';
import { useCreateAProductCoordinate } from '@/query/query/productcoordinate';
import React from 'react';
import styles from '../../page.module.css';

export default function CreateProductCoordinateButton({ row }: any) {
  const payload = {
    productId: Number(row.productId),
    coordinateId: Number(row.id),
  };
  const { mutateAsync: createAProductCoordinate, isPending } =
    useCreateAProductCoordinate(payload);

  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <button
        type="button"
        className={styles.cellButton}
        onClick={async () => {
          if (row.isChecked) {
            return alert('이미 선택된 좌표입니다');
          }
          await createAProductCoordinate();
        }}
        disabled={isPending}
      >
        {isPending ? '좌표 선택중...' : '좌표 선택'}
      </button>
    </div>
  );
}
