'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetRequestDetail,
  useAcceptRequest,
  useRejectRequest,
  useProposePrice,
} from '@/query/query/album-purchase/requests';
import styles from './page.module.css';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = Number(params.requestId);

  const { data: request, isLoading } = useGetRequestDetail(requestId);
  const acceptMutation = useAcceptRequest();
  const rejectMutation = useRejectRequest();
  const proposeMutation = useProposePrice();

  const [rejectionReason, setRejectionReason] = useState('');
  const [proposedPrice, setProposedPrice] = useState('');
  const [proposalNote, setProposalNote] = useState('');

  const handleAccept = async () => {
    if (confirm('이 매입 신청을 수락하시겠습니까?')) {
      await acceptMutation.mutateAsync({
        requestId,
        requestData: { reviewerNote: '수락됨' },
      });
      alert('수락되었습니다.');
      router.refresh();
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('거절 사유를 입력해주세요.');
      return;
    }
    if (confirm('이 매입 신청을 거절하시겠습니까?')) {
      await rejectMutation.mutateAsync({
        requestId,
        requestData: { rejectionReason },
      });
      alert('거절되었습니다.');
      router.refresh();
    }
  };

  const handlePropose = async () => {
    if (!proposedPrice.trim()) {
      alert('제안 가격을 입력해주세요.');
      return;
    }
    if (confirm('가격을 제안하시겠습니까?')) {
      await proposeMutation.mutateAsync({
        requestId,
        requestData: {
          proposedPrice: Number(proposedPrice),
          proposalNote,
          proposedBy: 'admin',
        },
      });
      alert('가격이 제안되었습니다.');
      router.refresh();
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!request) {
    return <div>요청을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>매입 신청 상세</h1>

      {/* 신청 정보 */}
      <div className={styles.section}>
        <h2>신청 정보</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>신청 ID</label>
            <span>{request.requestId}</span>
          </div>
          <div className={styles.infoItem}>
            <label>상태</label>
            <span className={styles.status}>{request.status}</span>
          </div>
          <div className={styles.infoItem}>
            <label>총 평가 금액</label>
            <span>₩{request.totalEvaluatedPrice.toLocaleString()}</span>
          </div>
          <div className={styles.infoItem}>
            <label>총 수량</label>
            <span>{request.totalEvaluatedStock}</span>
          </div>
        </div>
      </div>

      {/* 신청자 정보 */}
      <div className={styles.section}>
        <h2>신청자 정보</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>이름</label>
            <span>{request.userName}</span>
          </div>
          <div className={styles.infoItem}>
            <label>이메일</label>
            <span>{request.userEmail}</span>
          </div>
          <div className={styles.infoItem}>
            <label>연락처</label>
            <span>{request.phoneNumber}</span>
          </div>
          <div className={styles.infoItem}>
            <label>주소</label>
            <span>
              {request.address} {request.addressDetail} ({request.zipcode})
            </span>
          </div>
          <div className={styles.infoItem}>
            <label>은행</label>
            <span>{request.bankName}</span>
          </div>
          <div className={styles.infoItem}>
            <label>계좌번호</label>
            <span>{request.bankAccountNumber}</span>
          </div>
        </div>
      </div>

      {/* 아이템 목록 */}
      <div className={styles.section}>
        <h2>아이템 목록</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>순서</th>
              <th>음반명</th>
              <th>아티스트</th>
              <th>ISBN</th>
              <th>평가 가격</th>
            </tr>
          </thead>
          <tbody>
            {request.items.map((item) => (
              <tr key={item.requestItemId}>
                <td>{item.itemOrder}</td>
                <td>{item.albumTitle}</td>
                <td>{item.albumArtist}</td>
                <td>{item.albumIsbn}</td>
                <td>₩{item.evaluatedPrice.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 배송 정보 */}
      {request.shippings && request.shippings.length > 0 && (
        <div className={styles.section}>
          <h2>배송 정보</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>송장번호</th>
                <th>택배사</th>
                <th>수량</th>
                <th>수령 여부</th>
                <th>수령일</th>
                <th>수령자</th>
              </tr>
            </thead>
            <tbody>
              {request.shippings.map((shipping) => (
                <tr key={shipping.shippingId}>
                  <td>{shipping.trackingNumber}</td>
                  <td>{shipping.shippingCompany}</td>
                  <td>{shipping.actualQuantity}</td>
                  <td>{shipping.isReceived ? '완료' : '대기'}</td>
                  <td>
                    {shipping.receivedAt
                      ? new Date(shipping.receivedAt).toLocaleString()
                      : '-'}
                  </td>
                  <td>{shipping.receivedBy || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 가격조정 필요 상태일 때 액션 */}
      {request.status === 'NEED_NEGOTIATION' && (
        <div className={styles.section}>
          <h2>매입 신청 처리</h2>

          <div className={styles.actionGroup}>
            <button onClick={handleAccept} className={styles.acceptButton}>
              수락
            </button>

            <div className={styles.rejectGroup}>
              <input
                type="text"
                placeholder="거절 사유"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className={styles.input}
              />
              <button onClick={handleReject} className={styles.rejectButton}>
                거절
              </button>
            </div>

            <div className={styles.proposeGroup}>
              <input
                type="number"
                placeholder="제안 가격"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="제안 메모"
                value={proposalNote}
                onChange={(e) => setProposalNote(e.target.value)}
                className={styles.input}
              />
              <button onClick={handlePropose} className={styles.proposeButton}>
                가격 제안
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
