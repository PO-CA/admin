import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { usePathname, useRouter } from 'next/navigation';

export const useIsPocaMember = () => {
  const { isAuthenticated, myInfoLoading, pocaStorePermissionLevel } =
    useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!myInfoLoading) {
      if (isAuthenticated) {
        if (pocaStorePermissionLevel !== 'ORDER') {
          alert('포카 스토어 접근 권한이 없습니다.');
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
    pathname,
    myInfoLoading,
    router,
    isAuthenticated,
    pocaStorePermissionLevel,
  ]);
};
