'use client';
import { toDateString } from '@/utils/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';

export const noticeColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.title,
    id: 'title',
    cell: (info) => (
      <Link href={`/store/notice/${info.row.original.id}`}>
        {info.getValue()}
      </Link>
    ),
    header: () => <span>제목</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.createdAt,
    id: 'createdAt',
    cell: (info) => toDateString(info.getValue()),
    header: () => <span>작성일</span>,
    footer: (props) => props.column.id,
  },
];
