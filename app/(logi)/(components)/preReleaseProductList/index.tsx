'use client';
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useGetUsersPreReleaseProducts } from '@/query/query/products';
import { useAuth } from '@/hooks/useAuth';
import VersionSelectionModal from '../versionSelectionModal';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';
import Image from 'next/image';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function PreReleaseProductList() {
  const { userId } = useAuth();
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
  } = useGetUsersPreReleaseProducts(userId || null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // 버전 선택 버튼 클릭
  const handleVersionSelect = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // 신보 상품 전용 컬럼
  const columns: GridColDef[] = [
    {
      field: 'thumbNailUrl',
      headerName: '썸네일',
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ textAlign: 'center' }}>
          <Image
            alt="제품 이미지"
            unoptimized={true}
            src={params.value}
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </Box>
      ),
    },
    {
      field: 'barcode',
      headerName: '바코드',
      width: 120,
    },
    {
      field: 'title',
      headerName: '앨범명',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'Artist',
      headerName: '아티스트',
      width: 150,
    },
    {
      field: 'deadlineDate',
      headerName: '주문마감일',
      width: 120,
      valueGetter: (params: any) => {
        return params ? params.slice(0, 10) : '';
      },
    },
    {
      field: 'releaseDate',
      headerName: '출시일',
      width: 120,
      valueGetter: (params: any) => {
        return params ? params.slice(0, 10) : '';
      },
    },
    {
      field: 'dcPrice',
      headerName: '가격',
      width: 100,
      valueFormatter: (params: any) => {
        return params ? `${params.toLocaleString()}원` : '';
      },
    },
    {
      field: 'actions',
      headerName: '주문',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<LibraryMusicIcon />}
            onClick={() => handleVersionSelect(params.row)}
            sx={{ minWidth: 'unset' }}
          >
            버전 선택
          </Button>
        </Box>
      ),
    },
  ];

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!productsData) return [];
    return productsData.map((row: any, idx: number) => ({
      id: row.id || `row-${idx}`,
      ...row,
    }));
  }, [productsData]);

  if (isProductsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isProductsSuccess) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">데이터를 불러오지 못했습니다.</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{}}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        상품 목록 (신보)
      </Typography>

      <Paper sx={{}}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          disableRowSelectionOnClick
          rowHeight={100}
          sx={{
            backgroundColor: 'white',
            fontSize: 14,
            '& .MuiDataGrid-cell': {
              alignItems: 'center',
            },
            minHeight: 500,
          }}
        />
      </Paper>

      {/* 버전 선택 모달 */}
      {selectedProduct && (
        <VersionSelectionModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
          productId={selectedProduct.id}
          productTitle={selectedProduct.title}
          productPrice={selectedProduct.dcPrice}
        />
      )}
    </Container>
  );
}
