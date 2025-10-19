import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  scanReceipt,
  getReceipts,
  getUnmatchedReceipts,
  matchUnmatchedReceipt,
  searchRequests,
} from '../../api/album-purchase/receipts';
import type {
  ScanReceiptRequest,
  MatchReceiptRequest,
} from '@/types/albumPurchase';

// 수령 건 목록 조회
export function useGetReceipts(params?: { isReceived?: boolean }) {
  return useQuery({
    queryKey: ['album-purchase', 'receipts', params],
    queryFn: () => getReceipts(params),
  });
}

// 미매칭 수령 건 목록
export function useGetUnmatchedReceipts() {
  return useQuery({
    queryKey: ['album-purchase', 'unmatched-receipts'],
    queryFn: () => getUnmatchedReceipts(),
  });
}

// 송장 스캔
export function useScanReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData: ScanReceiptRequest) => scanReceipt(requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'receipts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'unmatched-receipts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'requests'],
      });
    },
  });
}

// 미매칭 수령 건 매칭
export function useMatchUnmatchedReceipt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      unmatchedReceiptId,
      requestData,
    }: {
      unmatchedReceiptId: number;
      requestData: MatchReceiptRequest;
    }) => matchUnmatchedReceipt(unmatchedReceiptId, requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'unmatched-receipts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['album-purchase', 'requests'],
      });
    },
  });
}

// 매칭할 신청 건 검색
export function useSearchRequests(keyword?: string) {
  return useQuery({
    queryKey: ['album-purchase', 'search-requests', keyword],
    queryFn: () => searchRequests(keyword),
    enabled: !!keyword,
  });
}
