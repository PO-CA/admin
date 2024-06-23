'use client';
import styles from './layout.module.css';
import '../globals.css';
import { menus } from '@/constants/menus';
import Sidebar from '@/components/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIAdmin';
import Header from '@/components/header';
import { pocaMenus } from '@/constants/poca-menus';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, myInfoLoading, userEmail } = useAuth();
  console.log('userEmail', userEmail);

  useIsAdmin();

  return (
    !myInfoLoading &&
    isAuthenticated && (
      <>
        <Header />
        <div className={styles.contentContainer}>
          <Sidebar>
            <Sidebar.MenusConatiner>
              {menus.map((menu, i) => (
                <Sidebar.MainMenus
                  key={`${menu.href}${i}`}
                  href={menu.href}
                  text={menu.text}
                  subMenus={menu.subMenus}
                />
              ))}
              {userEmail &&
                userEmail === 'rudghksldl@gmail.com' &&
                pocaMenus.map((menu, i) => (
                  <Sidebar.MainMenus
                    key={`${i}poca`}
                    text={menu.text}
                    subMenus={menu.subMenus}
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
