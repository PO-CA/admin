'use client';

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
import { useUpodateUsersPermission } from '@/query/query/users';

export default function UserPocaPermission({ usersData }: { usersData: any }) {
  const { mutateAsync, isPending } = useUpodateUsersPermission();
  const [selectedPocaPermission, setSelectedPocaPermission] = React.useState('');

  if (!usersData) return null;

  const handlePocaPermissionChange = (event: SelectChangeEvent) => {
    setSelectedPocaPermission(event.target.value as string);
  };

  const handleUpdatePermission = async () => {
    if (selectedPocaPermission === '') {
      alert('변경할 권한을 선택해 주세요');
      return;
    }

    await mutateAsync({
      id: usersData.id,
      pocaStorePermissionLevel: selectedPocaPermission,
    });

    setSelectedPocaPermission('');
  };

  return (
    <Stack spacing={2} sx={{ mb: 1.5 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body1" sx={{ minWidth: 140 }}>
          포카 스토어 권한 :{' '}
          <Typography component="span" fontWeight="medium">
            {usersData.pocaStorePermissionLevel ?? 'NONE'}
          </Typography>
        </Typography>

        <FormControl size="small" sx={{ width: 200 }}>
          <Select
            value={selectedPocaPermission}
            onChange={handlePocaPermissionChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>변경할 권한선택</em>
            </MenuItem>
            <MenuItem value="NONE">NONE</MenuItem>
            <MenuItem value="VIEW_ONLY">VIEW_ONLY</MenuItem>
            <MenuItem value="ORDER">ORDER</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Button
        variant="contained"
        size="small"
        startIcon={<SecurityIcon />}
        onClick={handleUpdatePermission}
        disabled={isPending}
        sx={{ width: 160 }}
      >
        {isPending ? '변경중...' : '권한 변경'}
      </Button>
    </Stack>
  );
}
