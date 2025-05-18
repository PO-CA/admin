'use client';
import React, { useEffect, useState } from 'react';
import { orderItemsColumns } from '../tableColumns/orderItemsColumns';
import {
  useGetAllPickedOrderByUsersEmail,
  usePutToCancelOrderItem,
  usePutToUnPickOrderItem,
} from '@/query/query/orders';
import { useGetAddressByUsersEmail } from '@/query/query/address';
import { CreateShippingDTO } from '@/types/createShippingDTO';
import { useCreateShipping } from '@/query/query/shippings';
import PrintPickingList from './(components)/printPickingList';
import { useGetUsersDetailByUsersEmail } from '@/query/query/users';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// shippingType 타입 정의
type ShippingType = '택배' | '퀵' | '기타';

export default function OrdersPicked({ usersEmail }: any) {
  const {
    data: pickedOrderItemsData,
    isLoading: isPickedOrderItemsLoading,
    isSuccess: isPickedOrderItemsSuccess,
  } = useGetAllPickedOrderByUsersEmail(usersEmail);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const {
    mutateAsync: putToUnPickOrderItem,
    isPending: isPutToUnPickOrderItemPending,
  } = usePutToUnPickOrderItem();

  const { mutateAsync: cancelOrderItem, isPending: isCancelOrderItemPending } =
    usePutToCancelOrderItem();

  const rows = (pickedOrderItemsData || []).map((row: any, idx: number) => ({
    id: row.id || idx,
    ...row,
  }));

  const {
    data: addressData,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useGetAddressByUsersEmail(usersEmail);

  // Controlled 폼 상태
  const [formState, setFormState] = useState({
    shippingType: '택배' as ShippingType,
    trackingNumber: '',
    shippingFee: 0,
    memo: '',
  });

  // 폼 입력 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'shippingFee' ? Number(value) : value,
    }));
  };

  // Select 핸들러
  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = e.target.name as string;
    const value = e.target.value;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutateAsync: createShipping, isPending: isCreateShippingPending } =
    useCreateShipping();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAddressChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setSelectedOption(Number(event.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRows.length < 1) {
      return alert('배송처리할 주문을 선택해 주세요');
    }

    if (Number(formState.shippingFee) < 0) {
      return alert('올바른 배송비를 작성해 주세요.');
    }

    if (!selectedOption) {
      return alert('배송지를 선택해주세요.');
    }

    const data: CreateShippingDTO = {
      ...formState,
      usersEmail: usersEmail.replace('%40', '@'),
      orderItemsIds: selectedRows,
      addressId: selectedOption,
    };

    createShipping(data);

    // 폼 초기화
    setFormState({
      shippingType: '택배' as ShippingType,
      trackingNumber: '',
      shippingFee: 0,
      memo: '',
    });
    setSelectedRows([]);
  };

  const [selectedAddress, setSelectedAddress] = useState<any>({
    addressName: '',
    city: '',
    state: '',
    zipcode: '',
    receiverName: '',
    receiverPhoneNumber: '',
  });

  useEffect(() => {
    if (addressData)
      setSelectedAddress(
        addressData.find((address: any) => address.id === selectedOption),
      );
  }, [selectedOption, addressData]);

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsersDetailByUsersEmail(usersEmail);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {!isPickedOrderItemsLoading &&
          isPickedOrderItemsSuccess &&
          !isUsersLoading &&
          isUsersSuccess && (
            <PrintPickingList
              table={{
                getSelectedRowModel: () => ({
                  rows: selectedRows.map((id) => ({
                    original: rows.find((row: any) => row.id === id),
                  })),
                }),
              }}
              usersData={usersData}
            />
          )}

        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            if (selectedRows.length > 0) {
              await putToUnPickOrderItem(selectedRows);
            } else {
              alert('포장 해제할 주문을 선택해 주세요');
            }
          }}
          disabled={isPutToUnPickOrderItemPending}
          size="small"
        >
          {isPutToUnPickOrderItemPending ? '처리 중...' : '포장 해제'}
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={async () => {
            if (selectedRows.length > 0) {
              await cancelOrderItem(selectedRows);
            } else {
              alert('취소할 주문을 선택해 주세요');
            }
          }}
          disabled={isCancelOrderItemPending}
          size="small"
        >
          {isCancelOrderItemPending ? '처리 중...' : '주문 삭제'}
        </Button>
      </Stack>

      <DataGrid
        sx={{
          height: 'auto',
          background: 'white',
          fontSize: 14,
          mb: 4,
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
          },
        }}
        rows={rows}
        rowHeight={100}
        columns={orderItemsColumns as GridColDef[]}
        pageSizeOptions={[20, 50, 100]}
        checkboxSelection
        showToolbar
        onRowSelectionModelChange={(newSelectionModel) => {
          // 새로운 처리 방식
          let selectedIds: number[] = [];
          if (Array.isArray(newSelectionModel)) {
            selectedIds = newSelectionModel.map((id) =>
              typeof id === 'string' ? parseInt(id, 10) : Number(id),
            );
          } else if (
            newSelectionModel &&
            typeof newSelectionModel === 'object'
          ) {
            if (newSelectionModel.ids && newSelectionModel.ids instanceof Set) {
              selectedIds = Array.from(newSelectionModel.ids).map((id) =>
                typeof id === 'string' ? parseInt(id, 10) : Number(id),
              );
            }
          }

          setSelectedRows(selectedIds);
        }}
        loading={isPickedOrderItemsLoading}
        disableRowSelectionOnClick={false}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
      />

      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
          주문처리
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flexBasis: '15%', minWidth: '150px' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              총 {selectedRows.length} 개
            </Typography>
          </Box>

          <Box sx={{ flexBasis: '15%', minWidth: '150px' }}>
            <FormControl fullWidth size="small">
              <InputLabel>배송방법</InputLabel>
              <Select
                name="shippingType"
                label="배송방법"
                value={formState.shippingType}
                onChange={handleSelectChange as any}
              >
                <MenuItem value="택배">택배</MenuItem>
                <MenuItem value="퀵">퀵</MenuItem>
                <MenuItem value="기타">기타</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ flexBasis: '15%', minWidth: '150px' }}>
            <TextField
              fullWidth
              label="송장번호"
              name="trackingNumber"
              value={formState.trackingNumber}
              onChange={handleInputChange}
              size="small"
            />
          </Box>

          <Box sx={{ flexBasis: '15%', minWidth: '150px' }}>
            <FormControl fullWidth size="small">
              <InputLabel>배송지</InputLabel>
              {!isAddressLoading &&
                isAddressSuccess &&
                addressData &&
                addressData.length > 0 && (
                  <Select
                    label="배송지"
                    onChange={handleAddressChange as any}
                    value={selectedOption || ''}
                  >
                    <MenuItem value="" disabled>
                      배송지를 선택해주세요
                    </MenuItem>
                    {addressData.map((address: any) => (
                      <MenuItem key={address.id} value={address.id}>
                        {address.addressName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
            </FormControl>
          </Box>

          <Box sx={{ flexBasis: '15%', minWidth: '150px' }}>
            <TextField
              fullWidth
              label="배송비"
              type="number"
              name="shippingFee"
              value={formState.shippingFee}
              onChange={handleInputChange}
              size="small"
            />
          </Box>

          <Box sx={{ flexBasis: '15%', minWidth: '150px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isCreateShippingPending}
            >
              {isCreateShippingPending ? '처리 중...' : '주문 처리'}
            </Button>
          </Box>
        </Box>

        {selectedOption && (
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 2,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flexBasis: '30%', minWidth: '200px' }}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" fontWeight={500}>
                    배송지:
                  </Typography>
                  <Typography variant="body2">
                    {selectedAddress?.addressName}
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ flexBasis: '30%', minWidth: '200px' }}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" fontWeight={500}>
                    주소:
                  </Typography>
                  <Typography variant="body2">
                    {selectedAddress?.city}
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ flexBasis: '30%', minWidth: '200px' }}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" fontWeight={500}>
                    상세주소:
                  </Typography>
                  <Typography variant="body2">
                    {selectedAddress?.state}
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ flexBasis: '30%', minWidth: '200px' }}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" fontWeight={500}>
                    우편번호:
                  </Typography>
                  <Typography variant="body2">
                    {selectedAddress?.zipcode}
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ flexBasis: '30%', minWidth: '200px' }}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" fontWeight={500}>
                    수령인:
                  </Typography>
                  <Typography variant="body2">
                    {selectedAddress?.receiverName}
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ flexBasis: '30%', minWidth: '200px' }}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" fontWeight={500}>
                    번호:
                  </Typography>
                  <Typography variant="body2">
                    {selectedAddress?.receiverPhoneNumber}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}
