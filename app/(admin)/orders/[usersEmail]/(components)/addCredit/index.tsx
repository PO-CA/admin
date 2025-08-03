'use client';
import { useCreateCreditByUsersEmail } from '@/query/query/credit';
import { CreateCreditByUsersEmailDTO } from '@/types/createCreditByUsersEmailDTO';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

export default function AddCredit() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mutateAsync: createCredit, isPending } =
    useCreateCreditByUsersEmail();
  const pathName = usePathname();

  const [addCredit, setAddCredit] = useState<CreateCreditByUsersEmailDTO>({
    usersEmail: pathName.replace('/orders/', ''),
    plus: 0,
    minus: 0,
    content: '',
    memo: '',
  });

  useEffect(() => {
    setAddCredit({
      ...addCredit,
      usersEmail: pathName.replace('/orders/', ''),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        크레딧 추가
      </Typography>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        alignItems="flex-end"
      >
        <Box sx={{ width: isMobile ? '100%' : '40%' }}>
          <Typography
            variant="caption"
            sx={{ mb: 0.5, display: 'block', textAlign: 'center' }}
          >
            내역(필수)
          </Typography>
          <TextField
            size="small"
            placeholder="내역"
            value={addCredit.content}
            sx={{ width: '100%' }}
            onChange={(e) =>
              setAddCredit({
                ...addCredit,
                content: e.target.value,
              })
            }
          />
        </Box>

        <Box sx={{ width: isMobile ? '100%' : '10%' }}>
          <Typography
            variant="caption"
            sx={{ mb: 0.5, display: 'block', textAlign: 'center' }}
          >
            -
          </Typography>
          <TextField
            type="number"
            size="small"
            value={addCredit.minus}
            sx={{ width: '100%' }}
            onChange={(e) =>
              setAddCredit({
                ...addCredit,
                minus: Number(e.target.value),
              })
            }
          />
        </Box>

        <Box sx={{ width: isMobile ? '100%' : '10%' }}>
          <Typography
            variant="caption"
            sx={{ mb: 0.5, display: 'block', textAlign: 'center' }}
          >
            +
          </Typography>
          <TextField
            type="number"
            size="small"
            value={addCredit.plus}
            sx={{ width: '100%' }}
            onChange={(e) =>
              setAddCredit({
                ...addCredit,
                plus: Number(e.target.value),
              })
            }
          />
        </Box>

        <Box sx={{ width: isMobile ? '100%' : '20%' }}>
          <Typography
            variant="caption"
            sx={{ mb: 0.5, display: 'block', textAlign: 'center' }}
          >
            메모
          </Typography>
          <TextField
            size="small"
            value={addCredit.memo}
            sx={{ width: '100%' }}
            onChange={(e) =>
              setAddCredit({
                ...addCredit,
                memo: e.target.value,
              })
            }
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          disabled={isPending}
          sx={{ height: 40, width: isMobile ? '100%' : '10%' }}
          onClick={() => {
            if (addCredit.content.length < 1) {
              alert('내역를 입력해 주세요');
              return;
            } else {
              createCredit(addCredit).then(() =>
                setAddCredit({
                  ...addCredit,
                  memo: '',
                  content: '',
                  plus: 0,
                  minus: 0,
                }),
              );
            }
          }}
        >
          {isPending ? '처리중...' : '추가'}
        </Button>
      </Stack>
    </Paper>
  );
}
