'use client';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { cartColumns } from '../tableColumns/cartColumns';
import { useGetUsersAllCarts } from '@/query/query/cart';
import { useCreateOrderItemsInCart } from '@/query/query/orders';
import { useAuth } from '@/hooks/useAuth';
import Addresses from './addresses';
import { useGetAddressByUsersEmail } from '@/query/query/address';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  CircularProgress,
  FormControl,
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export default function CartList() {
  const { userId, userEmail } = useAuth();
  const {
    data: cartsData,
    isLoading: isCartsLoading,
    isSuccess: isCartsSuccess,
  } = useGetUsersAllCarts(userId);
  const {
    data: addressData,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useGetAddressByUsersEmail(userEmail);

  // 데이터를 DataGrid가 요구하는 형식으로 변환
  const rows = React.useMemo(() => {
    if (!cartsData) return [];
    return cartsData.map((row: any, idx: number) => ({
      id: row.id || `row-${idx}`,
      ...row,
    }));
  }, [cartsData]);

  const { mutateAsync: createOrderItem, isPending: isOrderPending } =
    useCreateOrderItemsInCart();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

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
        장바구니
      </Typography>

      <Paper elevation={1} sx={{ p: 1, mb: 3 }}>
        <DataGrid
          rows={rows}
          columns={cartColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          disableRowSelectionOnClick
          rowHeight={70}
          showToolbar
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
            disabled={isOrderPending || !selectedOption}
            onClick={async () => {
              if (!selectedOption) {
                alert('배송지를 선택해 주세요.');
                return;
              }
              await createOrderItem({ userId, addressId: selectedOption });
              alert('주문이 완료되었습니다.');
            }}
            sx={{ height: 40 }}
          >
            {isOrderPending ? '주문 처리중...' : '주문하기'}
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
