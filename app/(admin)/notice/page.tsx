'use client';
import React from 'react';
import { useGetNotices, useDeleteNotice } from '@/query/query/notice';
import Link from 'next/link';

export default function AdminNoticePage() {
  const { data: notices, isLoading } = useGetNotices();
  const { mutate: deleteNotice, isPending: isDeleting } = useDeleteNotice();

  if (isLoading) return <div style={{ padding: 32 }}>로딩중...</div>;

  return (
    <div
      style={{
        maxWidth: 700,
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
        공지사항 관리
      </h2>
      <div style={{ marginBottom: 24, textAlign: 'right' }}>
        <Link
          href="/notice/create"
          style={{ color: '#1976d2', fontWeight: 500 }}
        >
          + 새 공지 작성
        </Link>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {notices?.map((notice: any) => (
          <li
            key={notice.id}
            style={{
              borderBottom: '1px solid #f0f0f0',
              padding: '16px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Link
                href={`/notice/${notice.id}`}
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
            </div>
            <button
              onClick={() => {
                if (window.confirm('정말 삭제하시겠습니까?'))
                  deleteNotice(notice.id);
              }}
              disabled={isDeleting}
              style={{
                color: '#fff',
                background: '#d32f2f',
                border: 'none',
                borderRadius: 4,
                padding: '6px 14px',
                cursor: 'pointer',
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
