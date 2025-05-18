import { useUpodateUsersPermission } from '@/query/query/users';
import React from 'react';
import {
  Stack,
  Typography,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

export default function UserPermission({ usersData }: { usersData: any }) {
  const { mutateAsync, isPending } = useUpodateUsersPermission();

  const [selectedPermission, setSelectedPermission] = React.useState('');

  if (!usersData) {
    return null;
  }

  const handlePermissionChange = (event: SelectChangeEvent) => {
    setSelectedPermission(event.target.value as string);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
      <Typography variant="body1" sx={{ minWidth: 100, width: 100 }}>
        권한 :{' '}
        <Typography component="span" fontWeight="medium">
          {usersData.userLevel}
        </Typography>
      </Typography>

      <FormControl size="small" sx={{ width: 200 }}>
        <Select
          value={selectedPermission}
          onChange={handlePermissionChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <em>변경할 권한선택</em>
          </MenuItem>
          <MenuItem value="ADMIN_1">ADMIN_1</MenuItem>
          <MenuItem value="ADMIN_2">ADMIN_2</MenuItem>
          <MenuItem value="STAFF_1">STAFF_1</MenuItem>
          <MenuItem value="STAFF_2">STAFF_2</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="small"
        startIcon={<SecurityIcon />}
        onClick={async () =>
          selectedPermission === ''
            ? alert('권한을 선택해 주세요')
            : await mutateAsync({
                id: usersData.id,
                userLevel: selectedPermission,
              })
        }
        disabled={isPending}
        sx={{ width: 140 }}
      >
        {isPending ? '변경중...' : '권한 변경'}
      </Button>
    </Stack>
  );
}
