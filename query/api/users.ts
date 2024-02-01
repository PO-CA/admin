import { API_URL } from '@/constants/apis';
import axios from 'axios';

// export const getAllUsersWithOrderItemsQty = async () => {
//   const { data } = await axios({
//     method: 'get',
//     url: `${API_URL}/userswithorderitemsqty`,
//   });
//   return data;
// };

export const getAllUsersWithOrderItemsQty = async () => {
  const result = await fetch(`${API_URL}/userswithorderitemsqty`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error('Failed to fetch users');
  }

  return await result.json();
};

export const getUserDetailByUsersNickname = async (usersNickname: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/users/${usersNickname}`,
  });
  return data;
};
