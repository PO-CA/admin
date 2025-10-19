'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  useGetSettlements,
  useGetEligibleRequests,
  useCreateSettlements,
} from '@/query/query/album-purchase/settlements';
import type { SettlementStatus } from '@/types/albumPurchase';
import { useSnackbar } from '../_components/useSnackbar';

const statusLabels: Record<SettlementStatus, string> = {
  PENDING: '정산대기',
  IN_PROGRESS: '정산진행중',
  COMPLETED: '정산완료',
  CANCELLED: '정산취소',
  HOLD: '정산보류',
};

function EligibleRequestsTable({
  selectedRequestIds,
  onSelectionChange,
}: {
  selectedRequestIds: number[];
  onSelectionChange: (ids: number[]) => void;
}) {
  const { data: eligibleRequests } = useGetEligibleRequests();

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
      field: 'totalEvaluatedPrice',
      headerName: '평가 금액',
      width: 130,
      type: 'number',
      renderCell: (params: any) => {
        return `₩${params.value?.toLocaleString() || '0'}`;
      },
    },
    {
      field: 'finishReviewAt',
      headerName: '검수 완료일',
      width: 130,
      renderCell: (params: any) => {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: 'bankName',
      headerName: '은행',
      width: 100,
    },
    {
      field: 'bankAccountNumber',
      headerName: '계좌번호',
      width: 150,
    },
  ];

  const rows = (eligibleRequests || []).map((request: any) => ({
    id: request.requestId,
    requestId: request.requestId,
    userName: request.userName,
    userEmail: request.userEmail,
    totalEvaluatedPrice: request.totalEvaluatedPrice,
    finishReviewAt: request.finishReviewAt,
    bankName: request.bankName,
    bankAccountNumber: request.bankAccountNumber,
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
      checkboxSelection
      rowSelectionModel={selectedRequestIds as any}
      onRowSelectionModelChange={(newSelection: any) => {
        onSelectionChange(Array.from(newSelection) as number[]);
      }}
      disableRowSelectionOnClick
    />
  );
}

function SettlementsTable({
  statusFilter,
}: {
  statusFilter?: SettlementStatus;
}) {
  const { data: settlements, isLoading } = useGetSettlements({
    status: statusFilter,
  });
  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '정산 ID',
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
      field: 'finalAmount',
      headerName: '정산 금액',
      width: 130,
      type: 'number',
      renderCell: (params: any) => {
        return `₩${params.value?.toLocaleString() || '0'}`;
      },
    },
    {
      field: 'settlementDate',
      headerName: '정산일',
      width: 120,
    },
    {
      field: 'status',
      headerName: '상태',
      width: 120,
      renderCell: (params: any) => {
        const status = params.value as SettlementStatus;
        const color = status === 'COMPLETED' ? 'success' : 'default';
        return <Chip label={statusLabels[status]} color={color} size="small" />;
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
            router.push(`/album-purchase/settlements/${params.id}`)
          }
        />,
      ],
    },
  ];

  const rows = (settlements || []).map((settlement: any) => ({
    id: settlement.id,
    userName: settlement.userName,
    userEmail: settlement.userEmail,
    finalAmount: settlement.finalAmount,
    settlementDate: settlement.settlementDate,
    status: settlement.status,
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

export default function SettlementsPage() {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [statusFilter, setStatusFilter] = useState<
    SettlementStatus | undefined
  >();
  const [selectedRequestIds, setSelectedRequestIds] = useState<number[]>([]);

  const { data: eligibleRequests, refetch: refetchEligible } =
    useGetEligibleRequests();
  const createMutation = useCreateSettlements();

  const handleCreateSettlements = async () => {
    if (selectedRequestIds.length === 0) {
      showSnackbar('정산할 신청을 선택해주세요.', 'warning');
      return;
    }

    if (confirm(`${selectedRequestIds.length}건의 정산을 생성하시겠습니까?`)) {
      try {
        await createMutation.mutateAsync({
          requestIds: selectedRequestIds,
          processedBy: 'admin',
        });
        showSnackbar('정산이 생성되었습니다.', 'success');
        setSelectedRequestIds([]);
        refetchEligible();
      } catch (error: any) {
        showSnackbar(error?.message || '정산 생성에 실패했습니다.', 'error');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <SnackbarComponent />
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
        정산 관리
      </Typography>

      {/* 정산 대상 */}
      {eligibleRequests && eligibleRequests.length > 0 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
              정산 대상 ({eligibleRequests.length}건)
            </Typography>
            <Button
              variant="contained"
              onClick={handleCreateSettlements}
              disabled={
                selectedRequestIds.length === 0 || createMutation.isPending
              }
              startIcon={
                createMutation.isPending && (
                  <CircularProgress size={16} color="inherit" />
                )
              }
              sx={{
                background: '#4caf50',
                '&:hover': { background: '#45a049' },
              }}
            >
              {createMutation.isPending
                ? '생성 중...'
                : `정산 생성 (${selectedRequestIds.length}건)`}
            </Button>
          </Box>
          <Suspense
            fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            }
          >
            <EligibleRequestsTable
              selectedRequestIds={selectedRequestIds}
              onSelectionChange={setSelectedRequestIds}
            />
          </Suspense>
        </Paper>
      )}

      {/* 정산 목록 */}
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            정산 목록
          </Typography>
          <TextField
            select
            label="상태 필터"
            value={statusFilter || ''}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
                  ? (e.target.value as SettlementStatus)
                  : undefined,
              )
            }
            sx={{ minWidth: 150 }}
            size="small"
          >
            <MenuItem value="">전체</MenuItem>
            <MenuItem value="PENDING">정산대기</MenuItem>
            <MenuItem value="COMPLETED">정산완료</MenuItem>
          </TextField>
        </Box>
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          <SettlementsTable statusFilter={statusFilter} />
        </Suspense>
      </Paper>
    </Box>
  );
}
