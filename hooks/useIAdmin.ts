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
            if (
              pathname !== '/store' &&
              pathname !== '/store/orders' &&
              pathname !== '/store/notice' &&
              !pathname.includes('/store/shippings')
            ) {
              router.push('/store');
            }
          } else if (userLevel?.includes('STAFF_2')) {
            router.push('/poca');
          } else {
            alert('로그인 여부를 확인중입니다.');
          }
        } else {
          if (
            pathname === '/login' ||
            pathname === '/signup' ||
            pathname === '/'
          ) {
            router.push('/dashboard');
          }
        }
      } else {
        if (pathname !== '/signup') {
          router.push('/login');
        } else {
          router.push('/signup');
        }
      }
    }
  }, [signOut, pathname, myInfoLoading, router, isAuthenticated, userLevel]);
};
