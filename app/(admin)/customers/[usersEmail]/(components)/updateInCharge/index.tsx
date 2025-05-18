import {
  useGetAllUsersWithOrderItemsQty,
  useUpodateUsersInCharge,
} from '@/query/query/users';
import React from 'react';
import {
  Stack,
  Typography,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export default function UpdateInCharge({ usersData }: any) {
  const {
    data: usersList,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetAllUsersWithOrderItemsQty();

  const { mutateAsync, isPending } = useUpodateUsersInCharge();

  const [selectedNickname, setSelectedNickname] = React.useState<number | null>(
    null,
  );

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedNickname(Number(event.target.value));
  };

  if (isUsersLoading) {
    return <CircularProgress size={24} />;
  }

  if (!isUsersSuccess || !usersList) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
      <Typography variant="body1" sx={{ minWidth: 100, width: 100 }}>
        담당자이름 :
      </Typography>

      <FormControl size="small" sx={{ width: 200 }}>
        <Select
          value={selectedNickname || ''}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <em>변경할 담당자선택</em>
          </MenuItem>
          {usersList.map((item: any) => (
            <MenuItem key={item.id} value={item.id}>
              {item.nickname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="small"
        startIcon={<PersonIcon />}
        onClick={async () =>
          selectedNickname === null
            ? alert('변경할 담당자를 선택해 주세요')
            : await mutateAsync({
                id: usersData.id,
                inCharge: usersList.find(
                  (item: any) => item.id === selectedNickname,
                ).nickname,
              })
        }
        sx={{ width: 140 }}
        disabled={isPending}
      >
        {isPending ? '변경중...' : '담당자 변경'}
      </Button>
    </Stack>
  );
}
