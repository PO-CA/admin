'use client';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { printPickingListColumns } from '../printPickingListColumns';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

// 프린트용 스타일드 컴포넌트
const PrintContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: '20px 30px',
  margin: '0',
  '@media print': {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: '20px',
    backgroundColor: 'white',
  },
}));

const PrintHeader = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  '@media print': {
    marginBottom: theme.spacing(2),
  },
}));

const PrintSubheader = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  '@media print': {
    marginBottom: theme.spacing(3),
  },
}));

// 프린트용 스타일이 적용된 DataGrid
const PrintDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 600,
  },
  '& .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50],
  },
  '& .MuiDataGrid-row': {
    fontSize: '14px',
  },
  '& .MuiDataGrid-cell': {
    padding: '8px 16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '@media print': {
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f0f0f0',
      color: 'black',
      fontWeight: 600,
    },
  },
}));

export default function PrintPickingList({
  table: data,
  usersData,
}: {
  table: any;
  usersData: any;
}) {
  // 프린트 기능
  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printGoback = () => {
    if (!data.getSelectedRowModel().rows.length) {
      return alert('인쇄할 주문을 선택해 주세요.');
    } else {
      handlePrint();
    }
  };

  // 데이터 포맷팅
  const rows = data
    .getSelectedRowModel()
    .rows.map((row: any, index: number) => ({
      id: index,
      original: row.original,
    }));

  // 프린트될 컴포넌트
  const ComponentToPrint = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
      <PrintContainer ref={ref}>
        <PrintHeader variant="h1">PICKING LIST</PrintHeader>

        <PrintSubheader variant="h2">
          {usersData?.nickname || '고객명'}
          <Typography
            component="span"
            sx={{ ml: 2, fontSize: '14px', fontWeight: 400 }}
          >
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
        </PrintSubheader>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ width: '100%', mb: 2 }}>
          <PrintDataGrid
            rows={rows}
            columns={printPickingListColumns as GridColDef[]}
            autoHeight
            hideFooter
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            rowHeight={70}
            columnHeaderHeight={56}
            getCellClassName={() => 'print-cell'}
            sx={{
              '@media print': {
                '& .MuiDataGrid-main': {
                  width: '100%',
                },
              },
            }}
          />
        </Box>

        <Box
          sx={{
            mt: 4,
            pt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px dashed #ccc',
          }}
        >
          <Box>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
              배송 메모
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" fontWeight={600}>
              담당자 확인: ________________
            </Typography>
          </Box>
        </Box>
      </PrintContainer>
    );
  });

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<PrintIcon />}
        onClick={printGoback}
        size="small"
      >
        포장리스트 인쇄
      </Button>

      <Box sx={{ display: 'none' }}>
        <ComponentToPrint ref={componentRef} />
      </Box>
    </Box>
  );
}
