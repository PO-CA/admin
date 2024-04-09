import { useDeleteAProduct } from '@/query/query/products';
import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';

export default function CellButtons({ info }: any) {
  console.log('info', info);

  const { mutate: deleteProduct } = useDeleteAProduct();

  return (
    <div>
      <button
        className={styles.cellButton}
        type="button"
        onClick={() => deleteProduct(info.row.original.id)}
      >
        삭제
      </button>
      <Link href={`/products/${info.row.original.id}`}>
        <button className={styles.cellButton} type="button">
          수정
        </button>
      </Link>
      <Link href={`/products/copy/${info.row.original.id}`}>
        <button className={styles.cellButton} type="button">
          복사
        </button>
      </Link>
    </div>
  );
}
