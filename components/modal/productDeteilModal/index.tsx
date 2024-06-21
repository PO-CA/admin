import Image from 'next/image';
import styles from './index.module.css';
export function ProductDetailModal({
  content,
  closeModal,
}: {
  content: string;
  closeModal: () => void;
}) {
  return (
    <div className={styles.confirmModalContainer}>
      <div className={styles.modalButtonContainer}>
        <button onClick={closeModal}>닫기</button>
        <Image src={content} alt="asd" width={1000} />
      </div>
    </div>
  );
}
