import useInput from '@/hooks/useInput';
import { useUpdateAAddressByUsersEmail } from '@/query/query/address';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export function CustomerUpdateAddress({
  content,
  closeModal,
  addressInfo,
}: {
  content: string;
  closeModal: () => void;
  addressInfo: any;
}) {
  const { value: updatedAddress, onChange } = useInput({
    id: addressInfo.id,
    addressName: addressInfo.addressName,
    city: addressInfo.city,
    receiverName: addressInfo.receiverName,
    receiverPhoneNumber: addressInfo.receiverPhoneNumber,
    state: addressInfo.state,
    street: addressInfo.street,
    zipcode: addressInfo.zipcode,
  });

  const { mutateAsync, isPending } = useUpdateAAddressByUsersEmail();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 3, textAlign: 'center' }}
      >
        {content}
      </Typography>

      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ width: 100, minWidth: 100 }}>이름</Typography>
          <TextField
            fullWidth
            size="small"
            id="addressName"
            value={updatedAddress.addressName}
            onChange={onChange as any}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ width: 100, minWidth: 100 }}>도시</Typography>
          <TextField
            fullWidth
            size="small"
            id="city"
            value={updatedAddress.city}
            onChange={onChange as any}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ width: 100, minWidth: 100 }}>군구</Typography>
          <TextField
            fullWidth
            size="small"
            id="state"
            value={updatedAddress.state}
            onChange={onChange as any}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ width: 100, minWidth: 100 }}>상세주소</Typography>
          <TextField
            fullWidth
            size="small"
            id="street"
            value={updatedAddress.street}
            onChange={onChange as any}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ width: 100, minWidth: 100 }}>우편번호</Typography>
          <TextField
            fullWidth
            size="small"
            id="zipcode"
            value={updatedAddress.zipcode}
            onChange={onChange as any}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ width: 100, minWidth: 100 }}>수령인</Typography>
          <TextField
            fullWidth
            size="small"
            id="receiverName"
            value={updatedAddress.receiverName}
            onChange={onChange as any}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ width: 100, minWidth: 100 }}>연락처</Typography>
          <TextField
            fullWidth
            size="small"
            id="receiverPhoneNumber"
            value={updatedAddress.receiverPhoneNumber}
            onChange={onChange as any}
          />
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={isPending}
          onClick={() => {
            mutateAsync(updatedAddress).then(() => closeModal());
          }}
        >
          {isPending ? '저장 중...' : '수정'}
        </Button>
        <Button
          variant="outlined"
          startIcon={<CloseIcon />}
          onClick={closeModal}
        >
          닫기
        </Button>
      </Box>
    </Paper>
  );
}
