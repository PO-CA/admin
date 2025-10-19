'use client';

import { useState, Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  useGetAlbums,
  useDeleteAlbum,
} from '@/query/query/album-purchase/albums';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '../_components/useSnackbar';

function AlbumsTable({
  onSuccess,
  onError,
}: {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const { data, isLoading, refetch } = useGetAlbums();
  const deleteMutation = useDeleteAlbum();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (confirm('이 앨범을 삭제하시겠습니까?')) {
      setDeletingId(id);
      try {
        await deleteMutation.mutateAsync(id);
        onSuccess('앨범이 삭제되었습니다.');
        refetch();
      } catch (error: any) {
        onError(error?.message || '삭제에 실패했습니다.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/album-purchase/albums/${id}/edit`);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
    },
    {
      field: 'isbn',
      headerName: 'ISBN',
      width: 140,
    },
    {
      field: 'title',
      headerName: '앨범명',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'artist',
      headerName: '아티스트',
      flex: 0.8,
      minWidth: 150,
    },
    {
      field: 'releaseDate',
      headerName: '발매일',
      width: 120,
    },
    {
      field: 'defaultPurchasePrice',
      headerName: '기본 매입가',
      width: 130,
      type: 'number',
      renderCell: (params: any) => {
        return `₩${params.value?.toLocaleString() || '0'}`;
      },
    },
    {
      field: 'softPurchaseLimit',
      headerName: 'Soft Limit',
      width: 110,
      type: 'number',
    },
    {
      field: 'hardPurchaseLimit',
      headerName: 'Hard Limit',
      width: 110,
      type: 'number',
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
      field: 'actions',
      headerName: '작업',
      type: 'actions',
      width: 100,
      getActions: (params: any) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="수정"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            deletingId === params.id ? (
              <CircularProgress size={16} />
            ) : (
              <DeleteIcon />
            )
          }
          label="삭제"
          onClick={() => handleDelete(params.id)}
          disabled={deletingId === params.id}
        />,
      ],
    },
  ];

  const rows = (data || []).map((album: any) => ({
    id: album.id,
    isbn: album.isbn,
    title: album.title,
    artist: album.artist,
    releaseDate: album.releaseDate,
    entertainmentAgency: album.entertainmentAgency,
    defaultPurchasePrice: album.defaultPurchasePrice,
    softPurchaseLimit: album.softPurchaseLimit,
    hardPurchaseLimit: album.hardPurchaseLimit,
    isVisible: album.isVisible,
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

export default function AlbumsPage() {
  const router = useRouter();
  const { showSnackbar, SnackbarComponent } = useSnackbar();

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        앨범 관리
        <Button
          variant="contained"
          onClick={() => router.push('/album-purchase/albums/create')}
          sx={{ background: '#4caf50' }}
        >
          앨범 등록
        </Button>
      </Typography>
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
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          <AlbumsTable
            onSuccess={(msg) => showSnackbar(msg, 'success')}
            onError={(msg) => showSnackbar(msg, 'error')}
          />
        </Suspense>
      </Paper>
    </Box>
  );
}
