'use client';

import { useState } from 'react';
import { useGetRequests } from '@/query/query/album-purchase/requests';
import type { PurchaseRequestStatus } from '@/types/albumPurchase';
import styles from './page.module.css';

const statusLabels: Record<PurchaseRequestStatus, string> = {
  DRAFT: '초안',
  NEED_NEGOTIATION: '가격조정필요',
  SUBMITTED: '접수완료',
  SHIPPED: '배송중',
  COMPLETE_TRACKING_NUMBER: '송장입력완료',
  RECEIVED_AND_MATCHED: '수령완료',
  REVIEWING: '검수중',
  FINAL_NEGOTIATION: '최종협상',
  FINISH_REVIEW: '검수완료',
  PENDING_SETTLEMENT: '정산대기',
  SETTLEMENT_COMPLETED: '정산완료',
};

export default function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState<
    PurchaseRequestStatus | undefined
  >();

  const { data: requests, isLoading } = useGetRequests({
    status: statusFilter,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>매입 신청 관리</h1>
      </div>

      {/* 필터 */}
      <div className={styles.filters}>
        <select
          value={statusFilter || ''}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
                ? (e.target.value as PurchaseRequestStatus)
                : undefined,
            )
          }
          className={styles.filterSelect}
        >
          <option value="">상태 전체</option>
          <option value="NEED_NEGOTIATION">가격조정필요</option>
          <option value="SUBMITTED">접수완료</option>
          <option value="RECEIVED_AND_MATCHED">수령완료</option>
          <option value="REVIEWING">검수중</option>
          <option value="FINISH_REVIEW">검수완료</option>
          <option value="PENDING_SETTLEMENT">정산대기</option>
          <option value="SETTLEMENT_COMPLETED">정산완료</option>
        </select>
      </div>

      {/* 테이블 */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>신청 ID</th>
              <th>신청자</th>
              <th>이메일</th>
              <th>연락처</th>
              <th>행사명</th>
              <th>음반명</th>
              <th>아이템 수</th>
              <th>총 금액</th>
              <th>상태</th>
              <th>신청일</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {requests && requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.requestId}>
                  <td>{request.requestId}</td>
                  <td>{request.userName}</td>
                  <td>{request.userEmail}</td>
                  <td>{request.phoneNumber}</td>
                  <td>{request.eventTitle}</td>
                  <td>{request.albumTitle}</td>
                  <td>{request.itemCount}</td>
                  <td>₩{request.totalEvaluatedPrice.toLocaleString()}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        request.status === 'NEED_NEGOTIATION'
                          ? styles.statusWarning
                          : request.status === 'SETTLEMENT_COMPLETED'
                            ? styles.statusSuccess
                            : ''
                      }`}
                    >
                      {statusLabels[request.status]}
                    </span>
                  </td>
                  <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actions}>
                    <a
                      href={`/album-purchase/requests/${request.requestId}`}
                      className={styles.actionButton}
                    >
                      상세
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className={styles.noData}>
                  매입 신청이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
