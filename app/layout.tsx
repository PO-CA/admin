import type { Metadata } from 'next';
import styles from './layout.module.css';
import './globals.css';
import ReactQueryProvider from './ReactQueryProvider';

export const metadata: Metadata = {
  title: 'HM Music',
  description: 'HM Music',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.rootLayoutContainer}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
