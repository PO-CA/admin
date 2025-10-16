'use client';
import { useState } from 'react';
import {
  useGetProductVersionsByProductId,
  useCreateProductVersion,
  useUpdateProductVersion,
  useDeleteProductVersion,
} from '@/query/query/productVersion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface VersionManagementProps {
  productId: number;
}

export default function VersionManagement({
  productId,
}: VersionManagementProps) {
  const { data: versions, isLoading } =
    useGetProductVersionsByProductId(productId);
  const { mutateAsync: createVersion } = useCreateProductVersion();
  const { mutateAsync: updateVersion } = useUpdateProductVersion();
  const { mutateAsync: deleteVersion } = useDeleteProductVersion();

  const [newVersionName, setNewVersionName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editVersionName, setEditVersionName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAddVersion = async () => {
    if (!newVersionName.trim()) {
      alert('버전명을 입력해주세요.');
      return;
    }

    await createVersion({
      logiProductId: productId,
      versionName: newVersionName,
      description: newDescription,
      visible: true,
      deleted: false,
    });

    setNewVersionName('');
    setNewDescription('');
  };

  const handleStartEdit = (version: any) => {
    setEditingId(version.id);
    setEditVersionName(version.versionName);
    setEditDescription(version.description || '');
  };

  const handleSaveEdit = async () => {
    if (!editVersionName.trim()) {
      alert('버전명을 입력해주세요.');
      return;
    }

    await updateVersion({
      id: editingId!,
      versionName: editVersionName,
      description: editDescription,
    });

    setEditingId(null);
    setEditVersionName('');
    setEditDescription('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditVersionName('');
    setEditDescription('');
  };

  const handleDelete = async (id: number) => {
    if (confirm('이 버전을 삭제하시겠습니까?')) {
      await deleteVersion(id);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.5,
    },
    {
      field: 'versionName',
      headerName: '버전명',
      flex: 1.5,
      renderCell: (params) => {
        if (editingId === params.row.id) {
          return (
            <TextField
              value={editVersionName}
              onChange={(e) => setEditVersionName(e.target.value)}
              size="small"
              fullWidth
            />
          );
        }
        return params.value;
      },
    },
    {
      field: 'description',
      headerName: '설명',
      flex: 2,
      renderCell: (params) => {
        if (editingId === params.row.id) {
          return (
            <TextField
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              size="small"
              fullWidth
            />
          );
        }
        return params.value || '-';
      },
    },
    {
      field: 'actions',
      headerName: '작업',
      flex: 1,
      renderCell: (params) => {
        if (editingId === params.row.id) {
          return (
            <Box>
              <IconButton
                size="small"
                color="primary"
                onClick={handleSaveEdit}
              >
                <SaveIcon />
              </IconButton>
              <IconButton size="small" onClick={handleCancelEdit}>
                <CancelIcon />
              </IconButton>
            </Box>
          );
        }
        return (
          <Box>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleStartEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const rows = (versions || []).map((version: any) => ({
    id: version.id,
    versionName: version.versionName,
    description: version.description,
  }));

  return (
    <Paper
      sx={{
        background: 'white',
        p: 2,
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography sx={{ fontWeight: 700, mb: 2 }}>버전 관리</Typography>

      {/* 새 버전 추가 */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="버전명"
          value={newVersionName}
          onChange={(e) => setNewVersionName(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          placeholder="예: 일반판, 한정판"
        />
        <TextField
          label="설명"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          size="small"
          sx={{ flex: 2 }}
          placeholder="버전 설명 (선택사항)"
        />
        <Button
          variant="contained"
          onClick={handleAddVersion}
          sx={{ fontWeight: 600 }}
        >
          버전 추가
        </Button>
      </Box>

      {/* 버전 목록 */}
      <DataGrid
        sx={{ height: 'auto', minHeight: 200, fontSize: 14 }}
        rows={rows}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}

