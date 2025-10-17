'use client';
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useGetPreReleaseCarts } from '@/query/query/cart';
import { useAuth } from '@/hooks/useAuth';
import { useGetAddressByUsersEmail } from '@/query/query/address';
import DeleteCartButton from '../deleteCartButton';
import Addresses from '../cartList/addresses';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  CircularProgress,
  FormControl,
  Alert,
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export default function PreReleaseCartList() {
  const { userId, userEmail } = useAuth();
  const {
    data: cartsData,
    isLoading: isCartsLoading,
    isSuccess: isCartsSuccess,
  } = useGetPreReleaseCarts(userId);
  const {
    data: addressData,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useGetAddressByUsersEmail(userEmail);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  // 신보 장바구니 전용 컬럼 (버전 정보 포함)
  const columns: GridColDef[] = [
    {
      field: 'logiProduct',
      headerName: '아티스트',
      flex: 1,
      minWidth: 120,
      valueGetter: (params: any) => {
        return params?.Artist || '';
      },
    },
    {
      field: 'logiProduct',
      headerName: '앨범명',
      flex: 1.5,
      minWidth: 200,
      valueGetter: (params: any) => {
        return params?.title || '';
      },
    },
    {
      field: 'logiProductVersion',
      headerName: '버전',
      flex: 1,
      minWidth: 120,
      valueGetter: (params: any) => {
        return params?.versionName || '-';
      },
    },
    {
      field: 'price',
      headerName: '가격',
      flex: 0.8,
      minWidth: 100,
      valueFormatter: (params: any) => {
        return params ? `${params.toLocaleString()}원` : '';
      },
    },
    {
      field: 'qty',
      headerName: '수량',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'totalPrice',
      headerName: '총액',
      flex: 0.8,
      minWidth: 100,
      valueFormatter: (params: any) => {
        return params ? `${params.toLocaleString()}원` : '';
      },
    },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <DeleteCartButton
            info={{
              getValue: () => params.row.id,
              row: { original: params.row },
            }}
          />
        </Box>
      ),
    },
  ];

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!cartsData) return [];
    return cartsData.map((row: any, idx: number) => ({
      id: row.id || `row-${idx}`,
      ...row,
    }));
  }, [cartsData]);

  if (isCartsLoading || isAddressLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isCartsSuccess || !isAddressSuccess) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">데이터를 불러오지 못했습니다.</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        장바구니 (신보)
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        신보는 예약 발주입니다. 버전별로 수량을 확인해주세요.
      </Alert>

      <Paper elevation={1} sx={{ p: 1, mb: 3 }}>
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
          rowHeight={70}
          sx={{
            backgroundColor: 'white',
            fontSize: 14,
            '& .MuiDataGrid-cell': {
              alignItems: 'center',
            },
            minHeight: 400,
          }}
        />
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartCheckoutIcon />}
            disabled={!selectedOption}
            onClick={async () => {
              if (!selectedOption) {
                alert('배송지를 선택해 주세요.');
                return;
              }
              alert('신보 주문 기능은 현재 개발 중입니다. 곧 사용 가능합니다.');
              // TODO: 신보 주문 API 구현 필요
              // await createPreReleaseOrder({ userId, addressId: selectedOption });
            }}
            sx={{ height: 40 }}
          >
            주문하기 (개발중)
          </Button>

          <FormControl sx={{ minWidth: 200, maxWidth: '100%' }}>
            {addressData && (
              <Addresses
                data={addressData}
                handleSelectChange={handleSelectChange}
                selectedOption={selectedOption}
                userEmail={userEmail}
              />
            )}
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
}
