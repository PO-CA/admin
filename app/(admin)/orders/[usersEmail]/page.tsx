'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Credits from './(components)/credits';
import OrdersPicked from './(components)/orders-picked';
import OrdersUnpicked from './(components)/orders-unpicked';
import AddOrderProduct from './(components)/addOrderProduct';
import UserShippings from './(components)/shippings';

export default function OrdersByUsersId({
  params,
}: {
  params: { usersEmail: string };
}) {
  const { usersEmail } = params;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            background: 'white',
            p: 2,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            mb: 2,
            fontSize: 18,
          }}
        >
          유저-크레딧
        </Typography>
        <Paper
          sx={{
            background: 'white',
            fontSize: 14,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            m: '0 10px',
            p: 2,
          }}
        >
          <Credits usersEmail={usersEmail} />
        </Paper>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            background: 'white',
            p: 2,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            mb: 2,
            fontSize: 18,
          }}
        >
          주문-포장 전
        </Typography>
        <Paper
          sx={{
            background: 'white',
            fontSize: 14,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            m: '0 10px',
            p: 2,
          }}
        >
          <OrdersUnpicked usersEmail={usersEmail} />
        </Paper>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            background: 'white',
            p: 2,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            mb: 2,
            fontSize: 18,
          }}
        >
          주문-포장 중
        </Typography>
        <Paper
          sx={{
            background: 'white',
            fontSize: 14,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            m: '0 10px',
            p: 2,
          }}
        >
          <OrdersPicked usersEmail={usersEmail} />
        </Paper>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            background: 'white',
            p: 2,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            mb: 2,
            fontSize: 18,
          }}
        >
          추가주문
        </Typography>
        <Paper
          sx={{
            background: 'white',
            fontSize: 14,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            m: '0 10px',
            p: 2,
          }}
        >
          {/* <AddOrderProduct usersEmail={usersEmail} /> */}
        </Paper>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            background: 'white',
            p: 2,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            mb: 2,
            fontSize: 18,
          }}
        >
          배송
        </Typography>
        <Paper
          sx={{
            background: 'white',
            fontSize: 14,
            fontWeight: 500,
            border: '1px solid',
            borderColor: 'divider',
            m: '0 10px',
            p: 2,
          }}
        >
          {/* <UserShippings usersEmail={usersEmail} /> */}
        </Paper>
      </Box>
    </Box>
  );
}
