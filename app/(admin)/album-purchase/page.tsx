'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AlbumPurchasePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/album-purchase/dashboard');
  }, [router]);

  return null;
}
