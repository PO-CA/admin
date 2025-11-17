'use client';

import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useGetLogiPocaProducts } from '@/query/query/logiPocaProducts';

const columns: GridColDef[] = [
  { field: 'title', headerName: '상품명', flex: 1, minWidth: 180 },
  { field: 'artist', headerName: '아티스트', flex: 0.6, minWidth: 120 },
  { field: 'member', headerName: '멤버', flex: 0.6, minWidth: 120 },
  { field: 'company', headerName: '유통사', flex: 0.6, minWidth: 120 },
  { field: 'sku', headerName: 'SKU', flex: 0.6, minWidth: 120 },
  {
    field: 'price',
    headerName: '가격',
    flex: 0.5,
    minWidth: 120,
    valueFormatter: ({ value }) =>
      value ? Number(value).toLocaleString('ko-KR') : '-',
  },
  { field: 'stock', headerName: '재고', flex: 0.4, minWidth: 90 },
  {
    field: 'createdAt',
    headerName: '등록일',
    flex: 0.6,
    minWidth: 140,
    valueFormatter: ({ value }) => (value ? dayjs(value).format('YY.MM.DD') : '-'),
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
