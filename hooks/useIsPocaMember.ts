import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useSignOut } from '@/query/query/users';

export const useIsPocaMember = () => {
  const { isAuthenticated, myInfoLoading, userLevel, userId, userEmail } =
    useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const { mutateAsync: signOut } = useSignOut();

  useEffect(() => {
    if (!myInfoLoading) {
      if (isAuthenticated) {
        if (
          userEmail === 'rudghksldl@gmail.com' ||
          userEmail === 'dbfl990501@naver.com'
        ) {
          router.push('/poca-store');
        } else {
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
    userEmail,
  ]);
};
