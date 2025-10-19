'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetSettlementDetail,
  useCompleteSettlement,
} from '@/query/query/album-purchase/settlements';
import styles from './page.module.css';

export default function SettlementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const settlementId = Number(params.settlementId);

  const { data: settlement, isLoading } = useGetSettlementDetail(settlementId);
  const completeMutation = useCompleteSettlement();

  const [transferredAt, setTransferredAt] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [settlementNote, setSettlementNote] = useState('');

  const handleComplete = async () => {
    if (confirm('정산을 완료 처리하시겠습니까?')) {
      try {
        await completeMutation.mutateAsync({
          settlementId,
          requestData: {
            transferredAt,
            settlementNote,
          },
        });
        alert('정산이 완료되었습니다.');
        router.push('/album-purchase/settlements');
      } catch (error) {
        console.error('정산 완료 실패:', error);
      }
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!settlement) {
    return <div>정산을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>정산 상세</h1>

      {/* 정산 기본 정보 */}
      <div className={styles.section}>
        <h2>정산 정보</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>정산 ID</label>
            <span>{settlement.id}</span>
          </div>
          <div className={styles.infoItem}>
            <label>정산일</label>
            <span>{settlement.settlementDate}</span>
          </div>
          <div className={styles.infoItem}>
            <label>상태</label>
            <span className={styles.status}>{settlement.status}</span>
          </div>
          <div className={styles.infoItem}>
            <label>처리자</label>
            <span>{settlement.processedBy}</span>
          </div>
          <div className={styles.infoItem}>
            <label>원 금액</label>
            <span>₩{settlement.originalAmount.toLocaleString()}</span>
          </div>
          <div className={styles.infoItem}>
            <label>최종 금액</label>
            <span className={styles.finalAmount}>
              ₩{settlement.finalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 수령자 정보 */}
      <div className={styles.section}>
        <h2>수령자 정보</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>이름</label>
            <span>{settlement.userName}</span>
          </div>
          <div className={styles.infoItem}>
            <label>이메일</label>
            <span>{settlement.userEmail}</span>
          </div>
          <div className={styles.infoItem}>
            <label>연락처</label>
            <span>{settlement.phoneNumber}</span>
          </div>
          <div className={styles.infoItem}>
            <label>은행</label>
            <span>{settlement.bankName}</span>
          </div>
          <div className={styles.infoItem}>
            <label>계좌번호</label>
            <span>{settlement.accountNumber}</span>
          </div>
          <div className={styles.infoItem}>
            <label>예금주</label>
            <span>{settlement.accountHolder}</span>
          </div>
        </div>
      </div>

      {/* 정산 아이템 */}
      <div className={styles.section}>
        <h2>정산 아이템</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>음반명</th>
              <th>아티스트</th>
              <th>소속사</th>
              <th>ISBN</th>
              <th>최종 가격</th>
            </tr>
          </thead>
          <tbody>
            {settlement.items && settlement.items.length > 0 ? (
              settlement.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.albumTitle}</td>
                  <td>{item.albumArtist}</td>
                  <td>{item.entertainmentAgency}</td>
                  <td>{item.albumIsbn}</td>
                  <td>₩{item.finalPrice.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.noData}>
                  아이템이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 정산 완료 처리 */}
      {settlement.status === 'PENDING' && (
        <div className={styles.section}>
          <h2>정산 완료 처리</h2>
          <div className={styles.completeForm}>
            <div className={styles.formGroup}>
              <label>송금일시</label>
              <input
                type="datetime-local"
                value={transferredAt}
                onChange={(e) => setTransferredAt(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>정산 메모</label>
              <textarea
                value={settlementNote}
                onChange={(e) => setSettlementNote(e.target.value)}
                className={styles.textarea}
                rows={3}
                placeholder="정산 관련 메모를 입력하세요"
              />
            </div>
            <button onClick={handleComplete} className={styles.completeButton}>
              정산 완료
            </button>
          </div>
        </div>
      )}

      {/* 송금 정보 (완료된 경우) */}
      {settlement.status === 'COMPLETED' && settlement.transferredAt && (
        <div className={styles.section}>
          <h2>송금 정보</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>송금일시</label>
              <span>{new Date(settlement.transferredAt).toLocaleString()}</span>
            </div>
            <div className={styles.infoItem}>
              <label>정산 메모</label>
              <span>{settlement.settlementNote || '-'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
