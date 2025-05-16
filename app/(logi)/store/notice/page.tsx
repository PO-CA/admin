'use client';
import React from 'react';
import { useGetNotices } from '@/query/query/notice';
import Link from 'next/link';

export default function NoticePage() {
  const { data: notices, isLoading } = useGetNotices();

  if (isLoading) return <div style={{ padding: 32 }}>로딩중...</div>;

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
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 24,
          borderBottom: '1px solid #eee',
          paddingBottom: 12,
        }}
      >
        공지사항
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {notices?.map((notice: any) => (
          <li
            key={notice.id}
            style={{ borderBottom: '1px solid #f0f0f0', padding: '16px 0' }}
          >
            <Link
              href={`/store/notice/${notice.id}`}
              style={{
                textDecoration: 'none',
                color: '#222',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              <b>{notice.title}</b>{' '}
              {notice.visible ? (
                ''
              ) : (
                <span style={{ color: '#aaa', fontSize: 14 }}>(숨김)</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
