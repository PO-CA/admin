import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useSignOut } from '@/query/query/users';

export const useIsPocaMember = () => {
  const { isAuthenticated, myInfoLoading, userLevel, userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  console.log('asd');

  const { mutateAsync: signOut } = useSignOut();

  useEffect(() => {
    if (!myInfoLoading) {
      if (isAuthenticated) {
        if (userId !== 1) {
          router.push('/store');
        }
      } else {
        if (pathname !== '/signup') {
          router.push('/login');
        } else {
          router.push('/signup');
        }
      }
    }
  }, [
    signOut,
    pathname,
    myInfoLoading,
    router,
    isAuthenticated,
    userLevel,
    userId,
  ]);
};
