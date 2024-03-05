'use client';
import { useGetMyInfo } from '@/query/query/users';
import useUserStore from '@/store/users';
import { useEffect } from 'react';

export const useAuth = () => {
  const {
    userId,
    setUserId,
    userEmail,
    setUserEmail,
    userLevel,
    setUserLevel,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
  } = useUserStore();

  const { data, isLoading: myInfoLoading } = useGetMyInfo();
  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage?.getItem('accessToken');
    if (accessToken && !myInfoLoading && data) {
      setUserId(data.userId);
      setUserEmail(data.userEmail);
      setUserLevel(data.userLevel);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [
    myInfoLoading,
    data,
    setUserId,
    setUserEmail,
    setUserLevel,
    setIsAuthenticated,
    setIsLoading,
  ]);

  return {
    userId,
    myInfoLoading,
    isLoading,
    userLevel,
    userEmail,
    isAuthenticated,
  };
};
