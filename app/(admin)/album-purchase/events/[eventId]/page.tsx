'use client';

import { useParams } from 'next/navigation';
import { useGetEventDetail } from '@/query/query/album-purchase/events';
import styles from './page.module.css';

export default function EventDetailPage() {
  const params = useParams();
  const eventId = Number(params.eventId);

  const { data: event, isLoading } = useGetEventDetail(eventId);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!event) {
    return <div>행사를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>행사 상세</h1>

      {/* 행사 기본 정보 */}
      <div className={styles.section}>
        <h2>행사 정보</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>행사 ID</label>
            <span>{event.id}</span>
          </div>
          <div className={styles.infoItem}>
            <label>행사명</label>
            <span>{event.title}</span>
          </div>
          <div className={styles.infoItem}>
            <label>행사일</label>
            <span>{event.eventDate}</span>
          </div>
          <div className={styles.infoItem}>
            <label>마감일</label>
            <span>{event.deadlineForArrivalDate}</span>
          </div>
          <div className={styles.infoItem}>
            <label>공개 여부</label>
            <span>{event.isVisible ? '공개' : '비공개'}</span>
          </div>
          <div className={styles.infoItem}>
            <label>종료 여부</label>
            <span>{event.isFinished ? '종료' : '진행 중'}</span>
          </div>
        </div>
      </div>

      {/* 음반 정보 */}
      <div className={styles.section}>
        <h2>음반 정보</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>음반명</label>
            <span>{event.albumTitle}</span>
          </div>
          <div className={styles.infoItem}>
            <label>아티스트</label>
            <span>{event.albumArtist}</span>
          </div>
          <div className={styles.infoItem}>
            <label>ISBN</label>
            <span>{event.isbn}</span>
          </div>
          <div className={styles.infoItem}>
            <label>발매일</label>
            <span>{event.albumReleaseDate}</span>
          </div>
          <div className={styles.infoItem}>
            <label>소속사</label>
            <span>{event.albumEntertainmentAgency || '-'}</span>
          </div>
        </div>
      </div>

      {/* 가격 정보 */}
      <div className={styles.section}>
        <h2>매입 가격</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>앨범만</label>
            <span>₩{event.purchaseAlbumPrice.toLocaleString()}</span>
          </div>
          <div className={styles.infoItem}>
            <label>포토카드만</label>
            <span>₩{event.photocardPrice.toLocaleString()}</span>
          </div>
          <div className={styles.infoItem}>
            <label>앨범 + 포토카드</label>
            <span>
              ₩{event.purchaseAlbumAndPhotocardPrice.toLocaleString()}
            </span>
          </div>
          <div className={styles.infoItem}>
            <label>기타</label>
            <span>₩{event.etcPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* 설명 및 메모 */}
      {(event.eventDescription || event.memo || event.etcDescription) && (
        <div className={styles.section}>
          <h2>추가 정보</h2>
          {event.eventDescription && (
            <div className={styles.infoItem}>
              <label>행사 설명</label>
              <p>{event.eventDescription}</p>
            </div>
          )}
          {event.etcDescription && (
            <div className={styles.infoItem}>
              <label>기타 설명</label>
              <p>{event.etcDescription}</p>
            </div>
          )}
          {event.memo && (
            <div className={styles.infoItem}>
              <label>메모</label>
              <p>{event.memo}</p>
            </div>
          )}
        </div>
      )}

      <div className={styles.actions}>
        <a
          href={`/album-purchase/events/${eventId}/edit`}
          className={styles.editButton}
        >
          수정
        </a>
        <a href="/album-purchase/events" className={styles.backButton}>
          목록으로
        </a>
      </div>
    </div>
  );
}
