'use client';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PrintIcon from '@mui/icons-material/Print';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// 프린트용 스타일드 컴포넌트
const PrintContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: '20px 30px',
  margin: '0',
  '@media print': {
    width: '100%',
    height: 'auto',
    margin: 0,
    padding: '20px',
    backgroundColor: 'white',
    pageBreakAfter: 'always',
    pageBreakInside: 'avoid',
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

// 테이블 스타일
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: 'none',
  border: '1px solid #e0e0e0',
  '@media print': {
    width: '100% !important',
    border: '1px solid #e0e0e0',
    boxShadow: 'none',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px 16px',
  '@media print': {
    padding: '8px 12px',
    borderBottom: '1px solid #e0e0e0',
  },
}));

const StyledTableHeadCell = styled(StyledTableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 600,
  '@media print': {
    backgroundColor: '#f0f0f0 !important',
    color: 'black !important',
    fontWeight: 600,
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
    pageStyle: `
      @page {
        size: A4;
        margin: 15mm;
      }
      @media print {
        html, body {
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
        }
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }
        table {
          width: 100% !important;
          border-collapse: collapse;
        }
        th {
          background-color: #f0f0f0 !important;
          color: black !important;
          font-weight: 600 !important;
        }
      }
    `,
    onBeforeGetContent: () => {
      document.body.classList.add('printing');
      return Promise.resolve();
    },
    onAfterPrint: () => {
      document.body.classList.remove('printing');
    },
  });

  const printGoback = () => {
    if (!data.getSelectedRowModel().rows.length) {
      return alert('인쇄할 주문을 선택해 주세요.');
    } else {
      handlePrint();
    }
  };

  // 데이터 가져오기
  const rows = data.getSelectedRowModel().rows.map((row: any) => row.original);

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
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell align="center" width="100px">
                    썸네일
                  </StyledTableHeadCell>
                  <StyledTableHeadCell width="150px">
                    바코드/sku
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>제목</StyledTableHeadCell>
                  <StyledTableHeadCell align="center" width="80px">
                    수량
                  </StyledTableHeadCell>
                  <StyledTableHeadCell width="120px">좌표</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.length > 0 &&
                  rows[0] &&
                  rows?.map((row: any, index: number) => (
                    <TableRow key={index}>
                      <StyledTableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Image
                            alt="상품 이미지"
                            unoptimized={true}
                            src={row.thumbNailUrl}
                            width={50}
                            height={50}
                            style={{ objectFit: 'contain' }}
                          />
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                            {row.barcode || '-'}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.8rem',
                              color: '#666',
                              lineHeight: 1.2,
                            }}
                          >
                            {row.sku || '-'}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography sx={{ lineHeight: 1.2 }}>
                          {row.title || '-'}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {row.qty || 0}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          {row.coordinates && row.coordinates.length > 0 ? (
                            row.coordinates.map((coordinate: any) => (
                              <Typography
                                key={coordinate.id}
                                sx={{
                                  padding: '2px 0',
                                  lineHeight: 1.2,
                                  fontWeight: 500,
                                }}
                              >
                                {coordinate.name}
                              </Typography>
                            ))
                          ) : (
                            <Typography>-</Typography>
                          )}
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
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
