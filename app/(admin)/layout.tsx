'use client';
import styles from './layout.module.css';
import '../globals.css';
import { menus } from '@/constants/menus';
import Sidebar from '@/components/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIAdmin';
import Header from '@/components/header';
import { pocaMenus } from '@/constants/poca-menus';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, myInfoLoading, userEmail } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useIsAdmin();

  const handleMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    !myInfoLoading &&
    isAuthenticated && (
      <>
        <Header onMenuClick={handleMenuClick} />
        <div className={styles.contentContainer}>
          <Sidebar
            mobileOpen={mobileMenuOpen}
            setMobileOpen={setMobileMenuOpen}
          />
          <Box
            sx={{
              flex: 1,
              pt: '72px',
            }}
          >
            {children}
          </Box>
        </div>
      </>
    )
  );
}
