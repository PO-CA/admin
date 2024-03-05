import styles from "./index.module.css";
export function AlertModal({
  content,
  closeModal,
}: {
  content: string;
  closeModal: () => void;
}) {
  return (
    <div className={styles.alertModalContainer}>
      <div className={styles.alertModalTitle}>{content}</div>
      <button className={styles.modalButton} onClick={closeModal}>
        확인
      </button>
    </div>
  );
}
