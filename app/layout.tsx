import type { Metadata } from 'next';
import ReactQueryProvider from './ReactQueryProvider';
import { SnackbarProvider } from '@/providers/SnackbarProvider';

export const metadata: Metadata = {
  title: 'HM Music',
  description: 'HM Music',
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
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
