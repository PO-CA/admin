'use client';

import { useState } from 'react';
import { useGetSettlementReport } from '@/query/query/album-purchase/settlements';
import styles from './page.module.css';

export default function SettlementReportPage() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState(
    firstDayOfMonth.toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState(
    lastDayOfMonth.toISOString().split('T')[0],
  );

  const { data: report, isLoading } = useGetSettlementReport(
    startDate,
    endDate,
  );

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>정산 리포트</h1>

      {/* 날짜 선택 */}
      <div className={styles.section}>
        <div className={styles.dateFilter}>
          <div className={styles.dateGroup}>
            <label>시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
          <div className={styles.dateGroup}>
            <label>종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
        </div>
      </div>

      {report && (
        <>
          {/* 요약 통계 */}
          <div className={styles.section}>
            <h2>기간 요약</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>총 정산 건수</div>
                <div className={styles.statValue}>
                  {report.totalSettlementCount}건
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>완료</div>
                <div className={styles.statValue}>
                  {report.completedCount}건
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>대기</div>
                <div className={styles.statValue}>{report.pendingCount}건</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>총 정산액</div>
                <div className={styles.statValue}>
                  ₩{report.totalAmount.toLocaleString()}
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>완료 금액</div>
                <div className={styles.statValue}>
                  ₩{report.completedAmount.toLocaleString()}
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>대기 금액</div>
                <div className={styles.statValue}>
                  ₩{report.pendingAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* 월별 데이터 */}
          <div className={styles.section}>
            <h2>월별 정산 현황</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>년월</th>
                  <th>정산 건수</th>
                  <th>정산 금액</th>
                </tr>
              </thead>
              <tbody>
                {report.monthlyData && report.monthlyData.length > 0 ? (
                  report.monthlyData.map((data) => (
                    <tr key={`${data.year}-${data.month}`}>
                      <td>
                        {data.year}년 {data.month}월
                      </td>
                      <td>{data.settlementCount}건</td>
                      <td>₩{data.totalAmount.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className={styles.noData}>
                      데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
