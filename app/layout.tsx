import type { Metadata } from 'next';
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
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
