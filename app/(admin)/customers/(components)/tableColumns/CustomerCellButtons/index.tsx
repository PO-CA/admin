import React from 'react';
import styles from './index.module.css';
import { useModal } from '@/hooks/useModal';
import { ProductAverageModal } from '@/components/modal/productAverageModal';
import { CustomerUpdateAddress } from '@/components/modal/customerUpdateAddress';

export default function CustomerCellButtons({ info }: any) {
  const {
    Modal: ModalAlert,
    isOpen: alertIsOpen,
    openModal: alertOpen,
    closeModal: alertClose,
  } = useModal();
  return (
    <div>
      <button className={styles.cellButton} type="button" onClick={alertOpen}>
        수정
      </button>
      <ModalAlert isOpen={alertIsOpen} closeModal={alertClose}>
        <CustomerUpdateAddress
          content={'주소 수정'}
          closeModal={alertClose}
          addressInfo={info.row.original}
        />
      </ModalAlert>
    </div>
  );
}
