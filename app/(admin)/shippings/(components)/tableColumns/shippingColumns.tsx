'use client';
import React from 'react';
import Link from 'next/link';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DeleteShippingButton from '../deleteShippingButton';
import PayShippingButton from '../payShippingButton';
import { Button } from '@mui/material';
import CancelCompleteShippingButton from '../cancelCompleteShippingButton';

// !!! 주의 !!! - 이 파일은 더 이상 사용되지 않습니다.
// 대신 app/(admin)/shippings/(components)/ShippingTable.tsx 파일에서 직접 컬럼을 정의합니다.
// 이 파일은 참조용으로만 남겨둡니다.

export const shippingColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.5,
    renderCell: (params: GridRenderCellParams) => (
      <Link href={`/shippings/${params.value}`}>{params.value}</Link>
    ),
  },
  {
    field: 'createdAt',
    headerName: '발송일',
    flex: 1,
    valueGetter: (params: any) => {
      return params.slice(0, 10) || '';
    },
  },
  {
    field: 'userNickname',
    headerName: '닉네임',
    flex: 1,
  },
  {
    field: 'totalProductPrice',
    headerName: '상품가격',
    flex: 0.7,
  },
  {
    field: 'shippingFee',
    headerName: '배송비',
    flex: 0.7,
  },
  {
    field: 'memo',
    headerName: '배송메모',
    flex: 1,
  },
  {
    field: 'buttons',
    headerName: '',
    flex: 1.5,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <DeleteShippingButton info={{ row: { original: params.row } }} />
        <PayShippingButton info={{ row: { original: params.row } }} />
        <CancelCompleteShippingButton
          info={{ row: { original: params.row } }}
        />
      </div>
    ),
  },
  {
    field: 'shippingStatus',
    headerName: '배송상태',
    flex: 0.6,
    valueGetter: (params: any) => {
      return params;
    },
  },
  {
    field: 'updatedAt',
    headerName: '배송/결제일',
    flex: 1,
    valueGetter: (params: any) => {
      return params?.slice(0, 10) || '';
    },
  },
  {
    field: 'videoStatus',
    headerName: '영상',
    flex: 1,
    renderCell: (params: any) => {
      return params.value === '영상저장' ? (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: '90px' }}
            className="video-play-button"
            data-video-url={params.row.videoUrl}
          >
            영상재생
          </Button>
        </div>
      ) : (
        ''
      );
    },
  },
];
