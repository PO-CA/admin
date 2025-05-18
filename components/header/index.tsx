import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSignOut } from '@/query/query/users';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

export default function Header() {
  const { mutateAsync: signOut } = useSignOut();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        ml: '200px', // 사이드바 너비만큼 밀기
        width: 'calc(100% - 200px)',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: 56,
        }}
      >
        <Box>
          <Link href="/dashboard" passHref legacyBehavior>
            <Button
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                mr: 2,
                background: theme.palette.grey[100],
                '&:hover': {
                  background: theme.palette.grey[200],
                },
              }}
            >
              HOME
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href="/store" target="_blank" passHref legacyBehavior>
            <Button
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                mr: 2,
                background: theme.palette.grey[100],
                '&:hover': {
                  background: theme.palette.grey[200],
                },
              }}
            >
              STORE
            </Button>
          </Link>
          <Button
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              background: theme.palette.grey[100],
              '&:hover': {
                background: theme.palette.grey[200],
              },
            }}
            onClick={() => signOut()}
          >
            로그아웃
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
