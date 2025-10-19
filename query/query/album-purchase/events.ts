import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getEvents,
  getEventDetail,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../../api/album-purchase/events';
import type {
  CreateEventRequest,
  UpdateEventRequest,
} from '@/types/albumPurchase';

// 행사 목록 조회
export function useGetEvents(params?: {
  albumPurchaseId?: number;
  isVisible?: boolean;
  isFinished?: boolean;
}) {
  return useQuery({
    queryKey: ['album-purchase', 'events', params],
    queryFn: () => getEvents(params),
  });
}

// 행사 상세 조회
export function useGetEventDetail(eventId: number) {
  return useQuery({
    queryKey: ['album-purchase', 'event', eventId],
    queryFn: () => getEventDetail(eventId),
    enabled: !!eventId,
  });
}

// 행사 등록
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData: CreateEventRequest) => createEvent(requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'events'],
      });
    },
  });
}

// 행사 수정
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventId,
      requestData,
    }: {
      eventId: number;
      requestData: UpdateEventRequest;
    }) => updateEvent(eventId, requestData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'events'],
      });
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'event', variables.eventId],
      });
    },
  });
}

// 행사 삭제
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'events'],
      });
    },
  });
}
