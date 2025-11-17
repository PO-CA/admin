'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetLogiPocaProducts } from '@/query/query/logiPocaProducts';
import type { LogiPocaProduct } from '@/types/logiPocaProduct';

const columns: GridColDef<LogiPocaProduct>[] = [
  {
    field: 'thumbNailUrl',
    headerName: '썸네일',
    flex: 0.5,
    minWidth: 110,
    sortable: false,
    filterable: false,
    renderCell: ({ value, row }) =>
      value ? (
        <Avatar
          variant="rounded"
          src={value}
          alt={row.title ?? '썸네일 이미지'}
          sx={{ width: 56, height: 56 }}
        />
      ) : (
        <Avatar variant="rounded" sx={{ width: 56, height: 56, fontSize: 14 }}>
          없음
        </Avatar>
      ),
  },
  {
    field: 'eventName',
    headerName: '이벤트명',
    flex: 1.1,
    minWidth: 180,
    valueGetter: (_value, row) => row.eventName || row.title || '-',
  },
  { field: 'artist', headerName: '아티스트', flex: 0.7, minWidth: 140 },
  { field: 'member', headerName: '멤버', flex: 0.7, minWidth: 140 },
  {
    field: 'price',
    headerName: '판매가',
    flex: 0.6,
    minWidth: 120,
    valueFormatter: ({ value }) =>
      value ? Number(value).toLocaleString('ko-KR') : '-',
  },
  { field: 'stock', headerName: '재고', flex: 0.4, minWidth: 90 },
  {
    field: 'description',
    headerName: '설명',
    flex: 1,
    minWidth: 200,
    renderCell: ({ value }) => (
      <Typography variant="body2" color="text.primary" noWrap>
        {value ?? '-'}
      </Typography>
    ),
  },
  {
    field: 'vectorStatus',
    headerName: '이미지 상태',
    flex: 0.5,
    minWidth: 140,
    valueFormatter: ({ value }) => (value ? value : '-'),
  },
];

export default function LogiPocaProductTable() {
  const { data, isLoading, refetch, isFetching } = useGetLogiPocaProducts();

  const rows =
    data?.map((item, idx) => ({
      ...item,
      id: item.id ?? idx,
    })) ?? [];

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            등록된 포토카드
          </Typography>
          <Typography variant="body2" color="text.secondary">
            총 {rows.length}개의 상품이 등록되어 있습니다.
          </Typography>
        </Box>
        <Button variant="outlined" onClick={() => refetch()} disabled={isFetching}>
          새로고침
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
          }}
          pageSizeOptions={[20, 50, 100]}
          sx={{
            backgroundColor: 'white',
          }}
        />
      )}
    </Paper>
  );
}
