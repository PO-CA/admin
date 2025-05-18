import React, { useEffect, useState } from 'react';
import {
  useCreateAAddressByUsersEmail,
  useUpdateAAddressByUsersEmail,
} from '@/query/query/address';
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

export default function Addresses({
  data,
  handleSelectChange,
  selectedOption,
  userEmail,
}: any) {
  const [selectedAddress, setSelectedAddress] = useState<any>({
    addressName: '',
    city: '',
    state: '',
    street: '',
    zipcode: '',
    receiverName: '',
    receiverPhoneNumber: '',
  });

  const [payload, setPayload] = useState({
    id: 0,
    addressName: '',
    city: '',
    state: '',
    street: '',
    zipcode: '',
    receiverName: '',
    receiverPhoneNumber: '',
  });

  const { mutateAsync, isPending: isAddingAddress } =
    useCreateAAddressByUsersEmail();
  const { mutateAsync: mutateAsyncUpdate, isPending: isUpdatingAddress } =
    useUpdateAAddressByUsersEmail();

  useEffect(() => {
    if (data)
      setSelectedAddress(
        data.find((address: any) => address.id === selectedOption),
      );
  }, [selectedOption, data]);

  useEffect(() => {
    setPayload({
      id: Number(selectedAddress?.id),
      addressName: selectedAddress?.addressName || '',
      city: selectedAddress?.city || '',
      state: selectedAddress?.state || '',
      street: selectedAddress?.street || '',
      zipcode: selectedAddress?.zipcode || '',
      receiverName: selectedAddress?.receiverName || '',
      receiverPhoneNumber: selectedAddress?.receiverPhoneNumber || '',
    });
  }, [selectedAddress, selectedOption]);

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            배송지
          </Typography>
        </Box>

        {data && (
          <FormControl fullWidth size="small">
            <Select
              value={selectedOption || ''}
              onChange={handleSelectChange}
              displayEmpty
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                배송지를 선택해주세요
              </MenuItem>
              {data.map((address: any) => (
                <MenuItem key={address.id} value={address.id}>
                  {address.addressName || '배송지명 설정이 필요합니다'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {selectedAddress ? (
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: 100, minWidth: 100 }}>
              배송지명 :
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={payload?.addressName || ''}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  addressName: e.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: 100, minWidth: 100 }}>주소 :</Typography>
            <TextField
              size="small"
              fullWidth
              value={payload?.city || ''}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  city: e.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: 100, minWidth: 100 }}>군구 :</Typography>
            <TextField
              size="small"
              fullWidth
              value={payload?.state || ''}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  state: e.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: 100, minWidth: 100 }}>
              상세 주소 :
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={payload?.street || ''}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  street: e.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: 100, minWidth: 100 }}>
              우편번호 :
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={payload?.zipcode || ''}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  zipcode: e.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: 100, minWidth: 100 }}>수령인 :</Typography>
            <TextField
              size="small"
              fullWidth
              value={payload?.receiverName || ''}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  receiverName: e.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: 100, minWidth: 100 }}>번호 :</Typography>
            <TextField
              size="small"
              fullWidth
              value={payload?.receiverPhoneNumber || ''}
              onChange={(e) =>
                setPayload({
                  ...payload,
                  receiverPhoneNumber: e.target.value,
                })
              }
            />
          </Box>
        </Stack>
      ) : (
        <Typography
          sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}
        >
          배송지를 선택해 주세요
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => {
            mutateAsync(userEmail);
          }}
          disabled={isAddingAddress}
        >
          {isAddingAddress ? '추가 중...' : '배송지 추가'}
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => {
            mutateAsyncUpdate(payload);
          }}
          disabled={isUpdatingAddress || !selectedOption}
        >
          {isUpdatingAddress ? '수정 중...' : '배송지 수정'}
        </Button>
      </Box>
    </Paper>
  );
}
