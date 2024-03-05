'use client';
import styles from './layout.module.css';
import '../globals.css';
import { useIsAdmin } from '@/hooks/useIAdmin';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useIsAdmin();
  return <div className={styles.contentContainer}>{children}</div>;
}
