'use client';

import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetLogiAuditLogs } from '@/query/query/logiAudit';

type FilterState = {
  userId: string;
  userEmail: string;
  method: string;
  path: string;
  from: string;
  to: string;
};

const METHOD_OPTIONS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const initialFilters: FilterState = {
  userId: '',
  userEmail: '',
  method: '',
  path: '',
  from: '',
  to: '',
};

export default function LogiAuditLogsPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const queryParams = useMemo(
    () => ({
      page: paginationModel.page,
      size: paginationModel.pageSize,
      userId: filters.userId ? Number(filters.userId) : undefined,
      userEmail: filters.userEmail.trim() || undefined,
      method: filters.method || undefined,
      path: filters.path.trim() || undefined,
      from: filters.from || undefined,
      to: filters.to || undefined,
    }),
    [filters, paginationModel],
  );

  const { data: auditData, isLoading, isFetching, refetch } =
    useGetLogiAuditLogs(queryParams);

  const handleFilterChange =
    (key: keyof FilterState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, [key]: event.target.value }));
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    };

  const handleReset = () => {
    setFilters(initialFilters);
    setPaginationModel({ pageSize: 20, page: 0 });
  };

  const rows =
    auditData?.content?.map((log: any) => {
      const createdAt = log.createdAt
        ? dayjs(log.createdAt).format('YYYY-MM-DD HH:mm:ss')
        : '';
      const requestBodyPreview = log.requestBody
        ? log.requestBody.length > 120
          ? `${log.requestBody.slice(0, 120)}...`
          : log.requestBody
        : '';

      return {
        id: log.id || `${log.requestUri}-${log.createdAt}-${log.userId || 'anon'}`,
        ...log,
        createdAt,
        requestBodyPreview,
      };
    }) || [];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'createdAt',
      headerName: '요청 시각',
      width: 170,
    },
    {
      field: 'userEmail',
      headerName: '이메일',
      width: 180,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'userLevel',
      headerName: '레벨',
      width: 110,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'userId',
      headerName: '유저 ID',
      width: 100,
      renderCell: (params) => params.value ?? '-',
    },
    {
      field: 'httpMethod',
      headerName: '메서드',
      width: 110,
      renderCell: (params) => {
        const color =
          params.value === 'GET'
            ? 'default'
            : params.value === 'POST'
              ? 'success'
              : params.value === 'DELETE'
                ? 'error'
                : 'info';
        return (
          <Chip
            size="small"
            color={color as any}
            label={params.value}
            sx={{ fontWeight: 600 }}
          />
        );
      },
    },
    {
      field: 'responseStatus',
      headerName: '상태',
      width: 90,
      renderCell: (params) => params.value ?? '-',
    },
    {
      field: 'requestUri',
      headerName: 'URI',
      flex: 1.2,
      minWidth: 220,
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value || '-'}</span>
        </Tooltip>
      ),
    },
    {
      field: 'queryString',
      headerName: '쿼리',
      flex: 0.9,
      minWidth: 160,
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value || '-'}</span>
        </Tooltip>
      ),
    },
    {
      field: 'requestBodyPreview',
      headerName: '본문',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Tooltip title={params.row.requestBody || ''}>
          <span>{params.value || '-'}</span>
        </Tooltip>
      ),
    },
    {
      field: 'clientIp',
      headerName: 'IP',
      width: 130,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'userAgent',
      headerName: 'User Agent',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <Tooltip title={params.value || ''}>
          <span>{params.value || '-'}</span>
        </Tooltip>
      ),
    },
    {
      field: 'durationMs',
      headerName: '소요(ms)',
      width: 110,
      renderCell: (params) => params.value ?? '-',
    },
  ];

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
        Logi 감사 로그
      </Typography>

      <Paper
        sx={{
          p: 2,
          mb: 2,
          border: '1px solid',
          borderColor: 'divider',
          background: 'white',
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          flexWrap="wrap"
          useFlexGap
          alignItems="center"
        >
          <TextField
            label="유저 ID"
            size="small"
            value={filters.userId}
            onChange={handleFilterChange('userId')}
            sx={{ minWidth: 140 }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
          <TextField
            label="이메일"
            size="small"
            value={filters.userEmail}
            onChange={handleFilterChange('userEmail')}
            sx={{ minWidth: 200 }}
          />
          <TextField
            select
            label="메서드"
            size="small"
            value={filters.method}
            onChange={handleFilterChange('method')}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">전체</MenuItem>
            {METHOD_OPTIONS.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="경로 포함"
            size="small"
            value={filters.path}
            onChange={handleFilterChange('path')}
            sx={{ minWidth: 220 }}
            placeholder="/logi/..."
          />
          <TextField
            label="From"
            type="datetime-local"
            size="small"
            value={filters.from}
            onChange={handleFilterChange('from')}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="To"
            type="datetime-local"
            size="small"
            value={filters.to}
            onChange={handleFilterChange('to')}
            InputLabelProps={{ shrink: true }}
          />
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={() => {
                setPaginationModel((prev) => ({ ...prev, page: 0 }));
                refetch();
              }}
            >
              조회
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              초기화
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        sx={{
          background: 'white',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{ minHeight: 500, border: 'none' }}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[20, 50, 100]}
          rowCount={auditData?.totalElements || rows.length}
          loading={isLoading || isFetching}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
