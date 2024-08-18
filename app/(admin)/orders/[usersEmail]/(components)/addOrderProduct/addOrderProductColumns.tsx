'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import AddOrderButton from './addOrderButton';
import Image from 'next/image';

export const addOrderProductColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => {
      return <AddOrderButton info={info} />;
    },
  },
  {
    accessorFn: (row) => row.coordinateNames,
    id: 'coordinateNames',
    cell: (info) => info.getValue(),
    header: () => <span>위치</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.barcode,
    id: 'barcode',
    cell: (info) => (
      <div>
        <div>{info.getValue()}</div>
      </div>
    ),
    header: () => <span>바코드</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.sku,
    id: 'sku',
    cell: (info) => (
      <div>
        <div>{info.getValue()}</div>
      </div>
    ),
    header: () => <span>sku</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.thumbNailUrl,
    id: 'thumbNailUrl',
    cell: (info) => (
      <div>
        <Image
          alt="썸네일"
          unoptimized={true}
          src={info.getValue()}
          width={100}
          height={100}
        />
        <div>상세페이지</div>
      </div>
    ),
    header: () => <span>썸네일</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.title,
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => <span>제목</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.dcPrice,
    id: 'dcPrice',
    cell: (info) => {
      return info.getValue();
    },
    header: () => <span>가격</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.stock,
    id: 'stock',
    cell: (info) => info.getValue(),
    header: () => <span>재고</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.releaseDate,
    id: 'releaseDate',
    cell: (info) => info.getValue()?.slice(0, 10),
    header: () => <span>출시일</span>,
    footer: (props) => props.column.id,
  },
];
