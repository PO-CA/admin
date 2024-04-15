'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';

export const printPickingListColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.thumbNailUrl,
    id: 'thumbNailUrl',
    cell: ({ row }) => (
      <div>
        <Image
          alt="asd"
          unoptimized={true}
          src={row.original.original.thumbNailUrl}
          width={100}
          height={100}
        />
      </div>
    ),
    header: () => <span>썸네일</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.barcode,
    id: 'barcode',
    cell: ({ row }) => (
      <div>
        <div>{row.original.original.barcode}</div>
        <div>{row.original.original.sku}</div>
      </div>
    ),
    header: () => <span>바코드/sku</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.title,
    id: 'title',
    cell: ({ row }) => row.original.original.title,
    header: () => <span>제목</span>,
    footer: (props) => props.column.id,
  },

  {
    accessorFn: (row) => row.qty,
    id: 'qty',
    cell: ({ row }) => row.original.original.qty,
    header: () => <span>수량</span>,
    footer: (props) => props.column.id,
  },
];
