'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getPocaOrderUsers,
  getPocaOrdersByUser,
  getPocaShippingsByUser,
  getPocaCreditLedgerByUser,
} from '../api/logiPocaStore';

export function useGetPocaOrderUsers() {
  return useQuery({
    queryKey: ['pocaOrderUsers'],
    queryFn: getPocaOrderUsers,
  });
}

export function useGetPocaOrdersByUser(usersEmail: string) {
  return useQuery({
    queryKey: ['pocaOrders', usersEmail],
    queryFn: () => getPocaOrdersByUser(usersEmail),
    enabled: Boolean(usersEmail),
  });
}

export function useGetPocaShippingsByUser(usersEmail: string) {
  return useQuery({
    queryKey: ['pocaShippings', usersEmail],
    queryFn: () => getPocaShippingsByUser(usersEmail),
    enabled: Boolean(usersEmail),
  });
}

export function useGetPocaCreditsByUser(usersEmail: string) {
  return useQuery({
    queryKey: ['pocaCredits', usersEmail],
    queryFn: () => getPocaCreditLedgerByUser(usersEmail),
    enabled: Boolean(usersEmail),
  });
}
