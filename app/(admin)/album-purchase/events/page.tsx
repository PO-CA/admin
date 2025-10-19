'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  useGetEvents,
  useDeleteEvent,
} from '@/query/query/album-purchase/events';

function EventsTable({
  filters,
}: {
  filters: {
    albumPurchaseId?: number;
    isVisible?: boolean;
    isFinished?: boolean;
  };
}) {
  const { data: events, isLoading, refetch } = useGetEvents(filters);
  const deleteEventMutation = useDeleteEvent();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (confirm('이 행사를 삭제하시겠습니까?')) {
      await deleteEventMutation.mutateAsync(id);
      refetch();
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
    },
    {
      field: 'title',
      headerName: '행사명',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'albumTitle',
      headerName: '음반명',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'albumArtist',
      headerName: '아티스트',
      width: 120,
    },
    {
      field: 'purchaseAlbumPrice',
      headerName: '매입가',
      width: 110,
      type: 'number',
      renderCell: (params: any) => {
        return `₩${params.value?.toLocaleString() || '0'}`;
      },
    },
    {
      field: 'eventDate',
      headerName: '행사일',
      width: 120,
    },
    {
      field: 'deadlineForArrivalDate',
      headerName: '마감일',
      width: 120,
    },
    {
      field: 'isVisible',
      headerName: '공개',
      width: 80,
      renderCell: (params: any) => {
        return params.value ? '공개' : '비공개';
      },
    },
    {
      field: 'isFinished',
      headerName: '종료',
      width: 80,
      renderCell: (params: any) => {
        return params.value ? '종료' : '진행중';
      },
    },
    {
      field: 'eventStatus',
      headerName: '상태',
      width: 120,
    },
    {
      field: 'actions',
      headerName: '작업',
      type: 'actions',
      width: 120,
      getActions: (params: any) => [
        <GridActionsCellItem
          key="view"
          icon={<VisibilityIcon />}
          label="상세"
          onClick={() => router.push(`/album-purchase/events/${params.id}`)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="수정"
          onClick={() =>
            router.push(`/album-purchase/events/${params.id}/edit`)
          }
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="삭제"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  const rows = (events || []).map((event: any) => ({
    id: event.id,
    title: event.title,
    albumTitle: event.albumTitle,
    albumArtist: event.albumArtist,
    purchaseAlbumPrice: event.purchaseAlbumPrice,
    eventDate: event.eventDate,
    deadlineForArrivalDate: event.deadlineForArrivalDate,
    isVisible: event.isVisible,
    isFinished: event.isFinished,
    eventStatus: event.eventStatus,
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

export default function EventsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<{
    albumPurchaseId?: number;
    isVisible?: boolean;
    isFinished?: boolean;
  }>({});

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        행사 관리
        <Button
          variant="contained"
          onClick={() => router.push('/album-purchase/events/create')}
          sx={{ background: '#4caf50', '&:hover': { background: '#45a049' } }}
        >
          행사 등록
        </Button>
      </Typography>

      {/* 필터 */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          select
          label="공개 여부"
          value={filters.isVisible?.toString() || ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              isVisible:
                e.target.value === '' ? undefined : e.target.value === 'true',
            })
          }
          sx={{ minWidth: 150 }}
          size="small"
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="true">공개</MenuItem>
          <MenuItem value="false">비공개</MenuItem>
        </TextField>

        <TextField
          select
          label="종료 여부"
          value={filters.isFinished?.toString() || ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              isFinished:
                e.target.value === '' ? undefined : e.target.value === 'true',
            })
          }
          sx={{ minWidth: 150 }}
          size="small"
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="false">진행 중</MenuItem>
          <MenuItem value="true">종료됨</MenuItem>
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
          <EventsTable filters={filters} />
        </Suspense>
      </Paper>
    </Box>
  );
}
