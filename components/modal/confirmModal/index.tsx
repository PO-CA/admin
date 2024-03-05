import { PacmanLoader } from "react-spinners";
import styles from "./index.module.css";
export function ConfirmModal({
  content,
  confirm,
  isPending,
  setText,
  alertOpen,
  closeModal,
}: {
  content: string;
  confirm: any;
  isPending: boolean;
  setText: any;
  alertOpen: any;
  closeModal: () => void;
}) {
  return (
    <div className={styles.confirmModalContainer}>
      <div className={styles.confirmModalTitle}>{content}</div>
      {!isPending && (
        <div className={styles.confirmModalContent}>
          <div>✔️ 하루 한번 생성가능</div>
          <div>✔️ 생성 후 2시간 동안 이용가능</div>
          <div>✔️ 종료 후 자동 삭제</div>
          <div>✔️ 비밀번호 미제공</div>
        </div>
      )}

      {isPending && (
        <div className={styles.loading}>
          🔥 서버 생성중{" "}
          <PacmanLoader
            cssOverride={{ marginLeft: "10px" }}
            size={10}
            color="#356e70"
          />{" "}
        </div>
      )}

      <div className={styles.modalButtonContainer}>
        <button onClick={closeModal}>취소</button>
        <button
          disabled={isPending}
          onClick={() => {
            confirm().then((data: any) => {
              if (data && data.errorMessage) {
                setText(data.errorMessage);
                alertOpen();
                closeModal();
              } else {
                setText("서버가 열렸습니다. \n서버리스트를 확인해주세요.");
                alertOpen();
                closeModal();
              }
            });
          }}
        >
          열기
        </button>
      </div>
    </div>
  );
}
