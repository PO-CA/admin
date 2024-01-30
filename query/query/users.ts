import { useQuery } from '@tanstack/react-query';
import {
  getAllUsersWithOrderItemsQty,
  getUserDetailByUsersNickname,
} from '../api/users';

export function useGetAllUsersWithOrderItemsQty() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const data = await getAllUsersWithOrderItemsQty();
      return data;
    },
  });
}

export function useGetUsersDetailByUsersNickname(usersNickname: string) {
  return useQuery({
    queryKey: ['users', `${usersNickname}`],
    queryFn: async () => {
      const data = await getUserDetailByUsersNickname(usersNickname);
      return data;
    },
  });
}
