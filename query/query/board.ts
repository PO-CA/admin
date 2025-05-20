import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard,
} from '../api/board';

export function useGetBoards() {
  return useQuery({ queryKey: ['boards'], queryFn: getBoards });
}

export function useGetBoard(id: number) {
  return useQuery({
    queryKey: ['board', id],
    queryFn: () => getBoard(id),
    enabled: !!id,
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBoard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['boards'] }),
  });
}

export function useUpdateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: any) => updateBoard(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['boards'] }),
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['boards'] }),
  });
}
