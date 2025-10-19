'use client';

import { useState } from 'react';
import {
  useGetSettlements,
  useGetEligibleRequests,
  useCreateSettlements,
} from '@/query/query/album-purchase/settlements';
import type { SettlementStatus } from '@/types/albumPurchase';
import styles from './page.module.css';

const statusLabels: Record<SettlementStatus, string> = {
  PENDING: '정산대기',
  IN_PROGRESS: '정산진행중',
  COMPLETED: '정산완료',
  CANCELLED: '정산취소',
  HOLD: '정산보류',
};

export default function SettlementsPage() {
  const [statusFilter, setStatusFilter] = useState<
    SettlementStatus | undefined
  >();
  const [selectedRequestIds, setSelectedRequestIds] = useState<number[]>([]);

  const { data: settlements, isLoading } = useGetSettlements({
    status: statusFilter,
  });
  const { data: eligibleRequests, refetch: refetchEligible } =
    useGetEligibleRequests();
  const createMutation = useCreateSettlements();

  const handleToggleSelect = (requestId: number) => {
    if (selectedRequestIds.includes(requestId)) {
      setSelectedRequestIds(
        selectedRequestIds.filter((id) => id !== requestId),
      );
    } else {
      setSelectedRequestIds([...selectedRequestIds, requestId]);
    }
  };

  const handleCreateSettlements = async () => {
    if (selectedRequestIds.length === 0) {
      alert('정산할 신청을 선택해주세요.');
      return;
    }

    if (confirm(`${selectedRequestIds.length}건의 정산을 생성하시겠습니까?`)) {
      try {
        await createMutation.mutateAsync({
          requestIds: selectedRequestIds,
          processedBy: 'admin',
        });
        alert('정산이 생성되었습니다.');
        setSelectedRequestIds([]);
        refetchEligible();
      } catch (error) {
        console.error('정산 생성 실패:', error);
      }
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>정산 관리</h1>

      {/* 정산 대상 */}
      {eligibleRequests && eligibleRequests.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>정산 대상</h2>
            <button
              onClick={handleCreateSettlements}
              className={styles.createButton}
              disabled={selectedRequestIds.length === 0}
            >
              정산 생성 ({selectedRequestIds.length}건)
            </button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRequestIds(
                          eligibleRequests.map((r) => r.requestId),
                        );
                      } else {
                        setSelectedRequestIds([]);
                      }
                    }}
                    checked={
                      selectedRequestIds.length === eligibleRequests.length
                    }
                  />
                </th>
                <th>신청 ID</th>
                <th>신청자</th>
                <th>이메일</th>
                <th>평가 금액</th>
                <th>검수 완료일</th>
                <th>은행</th>
                <th>계좌번호</th>
              </tr>
            </thead>
            <tbody>
              {eligibleRequests.map((request) => (
                <tr key={request.requestId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRequestIds.includes(request.requestId)}
                      onChange={() => handleToggleSelect(request.requestId)}
                    />
                  </td>
                  <td>{request.requestId}</td>
                  <td>{request.userName}</td>
                  <td>{request.userEmail}</td>
                  <td>₩{request.totalEvaluatedPrice.toLocaleString()}</td>
                  <td>
                    {new Date(request.finishReviewAt).toLocaleDateString()}
                  </td>
                  <td>{request.bankName}</td>
                  <td>{request.bankAccountNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 정산 목록 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>정산 목록</h2>
          <select
            value={statusFilter || ''}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
                  ? (e.target.value as SettlementStatus)
                  : undefined,
              )
            }
            className={styles.filterSelect}
          >
            <option value="">상태 전체</option>
            <option value="PENDING">정산대기</option>
            <option value="COMPLETED">정산완료</option>
          </select>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>정산 ID</th>
              <th>신청자</th>
              <th>이메일</th>
              <th>정산 금액</th>
              <th>정산일</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {settlements && settlements.length > 0 ? (
              settlements.map((settlement) => (
                <tr key={settlement.id}>
                  <td>{settlement.id}</td>
                  <td>{settlement.userName}</td>
                  <td>{settlement.userEmail}</td>
                  <td>₩{settlement.finalAmount.toLocaleString()}</td>
                  <td>{settlement.settlementDate}</td>
                  <td>
                    <span className={styles.statusBadge}>
                      {statusLabels[settlement.status]}
                    </span>
                  </td>
                  <td>
                    <a
                      href={`/album-purchase/settlements/${settlement.id}`}
                      className={styles.actionButton}
                    >
                      상세
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.noData}>
                  정산 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
