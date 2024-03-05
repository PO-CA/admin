'use client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';

export const usersColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.userEmail,
    id: 'userEmail',
    cell: (info) => (
      <Link href={`/customers/${info.getValue()}`}>{info.getValue()}</Link>
    ),
    header: () => <span>이메일</span>,
    footer: (props) => props.column.id,
  },
  // {
  //   accessorFn: (row) => row.nickname,
  //   id: 'nickname',
  //   cell: (info) => (
  //     <Link href={`/customers/${info.getValue()}`}>{info.getValue()}</Link>
  //   ),
  //   header: () => <span>닉네임</span>,
  //   footer: (props) => props.column.id,
  // },
  {
    accessorFn: (row) => row.userLevel,
    id: 'userLevel',
    cell: (info) => info.getValue(),
    header: () => <span>권한</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.payRate,
    id: 'payRate',
    cell: (info) => info.getValue(),
    header: () => <span>[포카]수수료율</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.inCharge,
    id: 'inCharge',
    cell: (info) => info.getValue(),
    header: () => <span>담당자</span>,
    footer: (props) => props.column.id,
  },

  {
    accessorFn: (row) => row.phoneNumber,
    id: 'phoneNumber',
    cell: (info) => info.getValue(),
    header: () => <span>전화번호</span>,
    footer: (props) => props.column.id,
  },
];
