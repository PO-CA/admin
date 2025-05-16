'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useGetNotice } from '@/query/query/notice';
import Link from 'next/link';

export default function NoticeDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: notice, isLoading } = useGetNotice(Number(id));

  if (isLoading) return <div style={{ padding: 32 }}>로딩중...</div>;
  if (!notice)
    return <div style={{ padding: 32 }}>공지사항을 찾을 수 없습니다.</div>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px #eee',
        padding: 32,
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        {notice.title}
      </h2>
      <div style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
        {notice.createdAt && new Date(notice.createdAt).toLocaleString()}
      </div>
      <div
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          minHeight: 120,
          marginBottom: 32,
        }}
      >
        {notice.content}
      </div>
      <div style={{ textAlign: 'right' }}>
        <Link
          href="/store/notice"
          style={{
            color: '#1976d2',
            textDecoration: 'underline',
            fontSize: 15,
          }}
        >
          목록으로
        </Link>
      </div>
    </div>
  );
}
