'use client';

import { useGetDashboardStats } from '@/query/query/album-purchase/settlements';
import styles from './page.module.css';

export default function DashboardPage() {
  const { data: stats, isLoading } = useGetDashboardStats();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>음반 매입 관리 대시보드</h1>

      <div className={styles.statsGrid}>
        {/* 전체 통계 */}
        <div className={styles.statCard}>
          <h3>전체 정산</h3>
          <div className={styles.statValue}>
            {stats?.totalSettlementCount || 0}건
          </div>
          <div className={styles.statAmount}>
            ₩{(stats?.totalSettlementAmount || 0).toLocaleString()}
          </div>
        </div>

        {/* 대기 중 정산 */}
        <div className={styles.statCard}>
          <h3>정산 대기 중</h3>
          <div className={styles.statValue}>
            {stats?.pendingSettlementCount || 0}건
          </div>
          <div className={styles.statAmount}>
            ₩{(stats?.pendingSettlementAmount || 0).toLocaleString()}
          </div>
        </div>

        {/* 완료된 정산 */}
        <div className={styles.statCard}>
          <h3>정산 완료</h3>
          <div className={styles.statValue}>
            {stats?.completedSettlementCount || 0}건
          </div>
          <div className={styles.statAmount}>
            ₩{(stats?.completedSettlementAmount || 0).toLocaleString()}
          </div>
        </div>

        {/* 오늘 정산 */}
        <div className={styles.statCard}>
          <h3>오늘 정산</h3>
          <div className={styles.statValue}>
            {stats?.todaySettlementCount || 0}건
          </div>
          <div className={styles.statAmount}>
            ₩{(stats?.todaySettlementAmount || 0).toLocaleString()}
          </div>
        </div>

        {/* 이번 달 정산 */}
        <div className={styles.statCard}>
          <h3>이번 달 정산</h3>
          <div className={styles.statValue}>
            {stats?.thisMonthSettlementCount || 0}건
          </div>
          <div className={styles.statAmount}>
            ₩{(stats?.thisMonthSettlementAmount || 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div className={styles.quickLinks}>
        <h2>빠른 링크</h2>
        <div className={styles.linkGrid}>
          <a href="/album-purchase/events" className={styles.link}>
            행사 관리
          </a>
          <a href="/album-purchase/requests" className={styles.link}>
            매입 신청 관리
          </a>
          <a href="/album-purchase/receipts" className={styles.link}>
            수령 처리
          </a>
          <a href="/album-purchase/settlements" className={styles.link}>
            정산 관리
          </a>
        </div>
      </div>
    </div>
  );
}
