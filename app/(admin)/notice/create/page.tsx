'use client';
import React, { useState } from 'react';
import { useCreateNotice } from '@/query/query/notice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminNoticeCreatePage() {
  const { mutate: createNotice, isPending } = useCreateNotice();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '', visible: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNotice(form, { onSuccess: () => router.push('/notice') });
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
        공지사항 작성
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
          disabled={isPending}
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 18px',
            fontSize: 16,
          }}
        >
          {isPending ? '저장중...' : '저장'}
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
