import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useSignOut } from '@/query/query/users';

export const useIsAdmin = () => {
  const { isAuthenticated, myInfoLoading, userLevel } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const { mutateAsync: signOut } = useSignOut();

  useEffect(() => {
    if (!myInfoLoading) {
      if (isAuthenticated) {
        if (!userLevel?.includes('ADMIN')) {
          if (userLevel?.includes('STAFF_1')) {
            router.push('/store');
          } else if (userLevel?.includes('STAFF_2')) {
            router.push('/poca');
          } else {
            signOut();
          }
        } else {
          if (pathname === '/login') {
            router.push('/dashboard');
          }
        }
      } else {
        if (pathname !== '/signup') {
          router.push('/login');
        }
      }
    }
  }, [signOut, pathname, myInfoLoading, router, isAuthenticated, userLevel]);
};
