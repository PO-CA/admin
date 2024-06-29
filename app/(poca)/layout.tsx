'use client';
import styles from './layout.module.css';
import '../globals.css';
import Header from '../(logi)/(components)/header';
import { menus } from './_components/menus';
import { useSignOut } from '@/query/query/users';
import { useIsPocaMember } from '@/hooks/useIsPocaMember';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { mutate } = useSignOut();
  useIsPocaMember();
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
