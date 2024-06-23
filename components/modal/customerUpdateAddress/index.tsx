import styles from './index.module.css';
import useInput from '@/hooks/useInput';
import { useUpdateAAddressByUsersEmail } from '@/query/query/address';
export function CustomerUpdateAddress({
  content,
  closeModal,
  addressInfo,
}: {
  content: string;
  closeModal: () => void;
  addressInfo: any;
}) {
  const { value: updatedAddress, onChange } = useInput({
    id: addressInfo.id,
    addressName: addressInfo.addressName,
    city: addressInfo.city,
    receiverName: addressInfo.receiverName,
    receiverPhoneNumber: addressInfo.receiverPhoneNumber,
    state: addressInfo.state,
    street: addressInfo.street,
    zipcode: addressInfo.zipcode,
  });

  const { mutateAsync } = useUpdateAAddressByUsersEmail();

  return (
    <div className={styles.alertModalContainer}>
      <div className={styles.alertModalTitle}>{content}</div>

      <div style={{ display: 'flex' }}>
        <label>이름</label>
        <input
          type="text"
          id="addressName"
          value={updatedAddress.addressName}
          onChange={onChange}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <label>도시</label>
        <input
          type="text"
          id="city"
          value={updatedAddress.city}
          onChange={onChange}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <label>군구</label>
        <input
          type="text"
          id="state"
          value={updatedAddress.state}
          onChange={onChange}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <label>상세주소</label>
        <input
          id="street"
          type="text"
          value={updatedAddress.street}
          onChange={onChange}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <label>우편번호</label>
        <input
          type="text"
          id="zipcode"
          value={updatedAddress.zipcode}
          onChange={onChange}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <label>수령인</label>
        <input
          type="text"
          id="receiverName"
          value={updatedAddress.receiverName}
          onChange={onChange}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <label>연락처</label>
        <input
          type="text"
          id="receiverPhoneNumber"
          value={updatedAddress.receiverPhoneNumber}
          onChange={onChange}
        />
      </div>

      <button
        className={styles.modalButton}
        onClick={() => {
          mutateAsync(updatedAddress).then(() => closeModal());
        }}
      >
        수정
      </button>
      <button className={styles.modalButton} onClick={closeModal}>
        닫기
      </button>
    </div>
  );
}
