'use client';
import Credits from './(components)/credits';
import UserShippings from './(components)/shippings';
import UserOrders from './(components)/userOrders';
import { useAuth } from '@/hooks/useAuth';
import { Box, Typography, Container, Paper, Stack } from '@mui/material';

export default function OrdersByUsersId({
  params,
}: {
  params: { userNickname: string };
}) {
  // TODO params 말고 유저 닉네임 가져올수 있어야함
  // const { userNickname } = params;
  const { userEmail } = useAuth();

  return (
    <Container maxWidth="xl" component="main" sx={{ mt: 2, mb: 4 }}>
      <Stack spacing={3}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            유저-크레딧
          </Typography>
          <Box>
            <Credits usersEmail={userEmail} />
          </Box>
        </Paper>

        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            주문
          </Typography>
          <Box>
            <UserOrders usersEmail={userEmail} />
          </Box>
        </Paper>

        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            배송
          </Typography>
          <Box>
            <UserShippings usersEmail={userEmail} />
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}
