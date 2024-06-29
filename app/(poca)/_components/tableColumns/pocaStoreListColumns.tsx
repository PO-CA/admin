'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
// import AddCartButton from '../cartList/addCartButton';
import Image from 'next/image';
import AddPocaToCart from '../pocaList/addPocaToCart';

export const pocaStoreListColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.thumbNailUrl,
    id: 'thumbNailUrl',
    cell: (info) => (
      <Image
        alt="asd"
        unoptimized
        src={info.getValue()}
        width={50}
        height={100}
      />
    ),
    header: () => <span>썸네일</span>,
  },
  {
    accessorFn: (row) => row.artist,
    id: 'artist',
    cell: (info) => info.getValue(),
    header: () => <span>가수</span>,
  },
  {
    accessorFn: (row) => row.member,
    id: 'member',
    cell: (info) => info.getValue(),
    header: () => <span>멤버</span>,
  },
  {
    accessorFn: (row) => row.id,
    id: 'id',
    header: () => <span></span>,
    cell: (info) => {
      return <AddPocaToCart info={info} />;
    },
  },
];
