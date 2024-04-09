'use client';
import { useDeleteACoordinate } from '@/query/query/coordinate';
import React from 'react';
import styles from '../../page.module.css';

export default function DeleteCoordinateButton({ row }: any) {
  const { mutate: deleteACoordinate } = useDeleteACoordinate();
  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <button
        type="button"
        className={styles.addCategoryBtn}
        onClick={() => {
          deleteACoordinate(row.original.id);
        }}
      >
        삭제
      </button>
    </div>
  );
}
