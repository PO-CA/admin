import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../api/notice';

export function useGetNotices() {
  return useQuery({ queryKey: ['notices'], queryFn: getNotices });
}

export function useGetNotice(id: number) {
  return useQuery({
    queryKey: ['notice', id],
    queryFn: () => getNotice(id),
    enabled: !!id,
  });
}

export function useCreateNotice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNotice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notices'] }),
  });
}

export function useUpdateNotice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: any) => updateNotice(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notices'] }),
  });
}

export function useDeleteNotice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notices'] }),
  });
}
