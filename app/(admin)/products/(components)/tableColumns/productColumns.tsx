'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Link from 'next/link';
import CellButtons from '../CellButtons';

export const productColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => (
      <Link href={`/products/${info.getValue()}`}>{info.getValue()}</Link>
    ),
    header: () => <span>ID</span>,
  },
  {
    id: 'buttons',
    cell: (info) => <CellButtons info={info} />,
    header: () => <span>기능</span>,
  },
  {
    accessorFn: (row) => row.coordinateNames,
    id: 'coordinateNames',
    cell: (info) => info.getValue(),
    header: () => <span>위치</span>,
  },
  {
    accessorFn: (row) => row.title,
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => <span>제목</span>,
  },
  {
    accessorFn: (row) => row.artist,
    id: 'artist',
    cell: (info) => info.getValue(),
    header: () => <span>가수</span>,
  },
  {
    accessorFn: (row) => row.barcode,
    id: 'barcode',
    cell: (info) => info.getValue(),
    header: () => <span>바코드/sku</span>,
  },
  {
    accessorFn: (row) => row.logiCategory.title,
    id: 'logiCategory',
    cell: (info) => info.getValue(),
    header: () => <span>카테고리</span>,
  },
  {
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => info.getValue(),
    header: () => <span>가격</span>,
  },
  {
    accessorFn: (row) => row.stock,
    id: 'stock',
    cell: (info) => info.getValue(),
    header: () => <span>수량</span>,
  },
];
