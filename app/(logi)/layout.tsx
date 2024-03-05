'use client';
import styles from './layout.module.css';
import '../globals.css';
import { useIsAdmin } from '@/hooks/useIAdmin';
import Header from './(components)/header';
import { menus } from './(components)/menus';
import { useSignOut } from '@/query/query/users';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { mutate } = useSignOut();
  useIsAdmin();

  return (
    <div className={styles.contentContainer}>
      <Header>
        <Header.MenusConatiner>
          {menus.map((menu) => (
            <Header.Menus key={menu.href} href={menu.href} text={menu.text} />
          ))}
        </Header.MenusConatiner>
        <Header.MenusConatiner>
          <Header.Menus href="/" text="로그아웃" onClick={mutate} />
        </Header.MenusConatiner>
      </Header>
      {children}
    </div>
  );
}
