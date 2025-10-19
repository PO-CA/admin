'use client';

import { useState } from 'react';
import {
  useGetEvents,
  useDeleteEvent,
} from '@/query/query/album-purchase/events';
import styles from './page.module.css';

export default function EventsPage() {
  const [filters, setFilters] = useState<{
    albumPurchaseId?: number;
    isVisible?: boolean;
    isFinished?: boolean;
  }>({});

  const { data: events, isLoading, refetch } = useGetEvents(filters);
  const deleteEventMutation = useDeleteEvent();

  const handleDelete = async (eventId: number) => {
    if (confirm('이 행사를 삭제하시겠습니까?')) {
      await deleteEventMutation.mutateAsync(eventId);
      refetch();
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>행사 관리</h1>
        <a href="/album-purchase/events/create" className={styles.createButton}>
          행사 등록
        </a>
      </div>

      {/* 필터 */}
      <div className={styles.filters}>
        <select
          value={filters.isVisible?.toString() || ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              isVisible:
                e.target.value === '' ? undefined : e.target.value === 'true',
            })
          }
          className={styles.filterSelect}
        >
          <option value="">공개 여부 전체</option>
          <option value="true">공개</option>
          <option value="false">비공개</option>
        </select>

        <select
          value={filters.isFinished?.toString() || ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              isFinished:
                e.target.value === '' ? undefined : e.target.value === 'true',
            })
          }
          className={styles.filterSelect}
        >
          <option value="">종료 여부 전체</option>
          <option value="false">진행 중</option>
          <option value="true">종료됨</option>
        </select>
      </div>

      {/* 테이블 */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>행사명</th>
              <th>음반명</th>
              <th>아티스트</th>
              <th>매입가</th>
              <th>행사일</th>
              <th>마감일</th>
              <th>공개</th>
              <th>종료</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {events && events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.title}</td>
                  <td>{event.albumTitle}</td>
                  <td>{event.albumArtist}</td>
                  <td>₩{event.purchaseAlbumPrice.toLocaleString()}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.deadlineForArrivalDate}</td>
                  <td>{event.isVisible ? '공개' : '비공개'}</td>
                  <td>{event.isFinished ? '종료' : '진행 중'}</td>
                  <td>{event.eventStatus}</td>
                  <td className={styles.actions}>
                    <a
                      href={`/album-purchase/events/${event.id}`}
                      className={styles.actionButton}
                    >
                      상세
                    </a>
                    <a
                      href={`/album-purchase/events/${event.id}/edit`}
                      className={styles.actionButton}
                    >
                      수정
                    </a>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className={styles.deleteButton}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className={styles.noData}>
                  등록된 행사가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
