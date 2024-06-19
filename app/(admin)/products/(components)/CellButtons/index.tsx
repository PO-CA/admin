import { useDeleteAProduct } from '@/query/query/products';
import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import { useModal } from '@/hooks/useModal';
import { ProductAverageModal } from '@/components/modal/productAverageModal';

export default function CellButtons({ info }: any) {
  const { mutate: deleteProduct } = useDeleteAProduct();
  const {
    Modal: ModalAlert,
    isOpen: alertIsOpen,
    openModal: alertOpen,
    closeModal: alertClose,
  } = useModal();
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
      <button className={styles.cellButton} type="button" onClick={alertOpen}>
        평균
      </button>
      <ModalAlert isOpen={alertIsOpen} closeModal={alertClose}>
        <ProductAverageModal
          content={'평균매입가'}
          closeModal={alertClose}
          productId={info.row.original.id}
        />
      </ModalAlert>
    </div>
  );
}
