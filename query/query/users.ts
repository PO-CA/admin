'use client';
import {
  getAllUsersWithOrderItemsQty,
  getUserDetailByUsersEmail,
} from '../api/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { myInfo, signIn, signOut, signUp } from '../api/users';
import { SignIn } from '@/types/signIn';
import { SignUp } from '@/types/signUp';
import useUserStore from '@/store/users';

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignIn) => signIn(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.href = '/';
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignUp) => signUp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const clearUserStorage = useUserStore?.persist?.clearStorage;

  return useMutation({
    mutationFn: () => signOut(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      clearUserStorage();
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      window.location.href = '/';
    },
  });
}

export function useGetMyInfo() {
  return useQuery({
    queryKey: ['myinfo'],
    queryFn: async () => {
      const data = await myInfo();
      return data;
    },
    retry: 2,
  });
}

export function useGetAllUsersWithOrderItemsQty() {
  return useQuery({
    queryKey: ['usersOrders'],
    queryFn: async () => {
      const data = await getAllUsersWithOrderItemsQty();
      return data;
    },
  });
}

export function useGetUsersDetailByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['users', `${usersEmail}`],
    queryFn: async () => {
      const data = await getUserDetailByUsersEmail(usersEmail);
      return data;
    },
  });
}
