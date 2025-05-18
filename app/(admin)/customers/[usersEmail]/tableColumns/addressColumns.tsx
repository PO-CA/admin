'use client';
import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomerCellButtons from '../../(components)/tableColumns/CustomerCellButtons';

export const addressColumns: GridColDef[] = [
  {
    field: 'addressName',
    headerName: '배송지 이름',
    flex: 1,
  },
  {
    field: 'buttons',
    headerName: '기능',
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <CustomerCellButtons
        info={{
          row: { original: params.row },
        }}
      />
    ),
  },
  {
    field: 'city',
    headerName: '도시',
    flex: 1,
  },
  {
    field: 'state',
    headerName: '군구',
    flex: 1,
  },
  {
    field: 'street',
    headerName: '상세주소',
    flex: 1.5,
  },
  {
    field: 'zipcode',
    headerName: '우편번호',
    flex: 0.8,
  },
  {
    field: 'receiverName',
    headerName: '수령인',
    flex: 1,
  },
  {
    field: 'receiverPhoneNumber',
    headerName: '연락처',
    flex: 1.2,
  },
];
