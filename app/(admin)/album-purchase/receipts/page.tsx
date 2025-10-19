'use client';

import { useState } from 'react';
import {
  useScanReceipt,
  useGetUnmatchedReceipts,
  useMatchUnmatchedReceipt,
  useSearchRequests,
} from '@/query/query/album-purchase/receipts';
import styles from './page.module.css';

export default function ReceiptsPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingCompany, setShippingCompany] = useState('');
  const [receivedBy, setReceivedBy] = useState('admin');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedUnmatchedId, setSelectedUnmatchedId] = useState<number | null>(
    null,
  );
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null,
  );

  const scanMutation = useScanReceipt();
  const { data: unmatchedReceipts, refetch: refetchUnmatched } =
    useGetUnmatchedReceipts();
  const matchMutation = useMatchUnmatchedReceipt();
  const { data: searchResults } = useSearchRequests(searchKeyword);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber || !shippingCompany) {
      alert('송장번호와 택배사를 입력해주세요.');
      return;
    }

    try {
      const result = await scanMutation.mutateAsync({
        trackingNumber,
        shippingCompany,
        receivedBy,
      });

      if (result.matched) {
        alert(`매칭 성공! 매입 신청 ID: ${result.requestId}`);
      } else {
        alert('매칭되는 신청이 없습니다. 미매칭 수령 건으로 등록되었습니다.');
      }

      setTrackingNumber('');
      setShippingCompany('');
      refetchUnmatched();
    } catch (error) {
      console.error('스캔 실패:', error);
    }
  };

  const handleMatch = async () => {
    if (!selectedUnmatchedId || !selectedRequestId) {
      alert('미매칭 수령 건과 매입 신청을 선택해주세요.');
      return;
    }

    try {
      await matchMutation.mutateAsync({
        unmatchedReceiptId: selectedUnmatchedId,
        requestData: {
          requestId: selectedRequestId,
          matchedBy: 'admin',
        },
      });
      alert('매칭 완료!');
      setSelectedUnmatchedId(null);
      setSelectedRequestId(null);
      setSearchKeyword('');
      refetchUnmatched();
    } catch (error) {
      console.error('매칭 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>수령 처리</h1>

      {/* 송장 스캔 */}
      <div className={styles.section}>
        <h2>송장 스캔</h2>
        <form onSubmit={handleScan} className={styles.scanForm}>
          <input
            type="text"
            placeholder="송장번호"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="택배사"
            value={shippingCompany}
            onChange={(e) => setShippingCompany(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="수령자"
            value={receivedBy}
            onChange={(e) => setReceivedBy(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.scanButton}>
            스캔
          </button>
        </form>
      </div>

      {/* 미매칭 수령 건 */}
      <div className={styles.section}>
        <h2>미매칭 수령 건</h2>
        {unmatchedReceipts && unmatchedReceipts.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>선택</th>
                <th>ID</th>
                <th>송장번호</th>
                <th>택배사</th>
                <th>수령일</th>
                <th>수령자</th>
              </tr>
            </thead>
            <tbody>
              {unmatchedReceipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>
                    <input
                      type="radio"
                      name="unmatched"
                      checked={selectedUnmatchedId === receipt.id}
                      onChange={() => setSelectedUnmatchedId(receipt.id)}
                    />
                  </td>
                  <td>{receipt.id}</td>
                  <td>{receipt.trackingNumber}</td>
                  <td>{receipt.shippingCompany}</td>
                  <td>{new Date(receipt.receivedAt).toLocaleString()}</td>
                  <td>{receipt.receivedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>미매칭 수령 건이 없습니다.</p>
        )}
      </div>

      {/* 매칭할 신청 검색 */}
      {selectedUnmatchedId && (
        <div className={styles.section}>
          <h2>매칭할 신청 검색</h2>
          <input
            type="text"
            placeholder="신청자 이름, 이메일, 연락처로 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className={styles.input}
          />

          {searchResults && searchResults.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>신청 ID</th>
                  <th>신청자</th>
                  <th>이메일</th>
                  <th>연락처</th>
                  <th>행사명</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((request) => (
                  <tr key={request.requestId}>
                    <td>
                      <input
                        type="radio"
                        name="request"
                        checked={selectedRequestId === request.requestId}
                        onChange={() => setSelectedRequestId(request.requestId)}
                      />
                    </td>
                    <td>{request.requestId}</td>
                    <td>{request.userName}</td>
                    <td>{request.userEmail}</td>
                    <td>{request.phoneNumber}</td>
                    <td>{request.eventTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedRequestId && (
            <button onClick={handleMatch} className={styles.matchButton}>
              매칭하기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
