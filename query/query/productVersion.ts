import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllProductVersions,
  getProductVersionsByProductId,
  createProductVersion,
  updateProductVersion,
  deleteProductVersion,
} from '../api/productVersion';

export function useGetAllProductVersions() {
  return useQuery({
    queryKey: ['productVersions'],
    queryFn: async () => {
      const data = await getAllProductVersions();
      return data;
    },
  });
}

export function useGetProductVersionsByProductId(productId: number) {
  return useQuery({
    queryKey: ['productVersions', 'product', productId],
    queryFn: async () => {
      const data = await getProductVersionsByProductId(productId);
      return data;
    },
    enabled: !!productId,
  });
}

export function useCreateProductVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      logiProductId: number;
      versionName: string;
      description?: string;
      visible?: boolean;
      deleted?: boolean;
    }) => createProductVersion(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productVersions'] });
    },
  });
}

export function useUpdateProductVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: number;
      versionName?: string;
      description?: string;
      visible?: boolean;
      deleted?: boolean;
    }) => updateProductVersion(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productVersions'] });
    },
  });
}

export function useDeleteProductVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProductVersion(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productVersions'] });
    },
  });
}

