'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetEventDetail,
  useUpdateEvent,
} from '@/query/query/album-purchase/events';
import type { EventStatus, EventPurchaseType } from '@/types/albumPurchase';
import styles from './page.module.css';

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = Number(params.eventId);

  const { data: event, isLoading } = useGetEventDetail(eventId);
  const updateMutation = useUpdateEvent();

  const [formData, setFormData] = useState({
    title: '',
    eventDescription: '',
    memo: '',
    purchaseAlbumPrice: '',
    photocardPrice: '',
    purchaseAlbumAndPhotocardPrice: '',
    etcPrice: '',
    etcDescription: '',
    eventDate: '',
    deadlineForArrivalDate: '',
    limitPeriodDate: '',
    isVisible: true,
    isFinished: false,
    eventStatus: 'AVAILABLE_FOR_PURCHASE' as EventStatus,
    eventPurchaseType: 'ONLY_ALBUM' as EventPurchaseType,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        eventDescription: event.eventDescription || '',
        memo: event.memo || '',
        purchaseAlbumPrice: event.purchaseAlbumPrice?.toString() || '',
        photocardPrice: event.photocardPrice?.toString() || '',
        purchaseAlbumAndPhotocardPrice:
          event.purchaseAlbumAndPhotocardPrice?.toString() || '',
        etcPrice: event.etcPrice?.toString() || '',
        etcDescription: event.etcDescription || '',
        eventDate: event.eventDate || '',
        deadlineForArrivalDate: event.deadlineForArrivalDate || '',
        limitPeriodDate: event.limitPeriodDate?.toString() || '',
        isVisible: event.isVisible ?? true,
        isFinished: event.isFinished ?? false,
        eventStatus: event.eventStatus || 'AVAILABLE_FOR_PURCHASE',
        eventPurchaseType: event.eventPurchaseType || 'ONLY_ALBUM',
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        eventId,
        requestData: {
          title: formData.title,
          eventDescription: formData.eventDescription,
          memo: formData.memo,
          purchaseAlbumPrice: Number(formData.purchaseAlbumPrice),
          photocardPrice: Number(formData.photocardPrice),
          purchaseAlbumAndPhotocardPrice: Number(
            formData.purchaseAlbumAndPhotocardPrice,
          ),
          etcPrice: Number(formData.etcPrice),
          etcDescription: formData.etcDescription,
          eventDate: formData.eventDate,
          deadlineForArrivalDate: formData.deadlineForArrivalDate,
          limitPeriodDate: formData.limitPeriodDate
            ? Number(formData.limitPeriodDate)
            : undefined,
          isVisible: formData.isVisible,
          isFinished: formData.isFinished,
          eventStatus: formData.eventStatus,
          eventPurchaseType: formData.eventPurchaseType,
        },
      });
      alert('행사가 수정되었습니다.');
      router.push(`/album-purchase/events/${eventId}`);
    } catch (error) {
      console.error('행사 수정 실패:', error);
      alert('행사 수정에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>행사 수정</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>기본 정보</h2>
          <div className={styles.formGroup}>
            <label>행사명</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>행사 설명</label>
            <textarea
              value={formData.eventDescription}
              onChange={(e) =>
                setFormData({ ...formData, eventDescription: e.target.value })
              }
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>행사일</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>도착 마감일</label>
              <input
                type="date"
                value={formData.deadlineForArrivalDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deadlineForArrivalDate: e.target.value,
                  })
                }
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>가격 정보</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>앨범만</label>
              <input
                type="number"
                value={formData.purchaseAlbumPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseAlbumPrice: e.target.value,
                  })
                }
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>포토카드만</label>
              <input
                type="number"
                value={formData.photocardPrice}
                onChange={(e) =>
                  setFormData({ ...formData, photocardPrice: e.target.value })
                }
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>앨범 + 포토카드</label>
              <input
                type="number"
                value={formData.purchaseAlbumAndPhotocardPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purchaseAlbumAndPhotocardPrice: e.target.value,
                  })
                }
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>기타 가격</label>
              <input
                type="number"
                value={formData.etcPrice}
                onChange={(e) =>
                  setFormData({ ...formData, etcPrice: e.target.value })
                }
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>상태 설정</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>행사 상태</label>
              <select
                value={formData.eventStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventStatus: e.target.value as EventStatus,
                  })
                }
                className={styles.select}
              >
                <option value="AVAILABLE_FOR_PURCHASE">매입 가능</option>
                <option value="DISCONTINUED">매입 중단</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>매입 타입</label>
              <select
                value={formData.eventPurchaseType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventPurchaseType: e.target.value as EventPurchaseType,
                  })
                }
                className={styles.select}
              >
                <option value="ONLY_ALBUM">앨범만</option>
                <option value="ONLY_PHOTOCARD">포토카드만</option>
                <option value="ALBUM_AND_PHOTOCARD">앨범 + 포토카드</option>
                <option value="ETC">기타</option>
              </select>
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) =>
                  setFormData({ ...formData, isVisible: e.target.checked })
                }
              />
              공개
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.isFinished}
                onChange={(e) =>
                  setFormData({ ...formData, isFinished: e.target.checked })
                }
              />
              종료
            </label>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            수정 완료
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancelButton}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
