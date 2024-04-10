'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import AddCartButton from '../cartList/addCartButton';
import Image from 'next/image';

export const productColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.thumbNailUrl,
    id: 'thumbNailUrl',
    cell: (info) => (
      <div>
        <Image
          alt="asd"
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
    accessorFn: (row) => row.barcode,
    id: 'barcode',
    cell: (info) => (
      <div>
        <div>{info.getValue()}</div>
        <div>{info?.row?.original?.sku}</div>
      </div>
    ),
    header: () => <span>바코드/sku</span>,
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
    accessorFn: (row) => row.deadlineDate,
    id: 'deadlineDate',
    cell: (info) => info.getValue()?.slice(0, 10),
    header: () => <span>주문마감일</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.releaseDate,
    id: 'releaseDate',
    cell: (info) => info.getValue()?.slice(0, 10),
    header: () => <span>출시일</span>,
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
    accessorFn: (row) => row.id,
    id: 'id',
    header: () => <span>담기</span>,

    cell: (info) => {
      return <AddCartButton info={info} />;
    },
  },
];
