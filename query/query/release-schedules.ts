import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getReleaseSchedule,
  getReleaseSchedules,
  createReleaseSchedule,
  updateReleaseSchedule,
  deleteReleaseSchedule,
} from '../api/release-schedules';

export function useGetReleaseSchedules(year?: number, month?: number) {
  return useQuery({
    queryKey: ['release-schedules', year, month],
    queryFn: () => getReleaseSchedules(year, month),
  });
}

export function useGetReleaseSchedule(id: number) {
  return useQuery({
    queryKey: ['release-schedule', id],
    queryFn: () => getReleaseSchedule(id),
    enabled: !!id,
  });
}

export function useCreateReleaseSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReleaseSchedule,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['release-schedules'] }),
  });
}

export function useUpdateReleaseSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: any) => updateReleaseSchedule(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['release-schedules'] }),
  });
}

export function useDeleteReleaseSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReleaseSchedule,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['release-schedules'] }),
  });
}
