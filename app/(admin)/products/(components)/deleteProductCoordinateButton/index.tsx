'use client';
import { useDeleteAProductCoordinate } from '@/query/query/productcoordinate';
import React from 'react';
import styles from '../../page.module.css';

export default function DeleteProductCoordinateButton({ row }: any) {
  const payload = {
    productId: Number(row.productId),
    coordinateId: Number(row.id),
  };
  const { mutateAsync: deleteAProductCoordinate, isPending } =
    useDeleteAProductCoordinate(payload);

  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <button
        type="button"
        className={styles.cellButton}
        onClick={async () => {
          if (!row.isChecked) {
            return alert('선택된 좌표가 없습니다');
          }
          await deleteAProductCoordinate();
        }}
        disabled={isPending}
      >
        {isPending ? '좌표 해제중...' : '좌표 해제'}
      </button>
    </div>
  );
}
