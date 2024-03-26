'use client';
import { useMemo } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { NOTICE_DATA } from '@/constants/NoticeData';
import { toDateString } from '@/utils/utils';

export default function NoticeDetail({ params }: { params: { id: number } }) {
  const { id } = params;

  const noticeData = useMemo(
    () =>
      NOTICE_DATA.find((data) => data.id === Number(id)) || {
        id: 0,
        title: '',
        content: '',
        createdAt: '',
      },
    [id],
  );
  return (
    <main className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>{noticeData?.title}</div>
        <div>
          <div>{toDateString(noticeData?.createdAt)}</div>
          <Link href="/notice">목록</Link>
        </div>
      </div>
      <div className={styles.contentContainer}>{noticeData?.content}</div>
      <div>댓글</div>
    </main>
  );
}
