'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';
// import DeleteCartButton from '../deleteCartButton';

export const pocaOrderListColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.artist,
    id: 'artist',
    cell: (info) => (
      <Image
        alt="asd"
        unoptimized
        quality={20}
        src={`${process.env.NEXT_PUBLIC_S3_THUMBNAIL_URL}${info.row.original.pocaId}.JPG`}
        width={50}
        height={100}
      />
    ),
    header: () => <span>썸넬</span>,
  },

  {
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => info.getValue(),
    header: () => <span>가격</span>,
  },
  {
    accessorFn: (row) => row.qty,
    id: 'qty',
    cell: (info) => (
      <div>
        <div style={{ display: 'flex' }}>
          <div>재고 : </div>
          <div>{info.row.original.presentStock}</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div>주문량 :</div>
          <div>{info.getValue()}</div>
        </div>
      </div>
    ),
    header: () => <span>수량</span>,
  },
];
