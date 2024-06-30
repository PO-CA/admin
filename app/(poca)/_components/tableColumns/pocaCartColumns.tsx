'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';
// import DeleteCartButton from '../deleteCartButton';

export const pocaCartColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => (
      <Image
        alt="asd"
        unoptimized
        quality={20}
        src={`${process.env.NEXT_PUBLIC_S3_THUMBNAIL_URL}${info.row.original.poca_id}.JPG`}
        width={50}
        height={100}
      />
    ),
    header: () => <span>썸넬</span>,
  },
  {
    accessorFn: (row) => row.artist,
    id: 'artist',
    cell: (info) => info.getValue(),
    header: () => <span>가수</span>,
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
    cell: (info) => info.getValue(),
    header: () => <span>수량</span>,
  },
  {
    accessorFn: (row) => row.totalPrice,
    id: 'totalPrice',
    cell: (info) => info.getValue(),
    header: () => <span>총액</span>,
  },
  // {
  //   accessorFn: (row) => row.id,
  //   id: 'id',
  //   header: () => '',

  //   cell: (info) => {
  //     return <DeleteCartButton info={info} />;
  //   },
  // },
];
