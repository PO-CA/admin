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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, myInfoLoading, userEmail } = useAuth();

  useIsAdmin();

  return (
    !myInfoLoading &&
    isAuthenticated && (
      <>
        <Header />
        <div className={styles.contentContainer}>
          <Sidebar />
          <Box sx={{ flex: 1, pt: '72px' }}>{children}</Box>
        </div>
      </>
    )
  );
}
