import type { Metadata } from 'next';
import ReactQueryProvider from './ReactQueryProvider';
import { SnackbarProvider } from '@/providers/SnackbarProvider';

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
        <ReactQueryProvider>
          <SnackbarProvider>
            {children}
            <div id="modal-root"></div>
          </SnackbarProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
