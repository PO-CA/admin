'use client';
import styles from './layout.module.css';
import '../globals.css';
import { menus } from '@/constants/menus';
import Sidebar from '@/components/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useSignOut } from '@/query/query/users';
import { useIsAdmin } from '@/hooks/useIAdmin';
import Header from '@/components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, myInfoLoading } = useAuth();
  const { mutateAsync: signOut } = useSignOut();

  useIsAdmin();

  return (
    !myInfoLoading &&
    isAuthenticated && (
      <>
        <Header />
        <div className={styles.contentContainer}>
          <Sidebar>
            <Sidebar.MenusConatiner>
              {menus.map((menu) => (
                <Sidebar.Menus
                  key={menu.href}
                  href={menu.href}
                  text={menu.text}
                />
              ))}
            </Sidebar.MenusConatiner>
          </Sidebar>
          {children}
        </div>
      </>
    )
  );
}
