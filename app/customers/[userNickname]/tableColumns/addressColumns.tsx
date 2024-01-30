'use client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';

export const addressColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.addressName,
    id: 'addressName',
    cell: (info) => info.getValue(),
    header: () => <span>배송지 이름</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.city,
    id: 'city',
    cell: (info) => info.getValue(),
    header: () => <span>도시</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.state,
    id: 'state',
    cell: (info) => info.getValue(),
    header: () => <span>군구</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.street,
    id: 'street',
    cell: (info) => info.getValue(),
    header: () => <span>상세주소</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.userEmail,
    id: 'userEmail',
    cell: (info) => info.getValue(),
    header: () => <span>이메일</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.zipcode,
    id: 'zipcode',
    cell: (info) => info.getValue(),
    header: () => <span>우편번호</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.receiverName,
    id: 'receiverName',
    cell: (info) => info.getValue(),
    header: () => <span>수령인</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.receiverPhoneNumber,
    id: 'receiverPhoneNumber',
    cell: (info) => info.getValue(),
    header: () => <span>연락처</span>,
    footer: (props) => props.column.id,
  },
  // {
  //   accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  //   id: 'fullName',
  //   header: 'Full Name',
  //   cell: (info) => info.getValue(),
  //   footer: (props) => props.column.id,
  //   filterFn: 'fuzzy',
  //   sortingFn: fuzzySort,
  // },
];
