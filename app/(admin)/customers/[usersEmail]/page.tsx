'use client';

import UserAddress from './(components)/address';
import UserDcAmount from './(components)/dcAmount';
import UserDcRate from './(components)/dcRate';
import UserNickname from './(components)/userNickname';
import UpdateInCharge from './(components)/updateInCharge';
import { useGetUsersDetailByUsersEmail } from '@/query/query/users';
import { Box, Typography, Paper, Container } from '@mui/material';

export default function CustomerDetail({
  params,
}: {
  params: { usersEmail: string };
}) {
  const { usersEmail } = params;
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsersDetailByUsersEmail(usersEmail);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          고객-상세
        </Typography>

        {!isUsersLoading && isUsersSuccess && usersData && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              유저 아이디 : {usersData.userEmail}
            </Typography>
            <UserNickname usersData={usersData} />
            <UpdateInCharge usersData={usersData} />
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mb: 3,
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              height: '100%',
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              유저-할인율
            </Typography>
            <UserDcRate usersEmail={usersEmail} />
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              flex: 1,
              height: '100%',
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              유저-할인액
            </Typography>
            <UserDcAmount usersEmail={usersEmail} />
          </Paper>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            배송지
          </Typography>
          <Paper elevation={1} sx={{ p: 2 }}>
            <UserAddress usersEmail={usersEmail} />
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
}
