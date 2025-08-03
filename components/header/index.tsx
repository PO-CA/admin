import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSignOut } from '@/query/query/users';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { mutateAsync: signOut } = useSignOut();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        ml: isMobile ? 0 : '200px', // 모바일에서는 사이드바가 없으므로 0
        width: isMobile ? '100%' : 'calc(100% - 200px)', // 모바일에서는 전체 너비
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: 56,
          px: isMobile ? 1 : 2, // 모바일에서는 패딩 줄이기
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && onMenuClick && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={{
                mr: 1,
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link href="/dashboard" passHref legacyBehavior>
            <Button
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                mr: isMobile ? 1 : 2,
                background: theme.palette.grey[100],
                fontSize: isMobile ? '0.875rem' : '1rem',
                minHeight: isMobile ? '44px' : 'auto',
                minWidth: isMobile ? '60px' : 'auto',
                '&:hover': {
                  background: theme.palette.grey[200],
                },
              }}
            >
              HOME
            </Button>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: isMobile ? 0.5 : 1 }}>
          <Link href="/store" target="_blank" passHref legacyBehavior>
            <Button
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                mr: isMobile ? 0.5 : 2,
                background: theme.palette.grey[100],
                fontSize: isMobile ? '0.875rem' : '1rem',
                minHeight: isMobile ? '44px' : 'auto',
                minWidth: isMobile ? '60px' : 'auto',
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
              fontSize: isMobile ? '0.875rem' : '1rem',
              minHeight: isMobile ? '44px' : 'auto',
              minWidth: isMobile ? '60px' : 'auto',
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
