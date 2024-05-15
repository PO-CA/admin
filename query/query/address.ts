import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAAddressByUsersEmail,
  getAddressByUsersEmail,
  updateAAddressByUsersEmail,
} from '../api/address';
import { updateAddressDTO } from '@/types/updateAddressDTO';

export function useGetAddressByUsersEmail(usersEmail: string) {
  return useQuery({
    queryKey: ['address', `${usersEmail}`],
    queryFn: async () => {
      const data = await getAddressByUsersEmail(usersEmail);
      return data;
    },
    enabled: !!usersEmail,
  });
}

export function useCreateAAddressByUsersEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (usersEmail: any) => createAAddressByUsersEmail(usersEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
      alert('배송지를 추가 했습니다');
    },
  });
}

export function useUpdateAAddressByUsersEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: updateAddressDTO) =>
      updateAAddressByUsersEmail(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
      alert('배송지를 수정 했습니다');
    },
  });
}
