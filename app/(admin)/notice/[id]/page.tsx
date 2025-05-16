'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetNotice,
  useUpdateNotice,
  useDeleteNotice,
} from '@/query/query/notice';
import Link from 'next/link';

export default function AdminNoticeDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: notice, isLoading } = useGetNotice(Number(id));
  const { mutate: updateNotice, isPending: isUpdating } = useUpdateNotice();
  const { mutate: deleteNotice, isPending: isDeleting } = useDeleteNotice();
  const router = useRouter();

  const [form, setForm] = useState({ title: '', content: '', visible: true });

  useEffect(() => {
    if (notice)
      setForm({
        title: notice.title,
        content: notice.content,
        visible: notice.visible,
      });
  }, [notice]);

  if (isLoading) return <div style={{ padding: 32 }}>로딩중...</div>;
  if (!notice)
    return <div style={{ padding: 32 }}>공지사항을 찾을 수 없습니다.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNotice(
      { id: Number(id), ...form },
      { onSuccess: () => alert('수정 완료!') },
    );
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteNotice(Number(id), {
        onSuccess: () => router.push('/notice'),
      });
    }
  };

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
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        공지사항 상세/수정
      </h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <input
          style={{ width: '100%', fontSize: 18, marginBottom: 12, padding: 8 }}
          placeholder="제목"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
        <textarea
          style={{
            width: '100%',
            minHeight: 120,
            fontSize: 16,
            marginBottom: 12,
            padding: 8,
          }}
          placeholder="내용"
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          required
        />
        <label style={{ display: 'block', marginBottom: 16 }}>
          <input
            type="checkbox"
            checked={form.visible}
            onChange={(e) =>
              setForm((f) => ({ ...f, visible: e.target.checked }))
            }
          />{' '}
          노출여부
        </label>
        <button
          type="submit"
          disabled={isUpdating}
          style={{
            marginRight: 12,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 18px',
            fontSize: 16,
          }}
        >
          {isUpdating ? '수정중...' : '수정 저장'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            background: '#d32f2f',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 18px',
            fontSize: 16,
          }}
        >
          삭제
        </button>
      </form>
      <div style={{ textAlign: 'right' }}>
        <Link
          href="/notice"
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
