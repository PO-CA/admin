'use client';
import { s3URL } from '@/constants/s3URL';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const pocaListColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    header: '사진',
    cell: (info) => (
      <Image
        quality={20}
        unoptimized
        alt="asd"
        width={80}
        height={120}
        src={`${s3URL}/thumbnail/${info.getValue()}0.png`}
      />
    ),
  },
  {
    accessorFn: (row) => row.price,
    id: 'price',
    header: '가격',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.stock,
    id: 'stock',
    header: '재고',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.artist,
    id: 'artist',
    header: '아티스트',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.member,
    id: 'member',
    header: '맴버',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.description,
    id: 'description',
    header: '설명',
    cell: (info) => info.getValue(),
  },
];
