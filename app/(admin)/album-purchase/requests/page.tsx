'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetRequests } from '@/query/query/album-purchase/requests';
import type { PurchaseRequestStatus } from '@/types/albumPurchase';

const statusLabels: Record<PurchaseRequestStatus, string> = {
  DRAFT: '초안',
  NEED_NEGOTIATION: '가격조정필요',
  SUBMITTED: '접수완료',
  SHIPPED: '배송중',
  COMPLETE_TRACKING_NUMBER: '송장입력완료',
  RECEIVED_AND_MATCHED: '수령완료',
  REVIEWING: '검수중',
  FINAL_NEGOTIATION: '최종협상',
  FINISH_REVIEW: '검수완료',
  PENDING_SETTLEMENT: '정산대기',
  SETTLEMENT_COMPLETED: '정산완료',
};

function RequestsTable({
  statusFilter,
}: {
  statusFilter?: PurchaseRequestStatus;
}) {
  const { data: requests, isLoading } = useGetRequests({
    status: statusFilter,
  });
  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: 'requestId',
      headerName: '신청 ID',
      width: 90,
    },
    {
      field: 'userName',
      headerName: '신청자',
      width: 100,
    },
    {
      field: 'userEmail',
      headerName: '이메일',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'phoneNumber',
      headerName: '연락처',
      width: 130,
    },
    {
      field: 'eventTitle',
      headerName: '행사명',
      flex: 0.8,
      minWidth: 150,
    },
    {
      field: 'albumTitle',
      headerName: '음반명',
      flex: 0.8,
      minWidth: 150,
    },
    {
      field: 'itemCount',
      headerName: '아이템 수',
      width: 100,
      type: 'number',
    },
    {
      field: 'totalEvaluatedPrice',
      headerName: '총 금액',
      width: 130,
      type: 'number',
      renderCell: (params: any) => {
        return `₩${params.value?.toLocaleString() || '0'}`;
      },
    },
    {
      field: 'status',
      headerName: '상태',
      width: 130,
      renderCell: (params: any) => {
        const status = params.value as PurchaseRequestStatus;
        const color =
          status === 'NEED_NEGOTIATION'
            ? 'warning'
            : status === 'SETTLEMENT_COMPLETED'
              ? 'success'
              : 'default';
        return <Chip label={statusLabels[status]} color={color} size="small" />;
      },
    },
    {
      field: 'createdAt',
      headerName: '신청일',
      width: 110,
      renderCell: (params: any) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: 'actions',
      headerName: '작업',
      type: 'actions',
      width: 80,
      getActions: (params: any) => [
        <GridActionsCellItem
          key="view"
          icon={<VisibilityIcon />}
          label="상세"
          onClick={() =>
            router.push(`/album-purchase/requests/${params.row.requestId}`)
          }
        />,
      ],
    },
  ];

  const rows = (requests || []).map((request: any) => ({
    id: request.requestId,
    requestId: request.requestId,
    userName: request.userName,
    userEmail: request.userEmail,
    phoneNumber: request.phoneNumber,
    eventTitle: request.eventTitle,
    albumTitle: request.albumTitle,
    itemCount: request.itemCount,
    totalEvaluatedPrice: request.totalEvaluatedPrice,
    status: request.status,
    createdAt: request.createdAt,
  }));

  return (
    <DataGrid
      sx={{ height: 'auto', background: 'white', fontSize: 14 }}
      rows={rows}
      columns={columns}
      pageSizeOptions={[20, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      loading={isLoading}
      disableRowSelectionOnClick
    />
  );
}

export default function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState<
    PurchaseRequestStatus | undefined
  >();

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          background: 'white',
          p: 2,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          mb: 2,
          fontSize: 18,
        }}
      >
        매입 신청 관리
      </Typography>

      {/* 필터 */}
      <Box sx={{ mb: 2 }}>
        <TextField
          select
          label="상태 필터"
          value={statusFilter || ''}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
                ? (e.target.value as PurchaseRequestStatus)
                : undefined,
            )
          }
          sx={{ minWidth: 200 }}
          size="small"
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="NEED_NEGOTIATION">가격조정필요</MenuItem>
          <MenuItem value="SUBMITTED">접수완료</MenuItem>
          <MenuItem value="RECEIVED_AND_MATCHED">수령완료</MenuItem>
          <MenuItem value="REVIEWING">검수중</MenuItem>
          <MenuItem value="FINISH_REVIEW">검수완료</MenuItem>
          <MenuItem value="PENDING_SETTLEMENT">정산대기</MenuItem>
          <MenuItem value="SETTLEMENT_COMPLETED">정산완료</MenuItem>
        </TextField>
      </Box>

      <Paper
        sx={{
          background: 'white',
          fontSize: 14,
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
        }}
      >
        <Suspense fallback={<div>로딩 중...</div>}>
          <RequestsTable statusFilter={statusFilter} />
        </Suspense>
      </Paper>
    </Box>
  );
}
