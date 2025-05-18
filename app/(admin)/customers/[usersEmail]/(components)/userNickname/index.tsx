import { useUpodateUsersNickname } from '@/query/query/users';
import React, { useEffect } from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function UserNickname({ usersData }: { usersData: any }) {
  const { mutateAsync, isPending } = useUpodateUsersNickname();

  const [selectedNickname, setSelectedNickname] = React.useState('');

  useEffect(() => {
    if (usersData) {
      setSelectedNickname(usersData.nickname);
    }
  }, [usersData]);

  if (!usersData) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
      <Typography variant="body1" sx={{ minWidth: 100, width: 100 }}>
        회사이름 :
      </Typography>
      <TextField
        size="small"
        value={selectedNickname}
        onChange={(e) => setSelectedNickname(e.target.value)}
        sx={{ width: 200 }}
      />
      <Button
        variant="contained"
        size="small"
        startIcon={<SaveIcon />}
        onClick={async () =>
          selectedNickname === ''
            ? alert('회사이름을 작성해 주세요')
            : await mutateAsync({
                id: usersData.id,
                nickname: selectedNickname,
              })
        }
        sx={{ width: 140 }}
        disabled={isPending}
      >
        {isPending ? '변경중...' : '회사명 변경'}
      </Button>
    </Stack>
  );
}
