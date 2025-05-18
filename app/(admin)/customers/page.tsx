'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CustomerTable from './(components)/CustomerTable';

export default function Customers() {
  return (
    <Box sx={{ p: 3 }}>
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
        유저-목록
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
        <CustomerTable />
      </Paper>
    </Box>
  );
}
